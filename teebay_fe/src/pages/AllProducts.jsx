import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Product from '../components/Product';
import useStyles from '../utils/styles';
import { GET_PRODUCTS } from '../graphql/queries';

export default function AllProducts() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <div>loading</div>;

  return (
    <div>
      <Typography
        align='center'
        variant='h1'
        component='h2'
        className={classes.upperCase}
      >
        All Products
      </Typography>

      <Grid container spacing={3}>
        {data &&
          data.getAllProducts.map((product) => (
            <Grid item key={product.id} xs={12} sx={6} md={12}>
              <Link
                to={`/allproducts/${product.id}`}
                component={RouterLink}
                underline='none'
              >
                <Product
                  key={product.id}
                  product={product}
                  hideActionButton={false}
                />
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
