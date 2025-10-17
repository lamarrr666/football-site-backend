const express = require("express");
const cors = require("cors");
require("dotenv").config();

const matchesRoute = require("./routes/matches");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", matchesRoute);

app.get("/", (req, res) => {
  res.send("Football API running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
