import products from '../data/products.json';
import Product from '../models/productModel';
import dotenv from 'dotenv';
import connectDatabase from '../config/database';

dotenv.config({ path: `server/config/.env.${process.env.NODE_ENV}` });
connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products deleted!')
        await Product.insertMany(products);
        console.log('All products added!');
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    }
    process.exit();
}

seedProducts();