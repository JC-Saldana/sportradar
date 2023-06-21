import { useState } from "react";
import { Input, Button, Grid } from "@mui/material";
import { GameInterface } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";

const initialNewGameValue = {
  id: "",
  timestamp: new Date(),
  homeTeamName: "",
  awayTeamName: "",
  scores: {
    homeScore: 0,
    awayScore: 0,
  },
};

interface Props {
  games: GameInterface[];
  setGames: (games: GameInterface[]) => void;
}

export default function GameManager({ games, setGames }: Props) {
  const [newGame, setNewgame] = useState<GameInterface>(initialNewGameValue);

  const addGame = () => {
    const isNewGameFilled = newGame.homeTeamName && newGame.awayTeamName;
    const newGameWithId: GameInterface = {
      ...newGame,
      id: uuidv4(),
      timestamp: new Date(),
    };
    if (isNewGameFilled) {
      setGames([...games, newGameWithId]);
    } else alert("Fill in the form first!");
  };

  const handleNewGameChange = (e: any) => {
    const { value, name } = e.target;
    setNewgame({ ...newGame, [name]: value });
  };

  return (
    <Grid className="game-manager-container">
      <Button onClick={addGame}>Add Game</Button>
      <Input
        className="game-manager-home-team-input"
        name="homeTeamName"
        value={newGame.homeTeamName}
        onChange={handleNewGameChange}
      />
      <Input
        name="awayTeamName"
        value={newGame.awayTeamName}
        onChange={handleNewGameChange}
      />
    </Grid>
  );
}
