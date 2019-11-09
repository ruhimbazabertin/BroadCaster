import express from 'express';
import userController from '../controller/userController';

const userRoute = express.Router();

userRoute.post('/api/v1/signUp', userController.createUser);



export default userRoute;