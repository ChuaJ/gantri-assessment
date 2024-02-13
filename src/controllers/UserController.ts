import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

import { UserService } from '../services/UserService';

const userController = Router();
const jsonParser = bodyParser.json();

userController.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const { users, error } = await new UserService().getUsers();

    if (error) {
      return next(error);
    }

    res.json(users);
  },
);

userController.post(
  '/users',
  jsonParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, error } = await new UserService().saveUser(req.body);

    if (error) {
      return next(error);
    }

    res.status(201).json(user);
  },
);

export { userController };
