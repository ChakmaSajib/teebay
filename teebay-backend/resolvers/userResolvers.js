const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/users');
const Product = require('../models/products');
const { ApolloError } = require("apollo-server-errors");
const createToken = require('../utils/jwt');
const checkAuth = require('../middleware/checkAuth');


module.exports = {
    Query: {
        welcome: () => {
            return "Hello from GraphQL API"
        }
    },

    Mutation: {
        async registerUser(
            _,
            { registerInput: { first_name, last_name, email, password, phone, address } }
        ) {

            // See if an old user is already exist or not      
            const existUser = await User.findOne({ where: { email: email } });

            // Throw an error if the user is already registered
            if (existUser) {
                throw new ApolloError("A user already exists with the same email" + email, "USER_ALREADY_EXIST");
            }


            // Ecrypt the password
            encrptedPassword = await bcrypt.hash(password, 10);


            // Build out the User Model 
            const newUser = await User.create({ first_name, last_name, email: email.toLowerCase(), password: encrptedPassword, phone, address, created: new Date().toISOString() });


            // Create out JWT token and attach it to the User model/table
            const token = createToken(newUser.id, email);
            // newUser.token = token;

            // save the user in PostgreSQL DB 
            const user = await newUser.save();

            return {
                id: user.id,
                email: user.email,
                token: token,
            };
        },

        async loginUser(_, { loginInput: { email, password } }) {
            // Check if a user already exists. 
            const user = await User.findOne({ where: { email } });

            // Check the input password is the same as the encrptedPassword
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create a new Token and attach it to the User model/table that we found above 
                const token = createToken(user.id, email);
                // user.token = token;

                return {
                    id: user.id,
                    email: user.email,
                    token: token,
                };

            } else {
                // if the user does not exists,  return error
                throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD")
            }

        },

        async updateAccountSetting(_, { userUpateInput: { first_name, last_name, email, password, address, phone } }, context) {


            // const token = context.headers.authorization.split('Bearer')[1] || ' ';
            const token = context.headers.authorization.split('Bearer')[1] || ' ';
            const isAuth = checkAuth(token)
            console.log("updateAccountSetting", isAuth)

            // See if an old user is already exist or not      
            const existUser = await User.findOne({ where: { email } })
            if (existUser != null) {
                await User.update(
                    { first_name, last_name, email, password, phone, address },
                    { where: { email } }
                )
                return {
                    id: existUser.id, email: existUser.email, token: existUser.token
                }
            }
            else {
                throw new ApolloError("User does not exist", "USER_NOT_EXIST", { status: 404, error: true })
            }
        }


    }

};
