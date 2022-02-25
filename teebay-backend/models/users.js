const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Product = require('./products');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    }


});

User.hasMany(Product, { as: 'products' })
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });
module.exports = User;