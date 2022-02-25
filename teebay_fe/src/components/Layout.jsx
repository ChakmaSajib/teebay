import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../utils/styles';
import Button from '@mui/material/Button';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Grid, List, ListItem, Link } from '@mui/material';

export default function Layout({ title, description, children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const classes = useStyles();

  // remove token from localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Container>
      {/* app bar */}
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          <Link
            variant='h2'
            className={classes.logo}
            component={RouterLink}
            to='/'
            color='secondary'
            underline='none'
          >
            TeeBay.
          </Link>

          {token ? (
            <>
              <List>
                <Grid container>
                  <Grid item>
                    <ListItem>
                      <Link
                        variant='span'
                        underline='none'
                        to='/allproducts'
                        color='white'
                        component={RouterLink}
                      >
                        All Products
                      </Link>
                    </ListItem>
                  </Grid>
                  <Grid item>
                    <ListItem>
                      <Link
                        variant='span'
                        underline='none'
                        to='/myproducts'
                        color='white'
                        component={RouterLink}
                      >
                        Product
                      </Link>
                    </ListItem>
                  </Grid>

                  <Grid item>
                    <ListItem>
                      <Link
                        variant='span'
                        underline='none'
                        to='/profile'
                        color='white'
                        component={RouterLink}
                      >
                        Profile
                      </Link>
                    </ListItem>
                  </Grid>
                </Grid>
              </List>

              <Button variant='outlined' color='warning' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant='contained' to='/signin' component={RouterLink}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/** page section */}
      <div className={classes.page}>{children}</div>

      {/** footer section */}
      <footer className={classes.footer}>
        <Typography>All rights reserved. TeeBay.</Typography>
      </footer>
    </Container>
  );
}
