import {environment} from "../../../environments/environment";

const serverUrl = environment.serverUrl;

export const apiAuthUrl: string = `${serverUrl}/auth`;
export const apiAuthProfileUrl: string = `${serverUrl}/auth/profile`;
export const apiTeamUrl: string = `${serverUrl}/auth/team`;

export const apiChallengeGeneralInfo: string = `${serverUrl}/challenge/info/general`;

export const apiChallengeSpecificInfo: string = `${serverUrl}/challenge/info/specific`;
export const apiTeamCommits: string = `${serverUrl}/team-commits`;

export const apiChallengeSubmits: string = `${serverUrl}/challenge/submits`;

