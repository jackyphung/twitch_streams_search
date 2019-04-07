module.exports = {
  subscribe: (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      const id = socket.id;
    });
  }
}