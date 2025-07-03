// module.exports = func => (req, res, next) => {
//         return Promise.resolve(func(req, res, next)).catch(next)
// }

import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsyncError = (func: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default catchAsyncError;
