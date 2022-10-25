import {TeamMemberModel, TeamProfileModel} from "../../models/team.model";
import {createReducer, on} from "@ngrx/store";
import {fromTeam} from "../action";

export interface TeamState {
  isLoading: boolean;
  isLoaded: boolean;
  team: TeamProfileModel | null;
  members: TeamMemberModel[] | null;
  error: string | null;
}

export const initialTeamState: TeamState = {
  isLoading: false,
  isLoaded: false,
  team: null,
  members: null,
  error: null
}

export const teamReducer = createReducer(
  initialTeamState,
  on(fromTeam.ClearTeam, (state) => ({
    ...state,
    team: null,
    members: null,
    isLoaded: false,
    isLoading: false,
  })),
  on(fromTeam.LoadTeamProfile, (state) => ({...state, isLoading: true})),
  on(fromTeam.LoadTeamProfileSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    team: action.team
  })),
  on(fromTeam.LoadTeamProfileFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  })),
  on(fromTeam.LoadTeamMembers, (state) => ({...state, isLoading: true})),
  on(fromTeam.LoadTeamMembersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    members: action.members
  })),
  on(fromTeam.LoadTeamMembersFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  }))
)

