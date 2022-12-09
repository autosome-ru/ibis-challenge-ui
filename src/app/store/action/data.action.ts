import {createAction, props} from "@ngrx/store";
import {ChallengeGeneralInfoModel, ChallengeSpecificMap} from "../../models/challenge.model";

export namespace fromChallengeInfo {

  export const LoadGeneralInfo = createAction('[Challenge] Load General Info')
  export const LoadGeneralInfoSuccess = createAction('[Challenge] Load General Info success', props<{ info: ChallengeGeneralInfoModel }>())
  export const LoadGeneralInfoFailure = createAction('[Challenge] Load General Info failure')
  export const LoadSpecificMaps = createAction('[Challenge] Load Specific TF-discipline maps')
  export const LoadSpecificMapsSuccess = createAction('[Challenge] Load Specific TF-discipline maps success', props<{ maps: ChallengeSpecificMap[] }>())
  export const LoadSpecificMapsFailure = createAction('[Challenge] Load Specific TF-discipline maps failure')
}
