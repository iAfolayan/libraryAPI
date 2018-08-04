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
  
  const createBook = (req, res, next) => {
    db.none('INSERT INTO books(title, authorId, publishedOn) values(${title}, ${authorId}, ${publishedOn})', req.body)
      .then(() => {
        res.status(200).json({ message: 'New book successfully added' });
      })
      .catch(err => next(err));
  };
  
  module.exports = { getBooks, createBook };