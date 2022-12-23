import {TeamProfileModel} from "../../models/team.model";
import {createReducer, on} from "@ngrx/store";
import {fromTeam} from "../action";
import {
  loadableData,
  loadingDataFailure,
  loadingDataInitial,
  loadingDataLaunched,
  loadingDataSuccess
} from "../../models/store.model";

export interface TeamState {
  team: loadableData<TeamProfileModel>;
}

export const initialTeamState: TeamState = {
  team: loadingDataInitial()
}

export const teamReducer = createReducer(
  initialTeamState,
  on(fromTeam.ClearTeam, (state) => ({
    ...state,
    team: loadingDataInitial(),
    members: loadingDataInitial()
  })),
  on(fromTeam.LoadTeamProfile, (state) => ({
    ...state,
    team: loadingDataLaunched()
  })),
  on(fromTeam.LoadTeamProfileSuccess, (state, action) => ({
    ...state,
    team: loadingDataSuccess(action.team)
  })),
  on(fromTeam.LoadTeamProfileFailure, (state, action) => ({
    ...state,
    team: loadingDataFailure()
  }))
  // on(fromTeam.LoadTeamMembers, (state) => ({
  //   ...state,
  //   members: loadingDataLaunched()
  // })),
  // on(fromTeam.LoadTeamMembersSuccess, (state, action) => ({
  //   ...state,
  //   members: loadingDataSuccess(action.members)
  // })),
  // on(fromTeam.LoadTeamMembersFailure, (state, action) => ({
  //   ...state,
  //   members: loadingDataFailure()
  // }))
)

