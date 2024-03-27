
var newValue = 0;
var valor = 0;
var interval = null;


document.addEventListener('DOMContentLoaded', function() {

          
          const startButton = document.getElementById('startButton');
          if (startButton) {
            startButton.addEventListener('click', function() {
              document.getElementById('etiqueta').textContent = `Iniciando`;

       
              /*    interval = setInterval(() => {
                chrome.storage.sync.get('chromeSt', function(result) {
                  valor =result.chromeSt;
                  console.log('El valor recuperado es ' + valor);
                  document.getElementById('etiqueta').textContent = `Mi valor: ${result.chromeSt}`;
                  socket_instance.emit('valor', { valor:  result.chromeSt });
                })
              }, 1000);*/


              chrome.runtime.sendMessage({action: 'startInterval'});


            
            });
          }

              const endButton = document.getElementById('endButton');
              if (endButton) {
                endButton.addEventListener('click', function() {
                  document.getElementById('etiqueta').textContent = `Detenido`;
                  
                  chrome.runtime.sendMessage({action: 'stopInterval'});
                  observer.disconnect(); 
                
                });
              }


});

const numField = document.getElementById('numField');

let numField2 = numField;

console.log("numField2",numField2);

if (numField) {

const observer = new MutationObserver(function(mutations) {
  console.log('mutations', mutations);
  newValue = mutations[0].target.value;
  console.log('newValue', newValue);
  chrome.storage.sync.set({'chromeSt': newValue}, function() {
    console.log('El valor se ha guardado.' + newValue);
  });
  //chrome.runtime.sendMessage({action: 'emitValor', valor: newValue});

  mutations.forEach(function(mutation) {
 // numField.value = mutation.target.value;
 /* if (mutation.type === 'attributes') {

  }*/
    
  });
});

observer.observe(numField, { attributes: true });

} else {
  console.log('El elemento con el id "numField" no se encontró en el DOM.');
}

  
