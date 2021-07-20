const express = require("express");
//Database
const database = require("./database");
//Initialization
const booky = express();
/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/ 

booky.get("/",(req, res)=>{
    return res.json({books: database.books})
})
/*
Route           /is/(ISBN value)
Description     Get specofic book based on ISBN
Access          Public
Parameter       ISBN
Methods         GET
*/ 
booky.get("/is/:isbn",(req, res) =>{
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});
/*
Route           /c/(category name)
Description     Get specific book based on category
Access          Public
Parameter       category
Methods         GET
*/ 
booky.get("/c/:category",(req, res) =>{
    const getSpecificBook = database.books.filter((book) => 
    book.category.includes(req.params.category)
    );
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found of this category ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});

/*
Route           /lang/(language name)
Description     Get specific book based on language
Access          Public
Parameter       language
Methods         GET
*/ 
booky.get("/lang/:language",(req, res) =>{
    const getSpecificBook = database.books.filter((book) => 
    book.language.includes(req.params.language)
    );
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found of this language ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});

/*
Route           /author
Description     Get all author
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/author",(req,res) => {
    return res.json({authors: database.author });
}
);

/*
Route           /author/(author name)
Description     Get specific author name
Access          Public
Parameter       Name
Methods         GET
*/
booky.get("/author/:name",(req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => 
    author.name.includes(req.params.name)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found of this name ${req.params.name}`});
    }
    return res.json({authors: getSpecificAuthor});
});
/*
Route           /author/book
Description     Get specific author based on book ISBN
Access          Public
Parameter       ISBN
Methods         GET
*/
booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => 
    author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found of this book ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});


booky.listen(3000, ()=> console.log("Server is running"));
