const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubsController');

router.get('/', clubController.getClubs);
router.post('/addclub', clubController.createClub);

module.exports = router;
