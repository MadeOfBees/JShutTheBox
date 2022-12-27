import * as React from 'react';
import PlayerLineup from './PlayerLineup';
import DiceDisplay from './DiceDisplay';
import NineMonoliths from './NineMonoliths';
import { Grid, Box, Modal, Button, Stack, Input } from '@mui/material';

const DisplayBoard = ({ playerTotal }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const handleOpenErrorModal = () => setErrorModal(true);
  const handleCloseErrorModal = () => setErrorModal(false);
  const [errorModalContent, setErrorModalContent] = React.useState("");
  const [queryPlayersModal, setQueryPlayersModal] = React.useState(false);
  const handleOpenQueryPlayersModal = () => setQueryPlayersModal(true);
  const handleCloseQueryPlayersModal = () => setQueryPlayersModal(false);
  const [currentDice, setCurrentDice] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [monoliths, setMonoliths] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
  const [userInput, setUserInput] = React.useState(0);
  const [refreshNum, setRefreshNum] = React.useState(0);
  
  const takeUserInput = () => {
    if (isNaN(userInput)) {
        drySecondModal("You need to enter a number!");
    } else if (userInput > 12) {
        drySecondModal("You can't have more than 12 players!");
    } else if (userInput < 1) {
        drySecondModal("You need at least 1 player to play this game!");
    } else {
        startNewGame(userInput);
        handleCloseQueryPlayersModal();
    }
};

const drySecondModal = (type) => {
    setErrorModalContent(type);
    handleCloseQueryPlayersModal();
    handleOpenErrorModal(true);
};

  const handleMonolithClick = (monolithNum) => {
    if (monoliths[monolithNum - 1] !== 'X') {
      const newMonoliths = monoliths.map((monolith, index) => (index + 1 === monolithNum ? '⠀' : monolith));
      setMonoliths(newMonoliths);
    }
  };

  const setupPlayers = (newPlayers) => {
    if (!newPlayers) {
    const playerArray = [];
    for (let i = 0; i < playerTotal; i++) {
      playerArray.push({ playerNum: i + 1, score: 0, turn: false });
    }
    playerArray[0].turn = true;
    setPlayers(playerArray);
    startGame(playerArray);
    } else {
        const playerArray = [];
        for (let i = 0; i < newPlayers; i++) {
            playerArray.push({ playerNum: i + 1, score: 0, turn: false });
        }
        playerArray[0].turn = true;
        setPlayers(playerArray);
        startGame(playerArray);
    }
  };
  
  // eslint-disable-next-line
  React.useEffect(() => { setupPlayers(); }, []);
  
  const startGame = (playerArray) => {
    if (playerArray.length > 0) {
      const newPlayers = [...playerArray];
      newPlayers[0].turn = true;
      setPlayers(newPlayers);
      handleCloseQueryPlayersModal();
      handleClose();
    }
  };

  const rollDice = (playerIndex) => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const curtis = [dice1, dice2];
    setCurrentDice(curtis);
    setKey(key + 1);
    const diceElements = document.querySelectorAll('.die');
    diceElements.forEach((die) => {
      die.classList.add('roll');
    });
    turnLoop(playerIndex);
  };

  const startNewGame = (newPlayerTotal) => {
    setupPlayers(newPlayerTotal);
    setRefreshNum(refreshNum + 1);
  };

  const nextTurn = (playerIndex) => {
    endTurn();
    const newPlayers = [...players];
    newPlayers[playerIndex].turn = false;
    newPlayers[(playerIndex + 1) % playerTotal].turn = true;
    setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9])
    setPlayers(newPlayers);
    rollDice((playerIndex + 1) % playerTotal);
  };

  const endTurn = () => {
    const newPlayers = [...players];
    const monolithsLeft = monoliths.filter((monolith) => monolith !== '⠀');
    const monolithsLeftSum = monolithsLeft.reduce((a, b) => a + b, 0);
    newPlayers.forEach((player) => {
      if (player.turn) {
        player.score += monolithsLeftSum;
      }
    }
    );
    setPlayers(newPlayers);
    checkScore();
  };
  
  const turnLoop = (playerIndex) => {
    // TODO: durring the players turn they first play the dice they rolled or roll a set of dice, the player clicks moniliths to remove them, if the total number of monoliths removed is equal to the sum of the dice they rolled, they get to roll again otherwise return to the next players turn
    // first wait for them to click a monolith, then check if the sum of the dice is equal to the total value of the monoliths removed with our checkMonoliths function, if it is, they get to roll again, if not, return to the next players turn
  };

  const endGame = () => {
    // TODO: end game when all players have played once and the player with the highest score wins
  };

  const checkMonoliths = () => {
    // TODO: check if the sum of the dice is equal to the total value of the monoliths removed

  };

  const checkScore = () => {
    // TODO: check the score of all the players and sees who has the highest score
  };

  const restart = () => {
    const newPlayers = [...players];
    newPlayers.forEach((player) => {
      player.score = 0;
      player.turn = false;
    });
    newPlayers[0].turn = true;
    setPlayers(newPlayers);
    setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    rollDice(0);
    handleClose();
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
              {currentDice.length === 0 ? (
                <Button variant="contained" style={{ display: 'block', margin: '4% auto',  width: '150px', height:"75px", fontSize:"17px"}} onClick={() => rollDice(index)}>Roll Dice</Button>
              ) : (
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button style={{ display: 'block', width: '150px', height:"75px", fontSize:"17px"}} variant="contained" onClick={() => rollDice(index)}>Roll Dice</Button>
                  </Grid>
                  <Grid item>
                    <Button style={{ display: 'block', width: '150px', height:"75px", fontSize:"17px"}} variant="contained" onClick={() => nextTurn(index)}>End Turn</Button>
                  </Grid>
                  <Grid item>
                  <Button style={{ display: 'block', width: '150px', height:"75px", fontSize:"17px"}} variant="contained" onClick={() => handleOpen()}>Restart</Button>
                  </Grid>
                </Grid>
              )}
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                      <Button style={{ display: 'block', width: '150px', height:"75px", fontSize:"17px"}} variant="contained" onClick={() => restart()}>Reset my Game</Button>
                    </Grid>
                    <Grid item>
                      <Button style={{ display: 'block', width: '150px', height:"75px", fontSize:"17px"}} variant="contained" onClick={() => handleOpenQueryPlayersModal()}>Restart Completely</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
              <Modal open={errorModal} onClose={handleCloseErrorModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>{errorModalContent}</Box>
            </Modal>
              <Modal open={queryPlayersModal} onClose={handleCloseQueryPlayersModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                    <Stack>
                        <h1>How many players?</h1>
                        <Input placeholder="1 is the minimum" onChange={(e) => setUserInput(e.target.value)} />
                        <Button variant="contained" onClick={takeUserInput} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>Submit</Button>
                    </Stack>
                </Box>
            </Modal>
            </div>
          );
        }
        return null;
      })}
    </div>
  )
}

export default DisplayBoard;
