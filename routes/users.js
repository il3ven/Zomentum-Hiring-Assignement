const express = require("express");
const router = express.Router();
const UserSchema = require("../models/users");

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

module.exports = router;
