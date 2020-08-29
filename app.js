const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 5000;

const userRoutes = require("./routes/users");

app.use(express.json());

// MONGODB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to db");
});

// ROUTES
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("REST API for Zomentum Assignment");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
