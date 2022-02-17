import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from './AlertDialog';
import RentalPeriodDialog from './RentalPeriodDialog';

export default function SingleProduct() {
  const [open, setOpen] = useState(false);
  const [openRental, setRental] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // will call the api with id and delete
    // then, update the local state using filter method

    setOpen(false);
  };

  const handleOpenRental = async () => {
    setRental(true);
  };

  const handleCloseRental = async () => {
    setRental(false);
  };
  return (
    <div className='singleProduct'>
      <Box container direction='column' justifyContent='center'>
        <List>
          <ListItem>
            <Typography variant='h2'>Iphone 13 pro max</Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ mb: 1.5, color: 'secondary.main' }}>
              Categories:
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'secondary.main' }}>
              Electronics
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ mb: 1.5, color: 'secondary.main' }}>
              Price:
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'secondary.main' }}>
              $20
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500swhen an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
            </Typography>
          </ListItem>

          <Grid container justifyContent='flex-end' spacing={2}>
            <Grid item>
              <Button variant='contained' onClick={handleOpenRental}>
                Rent
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' onClick={handleOpen}>
                Buy
              </Button>
            </Grid>
          </Grid>
        </List>

        <AlertDialog
          open={open}
          handleClose={handleClose}
          title='Are you sure you want to buy this product?'
          handleDelete={handleDelete}
        />

        <RentalPeriodDialog open={openRental} handleClose={handleCloseRental} />
      </Box>
    </div>
  );
}
