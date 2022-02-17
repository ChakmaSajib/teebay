const { AuthenticationError } = require('apollo-server-express')
const jwt = require("jsonwebtoken")
require('dotenv').config()


module.exports = (token) => {
    /**
     *  Through, this function we will check the user is authenticated or not
     *  then, after verification will get Authorization to aceess resources
     * 
     */
    if (token) {
        try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET)
            return user;

        } catch (error) {
            throw new AuthenticationError("Invalid/Expried Token, Please login again")
        }
    }
    throw new Error("Authentication token must be 'Bearer [token]")
}