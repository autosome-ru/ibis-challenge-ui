import {selectTeam} from "../reducer";
import {createSelector} from "@ngrx/store";

//export const selectTeam = (state: AppState) => state.team;

export const teamProfileSelector = createSelector(
  selectTeam, (state) => state.team
);
export const teamMembersSelector = createSelector(
  selectTeam, (state) => state.members
);
