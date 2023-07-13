'use strict';
// this is the model... not the route

// creating a table
// where I am putting the table(in what database/connection)
// what are datatypes
const Hot = (dbInstance, DataTypes) =>
  dbInstance.define('Hot', {
    name: {
      type: DataTypes.STRING,
      // if you want the info to be required: use allowNull
      allowNull: false,
    },
    temp: {
      type: DataTypes.STRING,
    },
  });
// single line functions have an implied return
// const super = () => 'super'
// const super = () => {
// return 'super'
// }

module.exports = Hot;
