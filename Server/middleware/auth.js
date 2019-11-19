import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../model/userModel';

dotenv.config();
const auth = (req, res, next) => {
  try {
    const { token } = req.headers;
    const userToken = jwt.verify(token, process.env.SECRETY_KEY);
    const validUserToken = userModel.find((user) => user.email === userToken.email);
    if (validUserToken) {
      req.user = userToken;
      next();
    }else{
      return res.status(401).json({status: 401, message: "Invalid token"});
    }
  } catch (error) {
    return res.status(403).json({
      status: 403,
      error: 'Authentication failed',
    });
  }
};

export default auth;
