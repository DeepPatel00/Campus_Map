const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");

exports.showRegisterForm = asyncHandler(async (req, res) => {
  const studentNumber = req.query.studentNumber;
  res.render("/register", { studentNumber });
});

exports.registerStudent = asyncHandler(async (req, res) => {
  const { name, email, studentNumber } = req.body;
  const eventId = req.query.eventId;

  // Check if the student number already exists in the database
  const existingStudent = await Student.findOne({ studentNumber });

  if (existingStudent) {
    // If the student already exists, redirect back to the events page
    if (eventId) {
      res.redirect(`/events/${eventId}`);
    } else {
      res.redirect("/events");
    }
  } else {
    // Otherwise, create a new student and redirect back to the events page
    const newStudent = await Student.create({ name, email, studentNumber, registered: true });

    if (eventId) {
      // If eventId is present, create an RSVP for the event
      await Rsvp.create({
        eventId,
        studentNumber,
      });
      res.redirect(`/events/${eventId}`);
    } else {
      res.redirect("/events");
    }
  }
});
// controllers/studentController.js
// Your existing imports and functions here...

const createStudent = async (studentData) => {
    const student = new Student(studentData);
    return await student.save();
  };
  
  module.exports = {
    // Your existing exports here...
    createStudent
  };
  

// Export the functions
module.exports = {
  showRegisterForm: exports.showRegisterForm,
  registerStudent: exports.registerStudent,
  createStudent
};
