// const { GraphQLDateTime } = require('graphql-iso-date');
// const customScalarResolver = {
//     Date: GraphQLDateTime
// };

const userResolvers = require('./userResolvers');
const productsResolvers = require('./productResolvers');



module.exports = {

    Query: {
        ...userResolvers.Query,
        ...productsResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...productsResolvers.Mutation
    }
};