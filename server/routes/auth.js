const joi = require('joi');
const { Router } = require('express');

const { signupSchema } = require('../validators/user');
const UserModel = require('../models/user');

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    let { body } = req;
    const { error, value } = joi.validate(body, signupSchema);
    if (error) {
      return res.status(400).send(error.message);
    }

    const User = new UserModel();
    await User.create(value);
    res.send('sucessfully created user');
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
