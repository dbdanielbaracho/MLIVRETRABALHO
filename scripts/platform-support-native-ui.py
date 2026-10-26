#!/usr/bin/env python3
"""Drive the installed synthetic-only package through native UI; retain original screenshots/XML."""
import base64,hashlib,json,os,re,subprocess,sys,time,xml.etree.ElementTree as ET
from pathlib import Path

assert os.environ.get('CI')=='true'
assert os.environ.get('GITHUB_REPOSITORY')=='dbdanielbaracho/MLIVRETRABALHO'
ROOT=Path('/tmp/mlivre-support-native');OUT=Path('artifacts/platform-support-native');OUT.mkdir(parents=True,exist_ok=True)
PRIVATE=json.loads((ROOT/'private.json').read_text());PUBLIC=json.loads((ROOT/'public.json').read_text())
PACKAGE='com.predibeacon.mlivretrabalho.supportfixture';assert PUBLIC['package']==PACKAGE
assert re.fullmatch(r'http://10\.0\.2\.2:\d+/v1',PUBLIC['api'])
devices=subprocess.check_output(['adb','devices'],text=True)
serials=re.findall(r'^(emulator-\d+)\s+device$',devices,re.M);assert len(serials)==1
ADB=['adb','-s',serials[0]];stage='device';states=[]
def adb(*args,binary=False,timeout=20):
    return subprocess.check_output(ADB+list(args),timeout=timeout,text=not binary,stderr=subprocess.STDOUT)
def tree():
    adb('shell','uiautomator','dump','/data/local/tmp/mlivre-support-layout.xml')
    return ET.fromstring(adb('exec-out','cat','/data/local/tmp/mlivre-support-layout.xml'))
def label(n):return n.attrib.get('text','')+' '+n.attrib.get('content-desc','')
def bounds(n):
    nums=[int(x) for x in re.findall(r'\d+',n.attrib.get('bounds',''))]
    return nums if len(nums)==4 else [0,0,0,0]
def visible(n):
    x,y,r,b=bounds(n);return r>x and b>y and n.attrib.get('visible-to-user','true')!='false'
def matching(t,text):return [n for n in t.iter('node') if text in label(n) and visible(n)]
def wait(text,timeout=35):
    end=time.monotonic()+timeout
    while time.monotonic()<end:
        t=tree()
        if matching(t,text):return t
        time.sleep(.5)
    raise AssertionError('expected_native_text_missing')
def action(t,text):
    parents={child:parent for parent in t.iter() for child in parent}
    for n in matching(t,text):
        while n is not None:
            if n.attrib.get('clickable')=='true' and visible(n):return n
            n=parents.get(n)
    return None
