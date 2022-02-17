import {
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from '../components/AlertDialog';
import Product from '../components/Product';
import useStyles from '../utils/styles';

const products = [
  {
    title: 'Cricket kit',
    category: 'cricket',
    id: 1,
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum`
  },
  { title: 'Cricket kit', category: 'cricket', id: 2 },
  { title: 'Cricket kit', category: 'cricket', id: 3 },
  { title: 'Cricket kit', category: 'cricket', id: 4 }
];

export default function Products() {
  const classes = useStyles();

  return (
    <div>
      <Typography
        align='center'
        variant='h1'
        component='h2'
        className={classes.upperCase}
      >
        My Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sx={6} md={12}>
            <Product key={product.id} product={product} />
          </Grid>
        ))}

        <List>
          <ListItem sx={{ justifyContent: 'end' }}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              href='/add'
            >
              Add Product
            </Button>
          </ListItem>
        </List>
      </Grid>
    </div>
  );
}
