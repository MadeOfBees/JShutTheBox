import * as React from 'react';
import { Box, Button, Grid, Modal, Stack } from '@mui/material';
import PlayerLineup from './PlayerLineup';

const DisplayBoard = ({ playerTotal }) => {
  const [players, setPlayers] = React.useState([]);

  const setupPlayers = () => {
    const playerArray = [];
    for (let i = 0; i < playerTotal; i++) {
      playerArray.push({ playerNum: i + 1, score: 0, turn: false});
    }
    playerArray[0].turn = true;
    setPlayers(playerArray);
    startGame();
  };

  React.useEffect(() => {
    setupPlayers();
  }, []);

  const startGame = () => {
    if (players.length > 0) {
      const newPlayers = [...players];
      newPlayers[0].turn = true;
      setPlayers(newPlayers);
    }
  };

  const handleRaiseScore = (playerIndex) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].score += 1;
    setPlayers(newPlayers);
  };

  const handlePassTurn = (playerIndex) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].turn = false;
    newPlayers[(playerIndex + 1) % playerTotal].turn = true;
    setPlayers(newPlayers);
  };

  return (
    <div>
      <PlayerLineup players={players} />

      {players.map((player, index) => {
        if (player.turn) {
          return (
            <div key={player.playerNum}>
              <Button variant="contained" onClick={() => handleRaiseScore(index)}>Raise Player {player.playerNum}'s Score</Button>
              <Button variant="contained" onClick={() => handlePassTurn(index)}>Pass Turn</Button>
            </div>
          );
        }
        return null;
      })}
    </div>
  )
}

export default DisplayBoard;
