const db = require('../db');

// using pg-promise
const getBooks = (req, res, next) => {
    db.any('SELECT * FROM books')
      .then((data) => {
        res.status(200)
        .json({ data });
      })
      .catch(err => next(err));
  };

  const getSingleBook = (req, res, next) => {
    let queryString = 'SELECT * FROM books WHERE book.id = $id';
    const bookid = req.params.bookid;
    const authorId = req.params.authorId || null;
    let queryParams = [bookid];

    if (authorId) {
      queryString += ' AND books.authorId=$authorId';
      queryParams = queryParams.concat(authorId);
    }

    
    db.one(queryString, queryParams, (err, data) => {

      // handle server error
      if (err) return next(err);
    })
    .then(() => {
      res.status(200).json({
        message: 'Book successfully retrieved',
        data
      })
      .catch( err => next(err));
    })
  };
  
  const createBook = (req, res, next) => {
    db.none('INSERT INTO books(title, authorId, publishedOn) values(${title}, ${authorId}, ${publishedOn})', req.body)
      .then(() => {
        res.status(200).json({ message: 'New book successfully added' });
      })
      .catch(err => next(err));
  };
  
  module.exports = { getBooks, createBook, getSingleBook };