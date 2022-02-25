import { Button, Grid, List, ListItem, Typography, Link } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Product from '../components/Product';
import useStyles from '../utils/styles';
import { GET_ALL_PRODUCTS_BY_ID } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';

export default function Products() {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_ALL_PRODUCTS_BY_ID);

  if (loading) return <div>loading...</div>;

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
      {data.getAllProductsById === null ? (
        <Grid container spacing={3}>
          <List>
            <ListItem>
              <Typography variant='h1'>Please add product</Typography>
            </ListItem>
            <ListItem>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                to='/createproduct'
                component={RouterLink}
              >
                Add Product
              </Button>
            </ListItem>
          </List>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {data &&
            data.getAllProductsById.map((product) => (
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
                to='/createproduct'
                component={RouterLink}
              >
                Add Product
              </Button>
            </ListItem>
          </List>
        </Grid>
      )}
    </div>
  );
}
