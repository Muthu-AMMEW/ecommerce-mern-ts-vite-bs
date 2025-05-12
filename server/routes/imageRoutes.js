const express = require('express');
const router = express.Router();
const path = require('path');
const { getImage, getUserImage, deleteFile, postImage, getProductImage } = require('../controllers/imageController');
const { upload } = require('../utils/gridfs/storeImage');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');


router.route('/image/:id').get(getImage);
router.route('/image/user/:id').get(getUserImage);
router.route('/image/product/:id').get(getProductImage);
router.route('/image').post(isAuthenticatedUser, authorizeRoles('admin'), upload.single('file'), postImage);
router.route('/image/:id').delete(deleteFile);
module.exports = router;
