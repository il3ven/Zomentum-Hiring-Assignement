const express = require("express");
const router = express.Router();
const TicketSchema = require("../models/tickets");

// Get all Tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await TicketSchema.find({});
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Book Ticket
router.post("/", async (req, res) => {
  const ticket = new TicketSchema({
    userid: req.body.userid,
    phoneNumber: req.body.phoneNumber,
    timing: req.body.timing,
  });

  try {
    const foundTickets = await TicketSchema.find({ timing: req.body.timing });

    if (foundTickets.length > 20) {
      throw "More than 20 tickets exist";
    }

    const savedTicket = await ticket.save();

    res.status(200).send(savedTicket);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Ticket Timing
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

// View tickets for a particular time
router.get("/:timing", async (req, res) => {
  try {
    const foundTickets = await TicketSchema.find({ timing: req.params.timing });

    res.status(200).send(foundTickets);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a particular ticket
router.delete("/:id", async (req, res) => {
  try {
    await TicketSchema.deleteOne({ _id: req.params.id });

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user detail for this ticket id
router.get("/:ticketid/users", async (req, res) => {
  try {
    TicketSchema.findById(req.params.ticketid)
      .populate("userid")
      .exec(function (err, ticket) {
        try {
          res.status(200).json(ticket.userid);
        } catch (error) {
          res.status(500).send(err);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
