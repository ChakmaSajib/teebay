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
  Paper,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';

const categories = ['10', '20', '30'];

export default function AddProduct() {
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
      <Paper elevation={2} className={classes.paper}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <List>
            <ListItem>
              <Typography>Tittle</Typography>
            </ListItem>
            <ListItem>
              <Controller
                name='title'
                control={control}
                defaultValue=''
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='title'
                    inputProps={{ type: 'text' }}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Typography>Category</Typography>
            </ListItem>

            <Grid container flexDirection='row'>
              <Grid item sx={4}>
                <ListItem>
                  <Controller
                    name='category'
                    control={control}
                    type='text'
                    defaultValue={[]}
                    render={({ field }) => (
                      <FormControl style={{ width: '18rem' }}>
                        <InputLabel id='category'>Select a Category</InputLabel>
                        <Select
                          {...field}
                          labelId='category'
                          label='Select a Category'
                          multiple
                          defaultValue={[]}
                        >
                          {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </ListItem>
              </Grid>
              <Grid item sx={8}></Grid>
            </Grid>

            <ListItem>
              <Typography>Description</Typography>
            </ListItem>
            <ListItem>
              <TextField
                id='description'
                multiline
                rows={10}
                fullWidth
                variant='outlined'
              />
            </ListItem>

            <Grid container>
              <Grid item sx={6}>
                <ListItem>
                  <Typography>Price</Typography>
                </ListItem>
              </Grid>
              <Grid item sx={6} style={{ marginLeft: 90 }}>
                <ListItem>
                  <Typography>Rent</Typography>
                </ListItem>
              </Grid>
            </Grid>

            {/** price, rent section */}
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <ListItem>
                  <Controller
                    name='rent'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <TextField
                        variant='outlined'
                        id='rent'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          )
                        }}
                        inputProps={{
                          type: 'number'
                        }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>

              <Grid item xs={3}>
                <ListItem>
                  <Controller
                    name='rent'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <TextField
                        variant='outlined'
                        id='rent'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          )
                        }}
                        inputProps={{
                          type: 'number'
                        }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <Controller
                    name='option'
                    control={control}
                    type='text'
                    defaultValue={[]}
                    render={({ field }) => (
                      <FormControl style={{ width: '15rem' }}>
                        <InputLabel id='option'>Select option</InputLabel>
                        <Select
                          {...field}
                          labelId='category'
                          label='Select option'
                          multiple
                          defaultValue={[]}
                        >
                          {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </ListItem>
              </Grid>
            </Grid>

            <ListItem sx={{ justifyContent: 'end' }}>
              <Button variant='contained' color='primary' href='/allproducts'>
                Add Product
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
