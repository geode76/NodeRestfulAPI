var express = require('express');


var routes = function(Book){

    var bookController = require('../Controllers/bookController')(Book)

    var bookRouter = express.Router();

    bookRouter.use('/:bookId', bookController.findByIdInterceptor);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    
    bookRouter.route('/:bookId')
        .get(bookController.findById)
        .put(bookController.update)
        .patch(bookController.patch)
        .delete(bookController.remove);
    return bookRouter;
};

module.exports = routes;