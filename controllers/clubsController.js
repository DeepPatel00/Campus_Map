const asyncHandler = require("express-async-handler");
const Club = require("../models/Club");


const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find();
console.log(clubs); // Add this line
res.render('clubs', { clubs: clubs });

  try {
    const clubs = await Club.find();
    res.render('clubs', { clubs: clubs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


const createClub = async (req, res) => {
  try {
    const { clubLogo, title, advisor, description, time, date, location } = req.body;
    const club = await Club.create({ clubLogo, title, advisor, description, time, date, location });
    res.status(201).json({ club });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getClubs,
  createClub
};
