import {createAction, props} from "@ngrx/store";
import {AuthModel, UserProfileModel} from "../../models/user.model";

export namespace fromUser {
  export const ClearUser = createAction('[User] Clear User')

  export const LoadProfile = createAction('[User] Load Profile')
  export const LoadProfileSuccess = createAction('[User] Load Profile success', props<{ user: UserProfileModel }>())
  export const LoadProfileFailure = createAction('[User] Load Profile failure', props<{ error: string }>())

  export const LoadAuth = createAction('[User] Load Auth')
  export const LoadAuthSuccess = createAction('[User] Load Auth success', props<{ auth: AuthModel }>())
  export const LoadAuthFailure = createAction('[User] Load Auth failure', props<{ error: string }>())
}
