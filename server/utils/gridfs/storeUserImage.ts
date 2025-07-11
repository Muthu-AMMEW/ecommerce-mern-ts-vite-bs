import mongoose from 'mongoose';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';

import dotenv from 'dotenv';
import catchAsyncError from '../../middlewares/catchAsyncError.js';
dotenv.config({ path: `server/config/.env.${process.env.NODE_ENV}` });

// Use memory storage for multer
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });

// Global GridFSBucket instance
let gfsBucket: any;

// Create separate Mongoose connection for image DB
const imageDbConnection = mongoose.createConnection(process.env.DB_STORAGE_URI!);

imageDbConnection.once('open', () => {
  gfsBucket = new GridFSBucket(imageDbConnection.db!, {
    bucketName: 'userImages',
  });
  //   console.log('✅ GridFSBucket is ready on image DB');
});

imageDbConnection.on('error', (err) => {
  console.error('❌ Error connecting to image DB:', err);
});

// Upload buffer to GridFS
const uploadBufferToGridFS = (file: any) => {
  return new Promise((resolve, reject) => {
    const uploadStream = gfsBucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    uploadStream.end(file.buffer);

    uploadStream.on('finish', () => {
      resolve({
        ...file,
        id: uploadStream.id,
        filename: uploadStream.filename,
        uploadDate: new Date(),
        // bucketName: gfsBucket.s._bucketName,
      });
    });

    uploadStream.on('error', reject);
  });
};

// Middleware: Handle single file
const handleSingleUpload = catchAsyncError(async (req: any, res, next) => {
  if (!req.file) return next();
  try {
    req.file = await uploadBufferToGridFS(req.file);
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware: Handle multiple files
const handleArrayUpload = catchAsyncError(async (req: any, res, next) => {
  if (!req.files || !Array.isArray(req.files)) return next();
  try {
    req.files = await Promise.all(req.files.map(uploadBufferToGridFS));
    next();
  } catch (err) {
    next(err);
  }
});

// Expose API like multer-gridfs-storage
const userUpload = {
  single: (field: any) => [multerUpload.single(field), handleSingleUpload],
  array: (field: any) => [multerUpload.array(field), handleArrayUpload],
};

export { userUpload };
