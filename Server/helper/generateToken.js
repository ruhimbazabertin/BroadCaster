import jwt from 'jsonwebtoken';

class generateToken {
  static generate(email, userType) {
    return jwt.sign({ email, userType }, process.env.SECRETY_KEY);
  }
}

export default generateToken;
