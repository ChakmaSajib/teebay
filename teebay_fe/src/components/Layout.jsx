import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../utils/styles';
import Header from './Header';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function Layout({ title, description, children }) {
  const classes = useStyles();

  return (
    <Container>
      {/* app bar */}
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant='h2' className={classes.logo}>
            TeeBay
          </Typography>
          <Button variant='contained' href='/'>
            Login
          </Button>
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
