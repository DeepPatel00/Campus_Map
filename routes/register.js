// routes/register.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/register_student', async (req, res) => {
  try {
    const studentData = {
      name: req.body.name,
      email: req.body.email,
      cardID: req.body.card_id
    };

    const newStudent = await studentController.createStudent(studentData);
    res.json({ status: 'success', student: newStudent });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
