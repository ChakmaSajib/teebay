import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
mutation LoginUser($loginInput: UserLoginInput) {
  loginUser(loginInput: $loginInput) {
    email,
    token
  }
}
`

export const REGISTER_USER = gql`
mutation RegisterUser($registerInput: UserRegisterInput!) {
  registerUser(registerInput: $registerInput) {
    first_name
    last_name
    email
    products {
      id
    }
  }
}
`
export const UPDATE_USER = gql`
mutation UpdateAccountSetting($userUpdateInput: UpdateUserInput) {
  updateAccountSetting(userUpdateInput: $userUpdateInput)
}
`



export const ADD_PRODUCT = gql`
mutation CreateProduct($productInput: ProductInput!) {
  createProduct(productInput: $productInput) {
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

export const REMOVE_PRODUCT = gql`
mutation DeleteProduct($productId: ID) {
  deleteProduct(productId: $productId)
}
`

export const UPDATE_PRODUCT = gql`
 mutation Mutation($productInput: UpdateProductInput) {
  updateProduct(productInput: $productInput)
}
`

