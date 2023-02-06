import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   throw new Error(
//     `Please define the MONGO_URL environment variable inside .env.local`
//   );
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.com) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGO_URL, options).then(mongoose => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
