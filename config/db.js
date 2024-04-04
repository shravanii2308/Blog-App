const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongoose Connected`.bgMagenta.white);
  } catch (error) {
    console.log(`MONGO connect ERROR ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
