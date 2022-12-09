// convert csv to json: https://csvjson.com/csv2json, then ctrl+R "TRUE" -> true, "FALSE" -> false

type permittedTfDisciplineMatrixType = { [discipline: string]: { [tf: string]: boolean }; };
const disciplineSep = '_'
export const subDisciplines = ["AAA", "PWM"] as const
export const leaderboardTFsPerDiscipline = new Map([['A2G', ['NACC2', 'TIGD3', 'RORB', 'LEF1', 'NFKB1']], ['G2A', ['PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'GABPA']], ['AFS', ['NACC2', 'TIGD3', 'RORB', 'PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'LEF1', 'NFKB1', 'GABPA']], ['CHS', ['NACC2', 'TIGD3', 'RORB', 'PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'LEF1', 'NFKB1', 'GABPA']], ['HTS', ['NACC2', 'TIGD3', 'RORB', 'PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'LEF1', 'NFKB1', 'GABPA']], ['PBM', ['NACC2', 'TIGD3', 'RORB', 'PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'LEF1', 'NFKB1', 'GABPA']], ['SMS', ['NACC2', 'TIGD3', 'RORB', 'PRDM5', 'SP140', 'ZNF362', 'ZNF407', 'LEF1', 'NFKB1', 'GABPA']]]);

export const leaderboardSuperDisciplinesAndTFs: permittedTfDisciplineMatrixType = {
  "A2G": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": false,
    "SP140": false,
    "ZNF362": false,
    "ZNF407": false,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": false
  },
  "G2A": {
    "NACC2": false,
    "TIGD3": false,
    "RORB": false,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": false,
    "NFKB1": false,
    "GABPA": true
  },
  "AFS": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": true
  },
  "CHS": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": true
  },
  "HTS": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": true
  },
  "PBM": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": true
  },
  "SMS": {
    "NACC2": true,
    "TIGD3": true,
    "RORB": true,
    "PRDM5": true,
    "SP140": true,
    "ZNF362": true,
    "ZNF407": true,
    "LEF1": true,
    "NFKB1": true,
    "GABPA": true
  }
}

export const leaderboardDisciplinesAndTFs: permittedTfDisciplineMatrixType = {}
for (let mainKey in leaderboardSuperDisciplinesAndTFs) {
  for (let subKey in subDisciplines) {
    let newKey = mainKey + disciplineSep + subDisciplines[subKey];
    leaderboardDisciplinesAndTFs[newKey] = leaderboardSuperDisciplinesAndTFs[mainKey];
  }
}

//export const leaderboardDisciplinesAndTFs: permittedTfDisciplineMatrixType = preLeaderboardDisciplinesAndTFs;

//export const leaderboardSuperDisciplines = Object.keys(leaderboardSuperDisciplinesAndTFs)
export const leaderboardDisciplines = Object.keys(leaderboardDisciplinesAndTFs)

export const superDisciplines = [
  "A2G", "G2A", "AFS", "HTS", "SMS", "PBM", "CHS"
] as const;

export const leaderboardTFs = [
  "NACC2",
  "TIGD3",
  "RORB",
  "PRDM5",
  "SP140",
  "ZNF362",
  "ZNF407",
  "LEF1",
  "NFKB1",
  "GABPA"] as const;

export const finalTFs = [] as const;
export const allTFs = [...leaderboardTFs, ...finalTFs] as const;

export function getFullNameOfSuperDiscipline(superDisciplineKey: typeof superDisciplines[number]): string {
  switch (superDisciplineKey) {
    case "A2G":
      return "Predicting genomic sequences from artificial ones";
    case "G2A":
      return "Predicting artificial sequences from genomic ones";
    case "AFS":
      return "Predicting HT-SELEX with genomic DNA";
    case "HTS":
      return "Predicting HT-SELEX";
    case "SMS":
      return "Predicting SMiLE-Seq";
    case "PBM":
      return "Predicting protein-binding microarrays";
    case "CHS":
      return "Predicting ChIP-Seq";
    default:
      return ''
  }
}

export function getFullNameOfSubDiscipline(subDisciplineKey: typeof subDisciplines[number]): string {
  switch (subDisciplineKey) {
    case "AAA":
      return "Arbitrary advanced approaches";
    case "PWM":
      return "Position weight matrices";
    default:
      return '';
  }
}

export function getFullNameOfTF(tfKey: typeof allTFs[number]): string {
  switch (tfKey) {
    case "NACC2":
      return "NACC2 long name";
    case "TIGD3":
      return "TIGD3 long name";
    case "RORB":
      return "RORB long name";
    case "PRDM5":
      return "PRDM5 long name";
    case "SP140":
      return "SP140 long name";
    case "ZNF362":
      return "ZNF362 long name";
    case "ZNF407":
      return "ZNF407 long name";
    case "LEF1":
      return "LEF1 long name";
    case "NFKB1":
      return "NFKB1 long name";
    case "GABPA":
      return "GABPA long name";
    default:
      return '';
  }
}

