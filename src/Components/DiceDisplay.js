import React from 'react';
import { Box } from '@mui/material';
import './DiceDisplay.css';

const DiceDisplay = ({ currentDice }) => {
  const total = currentDice.reduce((acc, die) => acc + die, 0);
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mx="auto">
      <Box mx={1}>
        {currentDice[0] !== null ? (
          <div className={`die die-${currentDice[0]} spin`}></div>
        ) : (
          <div className="die blank spin"></div>
        )}
      </Box>
      {total > 0 && (
        <Box mx={1}>
          <h3 className="total">Total: {total}</h3>
        </Box>
      )}
      <Box mx={1}>
        {currentDice[1] !== null ? (
          <div className={`die die-${currentDice[1]} spin`}></div>
        ) : (
          <div className="die blank spin"></div>
        )}
      </Box>
    </Box>
  );
};

export default DiceDisplay;
