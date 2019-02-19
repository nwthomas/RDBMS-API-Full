const express = require("express");
const knex = require("knex");
const cors = require("cors");
const helmet = require("helmet");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.send("Working!");
});

server.get("/api/cohorts", async (req, res) => {
  try {
    const db = await db("cohorts").get();
    if (db) {
      res.status(200).json(db);
    } else {
      res
        .status(404)
        .json({ message: "Could not find cohort data in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the cohort data.",
      error
    });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`
  ---------------------------------------
       Server Listening on Port ${port}
  ---------------------------------------
  `);
});
