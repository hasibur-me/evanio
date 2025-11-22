import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Validate MongoDB URI is provided
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI || typeof mongoURI !== 'string' || mongoURI.trim() === '') {
      throw new Error(
        'MONGODB_URI is not defined or is empty. ' +
        'Please set the MONGODB_URI environment variable. ' +
        'Example: mongodb+srv://username:password@cluster.mongodb.net/dbname'
      );
    }

    console.log('🔌 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      w: 'majority',
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    // Handle app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message || error);
    throw error;
  }
};

