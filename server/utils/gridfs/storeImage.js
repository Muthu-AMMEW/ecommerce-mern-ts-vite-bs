import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config({ path: 'server/config/config.env' });
const storage = new GridFsStorage({
    url: process.env.DB_STORAGE_URI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'images', // collection name
        };
    },
});

export const upload = multer({ storage });