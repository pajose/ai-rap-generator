var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

// var http = require('http');
// var server = http.Server(app);

//app.use(express.static('client'));

app.get("/", function(req, res) {
	res.render("index");
})
app.use(express.static(__dirname));

server.listen(PORT, function() {
  console.log('Patrick\'s app running');
});

// var io = require('socket.io')(server);

// io.on('connection', function(socket) {
//   socket.on('message', function(msg) {
//     io.emit('message', msg);
//   });
// });