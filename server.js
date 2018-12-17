var express = require('express');
var path = require('path');

var app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/the-watson'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/the-watson/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
