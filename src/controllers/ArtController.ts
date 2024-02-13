import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

import { ArtService } from '../services/ArtService';
import { CommentService } from '../services/CommentService';

const artController = Router();
const jsonParser = bodyParser.json();

artController.get(
  '/art',
  async (req: Request, res: Response, next: NextFunction) => {
    const { arts, error } = await new ArtService().getArts();

    if (error) {
      return next(error);
    }

    res.json(arts);
  },
);

artController.get(
  '/art/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { art, error } = await new ArtService().getArtById(id);

    if (error) {
      return next(error);
    }

    res.json(art);
  },
);

artController.post(
  '/art/:id/comments',
  jsonParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { comment, error } = await new CommentService().saveComment({
      artId: parseInt(id),
      ...req.body,
    });

    if (error) {
      return next(error);
    }

    res.status(201).json(comment);
  },
);

export { artController };
