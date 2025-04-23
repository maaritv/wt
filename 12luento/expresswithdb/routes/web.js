const webRouter = require("express").Router();
const Joi = require("joi");

webRouter.get("/", (req, res) => {
  const servername = "https://localhost:5000";

  const instructions =
    `<html><body><h1>Ei tarvita sisäänkirjautumista</h1>
    <p>Palvelin asettaa tokenin evästeeseen.</p>
    <p>Tee itsellesi tunnus ja salasana käyttäen add user API-kutsua. Suorita sitten tunnuksilla sisäänkirjautuminen.</p>
    <h2>ADD USER</h2><p>POST ${servername}/users { "username": "myusername", "password": "mypassword" } </p>
    <h2>LOGIN</h2><p>POST ${servername}/login { "username": "myusername", "password": "mypassword" }  </p>
    <h1>Tarvitaan sisäänkirjautuminen</h1>
    <p>Käyttäjällä ville pwd: ville on kirjoja</p>
    <h2>Get users books</h2><p>GET ${servername}/mybooks</p></body></html>`

  res.send(instructions);
});


const cookieSchema = Joi.object({
  token: Joi.string().max(500).trim().required()
});

const querySchema = Joi.object({
  start: Joi.string().max(10).trim().required(),
  end: Joi.string().max(10).trim().required()
});

const paramSchema = Joi.object({
  bookid: Joi.number().integer().required(),
});

const validateRequest = (req, res, next) => {
  try {
    let error={}
    let cookieError = cookieSchema.validate(req.cookies).error;
    const queryError = querySchema.validate(req.query).error
    const paramError = paramSchema.validate(req.params).error

    const empty={}

    cookieError ? error.cookieError=cookieError.details : error.cookieError=empty
    queryError ? error.queryError=queryError.details : error.queryError=empty
    paramError ? error.paramError=paramError.details : error.paramError=empty

    if (cookieError || queryError || paramError) {
      return res.status(400).json({ error });
    }
    next();
  } catch (e) {
    return res.status(400).json({ error: "Invalid input: "+e }).end();
  }
};

webRouter.get("/test/:bookid", validateRequest, (req, res) => {

  const bookid= JSON.stringify(req.params.bookid)
  const queryparams = JSON.stringify(req.query);
  const cookies = JSON.stringify(req.cookies);
  const payload = JSON.stringify(req.body);
  const headers = JSON.stringify(req.headers);

  console.log(`bookid param: ${bookid}\n`)
  console.log(`Query Params: ${queryparams}\n`)
  console.log(`Cookies: ${cookies}\n`)
  console.log(`Header: ${headers}\n`)
  console.log(`Body: ${payload}\n`)
  
  res.send("hello");
});

module.exports = webRouter;
