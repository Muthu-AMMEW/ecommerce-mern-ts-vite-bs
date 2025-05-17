const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const { getGFS, getGridFSBucket } = require('../utils/gridfs/getStoredImage')
const { userGetGFS, userGetGridFSBucket } = require('../utils/gridfs/getStoredUserImage')
const { productGetGFS, productGetGridFSBucket } = require('../utils/gridfs/getStoredProductImage');
const { ObjectId } = require('mongodb');
const { fileDeleter } = require('../utils/gridfs/fileDeleter');


//Get images - /image/:id
exports.getImage = catchAsyncError(async (req, res, next) => {
    const gfs = getGFS();
    const gridfsBucket = getGridFSBucket();
    const file = await gfs.files.findOne({ _id: new ObjectId(req.params.id) });

    if (!file) {
        return next(new ErrorHandler('No file found with that ID', 404));
    }
    if (file.contentType.includes('image/')) {
        const readstream = gridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);

    } else {
        return next(new ErrorHandler('File is not an image', 400));
    }
})


//Get user images - /image/user/:id
exports.getUserImage = catchAsyncError(async (req, res, next) => {
    const userGfs = userGetGFS();
    const userGridfsBucket = userGetGridFSBucket();
    const file = await userGfs.files.findOne({ _id: new ObjectId(req.params.id) });

    if (!file) {
        return next(new ErrorHandler('No file found with that ID', 404));
    }
    if (file.contentType.includes('image/')) {
        const readstream = userGridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);

    } else {
        return next(new ErrorHandler('File is not an image', 400));
    }
})


//Get Pouduct images - /image/product/:id
exports.getProductImage = catchAsyncError(async (req, res, next) => {
    const productGfs = productGetGFS();
    const productGridfsBucket = productGetGridFSBucket();
    const file = await productGfs.files.findOne({ _id: new ObjectId(req.params.id) });

    if (!file) {
        return next(new ErrorHandler('No file found with that ID', 404));
    }
    if (file.contentType.includes('image/')) {
        const readstream = productGridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);

    } else {
        return next(new ErrorHandler('File is not an image', 400));
    }
})

//Delete images - /image/:id
exports.deleteFile = catchAsyncError(async (req, res, next) => {
    const fileId = req.params.id;
    await fileDeleter(fileId, 'images');
    res.status(200).json({
        success: true,
        message: 'File deleted successfully'
    })
})


//Post Images - /image/:id
exports.postImage = catchAsyncError(async (req, res, next) => {
    res.send(req.file);
})