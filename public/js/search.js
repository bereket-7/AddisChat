
$(document).ready(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault()
        const query = $('#search-input').val()

        searchUsers(query)
        searchGroups(query)
        searchChats(query)
    })

    function searchUsers(query) {

        $.get(`/search/users?query=${query}`, function (data) {
            const userResults = $('#user-list')
            userResults.empty()
            data.forEach(function (user) {
                userResults.append(`<li>${user.username}</li>`)
            })
        })
    }

    function searchGroups(query) {
        $.get(`/search/groups?query=${query}`, function (data) {
            const groupResults = $('#group-list')
            groupResults.empty()
            data.forEach(function (group) {
                groupResults.append(`<li>${group.name}</li>`)
            })
        })
    }

    function searchChats(query) {

        $.get(`/search/chats?query=${query}`, function (data) {
            const chatResults = $('#chat-list')
            chatResults.empty()
            data.forEach(function (chat) {
                chatResults.append(`<li>${chat.name}</li>`)
            })
        })
    }
})
