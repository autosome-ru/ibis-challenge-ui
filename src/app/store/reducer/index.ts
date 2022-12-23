import {userReducer, UserState} from "./user.reducer";
import {teamReducer, TeamState} from "./team.reducer";
import {challengeDataReducer, ChallengeInfoState} from "./data.reducer";

export interface AppState {
  user: UserState;
  team: TeamState;
  challengeInfo: ChallengeInfoState;
}

export const selectUser = (state: AppState) => state.user;
export const selectTeam = (state: AppState) => state.team;
export const selectChallengeInfo = (state: AppState) => state.challengeInfo;

export const appReducers: object = {
  user: userReducer,
  team: teamReducer,
  challengeInfo: challengeDataReducer
};


