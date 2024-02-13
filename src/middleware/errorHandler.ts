import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error({
    message: error.message,
    metadata: {
      body: req.body,
      params: req.params,
      validations: error.validations,
      error,
    },
  });

  const errorCode = error.statusCode || 500;
  res.status(errorCode).json({
    message: error.message,
    code: error.code,
    validations: error.validations,
  });
};
