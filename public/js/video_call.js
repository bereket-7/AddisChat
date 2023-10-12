const simplePeer = require('simple-peer')
const socket = io()

const localVideo = document.getElementById('localVideo')
const remoteVideo = document.getElementById('remoteVideo')
const startCallButton = document.getElementById('startCall')
const endCallButton = document.getElementById('endCall')

let peer

startCallButton.addEventListener('click', () => {
    peer = new simplePeer({ initiator: true, trickle: false })

    peer.on('signal', (data) => {
        socket.emit('offer', data)
    })

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideo.srcObject = stream
            peer.addStream(stream)
        })

    socket.on('answer', (data) => {
        peer.signal(data)
    })
})

endCallButton.addEventListener('click', () => {
    peer.destroy()
    localVideo.srcObject = null
    remoteVideo.srcObject = null
})

socket.on('offer', (data) => {
    peer = new simplePeer({ trickle: false })

    peer.on('signal', (data) => {
        socket.emit('answer', data)
    })

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideo.srcObject = stream
            peer.addStream(stream)
        })

    peer.signal(data)
})
