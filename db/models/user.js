'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Team, { foreignKey: 'Team_id' })
      User.hasMany(models.File, { foreignKey: 'User_id' });
    }
  };
  User.init({
    Login: DataTypes.STRING,
    Password: DataTypes.STRING,
    FullName: DataTypes.STRING,
    Team_id: DataTypes.INTEGER,
    Role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
