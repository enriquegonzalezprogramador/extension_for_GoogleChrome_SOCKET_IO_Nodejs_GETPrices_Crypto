const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: ['chrome-extension://obhollcmgamhbbbccmfmnhkohbknlbgl', 'https://preev.com'],
      methods: ['GET', 'POST']
    }
  });
const cors = require('cors');

app.use(cors({
    origin: ['chrome-extension://obhollcmgamhbbbccmfmnhkohbknlbgl','https://preev.com']
  }));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar el evento 'valor' enviado por el cliente (la extensión del navegador)
  socket.on('valor', (data) => {
    console.log('Nuevo valor recibido:', data.valor);
  });
});

const PORT = 3000; // Puedes cambiar el puerto si lo deseas
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
