const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("Users", UserSchema);
