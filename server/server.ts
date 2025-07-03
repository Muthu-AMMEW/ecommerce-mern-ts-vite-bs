import app from './app';
import connectDatabase from './config/database';
import { initializeGridFS } from './utils/gridfs/getStoredImage';
import { initializeProductGridFS } from './utils/gridfs/getStoredProductImage';
import { initializeUserGridFS } from './utils/gridfs/getStoredUserImage';

async function databaseConnections() {
    await connectDatabase();
    await initializeGridFS();
    await initializeUserGridFS();
    await initializeProductGridFS();
}
databaseConnections();

const server = app.listen(process.env.PORT, () => {
    console.log(`My Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
    console.log(`Local: http://localhost:${process.env.PORT}/`)
})

process.on('unhandledRejection', (error) => {
    const err = error as Error;
    console.log(`Error: ${err.message}`);
    console.log(`Error: ${error}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    })
})

process.on('uncaughtException', (error) => {
    const err = error as Error;
    console.log(`Error: ${err.message}`);
    console.log(`Error: ${error}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    })
})



