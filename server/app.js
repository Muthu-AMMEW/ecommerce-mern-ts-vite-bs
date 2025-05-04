const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


const { GridFSBucket } = require('mongodb');

const { ObjectId } = require('mongodb');


const mongoURI = process.env.DB_STORAGE_URI;
const conn = mongoose.createConnection(mongoURI);

let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'uploads' // Collection name for files
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const storage = new GridFsStorage({
    url: process.env.DB_STORAGE_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.get('/image/:id', async (req, res) => {
    const file = await gfs.files.findOne({ _id: new ObjectId(req.params.id) });

    if (!file) {
        return res.status(404).json({ error: 'No file found with that ID' });
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const readstream = gridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    } else {
        res.status(400).json({ error: 'File is not an image' });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;