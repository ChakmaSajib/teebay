import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  IconButton,
  CardContent
} from '@mui/material';
import DeleteOutline from '@mui/icons-material/Delete';
import AlertDialog from './AlertDialog';
import { useLocation } from 'react-router-dom';

export default function Product({ product, hideActionButton }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // will call the api with id and delete
    // then, update the local state using filter method
    console.log(product.id);
    setOpen(false);
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
              <IconButton onClick={handleOpen}>
                <DeleteOutline />
              </IconButton>
            )
          }
          title={product.title}
          subheader={product.category}
        />
        <AlertDialog
          open={open}
          handleClose={handleClose}
          title='Are you sure you want to delete this product?'
          handleDelete={handleDelete}
        />
        <CardContent>
          <Typography variant='body2'>{product.content}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
