const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const storage = new GridFsStorage({
    url: process.env.DB_STORAGE_URI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'userUploads', // collection name
        };
    },
});

exports.userUpload = multer({ storage });