var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const text = `A user says: ${msg}`;
    io.emit("chat message", text);
  });
});

http.listen(3000, () => {
  console.log("server started");
});
