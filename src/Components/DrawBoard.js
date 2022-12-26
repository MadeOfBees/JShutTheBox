import * as React from 'react';
import { Button } from '@mui/material';
import PlayerLineup from './PlayerLineup';

const DisplayBoard = ({ playerTotal }) => {
  const [players, setPlayers] = React.useState([]);
  const setupPlayers = () => {
    const playerArray = [];
    for (let i = 0; i < playerTotal; i++) {
      playerArray.push({ playerNum: i + 1, score: 0, turn: false });
    }
    playerArray[0].turn = true;
    setPlayers(playerArray);
    startGame();
  };
  // eslint-disable-next-line
  React.useEffect(() => { setupPlayers(); }, []);
  const startGame = () => {
    if (players.length > 0) {
      const newPlayers = [...players];
      newPlayers[0].turn = true;
      setPlayers(newPlayers);
    }
  };

  const nextTurn = (playerIndex) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].turn = false;
    newPlayers[(playerIndex + 1) % playerTotal].turn = true;
    setPlayers(newPlayers);
  };

  const rollDice = (playerIndex) => {
    const newPlayers = [...players];
    const dice = Math.floor(Math.random() * 6) + 1;
    newPlayers[playerIndex].score += dice;
    setPlayers(newPlayers);
    nextTurn(playerIndex);
  };

  return (
    <div>
      <PlayerLineup players={players} />
      {players.map((player, index) => {
        if (player.turn) {
          return (
            <div key={player.playerNum}>
              <Button variant="contained" onClick={() => rollDice(index)}>Roll Dice</Button>
            </div>
          );
        }
        return null;
      })}
    </div>
  )
}

export default DisplayBoard;
