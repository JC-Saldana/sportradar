import { useState } from "react";
import { GameInterface, Scores } from "../../interfaces";
import { Card, Button, Input } from "@mui/material";
import "./styles.scss";

interface Props {
  game: GameInterface;
  deleteGame: (id: string) => void;
  editScores: (gameId: string, scores: Scores) => void;
}

export default function Game({ game, deleteGame, editScores }: Props) {
  const [temporalScores, setTemporalScores] = useState<Scores>(game.scores);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteGameClick = () => {
    deleteGame(game.id);
  };
  const handleIsEditing = () => setIsEditing((prevEditing) => !prevEditing);
  const handleEditScoreClick = () => editScores(game.id, temporalScores);

  const handleEditScores = (e: any) => {
    const { value, name } = e.target;
    setTemporalScores({ ...temporalScores, [name]: value });
  };

  const editDialog = (
    <>
      {isEditing && (
        <Card className="game-card-editing">
          <Input
            className="game-card-editing-input"
            name="homeScore"
            value={temporalScores.homeScore}
            onChange={handleEditScores}
          />
          <Input
            className="game-card-editing-input"
            name="awayScore"
            value={temporalScores.awayScore}
            onChange={handleEditScores}
          />
          <Button onClick={handleEditScoreClick}>Update</Button>
        </Card>
      )}
    </>
  );

  return (
    <div className="game-card-container">
      <Card className="game-card">
        <li>
          <strong> {game.homeTeamName}</strong>-
          <strong> {game.awayTeamName}</strong>
        </li>
        <div className="score-board">
          {game.scores.homeScore} - {game.scores.awayScore}
        </div>
        <Button onClick={handleIsEditing}>Edit</Button>
        <Button onClick={handleDeleteGameClick}>Delete</Button>
        <hr />
        Creation date: {game.timestamp.toUTCString()}
      </Card>
      {editDialog}
    </div>
  );
}
