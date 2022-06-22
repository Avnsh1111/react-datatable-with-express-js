var Sequelize = require('sequelize');
var config = require('../config')
import User from  "../models/user";
import path from 'path';
import fs from 'fs';
import Utils from './utils';
var ConnectionPool = {
      max: 3,
      min: 1,
      idle: 10000,
      evict: 60000,
      handleDisconnects: true
}; 

var sequelizer = new Sequelize(config.DB, config.USER, config.PASSWORD, {
            host: config.HOST,
            dialectOptions: {
                  multipleStatements: true,
                  connectTimeout: 30000
            },
            dialect: "mysql",
            logging: function (str) {
                  if (config.query_log) {
                        console.log(str)
                  }
            },
            pool: ConnectionPool,
            define: {
              charset: 'utf8',
              collate: 'utf8_general_ci',
                  //paranoid: true
            },
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
            timezone: '+05:30',
            individualHooks: true
      });
sequelizer.dialect.supports.schemas = true;
sequelizer.authenticate()
  .then(() => {
    console.log('connected to DB');
  });

let models={};
const files = fs.readdirSync(__dirname + '/../models');
for(let file of files){
	if (file !== path.basename(__filename) && file.endsWith('.js')) {
        const model = require(
            path.join(__dirname +'/../models/' , file.replace(/\.js$/, ''))
        )(sequelizer, Sequelize);

        console.log('here');
        console.log(model);
        models[Utils.functionName(file.split('.')[0])] = model;
      }
}

const database = {
	Sequelize: Sequelize,
    sequelizer: sequelizer,
    ...models
}
module.exports = database;