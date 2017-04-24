const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

function filepathRelative(fp) {
  return __dirname + fp;
}

var app = express();
var rawParser = bodyParser.raw({type: 'image/jpeg', limit: '10mb'});

app.get('/', function(req, res) {
  res.sendFile(filepathRelative('/index.html'));
});

app.get('/static/:file', function(req, res) {
  res.sendFile(filepathRelative('/' + req.params['file']))
});

app.post('/upload', rawParser, function(req, res) {
  // var body = '';
  var fp = filepathRelative('/test.jpg');
  fs.writeFile(fp, req.body, function() {
    res.send('ok');
  });
});

console.log('[ready]');
app.listen(8080);
