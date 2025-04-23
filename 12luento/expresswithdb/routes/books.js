const booksRouter = require("express").Router();
const bookService = require("../services/bookservice");
const loginService = require("../services/loginservice");
const Joi = require("joi");
const sanitizer = require("../utils/sanitizer");
const bookdtos = require("../dtos/bookdto");

/**
 * Kontrolleri-kerros. Tätä voidaan nimittää myös bookController-nimellä.
 *
 * @param {
 * } request
 * @returns
 */

const schema = Joi.object({
  title: Joi.string().max(200).trim().required(),
  author: Joi.string().min(6).max(30).trim().required(),
  publishYear: Joi.number().integer().required(),
});

const validate = (req, res, next) => {
  console.log("-------------- validating book data ---------------------");
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const regex = /[\\\/()$*,;:&#+?%'"{}=´`\[\]]/g;
    const titleMatch = req.body.title.match(regex);
    const authorMatch = req.body.author.match(regex);
    const tokenMatch = req.cookies.token.match(regex);

    if (titleMatch !== null || authorMatch !== null || tokenMatch !== null) {
      throw new Error("Special chars are now allowed!");
    }
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Invalid input" }).end();
  }
};

const validateObjectId = (req, res, next) => {
  try {
    if (req.params.id.indexOf("$") >= 0) {
      return res.status(400).json({ error: "Vain numeroita ja kirjaimia" });
    }
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Invalid input" }).end();
  }
};

/**
 * Kuka tahansa käyttäjä saa listata kaikki kirjaston 
 * kirjat ilman sisäänkirjautumista.
 */

booksRouter.get("/", async (request, response) => {
  try {
      const books = await bookService.getBooks();
      console.log(books.length);
      const bookdtolist = books.map((book) => bookdtos.entityToDto(book));
      response.json(bookdtolist);
    } catch (exception) {
    console.log(exception.message);
    response.status(500).json({ error: "Virhe tapahtui" });
  }
});

booksRouter.delete("/:id", validateObjectId, async (request, response) => {
  try {
    const user = await loginService.authenticateRequest(request, response);
    if (user != null) {
      const id = request.params.id;
      const book = await bookService.getBookById(id);
      if (book === null) {
        //Resource not found
        response.status(404).end();
      } else {
        await bookService.deleteBook(id);
        response.status(204).end();
      }
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    console.log(exception.message);
    response.status(500).json({ error: "Virhe tapahtui" });
  }
});

booksRouter.get("/:id", validateObjectId, async (request, response) => {
  try {
    const user = await loginService.authenticateRequest(request, response);
    if (user != null) {
      const id = request.params.id;
      const book = await bookService.getBookById(id);
      if (book === null) {
        //Resource not found
        response.status(404).end();
      } else {
        const bookdto = bookdtos.entityToDto(book);
        response.status(200).json(bookdto).end();
      }
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    console.log(exception.message);
    response.status(500).json({ error: "Virhe tapahtui" });
  }
});

booksRouter.post("/", validate, async (request, response) => {
  try {
    const user = await loginService.authenticateRequest(request, response);
    if (user != null) {
      const book = {
        title: sanitizer.cleanInputFromHTML(request.body.title),
        author: sanitizer.cleanInputFromHTML(request.body.author),
        publishYear: sanitizer.cleanInputFromHTML(request.body.publishYear),
      };
      await bookService.addBook(book);
      response.status(200).end();
    } else {
      response
        .status(401)
        .json({ error: "Error when adding a book! Unauthorized" })
        .end();
    }
  } catch (exception) {
    console.log(exception.message);
    response.status(500).json({ error: "Virhe tapahtui" });
  }
});

module.exports = booksRouter;
