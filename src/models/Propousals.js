const { Sequelize } = require('sequelize');
const db = require('../db/database');

const Propousals = db.define('Propousals', {
 title: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
 description: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
idUser:{
  type: Sequelize.STRING,
    allowNull: false,
},idComments:{
  type: Sequelize.STRING,
    allowNull: false,
},
  visble:{
  type: Sequelize.BOOLEAN
}
},{
timestamps:false
});

module.exports = Propousals;
