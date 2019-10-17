const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User from models folder
const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter 6 characters or more').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // I have to make this function async in order this to work
    try {
      // If I find a user with the same email, send an error
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // no naked people etc.
        d: 'mm' // default image
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // await waits until the function isn't done so it can continue on doing work
      const salt = await bcrypt.genSalt(10); // 10 rounds of encryption, this is recommended in the doc.

      user.password = await bcrypt.hash(password, salt); // Creates a hash

      // Save it into DB
      await user.save(); // Using await instead of .then because it looks more clear

      const payload = {
        user: {
          id: user.id // MongoDB uses '_id', but mongoose doesn't require it
        }
      };

      // Creates a token that we assign to user id
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
