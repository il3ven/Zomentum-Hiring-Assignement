const mongoose = require("mongoose");
const Agenda = require("agenda");
const TicketSchema = require("../models/tickets");

const agenda = new Agenda({ mongo: mongoose.connection });

agenda.define("remove-old-tickets", async () => {
  const thresholdDate = new Date(
    Date.now() - 8 /*hour*/ * 60 /*min*/ * 60 /*seconds*/ * 1000 /*milli*/
  );

  try {
    await TicketSchema.deleteMany({
      timing: { $lte: thresholdDate },
    });
  } catch (err) {
    console.error(err);
  }
});

(async function () {
  agenda.start();
  agenda.every("8 hours", "remove-old-tickets");
  console.log("Agenda is now running");
})();

module.exports = agenda;
