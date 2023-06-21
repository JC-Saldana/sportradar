import { useState } from "react";
import Game from "./components/Game";
import GameManager from "./components/GameManager";
import { GameInterface, Scores } from "./interfaces";
import "./App.scss";
import { sortGames } from "./components/utils/sortGames";

function App() {
  const [games, setGames] = useState<GameInterface[]>([]);

  const deleteGame = (id: string) => {
    setGames((prevGames: GameInterface[]) => {
      return prevGames.filter((game) => game.id !== id);
    });
  };
  const editScores = (gameId: string, scores: Scores) => {
    setGames((prevGames: GameInterface[]) => {
      return prevGames.map((game) => {
        if (game.id === gameId) {
          return { ...game, ...{ scores } };
        } else return game;
      });
    });
  };
  return (
    <div>
      <GameManager games={games} setGames={setGames} />
      <h3>Scoreboard:</h3>
      <ul>
        {games.map((game: GameInterface) => (
          <Game
            key={game.id}
            game={game}
            deleteGame={deleteGame}
            editScores={editScores}
          />
        ))}
      </ul>
      <h3>Summary:</h3>
      <ul>
        {sortGames(games).map((game: GameInterface) => (
          <Game
            key={game.id}
            game={game}
            deleteGame={deleteGame}
            editScores={editScores}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
