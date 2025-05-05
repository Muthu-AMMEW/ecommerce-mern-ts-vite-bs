const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const {getGFS, getGridFSBucket} = require('../utils/gridfs/Storagedb')
const {userGetGFS, userGetGridFSBucket} = require('../utils/gridfs/userStoragedb')
const { ObjectId } = require('mongodb');


//Get images - /image/:id
exports.getImages = catchAsyncError(async (req, res, next) => {

    {
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
    }
})


//Get user images - /image/user/:id
exports.getUserImages = catchAsyncError(async (req, res, next) => {

    {
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
    }
})

