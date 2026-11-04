"""Bounded read-only readiness for Android's window service after a boot-time restart."""
import re
import subprocess
import time

MAX_WINDOW_READINESS_ATTEMPTS = 24
_WINDOW_SERVICE_BROKEN_PIPE = re.compile(r"Failure calling service window: Broken pipe \(32\)")


def read_window_size(adb, *, sleep=time.sleep, log=print):
    """Wait only for the observed transient window-service disconnect; preserve every other failure."""
    for attempt in range(1, MAX_WINDOW_READINESS_ATTEMPTS + 1):
        try:
            output = adb("shell", "wm", "size")
        except subprocess.CalledProcessError as error:
            raw = error.output or ""
            text = raw.decode("utf-8", "replace") if isinstance(raw, bytes) else str(raw)
            if not _WINDOW_SERVICE_BROKEN_PIPE.search(text):
                raise
            if attempt == MAX_WINDOW_READINESS_ATTEMPTS:
                log(f"NATIVE_WINDOW_SERVICE_FAIL attempt={attempt}/{MAX_WINDOW_READINESS_ATTEMPTS} exit={error.returncode} cause=window_service_broken_pipe exhausted=true")
                raise
            log(f"NATIVE_WINDOW_SERVICE_WAIT attempt={attempt}/{MAX_WINDOW_READINESS_ATTEMPTS} exit={error.returncode} cause=window_service_broken_pipe")
            sleep(2)
            continue
        match = re.search(r"(\d+)x(\d+)", output)
        if not match:
            raise AssertionError("native_window_size_unconfirmed")
        width, height = map(int, match.groups())
        if width <= 0 or height <= 0:
            raise AssertionError("native_window_size_invalid")
        log(f"NATIVE_WINDOW_SERVICE_READY attempt={attempt} size={width}x{height}")
        return width, height
    raise AssertionError("native_window_service_readiness_exhausted")
