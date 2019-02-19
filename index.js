const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());

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
