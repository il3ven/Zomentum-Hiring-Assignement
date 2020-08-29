const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: String,
  lastname: String,
});

module.exports = mongoose.model("Users", UserSchema);
