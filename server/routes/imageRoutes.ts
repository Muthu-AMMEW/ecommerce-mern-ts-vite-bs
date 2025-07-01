import express from 'express';
const router = express.Router();

import path from 'path';
import { getImage, getUserImage, deleteFile, postImage, getProductImage } from '../controllers/imageController.ts';

import { upload } from '../utils/gridfs/storeImage.ts';

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/authenticate.ts';



router.route('/image/:id').get(getImage);
router.route('/image/user/:id').get(getUserImage);
router.route('/image/product/:id').get(getProductImage);
router.route('/image').post(isAuthenticatedUser, authorizeRoles('admin'), upload.single('file'), postImage);
router.route('/image/:id').delete(deleteFile);

export default router;
