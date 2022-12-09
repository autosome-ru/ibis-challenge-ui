import {selectUser} from "../reducer";
import {createSelector} from "@ngrx/store";

export const userProfileSelector = createSelector(
  selectUser, (state) => state.userProfile
);
export const userAuthSelector = createSelector(
  selectUser, (state) => state.userAuth
);

