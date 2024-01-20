import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null }; // Used to cache connections to the MongoDB database in the cached variable to prevent new connections every time you want to use it.

export async function connectToDatabase() {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error("MONGODB_URL is missing!!!");

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: "evently",
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}