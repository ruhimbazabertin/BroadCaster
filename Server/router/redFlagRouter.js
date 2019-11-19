import express from 'express';
import auth from '../middleware/auth';
import redFlagController from '../controller/redFlagController';

const redFlagRoute = express.Router();

redFlagRoute.post('/api/v1/redFlags', [auth], redFlagController.createRedFlag);

export default redFlagRoute;
