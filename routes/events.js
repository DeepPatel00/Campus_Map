const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  rsvpEvent,
  submitRsvp,
  showRegistrationForm,
  registerStudent,
  showRsvpForm
} = require("../controllers/eventsController");

router.get("/", getEvents); // Changed from eventsController.getEvents
router.post("/", createEvent); // Changed from eventsController.createEvent
router.get("/rsvp/:eventId", rsvpEvent); // Changed from eventsController.rsvpEvent
router.post("/rsvp/:eventId", submitRsvp); // Changed from eventsController.submitRsvp
router.get("/register", showRegistrationForm); // Changed from eventsController.showRegistrationForm
router.post("/register", registerStudent); // Changed from eventsController.registerStudent
router.get("/rsvp/:eventId/form", showRsvpForm); // Changed from eventsController.showRsvpForm

module.exports = router;
