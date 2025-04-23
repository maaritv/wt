const loginRouter = require("express").Router();
const Joi = require("joi");
const sanitizer = require("../utils/sanitizer");
const loginService = require("../services/loginservice");

loginRouter.get("/", async (request, response) => {
  response.send("Use post for logging in!");
});

const schema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().required(),
});

const validate = (req, res, next) => {
  console.log("Validating login data!!!");
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (e) {
    return res.status(400).json({ error: "Invalid input " }).end();
  }
};

/**
 * Login -funktio!
 */
//http://localhost:5000/login
loginRouter.post("/", validate, async (request, response) => {
  try {
    const username = sanitizer.cleanInputFromHTML(request.body.username);
    const password = sanitizer.cleanInputFromHTML(request.body.password);
    const token = await loginService.loginUser(username, password);
    const fifteenMinutes = 15 * 60 * 1000;
    response.cookie("token", "bearer " + token, {
      secure: true, //poista jos käytät http://localhost -ympäristössä
      httpOnly: true,
      maxAge: fifteenMinutes,
      sameSite: 'Strict'      //backend asettaa evästeen 
                              //vain itsensä luettavaksi, ei muiden sivustojen
    });
    console.log("login ok!")
    response.status(200).send({status: 'OK'}).end();
  } catch (error) {
    console.log(error.message);
    response.status(401).send("Login failed");
  }
});
//http://localhost:5000/login/logout
loginRouter.post("/logout", async (req, res) => {
  try {
    console.log("logging out...");
    res.clearCookie("token", { path: "/" });
    console.log("Token deleted!");
    res.status(200).end();
  } catch (e) {
    console.log("virhe " + e.message);
    res.status(500).end();
  }
});

module.exports = loginRouter;
