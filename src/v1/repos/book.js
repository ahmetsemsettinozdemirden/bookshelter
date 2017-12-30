"use strict";

class Book{

    constructor (id, title, author, description, release_date){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.release_date = release_date;
    }

    // TODO: add preconditions

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
    
    get title() {
        return this._title;
    }
    
    set title(title) {
        this._title = title;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        this._author = author;
    }
    
    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }
    
    get release_date() {
        return this._release_date;
    }

    set release_date(release_date) {
        this._release_date = release_date;
    }

    get normalized() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            description: this.description,
            release_date: this.release_date
        };
    }

}

class BookFactory {

    constructor(db) {
        this.db = db;
    }

    get db() {
        return this._db;
    }

    set db(db) {

        // TODO: upgrade preconditions

        if(db === null)
            console.error("Null argument exception: db");
        else
            this._db = db;
    }

    async find(id) {

        try {

            // get book by id
            const query = await this.db.query("SELECT * FROM public.\"Book\" WHERE id = $1", [id]);
            
            // create and return new book instance
            const book = new Book(query.rows[0].id, query.rows[0].title, query.rows[0].author, query.rows[0].description, query.rows[0].release_date);

            return book;
        } catch (error) {
            return error;
        }
    }

    async all() {

        try {

            // get all books
            const query = await this.db.query("SELECT * FROM public.\"Book\" ORDER BY id ASC");
            const books = [];

            // convert rows to Book instances
            query.rows.forEach((e) => {
                books.push(new Book(e.id, e.title, e.author, e.description, e.release_date));
            });

            return books;
        } catch (error) {
            return error;
        }
    }
    
    async add(title, author, description, release_date) {

        try {
            
            // insert new book to table
            const query = await this.db.query("INSERT INTO public.\"Book\" (title, author, description, release_date) VALUES ($1, $2, $3, $4) RETURNING *", [ title, author, description, release_date ]);

            // create and return new book instance
            const book = new Book(query.rows[0].id, query.rows[0].title, query.rows[0].author, query.rows[0].description, query.rows[0].release_date);

            return book;
        } catch (error) {
            return error;
        }
    }
    
    async update(id, title, author, description, release_date) {

        try {

            // update book by id
            const query = await this.db.query("UPDATE public.\"Book\" SET title = $2, author = $3, description = $4, release_date = $5 WHERE id = $1 RETURNING *", [ id, title, author, description, release_date ]);
            
            // create and return updated book instance
            const book = new Book(query.rows[0].id, query.rows[0].title, query.rows[0].author, query.rows[0].description, query.rows[0].release_date);

            return book;
        } catch (error) {
            return error;
        }
    }
    
    async remove(id) {
        
        try {
            
            // remove book by id
            const query = await this.db.query("DELETE FROM public.\"Book\" WHERE id = $1 RETURNING *", [ id ]);

            // create and return deleted book instance
            const book = new Book(query.rows[0].id, query.rows[0].title, query.rows[0].author, query.rows[0].description, query.rows[0].release_date);

            return book;
        } catch (error) {
            return error;
        }
    }
}

module.exports = { Book, BookFactory };