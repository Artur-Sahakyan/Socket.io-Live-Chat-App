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
});
const DATA_PATH = path.resolve('./data.json');

app.use(express.json());
app.use(cors());

app.get('/allMessages', (req, res) => {
  const dataStream = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(dataStream);
  res.send(data.messages);
})

app.get('/onlineUsers', (req, res) => {
  const dataStream = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(dataStream);
  res.send(data.users);
});

io.on('connect', (socket) => {
  socket.on('message', (message) => {
    const dataStream = fs.readFileSync(DATA_PATH, 'utf8');
    const data = JSON.parse(dataStream);
    data.messages.push(message);
    socket.broadcast.emit('getMessages', data.messages);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, undefined, 2), 'utf8');
  });

  socket.on('createUser', ({name, img}) => {
    const dataStream = fs.readFileSync(DATA_PATH, 'utf8');
    const data = JSON.parse(dataStream);
    data.users.push({
      name,
      img,
      id:socket.id
    });
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, undefined, 2), 'utf8');
    socket.broadcast.emit('createUser', data.users);
  });

  socket.on('disconnect', () => {
    const dataStream = fs.readFileSync(DATA_PATH, 'utf8');
    const data = JSON.parse(dataStream);
    const filteredUsers = data.users.filter(user => user.id !== socket.id);
    const finitialData = {
      ...data,
      users: filteredUsers
    };
    socket.broadcast.emit('createUser', filteredUsers);
    fs.writeFileSync(DATA_PATH, JSON.stringify(finitialData, undefined, 2), 'utf8');
  });
});

server.listen(5000, () => {
  console.log('PORT --> 5000 RUN')
});