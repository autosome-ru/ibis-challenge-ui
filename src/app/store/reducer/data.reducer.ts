import {ChallengeGeneralInfoModel, ChallengeSpecificMap,} from "../../models/data.model";
import {createReducer, on} from "@ngrx/store";
import {fromChallengeInfo} from "../action";
import {loadableData, loadingDataFailure, loadingDataLaunched, loadingDataSuccess} from "../../models/store.model";

export interface ChallengeInfoState {
  generalInfo: loadableData<ChallengeGeneralInfoModel>;

  specificMaps: loadableData<ChallengeSpecificMap[]>;
}

export const initialChallengeInfoState: ChallengeInfoState = {
  generalInfo: loadingDataFailure(),
  specificMaps: loadingDataFailure()
};

export const challengeDataReducer = createReducer(
  initialChallengeInfoState,
  on(fromChallengeInfo.LoadGeneralInfo, (state, action) => ({
    ...state,
    generalInfo: loadingDataLaunched()
  })),
  on(fromChallengeInfo.LoadGeneralInfoSuccess, (state, action) => ({
    ...state,
    generalInfo: loadingDataSuccess(action.info)
  })),
  on(fromChallengeInfo.LoadGeneralInfoFailure, (state, action) => ({
    ...state,
    generalInfo: loadingDataFailure()
  })),

  on(fromChallengeInfo.LoadSpecificMaps, (state, action) => ({
    ...state,
    specificMaps: loadingDataLaunched()
  })),
  on(fromChallengeInfo.LoadSpecificMapsSuccess, (state, action) => ({
    ...state,
    specificMaps: loadingDataSuccess(action.maps)
  })),
  on(fromChallengeInfo.LoadGeneralInfoFailure, (state, action) => ({
    ...state,
    specificMaps: loadingDataFailure()
  }))
)

