import mongoose from 'mongoose';

export let isMongoConnected = false;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ No MONGODB_URI provided. Running in high-performance In-Memory Decision Store mode.');
    return;
  }

  try {
    // Set a short timeout for connection attempt so server startup is not delayed
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    console.warn('⚠️ MongoDB connection attempt failed. Falling back to In-Memory Decision Store mode.', (err as Error).message);
    isMongoConnected = false;
  }
}
