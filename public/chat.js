// Make connection
var socket = io.connect('http://localhost:8080');

// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle')
	button = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit Events
button.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	})
})

message.addEventListener('keypress', () => {
	socket.emit('typing', {
		handle: handle.value
	})
})

// Listen for Events
socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
})

socket.on('typing', (data) => {
	feedback.innerHTML = `<p><em>${data.handle} is typing a message</em></p>`
})