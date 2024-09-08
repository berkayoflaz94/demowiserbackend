// models/Title.js
const mongoose = require('mongoose');

const TitleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  keywords: [String],
});

module.exports = mongoose.model('Title', TitleSchema);
