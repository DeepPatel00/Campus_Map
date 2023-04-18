const mongoose = require("mongoose");
const contactSchema  =  mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  members: {
    type: [
      {
        name1: { type: String },
        email: { type: String },
        year: { type: String },
        joined: { type: String },
      },
    ],
    required: true,
  },
},
  
  {
    timestamps: true,
});
module.exports = mongoose.model("Contact", contactSchema)


