import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
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
import { UPDATE_PRODUCT } from '../graphql/mutations';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';

export default function EditProduct({ id }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  // fetched product by id
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: parseInt(id) }
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted(data) {
      closeSnackbar();
      enqueueSnackbar(data.updateProduct, { variant: 'success' });
      navigate('/myproducts');
    },
    onError(error) {
      closeSnackbar();
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const submitHandler = async ({
    title,
    categories,
    description,
    price,
    rent,
    options
  }) => {
    // update product
    if (id) {
      await updateProduct({
        variables: {
          productInput: {
            id,
            title,
            categories,
            description,
            price: parseInt(price),
            rent: parseInt(rent),
            options
          }
        }
      });
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
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='title'
                    inputProps={{ type: 'text' }}
                    defaultValue={data ? data.getProductById.title : ''}
                    inputValue={
                      value || (data ? data.getProductById.title : '')
                    }
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
                          defaultValue={data.getProductById.categories}
                          inputValue={
                            value ||
                            (data ? data.getProductById.categories : [])
                          }
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
                    defaultValue={data ? data.getProductById.title : ''}
                    inputValue={
                      value || (data ? data.getProductById.description : '')
                    }
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
                        defaultValue={data ? data.getProductById.price : null}
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
                        defaultValue={data ? data.getProductById.rent : null}
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
                          defaultValue={data ? data.getProductById.options : []}
                          inputValue={value || []}
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
                Update Product
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Box>
  );
}
