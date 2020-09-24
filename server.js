const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const server = http.createServer(app);

const socket = require("socket.io");
const io = socket(server);

var onlineUsers = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get('/api', (req, res) => {
    res.send({ "hi": "hello" });
})

app.use("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

// io.on("connection", SocketManager);

io.on("connection", socket => {
    socket.on("join", user => {
        const newUser = {
            name: user.username,
            id: socket.id,
            avatar: user.avatar,
        }
        socket.name = newUser.name;
        socket.avatar = newUser.avatar;
        onlineUsers[socket.id] = newUser;
        io.emit("online users", Object.values(onlineUsers));
        console.log(`=> ${socket.name} joined the room...`);
        socket.emit("join", newUser)
        socket.broadcast.emit("notification", `${newUser.name} joined the room...`);
        // io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);
    })

    socket.on("send message", messageObject => {
        console.log(messageObject);
        socket.broadcast.emit("message", messageObject)
    })

    socket.on("disconnect", () => {
        if (socket.name) {
            delete onlineUsers[socket.id];
            io.emit("online users", Object.values(onlineUsers));
            socket.broadcast.emit("notification", `${socket.name} left the room...`);
            // io.emit("notification", `${connectionCounter} ${connectionCounter < 2 ? 'user' : 'users'} online`);

        }
        console.log(`=> ${socket.name} left the room...`)
    })
})

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
})
