const express = require("express");
const cors = require("cors");

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);

module.exports = app;