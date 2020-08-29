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

    res.status(200).send(ticket);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
