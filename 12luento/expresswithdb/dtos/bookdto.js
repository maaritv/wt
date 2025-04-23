function entityToDto(book) {
  const dto = {
    bookid: book.id,
    name: book.title,
    authorName: book.author,
    published: book.publishYear,
  };
  return dto;
}

module.exports = { entityToDto };
