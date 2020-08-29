const express = require("express");
const router = express.Router();
const TicketSchema = require("../models/tickets");

router.post("/", async (req, res) => {
  const ticket = new TicketSchema({
    userid: req.body.userid,
    phoneNumber: req.body.phoneNumber,
    timing: req.body.timing,
  });

  try {
    const savedTicket = await ticket.save();

    res.status(200).send(savedTicket);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await TicketSchema.findByIdAndUpdate(req.params.id, {
      $set: { timing: req.body.timing },
    });

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:timing", async (req, res) => {
  try {
    const foundTickets = await TicketSchema.find({ timing: req.params.timing });

    res.status(200).send(foundTickets);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
