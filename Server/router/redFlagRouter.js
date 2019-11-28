import express from 'express';
import auth from '../middleware/auth';
import validateRedFlag from '../middleware/validateRedFlag';
import redFlagController from '../controller/redFlagController';

const redFlagRoute = express.Router();

redFlagRoute.post('/api/v1/redFlags', [auth, validateRedFlag], redFlagController.createRedFlag);
redFlagRoute.get('/api/v1/red-flags', [auth], redFlagController.viewRedFlag);
redFlagRoute.get('/api/v1/red-flags/:id', [auth], redFlagController.viewSpecificRedFlag);
redFlagRoute.patch('/api/v1/red-flags/:id/comment', [auth], redFlagController.updateComment);
redFlagRoute.patch('/api/v1/red-flags/:id/location', [auth], redFlagController.updateLocation);
redFlagRoute.delete('/api/v1/red-flags/:id', [auth], redFlagController.deleteSpecificRedFlag);

export default redFlagRoute;
