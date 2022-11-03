import {environment} from "../../../environments/environment";

const serverUrl = environment.serverUrl;

export const apiAuthUrl: string = `${serverUrl}/auth`;
export const apiAuthProfileUrl: string = `${serverUrl}/auth/profile`;
export const apiTeamUrl: string = `${serverUrl}/auth/team`;
