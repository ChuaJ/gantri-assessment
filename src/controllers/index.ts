import { Router } from 'express';
import { userController } from './UserController';
import { artController } from './ArtController';

const api = Router();

api.use(userController);
api.use(artController);

export { api };
