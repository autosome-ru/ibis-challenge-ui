import {createAction, props} from "@ngrx/store";
import {TeamMemberModel, TeamProfileModel} from "../../models/team.model";

export namespace fromTeam {
  export const ClearTeam = createAction('[Team] Clear Team')

  export const LoadTeamProfile = createAction('[Team] Load Profile')
  export const LoadTeamProfileSuccess = createAction('[Team] Load Profile success', props<{ team: TeamProfileModel }>())
  export const LoadTeamProfileFailure = createAction('[Team] Load Profile failure', props<{ error: string }>())

  export const LoadTeamMembers = createAction('[Team] Load Members')
  export const LoadTeamMembersSuccess = createAction('[Team] Load Members success', props<{ members: TeamMemberModel[] }>())
  export const LoadTeamMembersFailure = createAction('[Team] Load Members failure', props<{ error: string }>())
}
