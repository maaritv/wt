var express = require("express");
var router = express.Router();
const sanitizer = require("../utils/sanitizer");
const Joi = require("joi");
const userdtos = require("../dtos/userdto")
const userService = require("../services/userservice");

/* GET users listing. */
router.get("/", async (request, response) => {
  const users = await userService.getUsers();
  return response.json(users);
});

const schema = Joi.object({
  username: Joi.string().alphanum().trim().required(),
  password: Joi.string().min(6).max(30).trim().required(),
  name: Joi.string().min(6).max(50).trim().required(),
});

const validate = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (JSON.stringify(req.body).indexOf("$") >= 0) {
      return res.status(400).json({ error: "Query selectors are not allowed" });
    }
    next();
  } catch (e) {
    return res.status(400).json({ error: "Invalid input" }).end();
  }
};

/**
 * POST new user to the database.
 * Ensin tarkistetaan ja puhdistetaan syötteet.
 * Escape lisää kenoviivan merkkien, joita yleensä esiintyy ohjelmakoodissa kuten
 * heittomerkit, sulkeet, kauttaviivat, pienempi ja suurempikuin-merkit jne. eteen
 * jotta ne eivät päädy toimintakelpoisena tietokantaan tai ohjelmakoodiin
 * suoritettavaksi.
 */

router.post("/", validate, async (request, response) => {
  console.log(request.body);
  const username = sanitizer.cleanInputFromHTML(request.body.username);
  const name = sanitizer.cleanInputFromHTML(request.body.name);
  const password = sanitizer.cleanInputFromHTML(request.body.password);

  try {
    const createdUser = await userService.createUser(username, password, name);
    const userdto=userdtos.entityToDto(createdUser)
    response.status(200).json({ userdto });
  } catch (exception) {
    //Älä logita poikkeuksia, ne saattavat pitää sisällään esim. salasanoja, kuten tämä.
    //console.log(JSON.stringify(exception));
    if (exception.code && exception.code === 400) {
      response.status(400).json({ error: "Username already exists" }).end();
    } else {
      response.status(500).json({ error: "Error creating new user" }).end();
    }
  }
});

module.exports = router;
