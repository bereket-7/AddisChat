const socket = io()
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')
const sendButton = document.getElementById('send-button')
socket.on('message', (message) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.appendChild(messageElement)
})

sendButton.addEventListener('click', () => {
    const message = messageInput.value
    socket.emit('sendMessage', message)
    messageInput.value = ''
})
