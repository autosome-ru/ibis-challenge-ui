import {userReducer, UserState} from "./user.reducer";
import {teamReducer, TeamState} from "./team.reducer";

export interface AppState {
  user: UserState;
  team: TeamState;
}

export const selectUser = (state: AppState) => state.user;
export const selectTeam = (state: AppState) => state.team;

export const appReducers: object = {
  user: userReducer,
  team: teamReducer
};


