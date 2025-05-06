const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');
const catchAsyncError = require('../../middlewares/catchAsyncError');

exports.fileDeleter = catchAsyncError(async (fileId, collectionName) => {
    const conn = await mongoose.createConnection(process.env.DB_STORAGE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).asPromise(); // ensures we wait for the connection

    const bucket = new GridFSBucket(conn.db, { bucketName: collectionName });

    await bucket.delete(new ObjectId(fileId));
    console.log(`File with ID ${fileId} deleted from ${collectionName} collection.`);
    await conn.close(); // cleanup the connection
});
