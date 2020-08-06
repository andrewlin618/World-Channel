const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server);

var connectionCounter = 0;
const history = [];

io.on("connection", socket => {
    console.log('=> New user joined the room!');

    socket.on("join", username => {
        connectionCounter++;
        const user = {
            name: username,
            id: socket.id,
            room: " World Channel"
        }
        socket.name = username;
        socket.emit("history", history);
        if (history.length >= 50) {
            history = history.slice(25)        }
        socket.emit("join", user)
        socket.broadcast.emit("notification", `${user.name} joined the room...`);
        io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);
    })

    socket.on("send message", messageObject => {
        console.log(messageObject);
        history.push(messageObject);
        socket.broadcast.emit("message", messageObject)
    })

    socket.on("history", () => {
        console.log("fine")
        socket.emit("history", history);
    })

    socket.on("isTyping", (username) => {
        io.emit('isTyping', username);
    })

    socket.on("disconnecting", () => {
        if (socket.name) {
            connectionCounter--;
            io.emit("notification", `${socket.name} left the room...`)
        }
    })

    // socket.on("disconnect", (username) => {
    //     io.emit('new quit', username)
    // })
})

server.listen(5000, () => console.log("Server is running on port 8000"));
