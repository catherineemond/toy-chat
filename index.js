var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var names = [
  "octopus",
  "mosquito",
  "shrimp",
  "panda",
  "bear",
  "zebra",
  "tiger",
  "frog",
  "bat",
];

function selectName() {
  var index = Math.floor(Math.random() * names.length);
  var name = names[index];

  names.splice(index, 1);
  return name;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  var user = selectName();

  socket.on("chat message", (msg) => {
    var text = `${user} says: ${msg}`;
    io.emit("chat message", text);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});