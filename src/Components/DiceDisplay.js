import React from 'react';
import { Grid } from '@mui/material';
import './DiceDisplay.css';

const DiceDisplay = ({ currentDice }) => {
  const total = currentDice.reduce((acc, die) => acc + die, 0);

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" style={{display: 'flex', flexDirection: 'row' }}>
      <Grid item xs={2}>
        <div className={`die die-${currentDice[0]} spin`}></div>
      </Grid>
      {total > 0 && (
        <Grid item xs={1} style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
          <div className="total">Total: {total}</div>
        </Grid>
      )}
      <Grid item xs={2}>
        <div className={`die die-${currentDice[1]} spin`}></div>
      </Grid>
    </Grid>
  );
};

export default DiceDisplay;
