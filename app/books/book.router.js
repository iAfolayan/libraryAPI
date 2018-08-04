const { getBooks, createBook, getSingleBook } = require('./book.controller');

const bookRouter = (router) => {
  router.route('/')
    .get(getBooks)
    .post(createBook);

  // route definition for a single book
  router.route('/books/:bookid')
    .get(getSingleBook)

  // route definition for a single book with author id
  router.route('/books/:bookid?authorId=authorId')
    .get(getSingleBook)

    
  return router;
};

module.exports = bookRouter;