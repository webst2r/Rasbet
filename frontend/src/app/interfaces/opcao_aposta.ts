export enum OutcomeType {
  HOME_TEAM = ('HOME_TEAM'),
  DRAW  = ('DRAW'),
  AWAY_TEAM  = ('AWAY_TEAM'),
}

export interface OpcaoAposta {
  id: number;
  odd: number;
  type: OutcomeType;
}
