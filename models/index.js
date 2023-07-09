'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const people = require('./people.model.js');
const cold = require('./cold.model.js')
// const hot = require('./hot.model.js')

// connect to database
// URI: uniform resource identifier  L = locator
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;
// there is temporary in memory db created when you use sqlite:memory: it gets ereased when you disconnect from the db
let sequelize = new Sequelize(POSTGRES_URI);

module.exports={ dbInstance: sequelize,
   People: people(sequelize, DataTypes),
   Cold: cold(sequelize, DataTypes)
   };