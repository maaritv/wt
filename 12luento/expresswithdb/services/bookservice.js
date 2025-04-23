const Book = require("../models/Book");

async function getBooks() {
  const books = await Book.find();
  return books;
}

async function addBook(book) {
  const newBook = new Book(book);
  const addedBook = await newBook.save();
  return addedBook;
}

async function deleteBook(bookid) {
  const book = await Book.findById(bookid);
  if (book !== null) {
    //Ennen poistoa pitäisi tarkistaa, onko kirja käyttäjien listoissa.
    //Jos ei, se voidaan poistaa
    await book.deleteOne();
  }
}

async function getBookById(bookid) {
  const book = await Book.findById(bookid);
  return book;
}

module.exports = { getBooks, addBook, deleteBook, getBookById };
