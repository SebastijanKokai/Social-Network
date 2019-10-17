const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if there is a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // 401 message is for 'not authorized'
  }

  // Verify token
  try {
    // Decode the token with jwt.verify
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next(); // Callback function
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
