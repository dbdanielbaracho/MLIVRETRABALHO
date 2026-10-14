export function readSettledSection<T>(results:PromiseSettledResult<unknown>[],index:number,fallback:T):T{
 const result=results[index];
 return result?.status==='fulfilled'?result.value as T:fallback;
}
export function failedSectionCount(results:PromiseSettledResult<unknown>[]):number{
 return results.filter(result=>result.status==='rejected').length;
}
