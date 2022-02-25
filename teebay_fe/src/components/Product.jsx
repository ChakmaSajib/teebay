import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import DeleteOutline from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AlertDialog from './AlertDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { REMOVE_PRODUCT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { GET_PRODUCTS } from '../graphql/queries';
import useStyles from '../utils/styles';

export default function Product({ product }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteProduct] = useMutation(REMOVE_PRODUCT, {
    onCompleted(data) {
      closeSnackbar();
      enqueueSnackbar(`${data.deleteProduct}`, {
        variant: 'success'
      });
      navigate('/myproducts');
    },
    onError(error) {
      closeSnackbar();
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  });

  const handleDelete = async () => {
    //  pass id to remove from the db
    deleteProduct({
      variables: { productId: product.id },
      refetchQueries: [{ query: GET_PRODUCTS }]
    });
    setOpen(false);
  };

  const handleEdit = async () => {
    navigate(`/myproducts/${product.id}`);
  };
  return (
    <div>
      <Card>
        <CardHeader
          hidden='true'
          action={
            `${location.pathname}` === '/allproducts' ? (
              ''
            ) : (
              <>
                <IconButton onClick={handleEdit}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleOpen}>
                  <DeleteOutline />
                </IconButton>
              </>
            )
          }
          title={product.title}
        />
        <CardContent>
          <Typography variant='subtitle1' className={classes.grayColor}>
            {`Categories: ${product.categories}`}
          </Typography>

          <Typography variant='subtitle1' className={classes.grayColor}>
            {`Price $ ${product.price} | Rent: ${product.rent} ${product.options}`}
          </Typography>

          <Typography variant='body'>{product.description}</Typography>
        </CardContent>

        {/* <CardActions>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid item sx={{ marginLeft: '0.5rem' }}>
              <Typography variant='subtitle1' className={classes.grayColor}>
                Date posted:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' className={classes.grayColor}>
                :views
              </Typography>
            </Grid>
          </Grid>
        </CardActions> */}

        <AlertDialog
          open={open}
          handleClose={handleClose}
          title='Are you sure you want to delete this product?'
          handleDelete={handleDelete}
        />
      </Card>
    </div>
  );
}
