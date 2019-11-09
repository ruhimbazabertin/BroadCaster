import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const auth = (req, res, next) => {
  try {
    const { token } = req.headers;
    const userToken = jwt.verify(token, process.env.SECRETY_KEY);
    if (userToken) {
      req.user = userToken;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      status: 403,
      error: 'Authentication failed',
    });
  }
};

export default auth;