[Vai al file Generale](../../readme.md)

# 2 Lezione 20 Febbraio 2025

# Legenda

- [Operatori Logici e di Uguaglianza in JavaScript](#operatori-logici-e-di-uguaglianza-in-javascript)
- [If](#struttura-condizionale-if)
- [For](#ciclo-for)
- [Array](#array)
- [Array con il For](#array-con-il-for)
- [Modi ciclo For con gli Array](#modi-cicli-for-per-gli-array)
- [Esercizi](#esercizi)

# Operatori Logici e di Uguaglianza in JavaScript

## Operatori Logici

In JavaScript, gli operatori logici vengono utilizzati per combinare espressioni booleane e restituire un valore `true` o `false`.

### `&&` (AND)

L'operatore AND (`&&`) restituisce `true` solo se entrambe le espressioni sono `true`. Se almeno una delle due è `false`, il risultato sarà `false`.

**Sintassi:**

```javascript
let a = true,
  b = false;
console.log(a && b); // Output: false
```

### `||` (OR)

L'operatore OR (`||`) restituisce `true` se almeno una delle due espressioni è `true`. Restituisce `false` solo se entrambe le espressioni sono `false`.

**Sintassi:**

```javascript
let a = true,
  b = false;
console.log(a || b); // Output: true
```

### `!` (NOT)

L'operatore NOT (`!`) inverte il valore di un'espressione booleana. Se l'espressione è `true`, diventa `false`, e viceversa.

**Sintassi:**

```javascript
let a = true;
console.log(!a); // Output: false
```

---

## Operatori di Uguaglianza

Gli operatori di uguaglianza in JavaScript vengono utilizzati per confrontare valori.

### `==` (Uguaglianza debole)

L'operatore `==` confronta due valori senza considerare il tipo di dato (converte automaticamente i tipi se necessario).

**Sintassi:**

```javascript
console.log(5 == "5"); // Output: true (conversione implicita)
```

### `===` (Uguaglianza stretta)

L'operatore `===` confronta sia il valore che il tipo di dato. Restituisce `true` solo se entrambi sono identici.

**Sintassi:**

```javascript
console.log(5 === "5"); // Output: false (tipi diversi)
console.log(5 === 5); // Output: true
```

### `!=` (Diverso debole)

L'operatore `!=` verifica se due valori sono diversi, senza considerare il tipo di dato.

**Sintassi:**

```javascript
console.log(5 != "5"); // Output: false (conversione implicita)
```

### `!==` (Diverso stretto)

L'operatore `!==` verifica se due valori sono diversi, considerando anche il tipo di dato.

**Sintassi:**

```javascript
console.log(5 !== "5"); // Output: true (tipi diversi)
console.log(5 !== 5); // Output: false
```

## Struttura Condizionale `if`

L'istruzione `if` in JavaScript viene utilizzata per eseguire un blocco di codice solo se una determinata condizione è vera.

### Sintassi di base

```javascript
let numero = 10;
if (numero > 5) console.log("Il numero è maggiore di 5");
```

Se la condizione tra parentesi è `true`, il blocco di codice all'interno delle parentesi graffe verrà eseguito.

### `if...else`

Se si vuole eseguire un codice alternativo nel caso in cui la condizione non sia soddisfatta, si usa `else`.

```javascript
let numero = 3;
if (numero > 5) console.log("Il numero è maggiore di 5");
else console.log("Il numero è 5 o inferiore");
```

### `if...else if...else`

Quando ci sono più condizioni da verificare, si può usare `else if`.

```javascript
let numero = 7;
if (numero > 10) console.log("Il numero è maggiore di 10");
else if (numero > 5) console.log("Il numero è compreso tra 6 e 10");
else console.log("Il numero è 5 o inferiore");
```

### Operatore Ternario

L'operatore ternario (`? :`) è una forma abbreviata dell'istruzione `if...else`, utile per eseguire una condizione in una sola riga.

**Sintassi:**

```javascript
let numero = 7,
  messaggio =
    numero > 5 ? "Il numero è maggiore di 5" : "Il numero è 5 o inferiore";
console.log(messaggio);
```

## Ciclo `for`

Il ciclo `for` in JavaScript viene utilizzato per eseguire un blocco di codice un numero specifico di volte.

### Sintassi di base

```javascript
for (let i = 0; i < 5; i++) console.log(i);
```

In questo esempio, il ciclo `for` esegue il codice all'interno delle parentesi graffe 5 volte, con `i` incrementato di 1 ogni volta.

## Array

Un array in JavaScript e' un oggetto di tipo array che contiene una serie di valori.

### Sintassi di base

```javascript
let array = [1, 2, 3, 4, 5];
console.log(array[0]); // Output: 1
```

In questo esempio, `array` contiene una serie di valori numerici.

## Array con il `For`

```javascript
let array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length; i++) console.log(array[i]);
```

In questo esempio, il ciclo `for` esegue il codice all'interno delle parentesi graffe 5 volte, con `i` incrementato di 1 ogni volta.

## Modi cicli `For` per gli Array

```javascript
let array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) console.log(array[i]);
```

Ciclo `For` classico:

- Utilizza un indice (`i`) che parte da `0` e arriva fino a `array.length - 1`.
- Permette di accedere agli elementi con `array[i]`.
- È utile quando serve conoscere l'indice o modificare l'array durante l'iterazione.

---

```javascript
let array = [1, 2, 3, 4, 5];

for (let i of array) console.log(i);
```

Ciclo `For...of`:

- Itera direttamente sugli elementi dell'array, senza bisogno di usare un indice.
- Più leggibile quando non serve conoscere l'indice.
- Non modifica l'array durante l'iterazione.

---

```javascript
let array = [1, 2, 3, 4, 5];

for (let i in array) console.log(array[i]);
```

Ciclo `For...in`:

- Itera sugli indici dell'array, non sugli elementi.
- Ogni `i` rappresenta un indice, quindi per ottenere il valore si usa `array[i]`.
- Non è consigliato per gli array, perché include anche proprietà aggiunte manualmente all'array.

## Esercizi

- [1 Esercizio](Esercizi/1_Esercizio)
- [2 Esercizio](Esercizi/2_Esercizio/)