'use strict';

const fs = require('node:fs');
const path = require('node:path');

const BOOT_UNLOCK_COMMAND = 'adb -s emulator-5554 shell input keyevent 82';
const INPUT_BROKEN_PIPE = /Failure calling service input: Broken pipe \(32\)/;
const MAX_ATTEMPTS = 6;
const ATTEMPT_TIMEOUT = '15s';
const RETRY_DELAY_MS = 2000;
const UPSTREAM_RUNNER_SHA = 'a421e43855164a8197daf9d8d40fe71c6996bb0d';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function installBoundedBootUnlockRetry(execModule, {sleep = wait, log = message => console.warn(message)} = {}) {
  if (!execModule || typeof execModule.exec !== 'function') throw new TypeError('Android runner exec module is required');
  const originalExec = execModule.exec;
  execModule.exec = async function(commandLine, args, options) {
    if (String(commandLine).trim() !== BOOT_UNLOCK_COMMAND) {
      return originalExec.apply(this, arguments);
    }

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      let output = '';
      const prior = options?.listeners || {};
      const listeners = {
        ...prior,
        stdout(data) {
          const text = data.toString();
          output += text;
          if (prior.stdout) prior.stdout(data);
          else process.stdout.write(data);
        },
        stderr(data) {
          const text = data.toString();
          output += text;
          if (prior.stderr) prior.stderr(data);
          else process.stderr.write(data);
        },
      };
      const code = await originalExec.call(this, 'timeout', [ATTEMPT_TIMEOUT, 'adb', '-s', 'emulator-5554', 'shell', 'input', 'keyevent', '82'], {
        ...options,
        ignoreReturnCode: true,
        listeners,
      });
      if (code === 0) return 0;
      if (!INPUT_BROKEN_PIPE.test(output)) {
        throw new Error(`Android boot unlock failed (exit ${code}); readiness retry does not apply`);
      }
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`Android input service stayed unavailable after ${MAX_ATTEMPTS} bounded attempts`);
      }
      log(`ANDROID_BOOT_UNLOCK_RETRY attempt=${attempt + 1}/${MAX_ATTEMPTS} delayMs=${RETRY_DELAY_MS} cause=input_service_broken_pipe`);
      await sleep(RETRY_DELAY_MS);
    }
    throw new Error('Unreachable Android boot unlock retry state');
  };
  return () => { execModule.exec = originalExec; };
}

const RUNNER_INPUTS = Object.freeze({
  API_LEVEL: '35',
  SYSTEM_IMAGE_API_LEVEL: '35',
  TARGET: 'default',
  ARCH: 'x86_64',
  PROFILE: 'pixel_6',
  CORES: '2',
  RAM_SIZE: '',
  HEAP_SIZE: '',
  SDCARD_PATH_OR_SIZE: '',
  DISK_SIZE: '',
  AVD_NAME: 'test',
  FORCE_AVD_CREATION: 'true',
  EMULATOR_BOOT_TIMEOUT: '1200',
  EMULATOR_PORT: '5554',
  EMULATOR_OPTIONS: '-no-window -gpu swiftshader_indirect -noaudio -no-boot-anim -camera-back none -no-snapshot -no-snapshot-save',
  DISABLE_ANIMATIONS: 'false',
  DISABLE_SPELLCHECKER: 'false',
  DISABLE_LINUX_HW_ACCEL: 'true',
  ENABLE_HW_KEYBOARD: 'false',
  EMULATOR_BUILD: '',
  WORKING_DIRECTORY: '',
  NDK: '',
  CMAKE: '',
  CHANNEL: 'stable',
});

function configureRunnerInputs(script) {
  const values = {...RUNNER_INPUTS, SCRIPT: script};
  for (const [name, value] of Object.entries(values)) {
    const environmentName = `INPUT_${name.replaceAll('_', '-')}`;
    if (process.env[environmentName] !== value) {
      throw new Error(`Pinned Android emulator runner input mismatch: ${name}`);
    }
  }
}

function runPinnedRunner(mode) {
  if (mode !== 'canonical' && mode !== 'native') throw new Error('Expected canonical or native emulator mode');
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
  const runnerRoot = path.join(workspace, '.github', 'tools', 'android-emulator-runner');
  const runnerPackage = path.join(runnerRoot, 'package.json');
  const mainModule = path.join(runnerRoot, 'lib', 'main.js');
  if (!fs.existsSync(runnerPackage) || !fs.existsSync(mainModule)) {
    throw new Error(`Pinned Android emulator runner ${UPSTREAM_RUNNER_SHA} is missing from ${runnerRoot}`);
  }
  const pkg = JSON.parse(fs.readFileSync(runnerPackage, 'utf8'));
  if (pkg.name !== 'android-emulator-runner') throw new Error('Checked-out emulator runner package identity mismatch');

  const execModule = require(path.join(runnerRoot, 'node_modules', '@actions', 'exec'));
  installBoundedBootUnlockRetry(execModule);
  const script = mode === 'canonical' ? 'bash scripts/android-standalone-smoke.sh' : 'bash scripts/run-platform-support-native-fixture.sh';
  configureRunnerInputs(script);
  require(mainModule);
}

module.exports = {
  RUNNER_INPUTS,
  BOOT_UNLOCK_COMMAND,
  MAX_ATTEMPTS,
  UPSTREAM_RUNNER_SHA,
  configureRunnerInputs,
  installBoundedBootUnlockRetry,
  runPinnedRunner,
};

if (require.main === module) {
  try {
    runPinnedRunner(process.argv[2]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Android emulator bootstrap failed');
    process.exitCode = 1;
  }
}
