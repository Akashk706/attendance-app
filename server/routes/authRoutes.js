const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

const USERS_FILE = './data/users.json';

router.post('/register', async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const users = JSON.parse(
      fs.readFileSync(USERS_FILE)
    );

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify(users, null, 2)
    );

    res.json({
      message: 'User Registered'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;

    const users = JSON.parse(
      fs.readFileSync(USERS_FILE)
    );

    const user = users.find(
      user => user.email === email
    );

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      { id: user.id },
      'mysecretkey',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

module.exports = router;