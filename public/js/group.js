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

$(document).ready(function () {
    $('#group-search').on('input', function () {
        const searchText = $(this).val().toLowerCase()
        const $searchResults = $('#search-results')
        $searchResults.empty()

        if (searchText) {
            // Filter groups based on the search text and display matching results
            const results = groups.filter((group) =>
                group.name.toLowerCase().includes(searchText)
            )

            results.forEach((group) => {
                $searchResults.append(
                    `<li><a href="#" data-group="${group.id}">${group.name}</a></li>`
                )
            })
        }
    })
    $('#search-results').on('click', 'a', function (e) {
        e.preventDefault()
        const groupId = $(this).data('group')

        // Handle clicks on search results
        $('#search-results').on('click', 'a', function (e) {
            e.preventDefault()
            const groupId = $(this).data('group')
            loadGroup(groupId)
        })

        function loadGroup(groupId) {
            $.ajax({
                url: `/api/groups/${groupId}`,
                method: 'GET',
                success: function (data) {
                    displayGroup(data)
                },
                error: function (error) {
                    console.error('Error loading group:', error)
                }
            })
        }

        function displayGroup(groupData) {
            $('#group-name').text(groupData.name)
            $('#search-results').empty()
        }
    })
})
