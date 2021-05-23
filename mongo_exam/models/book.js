var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('book', bookSchema);

/*
schema에서 사용되는 SchemaType은 총 8종류가 있습니다.
refer : https://mongoosejs.com/docs/schematypes.html

String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array

*/