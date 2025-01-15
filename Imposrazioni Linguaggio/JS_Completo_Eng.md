# **JavaScript Basics**

JavaScript is a versatile programming language that enables the creation of dynamic and interactive web applications. This guide covers fundamental concepts and includes practical examples to help you master the basics.

---

## **What is JavaScript?**

JavaScript is a high-level, interpreted, and object-oriented programming language. It is primarily used to enhance user experience on web pages, enabling functionalities such as:

- Dynamic dropdown menus
- Form validations
- Animations
- Real-time interactions (e.g., chats)

Unlike **HTML** (which defines the structure) and **CSS** (which defines the style), JavaScript manages the **behavior** of web pages.

---

## **Variables**

Variables store data that can be used and manipulated throughout a program. You can declare variables using `var`, `let`, or `const`.

- **`var`**: Global or function scope (less common in modern projects).
- **`let`**: Block scope, prevents many issues associated with `var`.
- **`const`**: For variables that must not be reassigned.

**Example:**

```javascript
let age = 25; // A variable that can change
const name = "John"; // A constant
var isStudent = true; // A traditional variable
```

---

## **Data Types**

JavaScript data types are divided into **primitive** types and **objects**.

### **Primitive Types:**

1. `string` - Text
2. `number` - Integers and decimals
3. `boolean` - Logical values (`true`/`false`)
4. `null` - Intentional absence of value
5. `undefined` - Variable declared but not assigned
6. `symbol` - Unique identifiers (introduced in ES6)

**Example:**

```javascript
let text = "Hello"; // String
let num = 42; // Number
let isActive = true; // Boolean
let value = null; // Null
let notAssigned; // Undefined
```

---

## **Operators**

Operators perform operations on data. Examples include:

1. **Arithmetic:** `+`, `-`, `*`, `/`, `%`
2. **Assignment:** `=`, `+=`, `-=`
3. **Comparison:** `==`, `===`, `!=`, `<`, `>`
4. **Logical:** `&&`, `||`, `!`

**Example:**

```javascript
let a = 10,
  b = 5;
console.log(a + b); // 15
console.log(a === b); // false
console.log(a > b && b > 0); // true
```

---

## **Functions**

Functions are reusable blocks of code.

### **Function Declaration:**

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));
```

### **Arrow Function (ES6):**

```javascript
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Bob"));
```

---

## **Objects and JSON**

**Objects** store data as key-value pairs, while **JSON** (JavaScript Object Notation) is a format for structuring data.

**Object Example:**

```javascript
let person = {
  name: "Alice",
  age: 30,
  greet: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
};

console.log(person.name); // Alice
person.greet(); // Hi, I'm Alice
```

**JSON Example:**

```json
{
  "name": "Alice",
  "age": 30,
  "isStudent": false
}
```

To convert objects to JSON or vice versa:

```javascript
let jsonString = JSON.stringify(person); // Object → JSON
let parsedObject = JSON.parse(jsonString); // JSON → Object
```

---

## **Classes**

Classes are templates for creating objects with common properties and methods.

**Example:**

```javascript
class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  speak() {
    console.log(`${this.name} says hello!`);
  }
}

let dog = new Animal("Buddy", "Dog");
dog.speak(); // Buddy says hello!
```

---

## **DOM Manipulation**

The DOM represents the structure of an HTML page. JavaScript can interact with it to modify content or style.

**Example:**

```javascript
let header = document.getElementById("header");
header.textContent = "New Title";
header.style.color = "red";
```

---

## **Events**

Events allow JavaScript to react to user interactions.

**Example:**

```javascript
document.getElementById("btn").addEventListener("click", () => {
  alert("Button clicked!");
});
```

---

## **Arrays**

Arrays are used to store lists of items.

**Example:**

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // apple

fruits.push("date");
console.log(fruits); // ["apple", "banana", "cherry", "date"]
```

---

## **Control Structures**

1. **Conditionals:** `if`, `else if`, `else`

```javascript
if (score > 80) {
  console.log("Excellent");
} else {
  console.log("Good");
}
```

2. **Loops:** `for`, `while`, `do-while`

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

---

## **Error Handling**

Handle errors with `try-catch`.

```javascript
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error.message);
}
```

---

## **ES6 Features**

1. **Template Literals:**

   ```javascript
   let greeting = `Hello, ${name}!`;
   ```

2. **Modules:**

   ```javascript
   export function greet() {
     console.log("Hi");
   }
   import { greet } from "./greet.js";
   ```

3. **Spread Operator:**

   ```javascript
   let arr1 = [1, 2];
   let arr2 = [...arr1, 3, 4];
   ```
