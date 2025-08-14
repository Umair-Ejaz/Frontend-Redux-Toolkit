'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}
  Todo.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
