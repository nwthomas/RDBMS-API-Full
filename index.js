const express = require("express");
const knex = require("knex");
const cors = require("cors");
const helmet = require("helmet");
const knexConfig = require("./knexfile.js");
require("dotenv").config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.send("Working!");
});

// ======================================================== Cohorts
// Get all cohorts
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

// Get cohort by id
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts").where({ id: req.params.id });
    if (cohort.length) {
      res.status(200).json(cohort[0]); // Removed from array to return object
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

// Get all students in cohort
server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const students = await db("students").where({ cohort_id: req.params.id });
    if (students.length) {
      res.status(200).json(students);
    } else {
      res.status(404).json({
        message: "Could not find any students for that cohort in the database."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the cohort from the database." });
  }
});

// Post a new cohort
server.post("/api/cohorts", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json("Please include a name for the cohort and try again.");
  }
  try {
    const { name } = req.body;
    const cohort = await db("cohorts").insert({ name });
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the cohort to the database."
    });
  }
});

// Update an existing cohort
server.put("/api/cohorts/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .update({ name });
    if (cohort) {
      res.status(200).json({
        message: "Cohort updated successfully in the database.",
        numUpdated: cohort
      });
    } else {
      res
        .status(404)
        .json({ message: "Could not find that cohort in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the cohort in the database."
    });
  }
});

// Deletes cohort in the database
server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .del();
    if (cohort) {
      res.status(200).json({
        message: "Cohort deleted successfully from the database.",
        numDeleted: cohort
      });
    } else {
      res.status(404).json({
        message: "Cohort does not exist in the database.",
        numCohortDeleted: cohort
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the cohort from the database." });
  }
});

// ======================================================== Students
// Get all students records
server.get("/api/students", async (req, res) => {
  try {
    const students = await db("students");
    if (students.length) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({ message: "Could not find students' data in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the students' data.",
      error
    });
  }
});

// Get student by id
server.get("/api/students/:id", async (req, res) => {
  try {
    const student = await db("students")
      .join("cohorts", "students.cohort_id", "cohorts.id")
      .select("students.name", "students.id", "cohorts.name as cohort")
      .where("students.id", req.params.id);
    if (student.length) {
      res.status(200).json(student[0]); // Removed from array to return object
    } else {
      res
        .status(404)
        .json({ message: "Could not find the student in the database." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the student from the database." });
  }
});

// Post a new student
server.post("/api/students", async (req, res) => {
  if (!req.body.name || !req.body.cohort_id) {
    res
      .status(400)
      .json(
        "Please include a name and/or cohort ID for the student and try again."
      );
  }
  try {
    const { name, cohort_id } = req.body;
    const student = await db("students").insert({ name, cohort_id });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the student to the database."
    });
  }
});

// Update an existing student
server.put("/api/students/:id", async (req, res) => {
  const { name, cohort_id } = req.body;
  if (!name || !cohort_id)
    return res.status(400).json({
      message: "Please include a name and/or cohort ID in the update request."
    });
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .update({ name, cohort_id });
    if (student) {
      res.status(200).json({
        message: "Student updated successfully in the database.",
        numUpdated: student
      });
    } else {
      res
        .status(404)
        .json({ message: "Could not find that student in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the cohort in the database."
    });
  }
});

// Deletes student in the database
server.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .del();
    if (student) {
      res.status(200).json({
        message: "Student deleted successfully from the database.",
        numDeleted: student
      });
    } else {
      res.status(404).json({
        message: "Student does not exist in the database.",
        numCohortDeleted: student
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the student from the database." });
  }
});

// Server
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`
  ---------------------------------------
       Server Listening on Port ${port}
  ---------------------------------------
  `);
});
