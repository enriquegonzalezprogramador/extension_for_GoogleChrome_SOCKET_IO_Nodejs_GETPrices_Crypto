
  // En background.js

  let interval = null;

  //import { io } from './lib/socket.io.esm.min.js';

 // const socket_instance = io('http://localhost:3000');
  const socket_instance = new WebSocket('ws://localhost:3000');

  socket_instance.onopen = function(event) {
    console.log('Conexión exitosa');
  };

  socket_instance.onerror = function(error) {
    console.log('Error de conexión:', error);
  };

  socket_instance.onclose = function(event) {
    console.log('Conexión cerrada:', event.code, event.reason);
  };
  

 /* if (typeof io !== 'undefined') {
    console.log('Socket.IO ha sido importado correctamente.');
  } else {
    console.log('Socket.IO no se ha importado correctamente.');
  }

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

  socket_instance.emit('valor', { valor:  0 });/*

    /*  const socketIOUrl = chrome.runtime.getURL('lib/socket.io.min.js');
      importScripts(socketIOUrl);*/


       
   /*     chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

          if (request.action === 'startInterval') {

            interval = setInterval(() => {
                chrome.storage.sync.get('chromeSt', function(result) {
                  console.log('El valor recuperado es ' + result.chromeSt);
                  document.getElementById('etiqueta').textContent = `Mi valor: ${result.chromeSt}`;
                  socket_instance.send(JSON.stringify({ event: 'valor', valor: result.chromeSt }));
                })
              }, 3000);
        }else {

            clearInterval(interval);
        }


        });*/


/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['contentScript.js']
    });
});*/

/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['lib/socket.io.min.js']


    }, function() {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ['contentScript.js']
        
      });
    });
  }
});*/


/*let interval = null;
let socket_instance = null;

(chrome.runtime.onInstalled.addListener(() => {
  socket_instance = io('http://localhost:3000');

  socket_instance.on('connect', function() {
    console.log('Conexión exitosa ');
  });

  socket_instance.on('connect_error', function(error) {
    console.log('Error de conexión:', error);
  });

  socket_instance.on('connect_timeout', function(timeout) {
    console.log('Tiempo de conexión agotado:', timeout);
  });
});*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startInterval') {
    interval = setInterval(() => {
      chrome.storage.sync.get('chromeSt', function(result) {

        console.log('El valor recuperado es ' + result.chromeSt);
        socket_instance.send(JSON.stringify({ event: 'valor', valor: result.chromeSt }));
      })
    }, 3000);
  } else if (request.action === 'stopInterval') {
    socket_instance.close();
    clearInterval(interval);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['lib/socket.io.min.js']
    }).then(() => {
      console.log('Socket.IO ha sido inyectado.');
      return chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['contentScript.js']
      });
    }).then(() => {
      console.log('content.script.js ha sido inyectado.');
    }).catch((error) => {
      console.error('Hubo un error al inyectar los scripts: ', error);
    });
  }
});




  
