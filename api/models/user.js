const Sequelize = require('sequelize');
var config = require('../config');
var SchemaName = config.connect_db_name;
import bcrypt from 'bcrypt-nodejs';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        field: 'role'
    },
    first_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'first_name'
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'last_name'
    },
    gender: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'gender'
    },
    birth_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          field: 'birth_date'
    },
    email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'email'
    },
    password: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'password'
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'country'
    },
    mobile_no: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'mobile_no'
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
      field: 'status'
    },
    createdAt: { 
      type: DataTypes.DATE, 
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_date'
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_date'
    },
  });
  
  
  User.beforeCreate( async (user, options) => {
    user.password = await database.User.createPassword(user.password);
  });

  User.comparePassword = async (candidatePassword, hash) =>{
    return await bcrypt.compareSync(candidatePassword, hash);
  };

  User.createPassword =  async (string) => {
    const SALT_FACTOR = 5;
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(string, salt);
  };
  return User;
}