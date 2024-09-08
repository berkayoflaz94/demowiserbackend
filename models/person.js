const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
    required: true,
  },
  email: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  keywords: [{
    type: String,
  }],
}, { timestamps: true });

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
