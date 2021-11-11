const config = require("../config/index");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//   }
// );
// module.exports = sequelize;

const  Sequelize  = require('sequelize');
const sql = new Sequelize('mysql://root@localhost:3306/coderHack');

module.exports = sql;