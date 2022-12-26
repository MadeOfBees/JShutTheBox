import React from 'react';
import {Grid} from '@mui/material';
import './DiceDisplay.css';

const DiceDisplay = ({ currentDice }) => (
  <div>
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
      {currentDice.map((die, index) => (
        <Grid item xs={3} key={index}>
          <div className={`die die-${die} spin`}></div>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default DiceDisplay;
