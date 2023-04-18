const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const contactRoutes = require('./routes/contactRoutes');
const mongoose = require("mongoose");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const Contact = require('./models/contactModel');
const dotenv = require("dotenv").config();
const logger = require('morgan');
const path = require('path');
const eventRoutes = require('./routes/events');
const clubRoutes = require('./routes/clubs');
const Event = require('./models/Event');
const Club = require('./models/Club');
const clubController = require('./controllers/clubsController');
const rsvpRoutes = require('./routes/rsvpRoutes');
const session = require('express-session');

connectDb();

const app = express();
const port = process.env.PORT || 5001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  req.session.studentNumber = '12345'; // Replace '12345' with a valid student number
  next();
});

app.use('/events', eventRoutes);
app.use('/clubs', clubRoutes);
app.use('/rsvp', rsvpRoutes);
app.use('/register', eventRoutes);
app.use(errorHandler);

// ... other routes
app.get('/rfid', async (req, res) => {
  const cardNumber = req.query.cardNumber;
  const student = await Student.findOne({ cardNumber: cardNumber });

  if (student) {
    res.send("registered");
  } else {
    res.send("not_registered");
  }
});


app.get('/edit', (req, res) => {
  res.render('index', { index: 'Edit events and clubs here'});
});

const registerRoutes = require('./routes/register');

// configurations and routes .
app.use('/register', registerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});