import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import userModel from '../model/userModel';
import userSchema from '../helper/userValidation';

dotenv.config();

class UserController {
  //User signUp
  static createUser(req, res) {
    const {
 firstName, lastName, email, phoneNumber, userName, password, userType} = req.body;

    const idNumber = userModel.length + 1;
    const token = jwt.sign({ id: idNumber, email, userType }, process.env.SECRETY_KEY);
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = userSchema.validate({ id: idNumber, firstName, lastName, email, phoneNumber, userName, password: hashedPassword, userType});
    if (newUser.error) { return res.status(400).json({ status: 400, error: newUser.error.details[0].message }) ;} 
        const user = userModel.find((user) => user.email === email);
    if (user) { return res.status(409).json({ status: 409, error: 'email already exist, Please Login' }); }
    userModel.push(newUser.value);
    return res.status(201).json({
      status: 201,
      message: 'user created successfully',
      data: {
        token: token,
         firstName, lastName, email, phoneNumber, userName, password: hashedPassword, userType
        }

    });
  }

}

export default UserController;
