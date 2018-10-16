const express = require('express');
const socket = require('socket.io')

// App setup
var app = express();
var server = app.listen(8080, () => {
	console.log('Listening to request on port 8080');
});

// Static Files
app.use(express.static('public'))

// Socket Setup
var io = socket(server);

io.on('connection', (socket) => {
	console.log("Connection Made", socket.id);

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	})

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	})
})