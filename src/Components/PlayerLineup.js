import React from 'react';
import { Box, Button, Grid, Modal, Stack } from '@mui/material';

const PlayerLineup = ({ players }) => {
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
        {players.map((player) => (
          <Grid item xs={3} key={player.playerNum}>
            <h5>Player {player.playerNum}</h5>
            <h5>Score: {player.score}</h5>
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default PlayerLineup;
