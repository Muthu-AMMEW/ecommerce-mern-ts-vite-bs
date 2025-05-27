import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import Grid from 'gridfs-stream';

const conn = mongoose.createConnection(process.env.DB_STORAGE_URI);
let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'images' // Collection name for files
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

export const getGFS = () => gfs;
export const getGridFSBucket = () => gridfsBucket;
