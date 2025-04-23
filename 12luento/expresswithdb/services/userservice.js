const bcrypt = require("bcrypt");
const User = require("../models/user");
const Book = require("../models/Book");
const { sanitizeFilter } = require("mongoose");

async function addBookForUser(book, user) {
  const newBook = new Book(book);
  user.books.push(newBook);
  const updateUser = await user.save();
  return updateUser;
}

async function getUsersBooks(userid) {
  const books = await Book.find({ user: userid }).populate("user");
  return books;
}

async function getUserByUsername(username) {
  const existingUser = await User.findOne({ username: username });
  console.log(existingUser);
  return existingUser;
}

async function getUserById(userid) {
  const existingUser = await User.findOne({ id: userid });
  console.log(existingUser);
  return existingUser;
}

async function getUsers() {
  const users = await User.find();
  return users;
}

async function createUser(username, password, name) {
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    //User exists with same username
    let error = new Error("Error creating user. User already exists");
    error.code = 400;
    throw error;
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    //Ylimääräinen puhdistus varmuuden vuoksi lisäksi mongogoose-kirjaston omalla
    //suodattimella.
    const cleaned_user = sanitizeFilter({ username, name, passwordHash });
    const newUser = new User(cleaned_user);
    const savedUser = await newUser.save();
    return savedUser;
  }
}

module.exports = {
  getUserById,
  getUsers,
  getUserByUsername,
  createUser,
  getUsersBooks,
  addBookForUser,
};
