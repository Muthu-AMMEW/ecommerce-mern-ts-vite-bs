const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL, process.env.CLIENT_URL_2],
    credentials: true   // required for cookies
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const imageRoutes = require('./routes/imageRoutes')
const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')
const order = require('./routes/orderRoutes')
const payment = require('./routes/paymentRoutes')

app.use(imageRoutes);
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;