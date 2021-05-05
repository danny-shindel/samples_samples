const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      req.user = err ? null : decoded.user;
      // Below line is for the check token exp exercise
      req.exp = err ? null : new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    // No token was sent in the request
    req.user = null;
    return next();
  }
};