const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  year: String,
  joined: String,
});

const advisorSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const clubSchema = new mongoose.Schema({
  clubLogo: String,
  title: String,
  advisor: advisorSchema,
  description: String,
  time: String,
  date: String,
  location: String,
  members: [memberSchema],
});

module.exports = mongoose.model('Club', clubSchema);
