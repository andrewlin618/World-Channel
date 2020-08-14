const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server);

var connectionCounter = 0;

io.on("connection", socket => {
    console.log('=> New user joined the room!');

    socket.on("join", user => {
        connectionCounter++;
        const newUser = {
            name: user.username,
            id: socket.id,
            avatar: user.avatar,
            room: " World Channel"
        }
        console.log(newUser);        socket.name = newUser.name;
        socket.emit("join", newUser)
        socket.broadcast.emit("notification", `${newUser.name} joined the room...`);
        io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);
    })

    socket.on("send message", messageObject => {
        console.log(messageObject);
        socket.broadcast.emit("message", messageObject)
    })

    socket.on("disconnecting", () => {
        if (socket.name) {
            connectionCounter--;
            io.emit("notification", `${socket.name} left the room...`)
        }
    })
})

server.listen(5000, () => console.log("Server is running on port 8000"));
