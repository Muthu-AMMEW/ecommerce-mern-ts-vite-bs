const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.DB_STORAGE_URI);
let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'uploads' // Collection name for files
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

module.exports = {
    getGFS: () => gfs,
    getGridFSBucket: () => gridfsBucket,
};