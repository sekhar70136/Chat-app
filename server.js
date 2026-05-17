const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');

// Serve static files from the project root so index.html, script.js, style.css are reachable
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => {
    // Broadcast message to all clients
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
