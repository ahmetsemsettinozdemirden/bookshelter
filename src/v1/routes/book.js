"use strict";
const express = require("express");
const book = express.Router();

const BookRepository = require('../repos/book');

book.get("/", getBooks)
    .get("/:id", getBook)
    .put("/", addBook)
    .post("/", updateBook)
    .delete("/:id", removeBook);

// get books using promise
function getBooks (req, res) {

    BookRepository.all().then((books) => {

        const { rows } = books;

        res.json(rows);
    }).catch((err) => {
        res.send(err.stack);
    });

}

// get a book by id using async and await
async function getBook (req, res) {

    const { id } = req.params;

    try {
        const book = await BookRepository.find(id);

        res.json(book.rows[0]);
    } catch (err) {
        res.send(err.stack);
    }

}

// add new book to table using async and await
async function addBook (req, res) {

    const body = req.body;
    
    try {
        const book = await BookRepository.add([ body.title, body.author, body.description, body.release_date ]);

        res.send(book.rows[0]);
    } catch (error) {
        res.send(error);
    }
}

function updateBook (req, res) {

    // TODO
    
    res.json({});
}

function removeBook (req, res) {

    // TODO
    
    res.json({});
}
    
module.exports = book;