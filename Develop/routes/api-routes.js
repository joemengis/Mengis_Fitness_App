const express = require("express");
const router = require("express").Router();

const db = require('../models');


router.get("/api/workouts", (req, res) => {
  db.Workout.find({}).then(exercises => {
    console.log("exercises are :", exercises);
    res.json(exercises);
  }).catch(err=>{
    res.json(err);
  });  
});

router.put("/api/workouts/:workout", ({ params, body }, res) => {
  db.Workout.findOneAndUpdate(
    {_id: params.id},
    {$push: { excercises: body } },
    {upsert: true, useFindandModify: false },
    (updatedWorkout) => {
      res.json(updatedWorkout);
    }
  );
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create({}).then((newWorkout) => {
    res.json(newWorkout);
  });
});


module.exports = router;