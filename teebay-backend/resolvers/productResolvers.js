const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/users');
const Product = require('../models/products');
const { ApolloError } = require("apollo-server-errors");
const createToken = require('../utils/jwt');

module.exports = {
    Mutation: {
        async createProduct(_, { productInput: { title, description, price, rent, categories, options } }, { userId }) {
            if (!userId) throw new Error("You must be logged in")
            //  Create a new product and save it in the database
            try {
                const product = await Product.create({ title, description, price, rent, categories, options, userId });
                return {
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    rent: product.rent,
                    categories: product.categories,
                    options: product.options,
                    title: product.title,
                }

            } catch (error) {
                /**
                 *  Note: centrall we can handle all kinds of error
                 *  initially, we only use console.log/ApolloError
                 */
                throw new ApolloError(error, "ERROR_ON_CREATE_PRODUCT")

            }

        },

        async editProduct(_, { productInput: { title, description, price, rent, categories, options } }) {
            /**
             *  1. Create a new product
             *  2. Then, save it in the database
             */
            try {
                const product = await Product.create({ title, description, price, rent, categories, options });
                return {
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    rent: product.rent,
                    categories: product.categories,
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

        async updateProduct(_, { productInput: { id, title, categories, description, price, rent, options } }, { userId }) {
            if (!userId) throw new Error("You must be logged in")
            console.log("udpdate ", id)
            const product = await Product.findOne({ where: { id } })
            console.log("exit product ", product)
            if (product != null) {
                await product.update(
                    { title, categories, description, price, rent, options },
                    { where: { userId, id } }
                )
                return "successfully updated"
            }
            else {
                throw new ApolloError("Product does not exist", "PRODUCT_DOES_NOT_EXIST", { status: 404, error: true })
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
        async getAllProducts(_, args) {
            try {
                return await Product.findAll({
                    order: [["createdAt", "DESC"]]
                })
            } catch (error) {
                console.log(error)
            }
        },

        async getAllProductsById(_, args, { userId }) {
            try {
                return await Product.findAll({
                    where: {
                        userId
                    },
                    order: [["createdAt", "DESC"]]
                })
            } catch (error) {
                console.log(error)
            }
        },

        async getProductById(_, { productId }, { userId }) {
            const { id, title, categories, description, price, rent, options } = await Product.findOne({ where: { id: productId } })
            return {
                id, title, categories, description, price, rent, options
            }
        }

    }
};
