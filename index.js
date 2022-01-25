const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var text_obj = []
    socket.on('chat message', (msg) => {
      let message = ''
      text_obj.push(msg) 
      text_obj.forEach(element => {
        message = message + element
      });
      io.emit('chat message', message);
    });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
