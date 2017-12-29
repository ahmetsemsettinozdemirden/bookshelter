"use strict";
const book = require("./book");
const bookshelter = require("./bookshelter");

module.exports = (app) => {
    app.use('/v1/book', book);
    app.use('/v1/bookshelter', bookshelter);
}