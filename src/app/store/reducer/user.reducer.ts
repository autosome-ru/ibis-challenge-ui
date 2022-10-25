import {AuthModel, UserProfileModel} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";
import {fromUsers} from "../action";

export interface UsersState {
  isLoading: boolean;
  isLoaded: boolean;
  userProfile: UserProfileModel | null;
  userAuth: AuthModel | null;
  error: string | null;
}

export const initialState: UsersState = {
  isLoading: false,
  isLoaded: false,
  userProfile: null,
  userAuth: null,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(fromUsers.ClearUser, (state, action) => ({
    ...state,
    userAuth: null,
    userProfile: null,
    isLoaded: false,
    isLoading: false,
  })),
  on(fromUsers.LoadAuth, (state) => ({...state, isLoading: true})),
  on(fromUsers.LoadAuthSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userAuth: action.auth
  })),
  on(fromUsers.LoadAuthFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  })),
  on(fromUsers.LoadProfile, (state) => ({...state, isLoading: true})),
  on(fromUsers.LoadProfileSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    userProfile: action.user
  })),
  on(fromUsers.LoadProfileFailure, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: action.error
  }))
)

