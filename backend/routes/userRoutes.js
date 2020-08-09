const express = require("express");
const router = express.Router();
const User = require("../mongodb/models/userSchema");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ msg: "error occured", err }));
});

router.post("/add", (req, res) => {
  const user = new User({
    userName: req.body.userName,
  });
  user
    .save()
    .then((user) =>
      res.status(201).json({ msg: "user successfully created", user })
    )
    .catch((err) => res.status(400).json({ msg: "error occured", err }));
});

module.exports = router;
