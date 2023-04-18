const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const Contact = require("../models/contactModel");

router.get("/show", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("index", { contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.route("/").get(getContacts);
router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
