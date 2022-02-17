const Sequelize = require('sequelize');
const db = require('../utils/database');
const Product = require('./products');

// https://www.bezkoder.com/sequelize-associate-one-to-many/

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

});

User.hasMany(Product, { as: 'products', foreignKey: 'product_id' })
Product.belongsTo(User, { foreignKey: 'user_id' });
module.exports = User;