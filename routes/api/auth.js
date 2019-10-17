const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//@route    GET api/auth
//@desc     Test route
//@access   Public

router.get('/', auth, async (req, res) => {
  try {
    // Excluding the password while finding the user
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Server error');
  }
});

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is invalid').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // If I don't find a user with that email, send an error
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid email/password' }] });
      }
      // Comparing the hashed password in mongoDB and the inserted password by user
      const isMatch = await bcrypt.compare(password, user.password);

      // If they are not a match, send invalid email/password
      // Using the same message for error response,
      // because I don't want users to know what they typed in wrong/right
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid email/password' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // Get the token for the valid email and password
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 1000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
