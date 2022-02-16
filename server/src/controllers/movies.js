const { movies, categories, movies_categories } = require('../../models');
const cloudinary = require('../utils/cloudinary');

exports.addMovies = async (req, res) => {
  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'poster',
    });
    const response = await movies.create({
      ...req.body,
      image: upload.secure_url,
    });
    res.status(200).send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Server error',
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const response = await movies.findAll({
      include: {
        model: categories,
        as: 'category',
        through: {
          model: movies_categories,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
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
      message: 'Server error',
    });
  }
};
