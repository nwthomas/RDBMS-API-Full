const express = require("express");
const cors = require("cors");
const server = express();
const knex = require("knex");
const knexConfig = require("./knexfile.js");
server.use(express.json());
server.use(cors());

const db = knex(knexConfig.development);
