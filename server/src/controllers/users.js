const { users } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

exports.register = async (req, res) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: 'Failed',
      message: error.details[0].message,
    });
  }

  const isDup = await users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (isDup) {
    return res.status(400).send({
      status: 'Failed',
      message: 'Your email is already registered',
    });
  }

  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(data.password, salt);

    const response = await users.create({
      ...data,
      password: hashedPass,
    });

    const token = jwt.sign({ id: response.id }, process.env.TOKEN_KEY);
    res.status(200).send({
      status: 'success',
      message: 'Thank you for joining the Movies Cinema',
      user_data: {
        full_name: response.full_name,
        email: response.email,
        token_key: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: 'Failed',
      message: error.details[0].message,
    });
  }
  try {
    const response = await users.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!response) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Your email is not registered, please register your email!',
      });
    }

    const isPassValid = await bcrypt.compare(data.password, response.password);

    if (!isPassValid) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Incorrect password!',
      });
    }

    const token = jwt.sign({ id: response.id }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: 'Success',
      message: 'Login success',
      user: {
        id: response.id,
        full_name: response.full_name,
        email: response.email,
        public_id: response.public_id,
        url: response.url,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};
exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const response = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    if (!response) {
      return res.status(404).send({
        status: 'failed',
      });
    }

    res.send({
      status: 'success...',
      user: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await users.update(req.body, {
      where: {
        id,
      },
    });
    res.status(200).send({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

exports.editProfilePicture = async (req, res) => {
  try {
    const id = req.user.id;

    const isDup = await users.findOne({
      where: {
        id,
      },
    });
    if (isDup.url) {
      cloudinary.uploader.destroy(isDup.public_id);
    }
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ol_cinema_profile',
      quality: 60,
    });
    const response = await users.update(
      {
        ...req.body,
        public_id: upload.public_id,
        url: upload.secure_url,
      },
      {
        where: {
          id,
        },
      },
    );
    res.send({
      upload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
