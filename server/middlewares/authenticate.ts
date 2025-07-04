import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';
import catchAsyncError from './catchAsyncError.js';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export const isAuthenticatedUser = catchAsyncError(async (req: any, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Login to handle this resource', 401))
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = await User.findById(decoded.id)
    next();
})

export const authorizeRoles = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}   