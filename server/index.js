const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});
const router = require('./src/router');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', router);
server.listen(5000);
