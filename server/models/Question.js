
const mongoose = require('mongoose');

//Šema za pitanja i odgovore
const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  question: { type: String, required: true },
  answer: { type: String, default: null },
  adminAnswered: { type: Boolean, default: false }, 
  isReadByAdmin: { type: Boolean, default: false }, 
  isReadByUser: { type: Boolean, default: true }, 
}, { timestamps: true }); //Automatski dodaje polja createdAt i updatedAt u svaki dokument

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
