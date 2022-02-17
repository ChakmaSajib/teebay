import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Box,
  Grid
} from '@mui/material';
import useStyles from '../utils/styles';

export default function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const submitHandler = async ({
    first_name,
    last_name,
    phone,
    email,
    password,
    address,
    confirmPassword
  }) => {
    closeSnackbar();
    console.log(
      email,
      password,
      phone,
      address,
      confirmPassword,
      first_name,
      last_name
    );
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      });
      Cookies.set('userInfo', data);
      navigate.push('/dashboard');
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <Box
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography component='h1' variant='h1' className={classes.upperCase}>
        Registration
      </Typography>
      <Paper elevation={2} className={classes.paper}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <List>
            <Grid container>
              <Grid item xs={6}>
                <ListItem>
                  <Controller
                    name='first_name'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='first_name'
                        label='First Name'
                        inputProps={{ type: 'text' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <Controller
                    name='last_name'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='last_name'
                        label='Last Name'
                        inputProps={{ type: 'text' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>
            </Grid>

            <ListItem>
              <Controller
                name='address'
                control={control}
                defaultValue=''
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='address'
                    label='Address'
                    inputProps={{ type: 'text' }}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <Grid container>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: true,
                      pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
                    }}
                    render={({ field }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='phone'
                        label='Phone'
                        inputProps={{ type: 'number' }}
                        error={Boolean(errors.phone)}
                        helperText={
                          errors.phone
                            ? errors.phone.type === 'pattern'
                              ? 'Phone number is not valid'
                              : 'Phone number is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>
            </Grid>

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

            <ListItem>
              <Controller
                name='confirmPassword'
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
                    id='confirmPassword'
                    label='Confirm Password'
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password length is more than 5'
                          : 'Confirm  Password is required'
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
              Already have an account? &nbsp;
              <Link href='/signin' underline='none'>
                Sign In
              </Link>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
