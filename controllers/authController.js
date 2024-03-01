const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
require('dotenv').config();

const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

const generateRefreshToken = (userId,role) => {
  return jwt.sign({ userId, role}, process.env.REFRESH_TOKEN_SECRET);
};


exports.signUp = async (req, res) => {
  try {
    console.log("inside sign up");
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      lateReturnFine: 0,
      role: 'user', // Assuming new users as regular users by default
    });
    

    const accessToken = generateAccessToken(newUser._id, newUser.role);

    res.status(201).json({ accessToken, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.signIn = async (req, res) => {
  try {

    console.log("inside sign in");
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Password is correct, generate an access token
      const accessToken = generateRefreshToken(user._id, user.role);
      console.log(accessToken);
      // Respond with the access token
      res.status(200).json({ accessToken, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
