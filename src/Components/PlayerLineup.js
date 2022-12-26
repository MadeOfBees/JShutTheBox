import React from 'react';
import {Grid} from '@mui/material';

const PlayerLineup = ({ players }) => (
  <div>
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
      {players.map(player => (
        <Grid item xs={3} key={player.playerNum}>
          <h5 style={{ color: player.turn ? 'green' : 'inherit' }}>
            Player {player.playerNum}<br />
            Score: {player.score}
          </h5>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default PlayerLineup;
