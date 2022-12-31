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
  const [winnerModal, setWinnerModal] = React.useState(false);
  const handleOpenWinnerModal = () => setWinnerModal(true);
  const [winnerModalContent, setWinnerModalContent] = React.useState("");
  const [currentDice, setCurrentDice] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [monoliths, setMonoliths] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
  const [userInput, setUserInput] = React.useState(0);
  const [refreshNum, setRefreshNum] = React.useState(0);
  const handleCloseWinnerModal = () => { setWinnerModal(false); restart(); }
  const [rolledThisTurn, setRolledThisTurn] = React.useState(false);
  const [OGDice, setOGDice] = React.useState([]);
  const [askReset, setAskReset] = React.useState(false);
  const handleCloseAskReset = () => setAskReset(false);
  const handleOpenAskReset = () => setAskReset(true);

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

  const setupPlayers = (newPlayers) => {
    if (!newPlayers) {
      const playerArray = [];
      for (let i = 0; i < playerTotal; i++) {
        playerArray.push({ playerNum: i + 1, score: 0, turn: false, played: false });
      }
      playerArray[0].turn = true;
      setPlayers(playerArray);
      startGame(playerArray);
    } else {
      const playerArray = [];
      for (let i = 0; i < newPlayers; i++) {
        playerArray.push({ playerNum: i + 1, score: 0, turn: false, played: false });
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

  const rollDice = (playerIndex, canRoll) => {
    if (!rolledThisTurn || canRoll) {
      if (nextStep(playerIndex)) {
        setRolledThisTurn(true)
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const curtis = [dice1, dice2];
        setCurrentDice(curtis);
        setOGDice(curtis);
        setKey(key + 1);
        const diceElements = document.querySelectorAll('.die');
        diceElements.forEach((die) => {
          die.classList.add('roll');
        });
        const newMonoliths = [...monoliths];
        newMonoliths.forEach((monolith, index) => {
          if (monolith === '✓') {
            newMonoliths[index] = '⠀';
          }
        });
        setMonoliths(newMonoliths);
      }
    } else {
      setErrorModalContent("You've already rolled this turn");
      handleOpenErrorModal();
    }
  };

  const startNewGame = (newPlayerTotal) => {
    setupPlayers(newPlayerTotal);
    setRefreshNum(refreshNum + 1);
  };

  const nextStep = (playerIndex) => {
    if (currentDice.reduce((acc, cur) => acc + cur, 0) === 0) {
      return true;
    }
    if (monoliths.includes('✓')) {
      setErrorModalContent("You can't leave ✓s on the board!");
      handleOpenErrorModal();
      const fixedMonoliths = [...monoliths];
      fixedMonoliths.forEach((monolith, index) => {
        if (monolith === '✓') {
          fixedMonoliths[index] = index + 1;
        }
      });
      setMonoliths(fixedMonoliths);
      setCurrentDice(OGDice);
      return false;
    } else {
      return true;
    }
  };

  const nextTurn = (playerIndex) => {
    const totalPlayers = players.length;
    if (nextStep(playerIndex)) {
      const newPlayers = [...players];
      newPlayers.forEach((player) => {
        if (player.turn) {
          player.score += monoliths.filter((monolith) => monolith !== "✓" && monolith !== "⠀").reduce((acc, cur) => acc + cur, 0);
          player.played = true;
        }
      });
      newPlayers[playerIndex].turn = false;
      newPlayers[(playerIndex + 1) % totalPlayers].turn = true;
      setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      setPlayers(newPlayers);
      setRolledThisTurn(false);
      if (newPlayers.every((player) => player.played)) {
        endGame();
      } else {
        rollDice(((playerIndex + 1) % totalPlayers), true);
        setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
  };

  const clearChecks = () => {
    const newMonoliths = [...monoliths];
    newMonoliths.forEach((monolith, index) => {
      if (monolith === '✓') {
        newMonoliths[index] = index + 1;
      }
    });
    setMonoliths(newMonoliths);
    setCurrentDice(OGDice);
    handleCloseAskReset();
  };

  const checkMonoliths = (dice, monolith) => {
    const diceSum = dice.reduce((acc, cur) => acc + cur, 0);
    if (diceSum >= monolith) {
      const diceSumArray = [diceSum - monolith, 0];
      setCurrentDice(diceSumArray);
      return true;
    }
    return false;
  };

  const handleMonolithClick = (monolith) => {
    if (monolith === '✓') {
      handleOpenAskReset();
    }
    else {
      if (currentDice.length === 0) {
        setErrorModalContent("You must roll the dice before flipping a monolith!");
        handleOpenErrorModal();
      } else {
        if (!monoliths.includes(monolith)) {
          setErrorModalContent(`Monolith ${monolith} has already been flipped!`);
          handleOpenErrorModal();
        } else {
          const canCoverMonolith = checkMonoliths(currentDice, monolith);
          if (!canCoverMonolith) {
            setErrorModalContent(`Cannot flip monolith ${monolith} with current dice!`);
            handleOpenErrorModal();
          } else {
            const updatedMonoliths = monoliths.map((m) => {
              setRolledThisTurn(false);
              if (m === monolith) {
                return '✓';
              }
              return m;
            });
            setMonoliths(updatedMonoliths);
          }
        }
      }
    }
  };

  const checkScore = () => {
    const newPlayers = [...players];
    const lowestScore = Math.min(...newPlayers.map((player) => player.score));
    const lowestScorers = newPlayers.filter((player) => player.score === lowestScore);
    if (lowestScorers.length === 1) {
      setWinnerModalContent(`Player ${lowestScorers[0].playerNum} wins!`);
    }
    if (lowestScorers.length > 1) {
      const listPlayersWithoutAnd = lowestScorers.map((player) => player.playerNum).join(', ');
      const listWinnerPlayers = listPlayersWithoutAnd.replace(/,(?!.*,)/gmi, ' and');
      setWinnerModalContent(`It's a tie! Players ${listWinnerPlayers} win!`);
    }
  }

  const endGame = () => {
    checkScore();
    handleOpenWinnerModal();
  };

  const restart = (one) => {
    const newPlayers = [...players];
    newPlayers.forEach((player) => {
      player.score = 0;
      player.turn = false;
      player.played = false;
    });
    newPlayers[0].turn = true;
    setPlayers(newPlayers);
    setMonoliths([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    rollDice(0, true);
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
                <Button variant="contained" style={{ display: 'block', margin: '4% auto', width: '150px', height: "75px", fontSize: "17px" }} onClick={() => rollDice(index)}>Roll Dice</Button>
              ) : (
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button style={{ display: 'block', width: '150px', height: "75px", fontSize: "17px" }} variant="contained" onClick={() => rollDice(index)}>Roll Dice</Button>
                  </Grid>
                  <Grid item>
                    <Button style={{ display: 'block', width: '150px', height: "75px", fontSize: "17px" }} variant="contained" onClick={() => nextTurn(index)}>End Turn</Button>
                  </Grid>
                  <Grid item>
                    <Button style={{ display: 'block', width: '150px', height: "75px", fontSize: "17px" }} variant="contained" onClick={() => handleOpen()}>Restart</Button>
                  </Grid>
                </Grid>
              )}
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                      <Button style={{ display: 'block', width: '150px', height: "75px", fontSize: "17px" }} variant="contained" onClick={() => restart(1)}>Reset my Game</Button>
                    </Grid>
                    <Grid item>
                      <Button style={{ display: 'block', width: '150px', height: "75px", fontSize: "17px" }} variant="contained" onClick={() => handleOpenQueryPlayersModal()}>Restart Completely</Button>
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
              <Modal open={winnerModal} onClose={handleCloseWinnerModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Stack>
                  <Box sx={style}>{winnerModalContent}</Box>
                </Stack>
              </Modal>
              <Modal open={askReset} onClose={handleCloseAskReset} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Stack>
                    <h4 style={{ textAlign: 'center' }}>Are you sure you want to reset all checked monoliths?</h4>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item>
                        <Button style={{ display: 'block', width: '150px', height: "50px", fontSize: "17px" }} variant="contained" onClick={() => clearChecks()}>Yes</Button>
                      </Grid>
                      <Grid item>
                        <Button style={{ display: 'block', width: '150px', height: "50px", fontSize: "17px" }} variant="contained" onClick={() => handleCloseAskReset()}>Wait, no</Button>
                      </Grid>
                    </Grid>
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
