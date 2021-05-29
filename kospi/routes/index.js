module.exports = function(app){
    var Minute = require('../models/kospi').minute
    var Day = require('../models/kospi').day

    app.post('/api/minute', function(req, res){
        console.log('post request arrive ' + req.body.code)
        var minuteInformation = new Minute();
        minuteInformation.code = req.body.code;
        minuteInformation.close = req.body.close;
        minuteInformation.open = req.body.open;
        minuteInformation.low = req.body.low;
        minuteInformation.high = req.body.high;
        minuteInformation.volume = req.body.volume;
        minuteInformation.date = new Date(req.body.date);

        minuteInformation.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result:1});
        });
    });

    app.post('/api/day', function(req, res){
        console.log('post request arrive ' + req.body.code)
        var dailyInformation = new Day();
        dailyInformation.code = req.body.code;
        dailyInformation.close = req.body.close;
        dailyInformation.open = req.body.open;
        dailyInformation.low = req.body.low;
        dailyInformation.high = req.body.high;
        dailyInformation.volume = req.body.volume;
        dailyInformation.date = new Date(req.body.date);

        dailyInformation.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result:1});
        });
    });

    app.get('/api/day/:code', function(req, res){
        console.log('get request arrive : ' + req.params.code)
        Day.find({code: req.params.code}, function(err, dayInformation){
            if(err) return res.status(500).json({error: err});
            if(!dayInformation) return res.status(404).json({error:'Info not found'})
            res.json(dayInformation)
        })
    });

    app.get('/api/minute/:code', function(req, res){
        console.log('get request arrive : ' + req.params.code)
        Minute.find({code: req.params.code}, function(err, minuteInformation){
            if(err) return res.status(500).json({error: err});
            if(!minuteInformation) return res.status(404).json({error:'Info not found'})
            res.json(minuteInformation)
        })
    });
    
}

/*

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

*/