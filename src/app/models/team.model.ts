export interface TeamMemberModel {
  name: string;
  affiliation: string;
  city: string;
  country: string;
  member_idx: number;
}

export interface TeamProfileModel {
  name: string;
  email: string;
  members: TeamMemberModel[];
}

export interface TeamMemberBackendModel {
  name: string;
  affiliation: string;
  city: string;
  country: string;
  member_idx: number;
}

export interface TeamProfileBackendModel {
  name: string;
  contact_email: string;
  members: TeamMemberBackendModel[];
}
