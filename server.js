
var express = require('express');
var app     = express();

app.listen(8080);
console.log("listening on 8080");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
    console.log("got a request");
});