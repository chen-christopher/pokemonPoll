//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

let messages = [];
//Initialize socket.io
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

slowpokeVote = 0;
snorlaxVote = 0;
psyduckVote = 0;

io.sockets.on("connect", (socket) => {
  console.log("wheee", socket.id);

  socket.on("disconnect", () => {
    console.log("connection ended", socket.id);
  });

  socket.on("voting", (data) => {
    console.log(data);
    if (data.pokemon == "slowpoke") {
      slowpokeVote++;
      console.log("slowpoke", slowpokeVote);
    } else if (data.pokemon == "snorlax") {
      snorlaxVote++;
      console.log("snorlax:", snorlaxVote);
    } else {
      psyduckVote++;
      console.log("psyduck", psyduckVote);
    }
    let newVotes = {
      slowpoke: slowpokeVote,
      snorlax: snorlaxVote,
      psyduck: psyduckVote,
    };
    console.log(newVotes);
    io.sockets.emit("voteResults", newVotes);
    console.log("sent");
  });
});

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
