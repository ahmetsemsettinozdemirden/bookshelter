"use strict";
const { Pool } = require('pg');

const pool = new Pool();

// TODO: event listener to catch errors

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}