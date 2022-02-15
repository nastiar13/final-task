'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.belongsTo(models.users, {
        as: 'user',
        foreignKey: 'user_id',
      }),
        transactions.belongsTo(models.movies, {
          as: 'movie',
          foreignKey: 'movies_id',
        });
    }
  }
  transactions.init(
    {
      user_id: DataTypes.INTEGER,
      movies_id: DataTypes.INTEGER,
      bill: DataTypes.STRING,
      number_account: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'transactions',
    }
  );
  return transactions;
};
