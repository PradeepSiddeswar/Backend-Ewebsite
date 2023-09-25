// models/CricketScore.js
const mongoose = require('mongoose');

const cricketScoreSchema = new mongoose.Schema({
  matchId: String,
  team1: String,
  team2: String,
  score: String,
  status: String,
  // Add other fields as needed
});

const CricketScore = mongoose.model('CricketScore', cricketScoreSchema);

module.exports = CricketScore;
module.exports = mongoose.model('CricketScore', cricketScoreSchema);
