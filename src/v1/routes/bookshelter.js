"use strict";
const express = require("express");

const bookshelter = express.Router();

bookshelter
    .get("/", function (req, res) { res.send("get all") })
    .get("/:id", function (req, res) { res.send("get by id") })
    .post("/", function (req, res) { res.send("post") })
    .put("/", function (req, res) { res.send("put") })
    .delete("/", function (req, res) { res.send("delete") });

module.exports = bookshelter;