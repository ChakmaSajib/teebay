import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
query Query {
  getAllProducts {
    id
    title
    description
    price
    rent
    categories
    options
     
  }
}
`
export const GET_ALL_PRODUCTS_BY_ID = gql`
query Query {
  getAllProductsById {
    id
    title
    description
    price
    rent
    categories
    options
     
  }
}
`
export const GET_USER_BY_ID = gql`
query Query {
  getUserById {
    first_name
    last_name
    email
    password
    phone
    address
  }
}
`

export const GET_PRODUCT_BY_ID = gql`
query Query($productId: Int!) {
    getProductById(productId: $productId) {
      id
      title
      description
      categories
      price
      rent
      options
    }
  }
`



