"use strict";
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mountRoutes = require('./src/v1/routes');

// json parser
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// v1 api
mountRoutes(app);

// health check
app.get("healthz", (req, res) => res.send("ok!"));

app.listen(9000, () => {
    console.log("Application is running.");
});