// Make connection
let socket = io.connect('http://localhost:8080');

// Query DOM
let message = document.getElementById('message'),
	handle = document.getElementById('handle')
	send = document.getElementById('send'),
	clear = document.getElementById('clear'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback'),
	chatwindow = document.getElementById('chat-window');

// Event Listeners
send.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	})

	message.value = '';
})

message.addEventListener('keydown', (event) => {
	if(event.which === 13) {
		socket.emit('chat', {
			message: message.value,
			handle: handle.value
		})

		message.value = '';
	}
})

clear.addEventListener('click', () => {
	socket.emit('clear');
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
	scrollToBottom();
})

socket.on('typing', (data) => {
	feedback.innerHTML = `<p><em>${data.handle} is typing a message</em></p>`
})

socket.on('output',(data) => {
	data.forEach((ele) => {
		output.innerHTML += `<p><strong>${ele.handle}: </strong>${ele.message}</p>`
	})
});

socket.on('clear', () => {
	console.log('test');
	output.innerHTML = '';
});

// Auto scroll to bottom
function scrollToBottom() {
	chatwindow.scrollTop = chatwindow.scrollHeight;
}