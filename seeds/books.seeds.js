const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");
const { faker } = require("@faker-js/faker");

const bookList = [
  { title: "Harry Potter", author: "J.K. Rowling", pages: "543" },
  { title: "1984", author: "George Orwell", pages: "328" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: "281" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: "180" },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: "279" },
];

// Creamos libros adicionales
for (let i = 0; i < 45; i++) {
  const newBook = {
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    pages: faker.string.numeric(3),
  };
  bookList.push(newBook);
}
console.log(bookList);

connect().then(() => {
  console.log("We have connection");

  // Borrar datos
  Book.collection.drop().then(() => {
    console.log("Deleted books");

    // Añadimos libros
    const documents = bookList.map((book) => new Book(book));
    Book.insertMany(documents)
      .then(() => console.log("Saved data properly"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  });
});
