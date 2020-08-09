const express = require("express");
const router = express.Router();
const Exercise = require("../mongodb/models/exerciseSchema");

router.get("/", (req, res) => {
  Exercise.find()
    .then((exercises) => res.status(200).json(exercises))
    .catch((err) => res.status(400).json({ msg: "error occured", err }));
});

router.post("/add", (req, res) => {
  const exercise = new Exercise({
    userName: req.body.userName,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  });
  exercise
    .save()
    .then((exercise) =>
      res.status(201).json({ msg: "user successfully created", exercise })
    )
    .catch((err) => res.status(400).json({ msg: "error occured", err }));
});

router.get("/exercise/:id", (req, res) => {
  Exercise.find({ _id: req.params.id })
    .then((exercise) =>
      res.status(200).json({ msg: "Exercise found", exercise })
    )
    .catch((err) => res.status(400).json({ msg: "Exercise not found", err }));
});

router.put("/exercise/:id", (req, res) => {
  Exercise.updateOne(
    { _id: req.params.id },
    {
      $set: {
        userName: req.body.userName,
        description: req.body.description,
        duration: req.body.duration,
      },
    }
  )
    .then(() => res.status(200).json({ msg: "Exercise updated" }))
    .catch((err) => res.status(400).json({ msg: "Exercise not found", err }));
});

router.delete("/exercise/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ msg: "Exercise deleted" }))
    .catch((err) => res.status(400).json({ msg: "Exercise not found", err }));
});
module.exports = router;
