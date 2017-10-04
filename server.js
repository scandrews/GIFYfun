// This is the server for the Psycho Job Search application

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/assets/css/style", express.static(__dirname));
app.use("/assets/images/bgimage.png", express.static(__dirname));
app.use("/assets/javascript/script", express.static(__dirname + '/javascript/script'));

// Set the port
var PORT = process.env.PORT || 3000;

// base directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// add other routes below
app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
