const { categories, movies_categories } = require('../../models');

exports.addMovieCategories = async (req, res) => {
  try {
    const response = await movies_categories.bulkCreate(req.body);
    res.send({
      msg: 'success',
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'server error',
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const response = await categories.create(req.body);
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'server error',
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const response = await categories.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'server error',
    });
  }
};
