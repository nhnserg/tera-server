import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URL } = process.env;

const conectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('\x1b[32m✅ Database connection successful\x1b[0m');
  } catch (error) {
    console.error('\x1b[31m⚠️ MongoDB connection error:\x1b[0m', error);
    process.exit(1);
  }
};

export default conectMongo;
