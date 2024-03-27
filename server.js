const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

app.use(cors({
    origin: ['chrome-extension://obhollcmgamhbbbccmfmnhkohbknlbgl','https://preev.com']
}));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Manejar el evento 'valor' enviado por el cliente (la extensión del navegador)
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.event === 'valor') {
      console.log('Nuevo valor recibido:', data.valor);
    }
  });
});

const PORT = 3000; // Puedes cambiar el puerto si lo deseas
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
