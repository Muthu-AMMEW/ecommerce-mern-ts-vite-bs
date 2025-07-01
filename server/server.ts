import app from './app.ts';
import connectDatabase from './config/database.ts';
import { initializeGridFS } from './utils/gridfs/getStoredImage.ts';
import { initializeProductGridFS } from './utils/gridfs/getStoredProductImage.ts';
import { initializeUserGridFS } from './utils/gridfs/getStoredUserImage.ts';

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

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    })
})

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    })
})



