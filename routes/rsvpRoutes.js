const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');
const studentController = require('../controllers/studentController'); // Add this line

// Show the RSVP form
router.get('/event/:eventId', rsvpController.showRsvp);

// Process the RSVP form submission
router.post('/', rsvpController.submitRsvp);

// Show the registration form with eventId
router.get('/register/:eventId', studentController.showRegisterForm); // Update this line

// Process the registration form submission
router.post('/register', studentController.registerStudent); // Update this line

module.exports = router;
