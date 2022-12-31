import React from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PlayerLineup = ({ players }) => {
  const theme = useTheme();
  return (
    <div className="main-div">
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        {players.map(player => (
          <Grid item xs={4} md={2} key={player.playerNum}>
            <Box style={{textAlign: 'center', color: player.turn ? theme.palette.primary.main : 'inherit', border: `.5REM solid ${theme.palette.mode === 'dark' ? "White" : "Black"}` }}>
              <h1>P{player.playerNum}</h1>
              <h5>Score: {player.score}</h5>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlayerLineup;
