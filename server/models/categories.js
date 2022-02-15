'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      categories.belongsToMany(models.movies, {
        as: 'movie',
        through: {
          as: 'bridge',
          model: 'movies_categories',
        },
        foreignKey: 'categories_id',
      });
    }
  }
  categories.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'categories',
    }
  );
  return categories;
};
