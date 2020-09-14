const express = require("express");
const http = require("http");
const app = express();
const path = require("path");

// const SocketManager = require('./SocketManager');

const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server);

var connectionCounter = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// io.on("connection", SocketManager);

io.on("connection", socket => {
    socket.on("join", user => {
        connectionCounter++;
        const newUser = {
            name: user.username,
            id: socket.id,
            avatar: user.avatar,
            room: " World Channel"
        }
        socket.name = newUser.name;
        console.log(`=> ${socket.name} joined the room...`); 
        console.log(newUser); 
        socket.emit("join", newUser)
        socket.broadcast.emit("notification", `${newUser.name} joined the room...`);
        io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);
    })

    socket.on("send message", messageObject => {
        console.log(messageObject);
        socket.broadcast.emit("message", messageObject)
    })

    socket.on("disconnect", () => {
        if (socket.name) {
            connectionCounter--;
            socket.broadcast.emit("notification", `${socket.name} left the room...`);
            io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);
        }
        console.log(`=> ${socket.name} left the room...`)
    })
})

app.use("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
})
