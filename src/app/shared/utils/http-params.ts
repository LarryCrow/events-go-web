import { HttpParams } from '@angular/common/http';

/**
 * Create HttpParams for http request.
 *
 * @param params Object with params
 * @description Add 'params' field only in case when this field is not undefiend or null.
 */
export function createHttpParams(params: {}): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  Object.keys(params).forEach(param => {
    if (typeof params[param] !== 'undefined' && params[param] != null) {
      httpParams = httpParams.set(param, params[param]);
    }
  });

  return httpParams;
}
