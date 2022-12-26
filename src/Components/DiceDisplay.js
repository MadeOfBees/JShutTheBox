// this component shows the 2 dice it's given as a prop individually as numbers

import React from 'react';
import {Grid} from '@mui/material';

const DiceDisplay = ({ currentDice }) => (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
        {currentDice.map(die => (
          <Grid item xs={3} key={die}>
            <h5>Die {die}</h5>
          </Grid>
        ))}
      </Grid>
    </div>
  );
export default DiceDisplay;  