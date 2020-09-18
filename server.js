const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get('/api', (req, res) => {
    res.send(req.body);
})

app.use("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
})
