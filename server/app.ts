import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, `config/.env.${process.env.NODE_ENV}`) });
const app = express();

// List of allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL_DEV,
  process.env.CLIENT_URL_DEV_2,
  process.env.CLIENT_URL_PRE,
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_2
];
// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // required for cookies
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL_PRE, process.env.CLIENT_URL, process.env.CLIENT_URL_2],
//     credentials: true   // required for cookies
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

import imageRoutes from './routes/imageRoutes';
import products from './routes/productRoutes';
import auth from './routes/authRoutes';
import order from './routes/orderRoutes';

app.use(imageRoutes);
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

app.use(errorMiddleware)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
  })
}

export default app;