const express = require('express');
const router = express.Router();
const path = require('path');
const { getImages, getUserImages } = require('../controllers/imageController');


router.route('/image/:id').get(getImages);
router.route('/image/user/:id').get(getUserImages);

module.exports = router;
