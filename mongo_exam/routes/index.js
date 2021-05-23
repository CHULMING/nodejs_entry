module.exports = function(app){
    var Book = require('../models/book');
    app.get('/api/books', function(req, res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error:'database failure'});
            res.json(books);
        })
    });

    app.get('/api/books/:book_id', function(req, res){
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error:'book not found'});
            res.json(book);
        });
    });

    app.get('/api/books/author/:author', function(req, res){
        // projection, 0인 애들은 출력 No, default 는 모든 field 출력
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1}, function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error:'book not found'});
            res.json(books)
        })
    });

    app.post('/api/books', function(req, res){
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result:1});
        });
    });

    app.put('/api/books/:book_id', function(req, res){
        Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error:'book not found'});

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;
            
            book.save(function(err){
                if(err) res.status(500).json({error: "failed to update"});
                res.json({result:1, message: 'book updated'});
            });
        });
    });
/*
    This method is not search all of documents but result is same with above method.
    app.put('/api/books/:book_id', function(req, res){
        Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json( { message: 'book updated' } );
        })
    });
*/
    app.delete('/api/books/:book_id', function(req, res){
        console.log('hello');
        console.log(req.params);
        Book.findById(req.params.book_id).remove(function(err, output){

        //     this is a part of checking whether job is success or failure
        //     but delete function is idempotent!!!! So, this is use

        //     if(!output.result.n) return res.status(404).json({error: "book not found"});
        //     res.json({message: "book deleted"});
        // 

            res.status(204).end();
        });
    });
}