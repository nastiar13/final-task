'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.transactions, {
        as: 'transactions',
        foreignKey: 'user_id',
      });
    }
  }
  users.init(
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      public_id: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return users;
};
