// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Korisnik koji postavlja pitanje
  question: { type: String, required: true },
  answer: { type: String, default: null },
  adminAnswered: { type: Boolean, default: false }, // Indikator da je admin odgovorio
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
