const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkAdmin = require("../middleware/Admin");
const checkAuth = require("../middleware/Auth");
const client = require("../middleware/Redis");


router.get("/", checkAdmin, checkAuth, async (req, res) => {
  try {
    let user = await User.findAll();
    console.log("Getting users");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user.lenght > 1) {
      res.status(401).json({ message: " Unauthorized " });
    } else {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          res.status(401).json({ message: " Unauthorized " });
        } else if (result) {
          let token = JWT.sign({ email: email }, process.env.SECRET, {
            expiresIn: "1h",
          });
          client.set("token", token);
          client.set("email", email);
          res.status(200).json({ message: user });
        } else {
          res.status(400).json({ error: "User or Password are incorrect" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ error: "User or Password are incorrect" });
  }
});

router.post("/register", async (req, res) => {
  const data = req.body;
  let { name, lastName, email, password, birthday, businessman } = data;

  try {
    const emailAlreadyRegistered = await User.findAll({ where: { email } });

    if (emailAlreadyRegistered.length) {
      res.status(409).json({ message: `Username in use, Please chose other` });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const newUser = await User.create({
            name,
            lastName,
            email,
            birthday,
            password: hash,
            businessman
          });
          res.status(201).json({ message: "User created succesfully!" });
        }
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "you have empty fields or error was produce" });
  }
});



module.exports = router;
