const { transactions, users, movies } = require('../../models');
const cloudinary = require('../utils/cloudinary');

exports.isBuy = async (req, res) => {
  try {
    console.log(req.user.id);
    const response = await transactions.findOne({
      where: {
        user_id: req.user.id,
        movies_id: req.params.id,
        status: 'success',
      },
    });
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'Server error',
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'bill',
    });
    const response = await transactions.create({
      ...req.body,
      bill: upload.secure_url,
    });
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'failed',
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const response = await transactions.findAll({
      include: [
        {
          model: users,
          as: 'user',
          attributes: ['full_name'],
        },
        {
          model: movies,
          as: 'movie',
          attributes: ['title'],
        },
      ],
    });
    res.send({
      transactions: response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'failed',
    });
  }
};
exports.getTransactions = async (req, res) => {
  try {
    const response = await transactions.findAll({
      where: {
        user_id: req.user.id,
      },
      include: {
        model: movies,
        as: 'movie',
        attributes: ['id', 'title'],
      },
    });
    res.send({
      transactions: response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'failed',
    });
  }
};
exports.getSuccessTransactions = async (req, res) => {
  try {
    const response = await transactions.findAll({
      where: {
        user_id: req.user.id,
        status: 'success',
      },
      include: {
        model: movies,
        as: 'movie',
        attributes: ['id', 'image'],
      },
      attributes: ['id'],
    });
    res.send({
      transactions: response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'failed',
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const response = await transactions.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: 'failed',
    });
  }
};
