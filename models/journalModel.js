const mongoose = require("mongoose");


const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [60, "Title cannot exceed 60 characters"],
    minLength: [3, "Title should have at least 3 characters"]
  },
  content: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("journals", journalSchema);
