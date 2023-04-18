const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
    required: true,
  },
  windowsToWorld: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
