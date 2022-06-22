module.exports = {
    secret: '45987654646',
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "vox_app",
    dialect: "mysql",
    query_log: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    port: 3001
  };