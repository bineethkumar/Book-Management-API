const mongoose = require("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number, 
    author: [Number],
    publication: [Number],
    category: [String],
});

//Create a Book Model
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;