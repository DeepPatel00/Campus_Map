const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");
const Rsvp = require("../models/Rsvp");
const Student = require("../models/Student");
exports.getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      console.log('Fetched events:', events);
      console.log(events); // Add this line
      res.render("events", { events });
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).send("Error fetching events");
    }
  };
  
  

exports.createEvent = asyncHandler(async (req, res) => {
  const { title, time, date, location, description, eventImage, windowsToWorld } = req.body;
  const event = await Event.create({ title, time, date, location, description, eventImage, windowsToWorld });
  res.status(201).json({ event });
});

exports.rsvpEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  res.render('rsvp', { event });
});

exports.submitRsvp = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const studentNumber = req.body.studentNumber;

  // Check if the student number exists in the database
  const student = await Student.findOne({ studentNumber });

  if (student) {
    // Save the RSVP information
    const rsvp = await Rsvp.create({
      eventId,
      studentNumber,
    });

    res.redirect("/events"); // Redirect back to the events page
  } else {
    // Redirect to the registration page
    res.redirect("/register?studentNumber=" + studentNumber);
  }
});

exports.showRegistrationForm = async (req, res) => {
    const eventId = req.body.eventId;
    const studentNumber = req.query.studentNumber;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.render("register", { event, studentNumber });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching event");
    }
  };
  

exports.registerStudent = asyncHandler(async (req, res) => {
  const { name, email, studentNumber } = req.body;
  const eventId = req.query.eventId;
  const newStudent = await Student.create({ name, email, studentNumber });

  if (eventId) {
    // If eventId is present, create an RSVP for the event
    await Rsvp.create({
      eventId,
      studentNumber
    });
  }

  res.redirect('/events');
});

exports.showRsvpForm = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  res.render('rsvp', { eventId });
});

// Export the functions
// Export the functions
module.exports = {
    getEvents: exports.getEvents,
    createEvent: exports.createEvent,
    rsvpEvent: exports.rsvpEvent,
    submitRsvp: exports.submitRsvp,
    showRegistrationForm: exports.showRegistrationForm, // Changed from showRegisterForm
    registerStudent: exports.registerStudent,
    showRsvpForm: exports.showRsvpForm
  };