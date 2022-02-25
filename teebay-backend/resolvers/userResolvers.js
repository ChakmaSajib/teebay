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
        },
        async getUserById(_, args, { userId }) {
            const { first_name, last_name, email, password, phone, address } = await User.findOne({ where: { id: userId } })
            console.log(first_name, last_name, email, password)
            return {
                first_name, last_name, email, password, phone, address
            }
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
                throw new ApolloError("A user already exists with the same email " + email, "USER_ALREADY_EXIST");
            }
            // Ecrypt the password
            encrptedPassword = await bcrypt.hash(password, 10);
            // Build out the User Model 
            const newUser = await User.create({ first_name, last_name, email: email.toLowerCase(), password: encrptedPassword, phone, address, created: new Date().toISOString() });
            // Create out JWT token and attach it to the User model/table
            const token = createToken(newUser.id, email);

            // save the user in DB 
            const user = await newUser.save();

            return {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
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
                throw new ApolloError("Incorrect password/email", "INCORRECT_PASSWORD")
            }

        },

        async updateAccountSetting(_, { userUpdateInput: { first_name, last_name, email, password, address, phone } }, { userId }) {

            if (!userId) throw new Error("You must be logged in")
            // See if an old user is already exist or not      
            const existUser = await User.findOne({ where: { id: userId } })
            if (existUser != null) {
                await existUser.update(
                    { first_name: first_name, last_name: last_name, email: email, password: password, phone: phone, address: address },
                    { where: { id: userId } }
                )
                return "successfully updated"
            }
            else {
                throw new ApolloError("User does not exist", "USER_NOT_EXIST", { status: 404, error: true })
            }
        }


    }

};
