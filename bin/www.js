// configure dotenv
const dotenv = require('dotenv');
dotenv.config();

// start server listener
const app = require('../server/server');
const http = require('http');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app).listen(PORT, () => {
 console.log(`Server running @ localhost:${PORT}`);
});


// start socket.io listener/subscriber
const socketio = require('../server/socket.io/handler');

socketio.subscribe(server);