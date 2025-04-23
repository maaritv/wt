require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const myBooksRouter = require("./routes/mybooks");
const booksRouter = require("./routes/books");

const webRouter = require("./routes/web");



const app = express();
app.use(cookieParser());

/**
 * client app in repl.it:
 * https://replit.com/@maaritv/FetchWithLogin#src/components/LoginForm.jsx
 */

//konfigurioi tähän paikallisen React.js-sovelluksen kehitysympäristön URL ja portti.
//jos käytät react.js -sovelluksella porttia 3000!, vaihda palvelin porttiin 5000.
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//Va3krVpT2xBO8PL1
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

//palvelimen portti!
const port = 5000;

app.use("/", webRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/mybooks", myBooksRouter);
app.use("/books", booksRouter);
app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
