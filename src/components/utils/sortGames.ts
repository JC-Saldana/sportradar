import { GameInterface } from "../../interfaces";

export const sortGames = (games: GameInterface[]) => {
  return [...games].sort((a, b) => {
    const sumOfScoresA = Number(a.scores.homeScore) + Number(a.scores.awayScore);
    const sumOfScoresB = Number(b.scores.homeScore) + Number(b.scores.awayScore);
    if (sumOfScoresA > sumOfScoresB) return -1;
    if (sumOfScoresA < sumOfScoresB) return 1;
    if(a.timestamp > b.timestamp) return -1;
    if(a.timestamp < b.timestamp) return 1
    return 0;
  });
};
