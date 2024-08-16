import mongoose from "mongoose";

const connedtDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}/mydb`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:",error);
  }
};

export {connedtDb};
