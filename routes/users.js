const express = require("express");
const router = express.Router();
const UserSchema = require("../models/users");

// Create a user
router.post("/", async (req, res) => {
  const user = new UserSchema({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  try {
    const savedUser = await user.save();

    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserSchema.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
