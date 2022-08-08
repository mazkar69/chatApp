const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = process.env.PORT || 5000;

//Setting static file 
app.use("/static",express.static("static"));


// Setting the views engine.
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.render("index");
});

const users={};

io.on('connection', (socket) => {
  // console.log("a new connection ")
  socket.on('new_user_connect',(userName)=>{
    users[socket.id] = userName;
    io.emit('update_users', JSON.stringify(users));
  })

  socket.on('disconnect',()=>{
    delete users[socket.id];
    io.emit('update_users',JSON.stringify(users));
  })
  
  socket.on('chat_message',(msg,userName)=>{      //recive the msg and broadcast to everyone.
    socket.broadcast.emit("recived_msg",msg,userName);
  })

});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});