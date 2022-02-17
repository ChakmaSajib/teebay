import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

export default function AllProducts() {
  const classes = useStyles();

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
        {products.map((product) => (
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
