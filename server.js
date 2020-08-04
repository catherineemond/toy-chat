const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const socketioRedis = require("socket.io-redis");
const config = require("./config.js");
const process = require("process");
const port = process.argv[2];

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("static"));

io.adapter(socketioRedis({ host: config.redis_host, port: config.redis_port }));

io.on("connection", (socket) => {
  socket.on("room-join", (room) => {
    socket.join(room);
    socket.emit("event", "Joined room " + room);
    socket.broadcast.to(room).emit("event", "Someone joined room " + room);
  });

  socket.on("event", (e) => {
    socket.broadcast.to(e.room).emit("event", e.name + " says hello!");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
