import {AuthModel, UserProfileModel} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";
import {fromUser} from "../action";

export interface UserState {
  isLoading: boolean;
  isLoaded: boolean;
  userProfile: UserProfileModel | null;
  userAuth: AuthModel | null;
  error: string | null;
}

export const initialUserState: UserState = {
  isLoading: false,
  isLoaded: false,
  userProfile: null,
  userAuth: null,
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  on(fromUser.ClearUser, (state, action) => ({
    ...state,
    userAuth: null,
    userProfile: null,
    isLoaded: false,
    isLoading: false,
  })),
  on(fromUser.LoadAuth, (state) => ({...state, isLoading: true})),
  on(fromUser.LoadAuthSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userAuth: action.auth
  })),
  on(fromUser.LoadAuthFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  })),
  on(fromUser.LoadProfile, (state) => ({...state, isLoading: true})),
  on(fromUser.LoadProfileSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    userProfile: action.user
  })),
  on(fromUser.LoadProfileFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  }))
)

