export interface Scores {
  homeScore: number;
  awayScore: number;
}

export interface GameInterface {
  id: string;
  timestamp: Date;
  homeTeamName: string;
  awayTeamName: string;
  scores: Scores;
}
