const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("./userservice");

const getTokenFrom = (request) => {
  //console.log(JSON.stringify(request.cookies))
  const authorization = request.cookies.token;
  console.log("cookies in request!" + JSON.stringify(request.cookies));
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log(authorization.substring(7));
    return authorization.substring(7);
  }
  return null;
};

/**
 * Palauttaa jwt-tokenista läytyvän käyttäjän tiedot
 * tai null, jos käyttäjää ei löydy,
 * tokenia ei ole tai se ei ole validi.
 *
 * @param {} request
 * @returns
 */

async function authenticateRequest(request) {
  const token = getTokenFrom(request);
  console.log("got token " + token);
  if (token === null) {
    return null;
  }
  let decodedToken = null;
  decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken || !decodedToken.id) {
    return null;
  } else {
    console.log("decoded token " + JSON.stringify(decodedToken));
    const user = await userService.getUserByUsername(decodedToken.username);
    if (user === null) {
      return null;
    } else {
      console.log("found user !" + user.username);
      return user;
    }
  }
}

async function loginUser(username, password) {
  const user = await userService.getUserByUsername(username);
  console.log("found user " + user);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (passwordCorrect === false) {
      throw new Error("invalid username or password");
    } else {
      const userForToken = {
        username: user.username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 600000, // 10 minutes
      });
      return token;
    }
  } else {
    throw new Error("invalid username or password");
  }
}

module.exports = { authenticateRequest, loginUser };
