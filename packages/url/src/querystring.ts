import { fromNullable, Maybe } from 'maybeasy';
import { parseQuery, printQuery, QueryParams, QueryParamVal } from 'nested-query-params';

export function get(key: string, params: QueryParams): Maybe<QueryParamVal>;
export function get(key: string): (params: QueryParams) => Maybe<QueryParamVal>;
export function get(key: string, params?: QueryParams) {
  const getIt = (params: QueryParams): Maybe<QueryParamVal> => {
    const val = params[key];
    return fromNullable(val);
  };

  return typeof params === 'undefined' ? getIt : getIt(params);
}

export function put(key: string, value: QueryParamVal): (params: QueryParams) => QueryParams;
export function put(key: string, value: QueryParamVal, params: QueryParams): QueryParams;
export function put(key: string, value: QueryParamVal, params?: QueryParams) {
  const putIt = (params: QueryParams): QueryParams => {
    return { ...params, [key]: value };
  };

  return typeof params === 'undefined' ? putIt : putIt(params);
}

export function fromQueryString(query: string): QueryParams {
  return parseQuery(query);
}

export function toQueryString(query: QueryParams): string {
  const s = printQuery(query);
  return s === '?' ? '' : s;
}
