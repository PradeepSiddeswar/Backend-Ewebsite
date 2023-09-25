const mongoose = require("mongoose");

const specialistSchema = new mongoose.Schema({
  name: String,
  title: String,
  language: String,
  mrp: String,
  image: String,
  tags: String,
  ratings: Number,
});

const Specialist = mongoose.model("Specialist", specialistSchema);

module.exports = Specialist;
