/* 

In JavaScript, document è un oggetto che rappresenta il DOM (Document Object Model) della pagina web corrente. Il DOM è una rappresentazione strutturata dell'HTML che permette agli sviluppatori di interagire e manipolare dinamicamente gli elementi della pagina tramite JavaScript.


Il codice JavaScript aggiunge un listener per l'evento 
    'DOMContentLoaded' al documento, 
che esegue una funzione non appena l'HTML della pagina è completamente caricato. 
All'interno di questa funzione, viene creata una variabile editbox che fa riferimento all'elemento HTML con l'attributo 
    id="editbox", 
utilizzando il metodo document.getElementById. Un'altra variabile, button, fa riferimento al pulsante con l'attributo 
    id="populateButton". 
Successivamente, viene aggiunto un listener per l'evento 'click' al pulsante: quando questo viene cliccato, viene eseguita una funzione che aggiorna il valore dell'elemento editbox. Questo aggiornamento avviene impostando la proprietà value dell'editbox a una stringa predefinita: 'Hello, this is a populated string!'. In questo modo, quando l'utente clicca sul pulsante, il contenuto del campo di testo viene popolato con il messaggio specificato.

*/

document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox");
  const button = document.getElementById("populateButton");
  const anotherButton = document.getElementById("anotherButton");

  // mouseleave
  button.addEventListener("click", () => {
    editbox.value = "Hello, this is a populated string!";
  });
  anotherButton.addEventListener("click", () => {
    editbox.value = "Hai cliccato il nuovo bottone";
  });
  button.addEventListener("mouseleave", () => {
    editbox.value = "";
  });
  editbox.addEventListener("input", () => {
    button.innerHTML = "un altro bottone";
  });
});
