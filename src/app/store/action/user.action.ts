import {createAction, props} from "@ngrx/store";
import {AuthModel, UserProfileModel} from "../../models/user.model";

export namespace fromUser {
  export const ClearUser = createAction('[User] Clear user')

  export const LoadProfile = createAction('[User] Load profile')
  export const LoadProfileSuccess = createAction('[User] Load profile success', props<{ user: UserProfileModel }>())
  export const LoadProfileFailure = createAction('[User] Load profile failure')


  export const LoadAuth = createAction('[User] Load authentication')
  export const LoadAuthFromCookie = createAction('[User] Load authentication from cookie')
  export const LoadAuthFromGitHub = createAction('[User] Load authentication from GitHub server')
  export const LoadAuthFromCookieSuccess = createAction('[User] Load authentication from cookie success', props<{ auth: AuthModel }>())
  export const LoadAuthFromGitHubSuccess = createAction('[User] Load authentication from GitHub server success', props<{ auth: AuthModel }>())
  export const LoadAuthFailure = createAction('[User] Load authentication failure')
  export const LoadAuthSuccess = createAction('[User] Load authentication success signal')
}
