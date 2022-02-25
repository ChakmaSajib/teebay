import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function RentalPeriodDialog({ open, handleClose }) {
  const location = Navigate;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='rental-alert-dialog-title'
        aria-describedby='rental-alert-dialog-description'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='alert-dialog-title' sx={{ ml: 1 }}>
          Rental Period
        </DialogTitle>
        <Grid
          container
          component='form'
          noValidate
          direction='row'
          spacing={3}
          sx={{ ml: 1 }}
        >
          <Grid item>
            <TextField
              id='rental-start-date'
              label='From'
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item>
            <TextField
              id='rental-end-date'
              label='To'
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              sx={{ width: 150 }}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} color='warning' variant='contained'>
            Go Back
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color='primary'
            variant='contained'
          >
            Confrim Rent
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
