import {AuthModel, UserProfileModel} from "../../models/user.model";

export function convertUserProfileBackendToUserProfileModel(model: UserProfileModel): UserProfileModel {
  return {
    ...model
  };
}

export function convertUserProfileToUserProfileBackendModel(model: UserProfileModel): UserProfileModel {
  return {
    ...model
  };
}

export function convertAuthBackendToAuthModel(model: AuthModel): AuthModel {
  return {
    ...model
  };
}

export function convertAuthToAuthBackendModel(model: AuthModel): AuthModel {
  return {
    ...model
  };
}
