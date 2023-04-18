const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);
