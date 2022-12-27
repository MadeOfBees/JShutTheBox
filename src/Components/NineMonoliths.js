import React from 'react';
import { Grid, Typography,Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NineMonoliths = ({ monoliths, handleMonolithClick }) => {
  const theme = useTheme();
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}>
        {monoliths.map((monolithNum, index) => (
          <Grid item xs={1} key={index} style={{ maxWidth: '100%' }}>
            <Button
              onClick={() => handleMonolithClick(monolithNum)}
              style={{
                height: '7REM',
                width: "5REM",
                border: `7px solid`,
                background: 'inherit',
                borderColor: theme.palette.mode === 'dark' ? "White" : "Black",
                color: theme.palette.mode === 'dark' ? "White" : "Black",
                borderRadius: 0
              }}
            >
              <Typography variant="h3">{monolithNum}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NineMonoliths;
