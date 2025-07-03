import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';

export const fileDeleter = async (fileId: string, collectionName: string) => {
  try {
    const conn = await mongoose.createConnection(process.env.DB_STORAGE_URI!).asPromise(); // ensures we wait for the connection

    const bucket = new GridFSBucket(conn.db!, { bucketName: collectionName });
    // Check if the file exists before attempting to delete it
    const file = await bucket.find({ _id: new ObjectId(fileId) }).toArray();
    if (file.length === 0) {
      console.log(`File with ID ${fileId} not found in ${collectionName} collection.`);
      await conn.close(); // cleanup the connection
      return;
    } else { // Proceed to delete the file if it exists
      // Delete the file from the specified collection
      await bucket.delete(new ObjectId(fileId));
      console.log(`File with ID ${fileId} deleted from ${collectionName} collection.`);
      await conn.close(); // cleanup the connection
    }
  } catch (error) {
    console.log(error)
  }

};
