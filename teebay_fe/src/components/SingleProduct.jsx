import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';
import AlertDialog from './AlertDialog';
import RentalPeriodDialog from './RentalPeriodDialog';
import { useParams } from 'react-router-dom';
import useStyles from '../utils/styles';

export default function SingleProduct() {
  let { id } = useParams();
  console.log('single product', id);

  const [open, setOpen] = useState(false);
  const [openRental, setRental] = useState(false);
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: parseInt(42) }
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

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
            <Typography variant='h2'>
              {data && data.getProductById.title}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ mb: 1.5 }} className={classes.grayColor}>
              Categories:
            </Typography>
            <Typography sx={{ mb: 1.5 }} className={classes.grayColor}>
              {data.getProductById.categories}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ mb: 1.5 }} className={classes.grayColor}>
              Price:
            </Typography>
            <Typography sx={{ mb: 1.5 }} className={classes.grayColor}>
              {`$${data.getProductById.price}`}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body'>
              {data && data.getProductById.description}
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