def tap(text,scroll=False):
    for _ in range(20 if scroll else 2):
        t=tree();n=action(t,text)
        if n is not None:
            assert n.attrib.get('enabled')!='false';x,y,r,b=bounds(n);adb('shell','input','tap',str((x+r)//2),str((y+b)//2));time.sleep(.4);return
        if not scroll:time.sleep(.5)
        else:swipe()
    raise AssertionError('native_action_missing')
def swipe(up=False):
    size=adb('shell','wm','size');w,h=map(int,re.search(r'(\d+)x(\d+)',size).groups())
    adb('shell','input','swipe',str(w//2),str(int(h*(.25 if up else .8))),str(w//2),str(int(h*(.8 if up else .28))),'350');time.sleep(.3)
def input_text(accessible,value):
    assert re.fullmatch(r'[A-Za-z0-9@._+-]+',value)
    for _ in range(12):
        nodes=[n for n in tree().iter('node') if n.attrib.get('class')=='android.widget.EditText' and accessible in label(n) and visible(n)]
        if nodes:
            x,y,r,b=bounds(nodes[0]);adb('shell','input','tap',str((x+r)//2),str((y+b)//2));adb('shell','input','text',value);return
        swipe()
    raise AssertionError('native_input_missing')
def open_route(route):
    adb('shell','am','start','-W','-a','android.intent.action.VIEW','-d','mlivre-support-fixture:///'+route,'-p',PACKAGE)
    time.sleep(.5)
def screenshot(name,preview=False):
    t=tree();xml=ET.tostring(t,encoding='utf-8');png=adb('exec-out','screencap','-p',binary=True)
    assert png.startswith(b'\x89PNG\r\n\x1a\n')
    (OUT/(name+'.png')).write_bytes(png);(OUT/(name+'.xml')).write_bytes(xml)
    meta={'name':name,'pngSHA256':hashlib.sha256(png).hexdigest(),'xmlSHA256':hashlib.sha256(xml).hexdigest(),'native':True,'synthetic':True}
    states.append(meta);print('NATIVE_SCREENSHOT_META '+json.dumps(meta),flush=True)
    if preview:print('NATIVE_SCREENSHOT_BASE64 '+json.dumps({'name':name,'data':base64.b64encode(png).decode()}),flush=True)
def command(name):subprocess.run(['node','scripts/platform-support-native-api.cjs','command',name],check=True,timeout=60)
def fault(**kwargs):(ROOT/'fault.json').write_text(json.dumps(kwargs))
def traffic():return json.loads((ROOT/'traffic.json').read_text())
def submits():return sum(x['method']=='POST' and x['route']=='/v1/me/platform-support' for x in traffic())
def signin(kind):
    account=PRIVATE['accounts'][kind];assert account['email'].endswith('@example.test')
    open_route('entrar');wait('E-mail');input_text('E-mail',account['email']);input_text('Senha',account['password']);adb('shell','input','keyevent','4');tap('Entrar');time.sleep(2)
    open_route('perfil');wait('sem vínculo com empresa');tap('sem vínculo com empresa');wait('Ajuda à plataforma')
try:
    assert adb('shell','getprop','sys.boot_completed').strip()=='1'
    adb('install','-r',str(OUT/'SupportFixture.apk'),timeout=120)
    adb('logcat','-c');stage='unlinked-navigation';signin('pro')
    wait('Atendimento da plataforma indisponível');screenshot('01-disabled-empty',True)
    n=None
    for _ in range(12):
        n=action(tree(),'Enviar à plataforma')
        if n is not None:break
        swipe()
    assert n is not None and n.attrib.get('enabled')=='false'
    stage='loading-focus';fault(delayListOnce=True);tap('Atualizar solicitações',True);wait('Verificando a conta');screenshot('02-loading')
    open_route('perfil');wait('sem vínculo com empresa');tap('sem vínculo com empresa');wait('Atendimento da plataforma indisponível')
    stage='enabled-form';command('enable');tap('Atualizar solicitações',True);wait('Mensagem')
    input_text('Mensagem para a plataforma','Native_first_request');adb('shell','input','keyevent','4');screenshot('03-form',True)
    tap('Enviar à plataforma',True);wait('Solicitação confirmada');screenshot('04-confirmed')
    tap('Encerrar tentativa neste aparelho',True);wait('Tentativa encerrada neste aparelho');tap('Atualizar solicitações',True);wait('Seu histórico na plataforma')
    for _ in range(12):
        t=tree();ids=[n.attrib.get('text','') for n in t.iter('node') if visible(n) and re.fullmatch(r'[a-f0-9-]{36}',n.attrib.get('text',''))]
        if ids:tap(ids[0]);break
        swipe()
    wait('Detalhe da solicitação');wait('Native_first_request');screenshot('05-detail-empty-response')
    stage='authorized-response';command('reply');tap('Atualizar solicitações',True);wait('Seu histórico na plataforma')
    # Open the only persisted row by its visible native UUID.
    for _ in range(12):
        t=tree();ids=[n.attrib.get('text','') for n in t.iter('node') if visible(n) and re.fullmatch(r'[a-f0-9-]{36}',n.attrib.get('text',''))]
        if ids:tap(ids[0]);break
        swipe()
    wait('Native platform reply');screenshot('06-authorized-response',True)
    stage='withdraw';tap('Retirar esta solicitação',True);wait('Retirada confirmada');screenshot('07-withdrawn')
    tap('Atualizar solicitações',True);wait('Mensagem');input_text('Mensagem para a plataforma','Native_recovery_request');adb('shell','input','keyevent','4')
    stage='timeout-no-resend';before=submits();fault(delaySubmitOnce=True);tap('Enviar à plataforma',True);wait('Resultado não confirmado',timeout=30);screenshot('08-timeout-preserved',True)
    assert submits()==before+1;time.sleep(3);assert submits()==before+1
    stage='durable-reopen';adb('shell','am','force-stop',PACKAGE);open_route('ajuda-plataforma');wait('Solicitação confirmada');assert submits()==before+1;command('check-recovery');screenshot('09-durable-recovery')
    tap('Encerrar tentativa neste aparelho',True);wait('Atualizar solicitações');tap('Atualizar solicitações',True);wait('Seu histórico na plataforma')
    stage='error-private-hidden';fault(listErrorOnce=True);tap('Atualizar solicitações',True);wait('Não foi possível confirmar a operação');t=tree();assert not matching(t,'Native_first_request') and not matching(t,'Native_recovery_request');screenshot('10-error-private-hidden')
    tap('Atualizar solicitações',True);wait('Mensagem')
    stage='pagination';command('seed-history');tap('Atualizar solicitações',True);wait('Seu histórico na plataforma');tap('Carregar mais solicitações',True);time.sleep(1);assert any(x['cursor'] for x in traffic());screenshot('11-history-pagination')
    stage='large-font';adb('shell','settings','put','system','font_scale','1.3');open_route('ajuda-plataforma');wait('Ajuda à plataforma');screenshot('12-large-font');adb('shell','settings','put','system','font_scale','1.0')
    stage='session-expired';command('expire');open_route('ajuda-plataforma');wait('A sessão mudou ou expirou');assert not matching(tree(),'Native_recovery_request');screenshot('13-session-expired')
    stage='company-isolation';signin('company');wait('Nenhuma solicitação registrada nesta conta');assert not matching(tree(),'Native_first_request');screenshot('14-company-own-empty')
    tap('Voltar');wait('Ajuda e suporte');tap('Ajuda e suporte',True);screenshot('15-company-legacy-preserved')
    fatal=adb('logcat','-d');assert not re.search(r'FATAL EXCEPTION|Fatal signal|ReactNativeJS.*(?:TypeError|ReferenceError|Invariant Violation)',fatal)
    (OUT/'native-logcat.txt').write_text(fatal);(OUT/'traffic.json').write_text(json.dumps(traffic(),indent=2))
    receipt={'states':states,'nativePackage':PACKAGE,'syntheticLocalAPI':PUBLIC['api'],'timeoutSinglePOSTAndRecovery':True,'companyAndUnlinked':True,'canonicalUntouched':True,'production':False,'metroRequired':False}
    (OUT/'NATIVE_RECEIPT.json').write_text(json.dumps(receipt,indent=2));print('PLATFORM_SUPPORT_NATIVE_RENDER_PASS '+json.dumps({'screenshots':len(states),'timeoutSinglePOSTAndRecovery':True,'native':True,'production':False}),flush=True)
except BaseException as error:
    print('PLATFORM_SUPPORT_NATIVE_RENDER_FAIL '+json.dumps({'stage':stage,'kind':type(error).__name__,'privateDetailsHidden':True}),flush=True)
    try:screenshot('failure-'+stage,True)
    except BaseException:pass
    raise
finally:
    try:adb('shell','settings','put','system','font_scale','1.0')
    except BaseException:pass
