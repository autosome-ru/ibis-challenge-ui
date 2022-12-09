import {NgModule} from "@angular/core";

@NgModule({})
export class HelpersFunctions {
}

export interface IURLParams {
  client_id: string,
  redirect_uri: string,
  login?: string
  scope?: string[],
  state?: string,
  allow_signup?: boolean
}

export function convertParamsToUrl(base_url: string, params: IURLParams) {
  const login_appendix = params.login === undefined ? "" : `&login=${params.login}`
  const scope_appendix = params.scope === undefined ? "" : `&scope=${params.scope?.join('%20')}`
  const state_appendix = params.state === undefined ? "" : `&state=${params.state}`
  const allow_signup_appendix = params.allow_signup === undefined ? "" : `&allow_signup=${params.allow_signup}`
  return base_url + "?" +
    `client_id=${params.client_id}` +
    `&redirect_uri=${params.redirect_uri}` +
    login_appendix +
    scope_appendix +
    state_appendix +
    allow_signup_appendix
}

export function range(start: number = 0, end: number): number[] {
  return Array.from({length: end - start}, (_, i) => i)
}

export const cartesian =
  (...a: any[]) => a.reduce((a, b: any[]) => a.flatMap((d: any) => b.map(e => [d, e].flat())));


