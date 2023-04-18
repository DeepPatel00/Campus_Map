const Event = require('../models/Event');
const Student = require('../models/Student');
const Rsvp = require('../models/Rsvp');

exports.showRsvp = async (req, res) => {
    const eventId = req.params.eventId;
    const studentNumber = req.session.studentNumber;
  
    console.log('Event ID:', eventId);
  
    if (!studentNumber) {
      res.redirect('/login');
    } else {
      try {
        const event = await Event.findById(eventId);
        if (event) {
          console.log('Event:', event);
          res.render('rsvp', {
            event: event,
            studentNumber: studentNumber,
          });
        } else {
          console.log('Event not found');
          res.status(404).send('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).send('Error fetching event');
      }
    }
  };
  
  

exports.submitRsvp = async (req, res) => {
  const { eventId, studentNumber } = req.body;
  const { attending, guests } = req.body;

  try {
    const rsvp = await Rsvp.findOne({ eventId, studentNumber });

    if (rsvp) {
      rsvp.attending = attending;
      rsvp.guests = guests;
      await rsvp.save();
    } else {
      const newRsvp = new Rsvp({ eventId, studentNumber, attending, guests });
      await newRsvp.save();
    }

    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting RSVP');
  }
};
