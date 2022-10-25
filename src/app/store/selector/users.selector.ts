import {selectUser} from "../reducer";
import {createSelector} from "@ngrx/store";

//export const selectUser = (state: AppState) => state.user;
export const isLoadingUserSelector = createSelector(
  selectUser, (state) => state.isLoading
);
export const isLoadedUserSelector = createSelector(
  selectUser, (state) => state.isLoaded
);
export const userProfileSelector = createSelector(
  selectUser, (state) => state.userProfile
);
export const userAuthSelector = createSelector(
  selectUser, (state) => state.userAuth
);
export const userErrorSelector = createSelector(
  selectUser, (state) => state.error
);

