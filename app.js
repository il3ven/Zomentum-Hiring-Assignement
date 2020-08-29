const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

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
db.once("open", async function () {
  console.log("MongoDB is now connected");

  // EXPRESS
  app.listen(80, () => {
    console.log(`Express is now listening`);
  });

  // AGENDA
  require("./lib/agenda.js");
});
