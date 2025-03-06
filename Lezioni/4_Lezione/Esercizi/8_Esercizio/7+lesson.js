// node: qualsiasi nodo che condivide lo stesso nodo padre
// element: qualsisia nodo ma solo se contiene dell'html

// 4 nodes (sibling)
//<div>
//<p>Paragrafo 1</p> <!-- Element Node -->  1
//<!-- Questo è un commento -->             2
//<p>Paragrafo 2</p> <!-- Element Node -->  3
//Text Node                                 4
//</div>

// 2 elements (siblings)
//<div>
//<p>Paragrafo 1</p> <!-- Element Node -->  1
//<!-- Questo è un commento -->
//<p>Paragrafo 2</p> <!-- Element Node -->  2
//Text Node
//</div>

const el = document.querySelector("div.first");
//console.log("el:");
//console.dir(el);
for (let i = 0; i < el.children.length; i++) {
  //console.log(el.children[i].textContent);
  //console.log(el.children[i]);
}
for (let i = 0; i < el.childNodes.length; i++) {
  //console.log(el.childNodes[i].textContent);
  //console.log(el.childNodes[i]);
}
//el.childNodes.forEach(function (ele, index) {
//  console.log(ele);
//});
console.log("parent Element:");
console.log(el.parentElement);

console.log("parent Node:");
console.log(el.parentNode);

console.log("next element sibling:");
console.log(el.nextElementSibling);

console.log("next sibling:");
console.log(el.nextSibling);

console.log("previous element  sibling:");
console.log(el.previousElementSibling);

console.log("previous sibling:");
console.log(el.previousSibling);
