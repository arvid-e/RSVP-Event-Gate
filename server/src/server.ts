import dotenv from 'dotenv';
import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import { connectDB } from './config/mongoose';
import { isErrorWithMessage } from './utils/errors';

dotenv.config();
const port = 3000;
let server: Server | undefined;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Access API at http://localhost:${port}/api`);
    });
  } catch (error: unknown) {
    if (isErrorWithMessage(error)) {
      console.error('Failed to start server:', error.message);
    } else {
      console.error('An unknown error occurred during server startup.');
    }
  }
};

const gracefulShutdown = async (signal: NodeJS.Signals) => {
  console.log(`\n${signal} signal received: Closing HTTP server.`);

  if (!server) {
    console.error('Server was not running or initialized.');
    process.exit(1);
  }

  server.close(() => {
    console.log('HTTP server closed.');

    mongoose
      .disconnect()
      .then(() => {
        console.log('Mongoose connection disconnected.');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error disconnecting Mongoose:', err);
        process.exit(1);
      });
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
