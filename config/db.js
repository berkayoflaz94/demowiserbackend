// config/database.js
const mongoose = require('mongoose');
require('dotenv').config(); // dotenv'i yükle
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB’ye başarıyla bağlanıldı');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
