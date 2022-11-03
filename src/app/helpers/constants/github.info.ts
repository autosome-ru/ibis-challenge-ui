import {environment} from "../../../environments/environment";

const clientUrl = environment.clientUrl;

export const githubAuthorizeUrl: string = 'https://github.com/login/oauth/authorize';
export const githubRedirectUrl: string = `${clientUrl}/callback`;
export const githubClientId: string = environment.githubClientId;
