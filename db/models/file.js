'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.User, {foreignKey: 'User_id'})
    }
  };
  File.init({
    Title: DataTypes.STRING,
    Path: DataTypes.STRING,
    User_id: DataTypes.INTEGER,
    Note: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
