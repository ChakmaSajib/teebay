import React from 'react';
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Link
} from '@mui/material';

const pages = ['Bought', 'Sold', 'Borrowed', 'Lent'];

export default function Header() {
  return (
    <Container>
      <Toolbar disableGutters>
        <Link href='/' underline='hover'>
          <Typography variant='h2' noWrap component='div'>
            TeeBay
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Login
          </Typography>
        </Box>
      </Toolbar>
    </Container>
  );
}
