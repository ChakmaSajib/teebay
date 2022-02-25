import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
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
import useStyles from '../utils/styles';
import { categories, options } from '../utils/constant';
import { ADD_PRODUCT } from '../graphql/mutations';

export default function CreateProduct() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  // Add product into db
  const [createProduct] = useMutation(ADD_PRODUCT, {
    onCompleted(data) {
      closeSnackbar();
      enqueueSnackbar('Product added successfully', { variant: 'success' });
      navigate('/myproducts');
    },
    onError(error) {
      closeSnackbar();
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  });

  const submitHandler = async ({
    title,
    categories,
    description,
    price,
    rent,
    options
  }) => {
    // new product
    await createProduct({
      variables: {
        productInput: {
          title,
          description,
          categories: categories,
          price: parseInt(price),
          rent: parseInt(rent),
          options
        }
      }
    });
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
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='title'
                    inputProps={{ type: 'text' }}
                    inputValue={value || ''}
                    onChange={onChange}
                    error={Boolean(errors.title)}
                    helperText={errors.title ? 'Unique title is required' : ''}
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
                  <FormControl style={{ width: '15rem' }}>
                    <InputLabel id='categories'>Select Category</InputLabel>
                    <Controller
                      control={control}
                      name='categories'
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id='categories'
                          labelId='categoriesId'
                          label='Select Category'
                          multiple
                          defaultValue={[]}
                          inputValue={value}
                          onChange={onChange}
                        >
                          {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </ListItem>
              </Grid>
              <Grid item sx={8}></Grid>
            </Grid>

            <ListItem>
              <Typography>Description</Typography>
            </ListItem>
            <ListItem>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    rows='10'
                    multiline
                    id='description'
                    inputProps={{ type: 'text' }}
                    inputValue={value || ''}
                    error={Boolean(errors.description)}
                    onChange={onChange}
                    helperText={
                      errors.description ? 'Description is required' : ''
                    }
                  ></TextField>
                )}
              ></Controller>
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
                    name='price'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        id='price'
                        value={value || null}
                        onChange={onChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          )
                        }}
                        inputProps={{
                          type: 'number'
                        }}
                        error={Boolean(errors.price)}
                        helperText={
                          errors.rent ? 'Please enter a price amount' : ''
                        }
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
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant='outlined'
                        id='rent'
                        value={value || null}
                        onChange={onChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          )
                        }}
                        inputProps={{
                          type: 'number'
                        }}
                        error={Boolean(errors.rent)}
                        helperText={
                          errors.rent ? 'Please enter a rent amount' : ''
                        }
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <FormControl style={{ width: '15rem' }}>
                    <InputLabel id='options'>Select Option</InputLabel>
                    <Controller
                      control={control}
                      name='options'
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id='options'
                          labelId='optionId'
                          label='Select option'
                          multiple
                          defaultValue={[]}
                          inputValue={value}
                          onChange={onChange}
                        >
                          {options.map((option) => (
                            <MenuItem value={option} key={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </ListItem>
              </Grid>
            </Grid>

            <ListItem sx={{ justifyContent: 'end' }}>
              <Button variant='contained' color='primary' type='submit'>
                Add Product
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
