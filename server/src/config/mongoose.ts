import mongoose from 'mongoose';

function isErrorWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as { message: string }).message === 'string'
  );
}

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI environment variable not found!');
    }
    console.log('Waiting for MongoDB...');

    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected.');
  } catch (err: unknown) {
    if (isErrorWithMessage(err)) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  }
};
