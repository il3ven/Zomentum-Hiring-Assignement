const express = require("express");
const mongoose = require("mongoose");
const Agenda = require("agenda");
require("dotenv").config();
const app = express();
const PORT = 5000;

const userRoutes = require("./routes/users");
const ticketRoutes = require("./routes/tickets");

app.use(express.json());

// ROUTES
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("REST API for Zomentum Assignment");
});

// MONGODB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`REST API is running at http://localhost:${PORT}`);
  });
});

// AGENDA JS
const agenda = new Agenda({ mongo: db });
agenda.define("test", async (job) => {
  console.log("Agenda is running");
});
(async function () {
  // IIFE to give access to async/await
  await agenda.start();

  await agenda.every("3 seconds", "test");
})();
