"use strict";
const express = require("express");
const router = express.Router();

router
    .get("/:id", getBook)
    .get("/", getBooks)
    .put("/", addBook)
    .post("/:id", updateBook)
    .delete("/:id", removeBook);

// postgres connection pool
const db = require('../db/index');

// import classes
const { Book, BookFactory } = require('../repos/book');

// book repos instance
const bookFactory = new BookFactory(db);

// get a book by id using async and await
async function getBook (req, res) {

    const { id } = req.params;

    const book = await bookFactory.find(id);

    res.json(book.normalized);
}

// get books using promise
function getBooks (req, res) {

    bookFactory.all().then((books) => {
        res.json(books.map((e) => { return e.normalized }));
    }).catch((err) => {
        res.send(err.stack);
    });

}

// add new book to table using async and await
async function addBook (req, res) {

    const body = req.body;

    const book = await bookFactory.add(body.title, body.author, body.description, body.release_date);

    res.send(book.normalized);
}

async function updateBook (req, res) {

    const { id } = req.params;
    const { title, author, description, release_date } = req.body;

    const book = await bookFactory.update(id, title, author, description, release_date);
    
    res.json(book.normalized);
}

async function removeBook (req, res) {

    const { id } = req.params;

    const book = await bookFactory.remove(id);
    
    res.json(book.normalized);
}
    
module.exports = router;