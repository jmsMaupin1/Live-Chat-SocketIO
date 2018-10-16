// Make connection
var socket = io.connect('http://localhost:8080');

// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle')
	button = document.getElementById('send'),
	output = document.getElementById('output');

// Emit Events
button.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	})
})

// Listen for Events
socket.on('chat', (data) => {
	output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
})