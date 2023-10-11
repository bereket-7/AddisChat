document.addEventListener('DOMContentLoaded', () => {
    const groupList = document.getElementById('group-list')
    const groupName = document.getElementById('group-name')
    const chatMessages = document.getElementById('chat-messages')
    const messageInput = document.getElementById('message-input')
    const sendButton = document.getElementById('send-button')

    const groups = [
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Group 3' },
    ]

    groupList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            groupName.innerText = event.target.innerText
            chatMessages.innerHTML = ''
        }
    })

    sendButton.addEventListener('click', () => {
        const message = messageInput.value
        if (message) {
            appendMessageToChat(message)
            messageInput.value = ''
        }
    })

    function appendMessageToChat(message) {
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('message')
        messageDiv.innerText = message
        chatMessages.appendChild(messageDiv)
    }
})
