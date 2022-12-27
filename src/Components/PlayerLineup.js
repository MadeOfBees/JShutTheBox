import React from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
const PlayerLineup = ({ players }) => {
  const theme = useTheme();

  return (
    <div className="main-div">
<Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
  {players.map(player => (
    <Grid item xs={3} key={player.playerNum}>
      <Box style={{ textAlign: 'center', color: player.turn ? theme.palette.primary.main : 'inherit', border: `.5REM solid ${theme.palette.mode === 'dark' ? "White" : "Black"}` }}>
        <h3 style={{ fontSize: '1.2rem' }}>Player {player.playerNum}</h3>
        <h3 style={{ fontSize: '1.5rem' }}>Score: {player.score}</h3>
      </Box>
    </Grid>
  ))}
</Grid>
    </div>
  );
};

export default PlayerLineup;
