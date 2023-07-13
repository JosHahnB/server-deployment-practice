'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const people = require('./people.model.js');
const cold = require('./cold.model.js')
const hot = require('./hot.model.js');
const Collection = require('./collection.js');
// const customer = require
// const order = require


// connect to database
// URI: uniform resource identifier  L = locator
const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;
// there is temporary in memory db created when you use sqlite:memory: it gets ereased when you disconnect from the db
let sequelize = new Sequelize(POSTGRES_URI);

const customerModel = customer(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);

 // make the associations
customerModel.hasMany(orderModel, {
   foreignKey: 'customer id', 
   sourceKey: id});

   orderModel.belongsTo(customerModel, {
      foreignKey: 'customer id', 
      sourceKey: id});

      const customerCollection = new Collection(customerModel);
      const orderCollection = new Collection(orderModel);

module.exports={ dbInstance: sequelize,
   People: people(sequelize, DataTypes),
   Cold: cold(sequelize, DataTypes),
   Hot: hot(sequelize, DataTypes),
   customerCollection,
   orderCollection
   };

