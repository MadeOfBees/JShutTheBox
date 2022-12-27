import * as React from 'react';
import { Button } from '@mui/material';
import PlayerLineup from './PlayerLineup';
import DiceDisplay from './DiceDisplay';
import NineMonoliths from './NineMonoliths';

const DisplayBoard = ({ playerTotal }) => {
  const [currentDice, setCurrentDice] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [monoliths, setMonoliths] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleMonolithClick = (monolithNum) => {
    if (monoliths[monolithNum - 1] !== 'X') {
      const newMonoliths = monoliths.map((monolith, index) => (index + 1 === monolithNum ? 'X' : monolith));
      setMonoliths(newMonoliths);
    }
  };
  
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
    setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9])
    setPlayers(newPlayers);
  };

  const rollDice = (playerIndex) => {

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const curtis = [dice1, dice2];
    setCurrentDice(curtis);

    nextTurn(playerIndex);
    setKey(key + 1);
    const diceElements = document.querySelectorAll('.die');
    diceElements.forEach((die) => {
      die.classList.add('spin');
    });
  };
  
  return (
    <div>
      <PlayerLineup players={players} />
      {players.map((player, index) => {
        if (player.turn) {
          return (
            <div key={player.playerNum}>
              <NineMonoliths monoliths={monoliths} handleMonolithClick={handleMonolithClick} />
              <DiceDisplay currentDice={currentDice} key={key} />
              <Button variant="contained" style={{ display: 'block', margin: '0 auto' }} onClick={() => rollDice(index)}>Roll Dice</Button>
            </div>
          );
        }
        return null;
      })}
    </div>
  )
}

export default DisplayBoard;
