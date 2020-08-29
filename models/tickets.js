const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  phoneNumber: Number,
  timing: Date, // Timing for movie show
});

module.exports = mongoose.model("Tickets", UserSchema);
