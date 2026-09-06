const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];
    try {
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token' });
  }
};
