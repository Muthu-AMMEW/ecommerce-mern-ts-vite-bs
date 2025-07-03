import ErrorHandler from '../utils/errorHandler';
import User from '../models/userModel';
import catchAsyncError from './catchAsyncError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction } from 'express';

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Login to handle this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = await User.findById(decoded.id)
    next();
})

export const authorizeRoles = (...roles) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}