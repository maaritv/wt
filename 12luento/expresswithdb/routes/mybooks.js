const booksRouter = require("express").Router();
const loginService = require("../services/loginservice");
const userService = require("../services/userservice");
const Joi = require("joi");
const sanitizer = require("../utils/sanitizer");
const bookdtos = require("../dtos/bookdto");

/**
 * Kontrolleri-kerros. Tätä voidaan nimittää myös myBooksController-nimellä.
 *
 * @param {
 * } request
 * @returns
 */

const schema = Joi.object({
  token: Joi.string().max(500).trim().required()
});

const validateRequest = (req, res, next) => {
  try {
    const { error } = schema.validate(req.cookies);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (e) {
    return res.status(400).json({ error: "Invalid input" }).end();
  }
};

/**
 * Palautetaan vain kirjat, jotka ovat käyttäjän omien 
 * kirjojen listalla. (huom. ei tarkoita automaattisesti lainauksia, 
 * koska ei ole alkamis- ja loppumispäivää, ainoastaan assosiaatio
 * käyttäjän ja kirjan välillä.
 * oma kirja voisi olla esim. kirja lukulistalla.)
 */

/** validointi sisältää evästeiden validoinnin, koska evästettä käytetään 
 * authentikointiin (päätyy tietokantahakuun mukaan). */

booksRouter.get("/", validateRequest, async (request, response) => {
  try {
    const user = await loginService.authenticateRequest(request, response);
    console.log("found user " + user);
    if (user !== null) {
      console.log("books for user " + user.username);
      const userBooks = await userService.getUsersBooks(user.id);
      console.log(
        typeof userBooks + " return " + userBooks.length + " " + userBooks[0],
      );
      const bookdtolist = userBooks.map((userBook) =>
        bookdtos.entityToDto(userBook),
      );
      console.log(bookdtolist);
      response.status(200).json(bookdtolist).end();
    } else {
      console.log("User was not found");
      response.status(401).json({ error: "Virhe tapahtui" });
    }
  } catch (exception) {
    console.log(exception.message);
    response.status(500).json({ error: "Virhe tapahtui " + exception.message });
  }
});

module.exports = booksRouter;
