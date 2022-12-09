export const challengeStages = ['leaderboard', 'final'] as const;
export type challengeStage = typeof challengeStages[number];
export const challengeMethods = ['AAA', 'PWM'] as const;
export type challengeMethod = typeof challengeMethods[number];

export interface LeaderboardTFInfoModel {
  name: string,
  view: string,
  comment: string
}

export interface LeaderboardDisciplineInfoModel {
  name: string,
  view: string,
  comment: string
}

// export interface LeaderboardMethodInfoModel {
//   name: string,
//   view: string,
//   comment: string
// }

export interface ChallengeGeneralInfoModel {
  //methods: LeaderboardMethodInfoModel[],
  disciplines: LeaderboardDisciplineInfoModel[],
  tfs: LeaderboardTFInfoModel[]
}

export interface ChallengeSpecificMap {
  stage: challengeStage;
  method: challengeMethod;
  discipline: LeaderboardDisciplineInfoModel['name'];
  tfs: LeaderboardTFInfoModel['name'][]
}

