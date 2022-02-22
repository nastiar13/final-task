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
      // include: {
      //   model: categories,
      //   as: 'category',
      //   through: {
      //     model: movies_categories,
      //     attributes: {
      //       exclude: ['createdAt', 'updatedAt'],
      //     },
      //   },
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt'],
      //   },
      // },
      attributes: ['id', 'image'],
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
exports.getMovies = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await movies.findOne({
      where: {
        id,
      },
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

exports.editMovieMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const oldData = await movies.findOne({
      where: {
        id,
      },
    });

    const public_id = oldData.image.split('/');
    await cloudinary.uploader.destroy(public_id[7] + '/' + public_id[8]);
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'poster',
    });
    const response = await movies.update(
      {
        ...data,
        image: upload.secure_url,
      },
      {
        where: {
          id,
        },
      },
    );
    res.send({
      upload,
      response,
    });
  } catch (error) {
    res.send({
      msg: 'server error',
    });
  }
};
exports.editMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await movies.update(data, {
      where: {
        id,
      },
    });
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'server error',
    });
  }
};
