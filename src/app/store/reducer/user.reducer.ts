import {AuthModel, UserProfileModel} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";
import {fromUser} from "../action";
import {
  loadableData,
  loadingDataFailure,
  loadingDataInitial,
  loadingDataLaunched,
  loadingDataSuccess
} from "../../models/store.model";

export interface UserState {
  userProfile: loadableData<UserProfileModel>; // | null
  userAuth: loadableData<AuthModel>; // | null
}

export const initialUserState: UserState = {
  userProfile: loadingDataInitial(),
  userAuth: loadingDataInitial()
};

export const userReducer = createReducer(
  initialUserState,
  on(fromUser.ClearUser, (state, action) => ({
    ...state,
    userAuth: loadingDataInitial(),
    userProfile: loadingDataInitial()
  })),
  on(fromUser.LoadAuth, (state) => ({
    ...state,
    userAuth: loadingDataLaunched()
  })),
  on(fromUser.LoadAuthFromCookie, (state, action) => state),
  on(fromUser.LoadAuthFromGitHub, (state, action) => state),
  on(fromUser.LoadAuthFromCookieSuccess, (state, action) => ({
    ...state,
    userAuth: loadingDataSuccess(action.auth)
  })),
  on(fromUser.LoadAuthFromGitHubSuccess, (state, action) => ({
    ...state,
    userAuth: loadingDataSuccess(action.auth)
  })),
  on(fromUser.LoadAuthFailure, (state, action) => ({
    ...state,
    userAuth: loadingDataFailure()
  })),
  on(fromUser.LoadProfile, (state) => ({
    ...state,
    userProfile: loadingDataLaunched()
  })),
  on(fromUser.LoadProfileSuccess, (state, action) => ({
    ...state,
    userProfile: loadingDataSuccess(action.user)
  })),
  on(fromUser.LoadProfileFailure, (state, action) => ({
    ...state,
    userProfile: loadingDataFailure()
  }))
)

