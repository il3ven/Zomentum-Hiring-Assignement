const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("Users", UserSchema);
