const { DataTypes } = require('sequelize');
const client = require('../config/connection');

const User = client.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 6
    }
  }
}, {

});

module.exports = User;