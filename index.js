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

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`
  ---------------------------------------
       Server Listening on Port ${port}
  ---------------------------------------
  `);
});