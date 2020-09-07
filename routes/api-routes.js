const express = require("express");
const router = require("express").Router();

const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({}).then((exercises) => {
      exercises.map((exercise) =>
        console.log("exercises field", exercise.exercises)
      );
      res.json(exercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  console.log("we are in the get/range api route");
  db.Workout.find({})
    .limit(7).then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({body, params}, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercises: body}},
    {new: true}
  ).then((exercises) => {
    console.log("Here is what got put in put route", exercises);
    res.json(exercises);
  });
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create({}).then((exercises) => res.json(exercises))
    .catch((err) => {
      console.log("err", err);
      res.json(err);
    });
});

module.exports = router;
