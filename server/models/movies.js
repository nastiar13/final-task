'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movies.belongsToMany(models.categories, {
        as: 'category',
        through: {
          as: 'bridge',
          model: 'movies_categories',
        },
        foreignKey: 'movies_id',
      }),
        movies.hasMany(models.transactions, {
          as: 'transactions',
          foreignKey: 'movies_id',
        });
    }
  }
  movies.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      url: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'movies',
    }
  );
  return movies;
};
