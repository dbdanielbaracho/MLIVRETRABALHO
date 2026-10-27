"""Preserve UIAutomator dump failure output; never retry or read stale XML."""
import hashlib,json
from pathlib import Path

def record_dump_failure(output,expected_path,out_dir,returncode):
    raw=output if isinstance(output,bytes) else str(output).encode('utf-8',errors='replace')
    out=Path(out_dir);out.mkdir(parents=True,exist_ok=True)
    (out/'native-hierarchy-dump-failure.txt').write_bytes(raw)
    meta={'command':['uiautomator','dump',expected_path], 'expectedPath':expected_path,
          'returncode':returncode,'outputSHA256':hashlib.sha256(raw).hexdigest(),
          'outputBytes':len(raw),'retry':False,'staleHierarchyRead':False}
    (out/'native-hierarchy-dump-failure.json').write_text(json.dumps(meta,sort_keys=True,indent=2)+'\\n')
    print('NATIVE_HIERARCHY_DUMP_FAILURE '+json.dumps(meta,sort_keys=True),flush=True)
    return meta
