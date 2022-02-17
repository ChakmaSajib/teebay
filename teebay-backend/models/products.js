
const Sequelize = require('sequelize');
const db = require('../utils/database');


const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rent: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    category: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    options: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    }
});



module.exports = Product;