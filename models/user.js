const {  DataTypes } = require('sequelize');
const db = require('./db')


const User = db.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue : 1
    }
});
db.sync();
module.exports = User;