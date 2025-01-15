# JavaScript Basics

JavaScript is a versatile programming language that enables developers to create dynamic and interactive web applications. This text covers the foundational concepts and functionality of JavaScript, providing a base for understanding its core principles.

## What is JavaScript?

JavaScript is a high-level, interpreted programming language primarily used for enhancing web pages. It allows developers to create interactive elements such as dropdown menus, form validations, animations, and more. Unlike HTML and CSS, which define the structure and style of web pages, JavaScript controls behavior and functionality.

## Variables

Variables store data that can be used and manipulated throughout the program. In JavaScript, you can declare variables using `var`, `let`, or `const`.

- **var**: Used traditionally for declaring variables. Its scope is global or function-level.
- **let**: Introduced in ES6, it is block-scoped and prevents many common issues with `var`.
- **const**: Declares variables that cannot be reassigned.

```javascript
let age = 25;
const name = "John";
var isStudent = true;
```

## Data Types

JavaScript has several data types:

- **Primitive types**: `string`, `number`, `boolean`, `null`, `undefined`, and `symbol`.
- **Objects**: Collections of key-value pairs, including arrays and functions.

```javascript
let num = 10; // Number
define  "hello"; // String
let isActive = true; // Boolean
```

## Operators

JavaScript includes arithmetic (`+`, `-`, `*`, `/`), assignment (`=`, `+=`, `-=`), comparison (`==`, `===`, `!=`, `!==`, `<`, `>`), and logical operators (`&&`, `||`, `!`).

```javascript
let x = 5;
let y = 10;
console.log(x + y); // 15
console.log(x === y); // false
```

## Functions

Functions are reusable blocks of code that perform specific tasks. They can take parameters and return values.

```javascript
function add(a, b) return a + b;
const add (a,b) => a + b
console.log(add(5, 3)); // 8
```

Functions can also be anonymous or arrow functions:

```javascript
const greet = () => console.log("Hello, world!");
greet();
```

## Control Structures

Control structures allow developers to dictate the flow of execution in a program.

### Conditional Statements

Use `if`, `else if`, and `else` to execute code based on conditions.

```javascript
let score = 85;
if (score >= 90) console.log("A grade");
else if (score >= 80) console.log("B grade");
else console.log("C grade");
```

### Loops

JavaScript supports loops such as `for`, `while`, and `do-while` to perform repetitive tasks.

#### Example FOR loop
```JavaScript
for (let i = 0; i < 5; i++) console.log(i);
```

#### Example WHILE loop
```JavaScript
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

#### Example DO WHILE loop
```JavaScript
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 5);
```

## Arrays

Arrays are used to store multiple values in a single variable.

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[1]); // banana

fruits.push("date");
console.log(fruits); // ["apple", "banana", "cherry", "date"]
```

## Objects

Objects store data in key-value pairs.

```javascript
let person = {
  name: "Alice",
  age: 30,
  isEmployed: true,
};
console.log(person.name); // Alice
```

## DOM Manipulation

The Document Object Model (DOM) represents the structure of a web page. JavaScript can interact with the DOM to change elements dynamically.

```javascript
let header = document.getElementById("header");
header.textContent = "Welcome!";
header.style.color = "blue";
```

## Events

JavaScript handles events like clicks, keypresses, or mouse movements.

```javascript
document.getElementById("btn").addEventListener("click", () => {
  alert("Button clicked!");
});
```

## Error Handling

Use `try`, `catch`, and `finally` for handling errors.

```javascript
try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error);
} finally {
  console.log("Operation complete.");
}
```

## ES6 Features

JavaScript has introduced many features in ES6 and later versions, including:

- **Template Literals**:

```javascript
let message = `Hello, ${name}!`;
```

- **Destructuring**:

```javascript
let { name, age } = person;
console.log(name, age);
```

- **Modules**:

```javascript
export function greet()
  console.log("Hello!");

import { greet } from "./greet.js";
greet();
```

## Conclusion

JavaScript is a powerful tool for creating dynamic web applications. By mastering its basics—variables, functions, control structures, DOM manipulation, and ES6 features—you can develop a solid foundation to build more complex projects.
