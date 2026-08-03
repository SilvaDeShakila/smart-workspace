import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
      return;
    }

    if (!mongoServer) {
      mongoServer = await MongoMemoryServer.create();
    }

    await mongoose.connect(mongoServer.getUri());
    console.log('MongoDB memory server started');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
}
