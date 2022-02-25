import React from 'react';
import AccountSetting from './AccountSetting';
import { GET_USER_BY_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Profile() {
  const { loading, error, data } = useQuery(GET_USER_BY_ID);
  if (loading) return <div>Loading... </div>;

  return (
    <Box
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography component='h2' variant='h2'>
        {`  Welcome, ${data.getUserById.first_name} ${data.getUserById.last_name}`}
      </Typography>
      <Button variant='outlined' to='/profile/edit' component={RouterLink}>
        Do you want to edit your profile
      </Button>
    </Box>
  );
}
