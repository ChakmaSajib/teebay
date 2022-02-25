import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Box
} from '@mui/material';
import useStyles from '../utils/styles';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

export default function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const [signinUser] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      closeSnackbar();
      enqueueSnackbar('Login sucessful', { variant: 'success' });
      localStorage.setItem('token', data.loginUser.token);
      navigate('/profile');
    },
    onError(error) {
      closeSnackbar();
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  const submitHandler = async ({ email, password }) => {
    await signinUser({
      variables: {
        loginInput: { email, password }
      }
    });
  };

  return (
    <Box
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      flexDirection='column'
    >
      <Typography component='h1' variant='h1' className={classes.upperCase}>
        Sign In
      </Typography>
      <Paper elevation={2} className={classes.paper}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <List>
            <ListItem>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='email'
                    label='Email'
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 6
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='password'
                    label='Password'
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password length is more than 5'
                          : 'Password is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem sx={{ justifyContent: 'center' }}>
              <Button variant='contained' type='submit' color='primary'>
                Login
              </Button>
            </ListItem>
            <ListItem sx={{ justifyContent: 'center' }}>
              Do not have an account? &nbsp;
              <Link href='/registration' underline='none'>
                Sign up
              </Link>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
