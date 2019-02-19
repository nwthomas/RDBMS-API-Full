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
    const cohorts = await db("cohorts");
    if (cohorts) {
      res.status(200).json(cohorts);
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

server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts").where({ id: req.params.id });
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: "Could not find the cohort in the database." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the cohort from the database." });
  }
});

// server.post("/api/cohorts", async (req, res) => {
//   if (!req.name)
//     return res
//       .status(400)
//       .json({ message: "Please include a cohort name and try again." });
//   try {
//     const db = await DB("cohorts").insert(req.body);
//     if (db) {
//       res.status(201).json(db);
//     } else {
//       res
//         .status(404)
//         .json({ message: "Could not create the cohort in the database." });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "There was an error creating the cohort data.",
//       error
//     });
//   }
// });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`
  ---------------------------------------
       Server Listening on Port ${port}
  ---------------------------------------
  `);
});
