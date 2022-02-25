import React from 'react';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Typography
        variant='h1'
        component='h1'
        sx={{ textAlign: 'center', mt: '15rem' }}
      >
        Welcome to Teebay.
      </Typography>
    </div>
  );
}
