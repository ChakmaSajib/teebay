const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/users');
const Product = require('../models/products');
const { ApolloError } = require("apollo-server-errors");
const createToken = require('../utils/jwt');

module.exports = {
    Mutation: {
        async createProduct(_, { productInput: { title, description, price, rent, category, options } }) {
            //  Create a new product and save it in the database
            try {
                const product = await Product.create({ title, description, price, rent, category, options });
                return {
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    rent: product.rent,
                    category: product.category,
                    options: product.options,
                    title: product.title
                }

            } catch (error) {
                /**
                 *  Note: centrall we can handle all kinds of error
                 *  initially, we only use console.log
                 */
                console.log(error);
            }

        },

        async editProduct(_, { productInput: { title, description, price, rent, category, options } }) {
            /**
             *  1. Create a new product
             *  2. Then, save it in the database
             */
            try {
                const product = await Product.create({ title, description, price, rent, category, options });
                return {
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    rent: product.rent,
                    category: product.category,
                    options: product.options
                }

            } catch (error) {
                /**
                 *  Note: centrally we can handle all kinds of error puting in one file
                 *  initially, we only use console.log
                 */
                console.log(error);
            }

        },

        async deleteProduct(_, { productId: id }) {
            try {
                await Product.destroy({ where: { id } })
                return "Product deleted successfully"

            } catch (error) {
                console.log(error);
            }



        },

        async rentProduct(_, { productId: id }) {
            /**
             *  1. find the product in the database using id
             *  2. then update the rent coloumn
             *  3. finally, return rent product detail
             */


        },
        async buyProduct(_, { productId: id }) {
            /**
             *  1. find the product in the database using id
             *  2. finally, return rent product detail
             */


        },

    },

    Query: {
        async getAllProducts() {
            try {
                return await Product.findAll({ attributes: ['id', 'title', 'description', 'price', 'rent', 'category', 'options'] })
            } catch (error) {
                console.log(error)
            }
        }
    }
};
