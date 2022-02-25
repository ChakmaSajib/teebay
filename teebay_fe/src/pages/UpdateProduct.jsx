import React, { useState, useEffect } from 'react';
import EditProduct from '../components/EditProduct';
import { useParams } from 'react-router-dom';
// import { GET_PRODUCT_BY_ID } from '../graphql/queries';
// import { useQuery } from '@apollo/client';

export default function UpdateProduct(props) {
  let { id } = useParams();

  // const [state, setState] = useState();
  // const { data } = useQuery(GET_PRODUCT_BY_ID, {
  //   variables: { productId: parseInt(id) }
  // });
  // useEffect(() => {
  //   if (data) {
  //     setState(data);
  //   }
  // }, [data]);

  return (
    <div>
      <EditProduct id={id} />
    </div>
  );
}
