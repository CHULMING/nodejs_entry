var fs = require('fs');

/*
console.log('A');
var result = fs.readFileSync('./syntax/sample.txt', 'utf8');
console.log(result);
console.log('B');
*/

console.log('A');
fs.readFile('./syntax/sample.txt', 'utf8', function(err, ret){
    console.log(ret);
});
console.log('B');