$(document).ready(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault()
        const query = $('#search-input').val()
        searchUsers(query)
        searchGroups(query)
        searchChats(query)
    })

    function searchUsers(query) {
    }

    function searchGroups(query) {
    }

    function searchChats(query) {
    }
})
