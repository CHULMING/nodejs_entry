var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var minuteSchema = new Schema({
    code: String,
    close: Number,
    open: Number,
    low: Number,
    high: Number,
    volume: Number,
    date: {type: Date, default: Date.now}
});

var daySchema = new Schema({
    code: String,
    close: Number,
    open: Number,
    low: Number,
    high: Number,
    volume: Number,
    date: {type: Date, default: Date.now}
});

module.exports = {
    day : mongoose.model('day', daySchema),
    minute : mongoose.model('minute', minuteSchema)
}

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