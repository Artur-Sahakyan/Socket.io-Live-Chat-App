const express = require('express');
const http = require('http')
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
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

function writeToFile(data) {
  fs.writeFile(DATA_PATH, JSON.stringify(data, undefined, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data written to file successfully');
    }
  });
}

app.get('/allMessages', (req, res) => {
  fs.promises.readFile(DATA_PATH, 'utf8').then((dataStream) => {
    const data = JSON.parse(dataStream || "{}");
    res.send(data.messages || []);
  });
});

app.get('/onlineUsers', (req, res) => {
  fs.promises.readFile(DATA_PATH, 'utf8').then((dataStream) => {
    const data = JSON.parse(dataStream);
    res.send(data.users);
  });
});

io.on('connection', (socket) => {
  console.log('socket.id --> ', socket.id);
  socket.on('message', (message) => {
    fs.promises.readFile(DATA_PATH, 'utf8').then((dataStream) => {
      const data = JSON.parse(dataStream);
      data.messages.push(message);
      socket.broadcast.emit('getMessages', data.messages);
      writeToFile(data);
    });
  });

  socket.on('createUser', ({name, img}) => {
    fs.promises.readFile(DATA_PATH, 'utf8').then((dataStream) => {
      const data = JSON.parse(dataStream);
      data.users.push({
        name,
        img,
        id:socket.id
      });
      socket.broadcast.emit('createUser', data.users);
      writeToFile(data);
    });
  });

  socket.on('disconnect', () => {
    fs.promises.readFile(DATA_PATH, 'utf8').then((dataStream) => {
      const data = JSON.parse(dataStream);
      const filteredUsers = data.users.filter(user => user.id !== socket.id);
      socket.broadcast.emit('createUser', filteredUsers);
      writeToFile({ ...data, users: filteredUsers });
    });
  });
});

server.listen(5000, () => {
  console.log('PORT --> 5000 RUN')
});