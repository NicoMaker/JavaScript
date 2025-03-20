function findNext() {
  let first = document.getElementById("first");
  let next = first.nextSibling;
  /*
    1 = elemento, 2=spazi vuoti, testo libero, 8=nodo di commenti
    Il ciclo continua finché non trova un elemento oppure finché non ci sono più nodi.
    */
  while (next && next.nodeType !== 1) {
    // Trova il prossimo elemento (ignora spazi o commenti)
    next = next.nextSibling;
  }
  alert(
    next
      ? "Il prossimo fratello è: " + next.nodeName
      : "Nessun fratello trovato."
  );
}
