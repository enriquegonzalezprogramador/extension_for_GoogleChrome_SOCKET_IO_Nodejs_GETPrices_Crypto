
var newValue = 0;
let lastValue = 0;


document.addEventListener('DOMContentLoaded', function() {
// const  socket_instance = io('http://localhost:3000');

  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', function() {
      const miValor = localStorage.getItem('miClave2') || 1;
      document.getElementById('etiqueta').textContent = `Mi valor: ${miValor}`;
      chrome.runtime.sendMessage({action: 'emitValor', valor: miValor});
      if(miValor != lastValue) {
        
        // socket_instance.emit('valor', { valor: miValor });
      }
      lastValue = miValor;
      //iniciar observer de la variable newValue para cuando cambie se dispare el emit
      //socket_instance.emit('valor', { valor: 0 });
     
    });
  }
});

const numField = document.getElementById('numField');

let numField2 = numField;

console.log("numField2",numField2);

if (numField) {

const observer = new MutationObserver(function(mutations) {
  console.log('mutations', mutations);
  newValue = mutations[1].target.value;
  chrome.runtime.sendMessage({action: 'emitValor', valor: newValue});
  localStorage.setItem('miClave', newValue);
  console.log('newValue', newValue);
  mutations.forEach(function(mutation) {
  const valor = mutation.target.value;
  numField.value = valor;

  if (mutation.type === 'attributes') {
    localStorage.setItem('miClave2', mutation.target.value);
    console.log("STORAGE", localStorage.getItem('miClave2'))

  }
    
  });
});

observer.observe(numField, { attributes: true });

} else {
  console.log('El elemento con el id "numField" no se encontró en el DOM.');
}

  
