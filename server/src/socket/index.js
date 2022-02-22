const { transactions } = require('../../models');

const socket = (io) => {
  let connectedUser = {};
  io.on('connection', (socket) => {
    connectedUser[socket.handshake.query.id] = socket.id;

    socket.on('add transaction', () => {
      socket.to(connectedUser[2]).emit('new transaction');
    });
    socket.on('status approved', (user_id) => {
      console.log(connectedUser);
      socket.to(connectedUser[user_id]).emit('transaction approved');
    });
  });
};

module.exports = socket;
