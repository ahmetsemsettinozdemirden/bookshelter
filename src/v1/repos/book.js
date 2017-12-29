"use strict";
const db = require('../db/index');

function find(id) {
    return db.query("SELECT * FROM public.\"Book\" WHERE id = $1", [id]);
}

function all() {
    return db.query("SELECT * FROM public.\"Book\"");
}

function add(props) {
    return db.query("INSERT INTO public.\"Book\" (title, author, description, release_date) VALUES ($1, $2, $3, $4) RETURNING *", props);
}

function update(id, props) {
    
    // TODO
}

function remove(id) {
    
    // TODO
}

module.exports = { find, all, add, update, remove };