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

export interface DisciplineMetricsInfo {
  discipline: string,
  metrics: string[]
}

export interface ChallengeGeneralInfoModel {
  //methods: LeaderboardMethodInfoModel[],
  disciplines: LeaderboardDisciplineInfoModel[],
  tfs: LeaderboardTFInfoModel[],
  metrics: DisciplineMetricsInfo[]
}

export interface ChallengeSpecificMap {
  stage: challengeStage;
  method: challengeMethod;
  discipline: LeaderboardDisciplineInfoModel['name'];
  tfs: LeaderboardTFInfoModel['name'][]
}

export type SubmitModel = {
  [additional: string]: number;
} & {
  id: number;
  name: string;
  info: string;
  combinedRank: number;
  team: string;
}

export const metric_prefix = 'm@';
export const rank_prefix = 'r@';

export interface SubmitBackendModel {
  id: number,
  name: string,
  info: string,
  aggregated_rank: number,
  metrics: number[],
  ranks: number[],
  team: string;
}

