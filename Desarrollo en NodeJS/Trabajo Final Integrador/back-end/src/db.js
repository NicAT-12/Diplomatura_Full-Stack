import dns from 'node:dns';
import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Falta la variable de entorno MONGODB_URI');
  }
  dns.setServers(['8.8.8.8']);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB conectado: ${mongoose.connection.name}`);
};
