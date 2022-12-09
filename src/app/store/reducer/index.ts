import {userReducer, UserState} from "./user.reducer";
import {teamReducer, TeamState} from "./team.reducer";
import {challengeDataReducer, ChallengeInfoState} from "./data.reducer";
import {LeaderboardDisciplineInfoModel, LeaderboardTFInfoModel} from "../../models/challenge.model";

export interface AppState {
  user: UserState;
  team: TeamState;
  challengeInfo: ChallengeInfoState;
}

export const selectUser = (state: AppState) => state.user;
export const selectTeam = (state: AppState) => state.team;
export const selectChallengeGeneralInfo = (state: AppState) => state.challengeInfo;

export function selectAllTFInfo(state: AppState) {
  if (state.challengeInfo.generalInfo.data == null)
    return null
  return state.challengeInfo.generalInfo.data.tfs;
}

//export const selectAllMethodsInfo = (state: AppState) => state.challengeInfo.generalInfo.methods;
export function selectAllDisciplinesInfo(state: AppState) {
  if (state.challengeInfo.generalInfo.data == null)
    return []
  return state.challengeInfo.generalInfo.data.disciplines;
}

export function selectTFSubsetInfo(state: AppState, names: LeaderboardTFInfoModel['name'][]) {
  if (state.challengeInfo.generalInfo.data == null)
    return []
  return state.challengeInfo.generalInfo.data.tfs.filter(({name}) => names.includes(name));
}

export function selectDisciplinesSubsetInfo(state: AppState, names: LeaderboardDisciplineInfoModel['name'][]) {
  if (state.challengeInfo.generalInfo.data == null)
    return []
  return state.challengeInfo.generalInfo.data.disciplines.filter(({name}) => names.includes(name));
}

export const appReducers: object = {
  user: userReducer,
  team: teamReducer,
  challengeInfo: challengeDataReducer
};


