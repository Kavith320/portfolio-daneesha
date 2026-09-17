import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export async function GET() {
  const status = {
    mongodb: { connected: false, message: '' },
    cloudinary: { connected: false, message: '' },
  };

  // Check MongoDB
  try {
    if (mongoose.connection.readyState === 1) {
      status.mongodb.connected = true;
      status.mongodb.message = 'Connected';
    } else if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      status.mongodb.connected = true;
      status.mongodb.message = 'Connected';
    } else {
      status.mongodb.message = 'MONGO_URI not configured';
    }
  } catch (error: any) {
    status.mongodb.message = error.message;
  }

  // Check Cloudinary
  try {
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      // Test ping
      await cloudinary.api.ping();
      status.cloudinary.connected = true;
      status.cloudinary.message = 'Connected';
    } else {
      status.cloudinary.message = 'Cloudinary environment variables missing';
    }
  } catch (error: any) {
    status.cloudinary.message = error.message || 'Ping failed';
  }

  return NextResponse.json(status);
}
