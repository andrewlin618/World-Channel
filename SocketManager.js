module.exports{
    socket => {
        socket.on("join", user => {
            connectionCounter++;
            const newUser = {
                name: user.username,
                id: socket.id,
                avatar: user.avatar
            }
            socket.name = newUser.name;
            socket.avatar = newUser.avatar;
            userMap.set(socket.id, newUser);
            console.log(`=> ${socket.name} joined the room...`);
            io.emit("online users", [...userMap]);
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
    }
}