import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@apollo/client';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid
} from '@mui/material';
import useStyles from '../utils/styles';
import { GET_USER_BY_ID } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';

export default function AccountSetting() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const { loading, error, data } = useQuery(GET_USER_BY_ID);
  const [updateAccountSetting] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      closeSnackbar();
      console.log(data);
      enqueueSnackbar(data.updateAccountSetting, { variant: 'success' });
    },
    onError(error) {
      closeSnackbar();
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  if (loading) return <div>Loading... </div>;

  const submitHandler = async ({
    first_name,
    last_name,
    phone,
    email,
    password,
    address
  }) => {
    first_name = first_name || data.getUserById.first_name;
    last_name = last_name || data.getUserById.last_name;
    email = email || data.getUserById.email;
    address = address || data.getUserById.address;
    phone = phone || data.getUserById.phone;
    console.log(first_name, last_name, email, password, phone, address);
    updateAccountSetting({
      variables: {
        userUpdateInput: {
          first_name,
          last_name,
          email,
          address,
          phone,
          password
        }
      }
    });
    return;
  };

  return (
    <Box
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography component='h1' variant='h1'>
        Account Setting
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
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={value || data.getUserById.first_name}
                        id='first_name'
                        label='First Name'
                        inputProps={{ type: 'text' }}
                        onChange={onChange}
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
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='last_name'
                        label='Last Name'
                        // defaultValue={data ? data.getUserById.last_name : ''}
                        value={value || data.getUserById.last_name}
                        onChange={onChange}
                        inputProps={{ type: 'text' }}
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
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='address'
                    label='Address'
                    // defaultValue={data ? data.getUserById.address : ''}
                    inputProps={{ type: 'text' }}
                    value={value || data.getUserById.address}
                    onChange={onChange}
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
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='email'
                        label='Email'
                        // defaultValue={data ? data.getUserById.email : ''}
                        inputProps={{ type: 'email' }}
                        value={value || data.getUserById.email}
                        onChange={onChange}
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
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        fullWidth
                        id='phone'
                        label='Phone'
                        inputProps={{ type: 'number' }}
                        // defaultValue={data ? data.getUserById.phone : ''}
                        value={value || data.getUserById.phone}
                        onChange={onChange}
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
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='password'
                    label='Password'
                    inputProps={{ type: 'password' }}
                    value={value || ''}
                    onChange={onChange}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem sx={{ justifyContent: 'center' }}>
              <Button variant='contained' type='submit' color='primary'>
                Update
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
