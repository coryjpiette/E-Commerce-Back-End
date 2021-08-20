// import  sequelize library
const { Model, DataTypes } = require('sequelize');

// import database connection from config.js
const sequelize = require('../config/connection');

// initialize Product model
class Product extends Model {}
