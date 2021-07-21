const express = require("express");
//Database
const database = require("./database");
//Initialization
const booky = express();
//configuration
booky.use(express.json());
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
    author.name === req.params.name);
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found of this name ${req.params.name}`});
    }
    return res.json({authors: getSpecificAuthor});
});
/*
Route           /author/book/(ISBN value)
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

/*
Route           /publications
Description     Get all publications
Access          Public
Parameter       none
Methods         GET
*/
booky.get("/publications", (req,res)=>{
    return res.json({publications: database.publication});
});

/*
Route           /publications/(publication name)
Description     Get specific publication
Access          Public
Parameter       publication name
Methods         GET
*/

booky.get("/publications/:name",(req,res)=>{
    const getSpecificPublication = database.publication.filter((publication) => 
    publication.name === req.params.name);
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publication found of this name ${req.params.name}`});
    }
    return res.json({publications: getSpecificPublication});
});

/*
Route           /publications/book/(ISBN value)
Description     Get list of publications based on book
Access          Public
Parameter       ISBN
Methods         GET
*/
booky.get("/publications/book/:isbn",(req,res)=>{
    const getSpecificPublication = database.publication.filter((publication) => 
    publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publication found of this book ${req.params.isbn}`});
    }
    return res.json({publications: getSpecificPublication});
});

/*
Route           /book/add
Description     add new books
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/book/add",(req, res)=>{
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books : database.books})
});

/*
Route           /author/add
Description     add new authors
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/author/add",(req,res)=>{
    const{newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({authors : database.author})
});

/*
Route           /publication/add
Description     add new publications
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/publication/add",(req,res)=>{
    const{newPublication} = req.body;
    database.publication.push(newPublication);
    return res.json({publications : database.publication})
});

/*
Route           /book/update/title/:isbn
Description     update book title
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({books: database.books});
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req, res)=>{
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //update author database
    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books : database.books, author : database.author});
});

/*
Route           /author/update/name/:id
Description     update author name using its ID
Access          Public
Parameter       ID
Methods         PUT
*/
booky.put("/author/update/name/:id",(req,res)=>{
    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.id)){
            author.name = req.body.newAuthorName;
            return;
        }
    });

    return res.json({author: database.author});
});

/*
Route           /publication/update/name/:id
Description     update publication name using its ID
Access          Public
Parameter       ID
Methods         PUT
*/
booky.put("/publication/update/name/:id",(req,res)=>{
    database.publication.forEach((publication)=>{
        if(publication.id === parseInt(req.params.id)){
            publication.name = req.body.newPublicationName;
            return;
        }
    });

    return res.json({publication: database.publication});
});

/*
Route           /publication/update/book/:isbn
Description     update/add books in publication
Access          Public
Parameter       ISBN
Methods         PUT
*/
booky.put("/publication/update/book/:isbn",(req, res)=>{
    //update the publication database
    database.publication.forEach((publication)=>{
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
    });
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({books : database.books, 
        publication: database.publication, 
        message: "Sucessfully updated publication!"});
});

/*
Route           /book/delete
Description     delete a book using its ISBN
Access          Public
Parameter       ISBN
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn 
    );

    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/*
Route           /book/delete/author
Description     delete an author from a book using its ISBN
Access          Public
Parameter       ISBN, Author ID
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req, res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (author) => author !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });
    //update author database
    database.author.forEach((author)=>{
        if(author.id == parseInt(req.params.authorId)){
            const newBookList = author.books.filter(
                (book)=> book !== req.params.isbn
            );

            author.books = newBookList;
            return;
        }
    });
    return res.json({message:"Author was deleted!",book : database.books, author : database.author})

});

/*
Route           /author/delete
Description     delete an author using its id
Access          Public
Parameter       ID
Methods         DELETE
*/
booky.delete("/author/delete/:id",(req,res)=>{
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== parseInt(req.params.id) 
    );

    database.author = updatedAuthorDatabase;
    return res.json({author: database.author});
});

/*
Route           /author/delete
Description     delete an author using its id
Access          Public
Parameter       ID
Methods         DELETE
*/
booky.delete("/publication/delete/:id",(req,res)=>{
    const updatedPublicationDatabase = database.publication.filter(
        (publication) => publication.id !== parseInt(req.params.id) 
    );

    database.publication = updatedPublicationDatabase;
    return res.json({publication: database.publication});
});

/*
Route           /publication/delete/book
Description     delete a book from publication using its ISBN
Access          Public
Parameter       ISBN, Publication ID
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req, res)=>{
    //update publication database
    database.publication.forEach((publication)=>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList = publication.books.filter(
                (book)=> book !== req.params.isbn
            );

            publication.books = newBookList;
            return;
        }
    });

    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publication=0; //no publication available
            return;
        }
    });
    return res.json({books: database.books,publication: database.publication});
});




booky.listen(3000, ()=> console.log("Server is running"));
