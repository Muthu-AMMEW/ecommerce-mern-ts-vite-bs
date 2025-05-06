const express = require('express');
const router = express.Router();
const path = require('path');
const { getImages, getUserImages, deleteFile, postImages } = require('../controllers/imageController');
const { upload } = require('../utils/gridfs/storeImage');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');


router.route('/image/:id').get(getImages);
router.route('/image/user/:id').get(getUserImages);
router.route('/image').post(isAuthenticatedUser, authorizeRoles('admin'),upload.single('file'), postImages);
router.route('/image/:id').delete(deleteFile);
module.exports = router;
