import React from 'react';
import { Grid } from '@mui/material';

const NineMonoliths = ({ monoliths, handleMonolithClick }) => (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
        {monoliths.map(monolithNum => (
          <Grid item xs={1} key={monolithNum}>
            <button onClick={() => handleMonolithClick(monolithNum)} style={{ height: '5REM', width: '100%' }}>
              {monolithNum}
            </button>
          </Grid>
        ))}
      </Grid>
    </div>
  );

export default NineMonoliths;
