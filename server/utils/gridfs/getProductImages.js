const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.DB_STORAGE_URI);
let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'productImages' // Collection name for files
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('productImages');
});

module.exports = {
    productGetGFS: () => gfs,
    productGetGridFSBucket: () => gridfsBucket,
};