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

  input UserLoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
  }

  input ProductInput{
    title: String
    description: String
    price: Int
    rent: Int
    category: [String]
    options: [String]
  }
  
  type Product{
    id: ID
    title: String
    description: String
    price: Int
    rent: Int
    category: [String]
    options: [String]
    owner: User!
  }  

  type Query{
    welcome: String
    getAllProducts: [Product]
  }

  type Mutation{
    registerUser(registerInput: UserRegisterInput!): User
    loginUser(loginInput: UserLoginInput): User
    updateAccountSetting(userUpateInput: UserRegisterInput ): User
    createProduct(productInput: ProductInput!): Product
    editProduct(product: ProductInput): Product
    deleteProduct(productId: ID): String
    rentProduct(productId: ID!): Product
    buyProduct(productId: ID!): Product
  }
    
`
module.exports = typeDefs
