const { getBooks, createBook } = require('./book.controller');

const bookRouter = (router) => {
  router.route('/')
    .get(getBooks)
    .post(createBook);

  return router;
};

module.exports = bookRouter;