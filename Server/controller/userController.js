import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import userModel from '../model/userModel';
import generateToken from '../helper/generateToken';
import userSchema from '../helper/userValidation';

dotenv.config();

class UserController {
  // User signUp
  static createUser(req, res) {
    const {
      firstName, lastName, email, phoneNumber, userName, password, userType,
    } = req.body;

    const idNumber = userModel.length + 1;
    const token   = generateToken.generate(email, userType);
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = userSchema.validate({
      id: idNumber, firstName, lastName, email, phoneNumber, userName, password: hashedPassword, userType,
    });
    if (newUser.error) { return res.status(400).json({ status: 400, error: newUser.error.details[0].message }); }
    const user = userModel.find((user) => user.email === email);
    if (user) { return res.status(409).json({ status: 409, error: 'email already exist, Please Login' }); }
    userModel.push(newUser.value);
    return res.status(201).json({
      status: 201,
      message: 'user created successfully',
      data: {
        token,
        firstName,
        lastName,
        email,
        phoneNumber,
        userName,
        password: hashedPassword,
        userType,
      },

    });
  }

  // signin
  // User signIn
  static login(req, res) {
    const { email, password } = req.body;
    const findUser = userModel.find((user) => user.email === email);
    if (findUser) {
      const verifyPassword = bcrypt.compareSync(req.body.password, findUser.password);
      if (verifyPassword) {
        const userType = findUser.userType;
        const token   = generateToken.generate(email, userType);
        return res.status(200).json({
          status: 200,
          message: `Logged in as ${findUser.firstName}`,
          data: { token },
        });
      }
      return res.status(401).json({ status: 401, error: 'Incorrect UserName or Password' });
    }
    return res.status(401).json({ status: 401, error: 'Incorrect UserName or Password' });
  }
}

export default UserController;
