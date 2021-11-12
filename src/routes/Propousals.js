const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Propousals = require("../models/Propousals");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkAdmin = require("../middleware/Admin");
const checkAuth = require("../middleware/Auth");
const client = require("../middleware/Redis");

router.post("/add", checkAuth, (req, res) => {
  const data = req.body;
  let {     title,
            description
        } = data;
  client.get("id", async (err, idUsuario) => {
console.log(idUsuario)
    if (err) {
      console.log(err);
    } else {
      try {
        const propousalsRegistred = await Propousals.findAll({
          where: { title },
        });
        if (propousalsRegistred.length) {
          res
            .status(409)
            .json({ message: `title in use, Please chose other` });
        } else {
          const newPropousals = await Propousals.create({
            title,
            description,
            idUser: idUsuario
          });
          res.status(200).json({ message: "Propousal created succesfully!" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while creating propousal;" });
      }
    }})
});


module.exports = router