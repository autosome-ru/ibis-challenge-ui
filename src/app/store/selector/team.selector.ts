import {selectTeam} from "../reducer";
import {createSelector} from "@ngrx/store";

//export const selectTeam = (state: AppState) => state.team;
export const isLoadingTeamSelector = createSelector(
  selectTeam, (state) => state.isLoading
);
export const isLoadedTeamSelector = createSelector(
  selectTeam, (state) => state.isLoaded
);
export const teamProfileSelector = createSelector(
  selectTeam, (state) => state.team
);
export const teamMembersSelector = createSelector(
  selectTeam, (state) => state.members
);
export const teamErrorSelector = createSelector(
  selectTeam, (state) => state.error
);
