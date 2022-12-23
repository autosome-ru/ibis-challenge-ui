import {createSelector} from "@ngrx/store";
import {selectChallengeInfo} from "../reducer";
import {DisciplineMetricsInfo, LeaderboardDisciplineInfoModel, LeaderboardTFInfoModel} from "../../models/data.model";
import {ChallengeInfoState} from "../reducer/data.reducer";

export const selectAllTFInfo = createSelector(
  selectChallengeInfo, (state) => state.generalInfo.data?.tfs || []
);

export const selectAllDisciplinesInfo = createSelector(
  selectChallengeInfo, (state) => state.generalInfo.data?.disciplines || []
);

export const selectMetricsForDiscipline = createSelector(
  selectChallengeInfo, (state: ChallengeInfoState, discipline: DisciplineMetricsInfo['discipline']) =>
    state.generalInfo.data?.metrics.find(obj => obj.discipline == discipline)?.metrics || []
);


export const selectTFSubsetInfo = createSelector(
  selectChallengeInfo, (state: ChallengeInfoState, names: LeaderboardTFInfoModel['name'][]) =>
    state.generalInfo.data?.tfs.filter(({name}) => names.includes(name)) || []
);

export const selectDisciplinesSubsetInfo = createSelector(
  selectChallengeInfo, (state: ChallengeInfoState, names: LeaderboardDisciplineInfoModel['name'][]) =>
    state.generalInfo.data?.disciplines.filter(({name}) => names.includes(name)) || []
);

