import * as React from 'react';
import { Box, Button, Grid, Modal, Stack } from '@mui/material';
import PlayerLineup from './PlayerLineup';

const DisplayBoard = ({ playerTotal }) => {
  const [modal, setModal] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
  const handleClose = () => setOpen(false);
  const [players, setPlayers] = React.useState([]);

  const setupPlayers = () => {
    const playerArray = [];
    for (let i = 0; i < playerTotal; i++) {
      playerArray.push({ playerNum: i + 1, score: 0 });
    }
    setPlayers(playerArray);
  };

  React.useEffect(() => {
    setupPlayers();
  }, []);

  return (
    <div>
      <PlayerLineup players={players} /> {/* pass the players state variable as a prop to the PlayerLineup component */}
      <Button variant="contained" onClick={() => {
        const newPlayers = [...players];
        newPlayers[0].score += 1;
        setPlayers(newPlayers);
      }}>Raise Player 1's Score</Button>
    </div>
  )
}

export default DisplayBoard;
