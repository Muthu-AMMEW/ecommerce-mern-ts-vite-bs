// module.exports = func => (req, res, next) => {
//         return Promise.resolve(func(req, res, next)).catch(next)
// }

import { Request, Response, NextFunction } from 'express';

// Type for any async middleware
type AsyncMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const catchAsyncError = (func: AsyncMiddleware) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch(next);
    };

export default catchAsyncError;

