import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  open,
  handleClose,
  title,
  handleDelete
}) {
  return (
    <div data-testid='alert-dialog'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='warning' variant='contained'>
            No
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color='primary'
            variant='contained'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
