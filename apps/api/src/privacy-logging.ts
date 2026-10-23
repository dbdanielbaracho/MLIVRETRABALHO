import type { LoggerService } from '@nestjs/common';
import type { FastifyLoggerOptions } from 'fastify';

const methods=new Set(['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS']);
const components=new Set(['NestFactory','InstanceLoader','RoutesResolver','RouterExplorer','NestApplication','ExceptionsHandler','Bootstrap']);
const errorTypes=new Set(['Error','TypeError','RangeError','SyntaxError','HttpException','BadRequestException','UnauthorizedException','ForbiddenException','NotFoundException']);
const databaseCodes=new Set(['08000','08003','08006','22P02','22001','22003','23502','23503','23505','23514','40001','40P01','42501','57014','57P01','P0001']);
const operationReasons=new Set([
 'DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply','PRIVACY_OPERATOR_ID_required','PRIVACY_OPERATOR_ID_required_for_apply','PRIVACY_OPERATOR_ID_too_long',
 'privacy_retention_already_running','privacy_retention_run_missing','privacy_request_not_startable','privacy_request_not_finishable','operator_note_too_long','request_id_invalid',
 'scope_type_invalid','legal_hold_scope_not_found','legal_hold_not_reviewable','legal_hold_review_history_missing','legal_hold_not_releasable',
 'usage: privacy-requests-ops <list|start|complete|partial|reject> [requestId] [resolution/evidence/note]',
 'usage: privacy-legal-holds-ops <list|history|create|review|release> ...',
 ...['tenant_id','scope_type','scope_id','reason','evidence_ref','review_at','hold_id','review_note','next_review_at','release_reason','resolution_code'].flatMap(field=>['_required','_too_long','_invalid','_must_be_future'].map(suffix=>field+suffix)),
]);
const object=(value:unknown):Record<string,unknown>=>value!==null&&typeof value==='object'?value as Record<string,unknown>:{};

export function privateOperationCode(value:unknown):string{
 const error=object(value);
 if(typeof error.message==='string'&&operationReasons.has(error.message))return error.message;
 if(typeof error.message==='string'&&/^migration_checksum_mismatch:/.test(error.message))return 'migration_checksum_mismatch';
 if(typeof error.code==='string'&&databaseCodes.has(error.code))return 'database_'+error.code;
 return 'unexpected_error';
}

export function privateOperationFailure(operation:string,value:unknown):void{
 const name=['migrate','privacy_retention','privacy_requests','privacy_legal_holds'].includes(operation)?operation:'operation';
 process.stderr.write(JSON.stringify({event:'operation_error',operation:name,code:privateOperationCode(value),error:privateErrorMetadata(value)})+'\n');
}

// Diagnostic metadata is allowlisted. Messages, stacks, headers, cookies, URLs,
// raw route parameters, request/response bodies and SQL details never enter a log.
export function privateErrorMetadata(value:unknown):Record<string,unknown>{
 const error=object(value);
 return {type:typeof error.name==='string'&&errorTypes.has(error.name)?error.name:'Error',...(typeof error.code==='string'&&databaseCodes.has(error.code)?{code:error.code}:{})};
}

export function privateHttpMetadata(value:unknown):Record<string,unknown>{
 const fields=object(value),req=object(fields.req),res=object(fields.res),route=object(req.routeOptions).url;
 const record:Record<string,unknown>={event:fields.res?'http_response':fields.req?'http_request':'http_event'};
 if(fields.req){
  record.method=typeof req.method==='string'&&methods.has(req.method)?req.method:'OTHER';
  // routeOptions.url is the registered route pattern, never raw request.url.
  record.route=typeof route==='string'&&route.length<=180&&/^\/v1(?:\/[A-Za-z0-9:_-]+)*$/.test(route)?route:'unmatched';
 }
 if(typeof res.statusCode==='number'&&Number.isInteger(res.statusCode)&&res.statusCode>=100&&res.statusCode<=599)record.statusCode=res.statusCode;
 if(typeof fields.responseTime==='number'&&Number.isFinite(fields.responseTime)&&fields.responseTime>=0)record.elapsedMs=Math.min(fields.responseTime,86400000);
 if(fields.err)record.error=privateErrorMetadata(fields.err);
 return record;
}

export const privateHttpLogger:FastifyLoggerOptions={
 level:'info',
 hooks:{
  logMethod(args,method){
   // Pino's hook runs before interpolation and serialization. Do not forward a
   // free-form message or an unreviewed object, even on unmatched routes/errors.
   Reflect.apply(method,this,[privateHttpMetadata(args[0]),'http_event']);
  },
 },
};

function applicationLog(level:string,message:unknown,parameters:unknown[]):void{
 const context=parameters.at(-1);
 const record={level,event:level==='error'||level==='fatal'?'application_error':'application_event',component:typeof context==='string'&&components.has(context)?context:'Application',...(level==='error'||level==='fatal'?{error:privateErrorMetadata(message)}:{})};
 process.stdout.write(JSON.stringify(record)+'\n');
}

export const privateApplicationLogger:LoggerService={
 log(message:unknown,...parameters:unknown[]){applicationLog('log',message,parameters);},
 warn(message:unknown,...parameters:unknown[]){applicationLog('warn',message,parameters);},
 error(message:unknown,...parameters:unknown[]){applicationLog('error',message,parameters);},
 debug(message:unknown,...parameters:unknown[]){applicationLog('debug',message,parameters);},
 verbose(message:unknown,...parameters:unknown[]){applicationLog('verbose',message,parameters);},
 fatal(message:unknown,...parameters:unknown[]){applicationLog('fatal',message,parameters);},
};
