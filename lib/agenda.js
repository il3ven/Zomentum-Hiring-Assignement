const mongoose = require("mongoose");
const Agenda = require("agenda");

const agenda = new Agenda({ mongo: mongoose.connection });

agenda.define("test", () => console.log("Job running"));

agenda.start();
agenda.every("3 seconds", "test");

module.exports = agenda;
