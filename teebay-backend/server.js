const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const sequelize = require('./utils/database');
const checkAuth = require('./middleware/checkAuth');

async function startServer() {
    await sequelize.sync(
        { force: false }
    );
    const app = express()

    const apolloServer = new ApolloServer({
        /**
         * Authorization is need to secure the API perform for 
         * giving permission to do an action or see a piece of data
         *
        **/

        typeDefs, resolvers, context: ({ req }) => req

    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    app.use((req, res) => {
        res.send("Welcome to teebay API world ")
    })

    app.listen(process.env.PORT || 4000, () => console.log(`🚀 Server is running on port ${process.env.PORT}`))


}
startServer()