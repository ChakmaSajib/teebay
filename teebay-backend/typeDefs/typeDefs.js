const { gql } = require('apollo-server-express');


const typeDefs = gql`

  input UserRegisterInput{
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    address: String
    phone: String
  }
  input UpdateUserInput{
    first_name: String
    last_name: String
    email: String
    password: String
    address: String
    phone: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    first_name:String!
    last_name:String!
    email: String!
    products: [Product]
    password: String!
    address: String
    phone: String
  }

  input ProductInput{
    title: String
    description: String
    price: Int
    rent: Int
    options: [String]
    categories: [String]
  }
  input UpdateProductInput{
    id: ID
    title: String
    description: String
    price: Int
    rent: Int
    options: [String]
    categories: [String]
  }
  
  type Product{
    id: ID
    title: String
    description: String
    price: Int
    rent: Int
    categories: [String]
    options: [String]
  }  

  type Token{
    token: String!
    email: String
  }

  type Query{
    welcome: String
    getAllProducts: [Product]
    getAllProductsById: [Product]
    getProductById(productId: Int!): Product
    getUserById: User
  }

  type Mutation{
    registerUser(registerInput: UserRegisterInput!): User
    loginUser(loginInput: UserLoginInput): Token
    updateAccountSetting(userUpdateInput: UpdateUserInput ): String
    createProduct(productInput: ProductInput!): Product
    updateProduct(productInput: UpdateProductInput): String
    editProduct(product: ProductInput): Product
    deleteProduct(productId: ID): String
    rentProduct(productId: ID!): Product
    buyProduct(productId: ID!): Product
  }
    
`
module.exports = typeDefs
