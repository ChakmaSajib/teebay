const { DataTypes } = require('sequelize');
const db = require('../utils/database');


const Product = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});



module.exports = Product;