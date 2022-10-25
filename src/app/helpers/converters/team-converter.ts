import {
  TeamMemberBackendModel,
  TeamMemberModel,
  TeamProfileBackendModel,
  TeamProfileModel
} from "../../models/team.model";

export function convertTeamMemberBackendToTeamMemberModel(model: TeamMemberBackendModel): TeamMemberModel {
  return {
    ...model
  };
}

export function convertTeamMemberToTeamMemberBackendModel(model: TeamMemberBackendModel): TeamMemberModel {
  return {
    ...model
  };
}

export function convertTeamProfileBackendToTeamProfileModel(model: TeamProfileBackendModel): TeamProfileModel {
  return {
    ...model,
    email: model.contact_email,
    members: model.members ? Array.from(model.members, x => convertTeamMemberBackendToTeamMemberModel(x)) : []
  };
}

export function convertTeamProfileToTeamProfileBackendModel(model: TeamProfileModel): TeamProfileBackendModel {
  return {
    ...model,
    contact_email: model.email,
    members: model.members ? Array.from(model.members, x => convertTeamMemberToTeamMemberBackendModel(x)) : []
  };
}
