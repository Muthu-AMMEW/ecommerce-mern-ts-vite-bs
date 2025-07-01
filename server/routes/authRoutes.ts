import express from 'express';
const router = express.Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    generateEmailOtp,
    verifyEmailOtp
} from '../controllers/authController.ts';

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/authenticate.ts';

import { userUpload } from '../utils/gridfs/storeUserImage.ts';


router.route('/register').post(userUpload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/email/generate-otp').post(isAuthenticatedUser, generateEmailOtp);
router.route('/email/verify-otp').put(isAuthenticatedUser, verifyEmailOtp);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/update').put(isAuthenticatedUser, userUpload.single('avatar'), updateProfile);

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);


export default router;
