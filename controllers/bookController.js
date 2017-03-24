var bookController = function(Book){

    var findByIdInterceptor = function(req, res, next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('No Book Found');
            }
        });
    }

    var post = function(req, res){
        var book = new Book(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is Required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    };

    var findById = function(req, res){

            res.json(req.book);

        }

    var update = function(req, res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        }

    var remove = function(req, res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        }

    return {
        post: post,
        get: get,
        findById: findById,
        update: update, 
        patch: patch,
        remove: remove,
        findByIdInterceptor: findByIdInterceptor
    }
}

module.exports = bookController;