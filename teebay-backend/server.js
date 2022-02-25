const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const sequelize = require('./utils/database');
const jwt = require('jsonwebtoken')
// const cors = require('cors');
require("dotenv").config()


// CORS configuration
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true
}


async function startServer() {
    await sequelize.sync(
        { alter: true }
    );
    const app = express()

    const apolloServer = new ApolloServer({
        /**
         * Authorization is need to secure the API perform for 
         * giving permission to do an action or see a piece of data
         *
        **/
        cors: corsOptions,
        typeDefs, resolvers, context: ({ req }) => {
            const { authorization } = req.headers
            if (authorization) {
                const user = jwt.verify(authorization, process.env.TOKEN_SECRET)
                return { userId: user.id }
            }
        }
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    app.use((req, res) => {
        res.send("Welcome to teebay API world ")
    })

    app.listen(process.env.PORT || 4000, () => console.log(`🚀 Server is running on port ${process.env.PORT}`))


}
startServer()