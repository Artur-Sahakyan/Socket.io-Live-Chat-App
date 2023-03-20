const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
} );

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.broadcast.emit('getMessage', message);
  });
});

server.listen(5000, () => {
  console.log('PORT --> 5000 RUN')
});