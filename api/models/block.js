const Sequelize = require('sequelize');
var config = require('../config');
var SchemaName = config.connect_db_name;

module.exports = function (sequelize, DataTypes) {
  var Block = sequelize.define('users_block', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'user_id' 
    },
    blockUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'block_user_id' 
    },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
  
  });
  return Block;
}