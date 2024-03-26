
// En background.js
const socketIOUrl = chrome.runtime.getURL('lib/socket.io.min.js');
importScripts(socketIOUrl);

if (typeof io !== 'undefined') {
    console.log('Socket.IO ha sido importado correctamente.');
  } else {
    console.log('Socket.IO no se ha importado correctamente.');
  }

const socket_instance = io('http://localhost:3000');

// Agregar manejador de eventos para 'connect'
socket_instance.on('connect', function() {
    console.log('Conexión exitosa ');
});

// Agregar manejador de eventos para 'connect_error'
socket_instance.on('connect_error', function(error) {
    console.log('Error de conexión:', error);
});

// Agregar manejador de eventos para 'connect_timeout'
socket_instance.on('connect_timeout', function(timeout) {
    console.log('Tiempo de conexión agotado:', timeout);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('request back', request);
    socket_instance.emit('valor', { valor: 0 });
  if (request.action === 'emitValor') {
    console.log('entro', request);
    socket_instance.emit('valor', { valor: request.valor });
  }
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['contentScript.js']
    });
});

  
