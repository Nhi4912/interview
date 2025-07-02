# JavaScript Fundamentals: Definitions, Interview Questions & Answers

## 1. Variables & Data Types

**Definition:** Variables store data. JavaScript has primitive types (number, string, boolean, null, undefined, symbol, bigint) and reference types (object, array, function).

**Common Questions:**

- What is the difference between `var`, `let`, and `const`?
- What are primitive vs reference types?
- How does type coercion work in JavaScript?

**Answers:**

- `var` is function-scoped and hoisted; `let` and `const` are block-scoped. `const` cannot be reassigned.
- Primitive types are immutable and compared by value; reference types are mutable and compared by reference.
- Type coercion is JavaScript's automatic conversion between types, e.g., `'5' + 1` becomes `'51'`.

---

## 2. Scope & Hoisting

**Definition:** Scope determines variable accessibility. Hoisting moves declarations to the top of scope.

**Common Questions:**

- What is lexical scope?
- How does hoisting work?
- What is the Temporal Dead Zone?

**Answers:**

- Lexical scope means a variable's scope is determined by its position in code.
- Hoisting moves declarations (not initializations) to the top. `var` is hoisted and initialized as `undefined`; `let`/`const` are hoisted but not initialized.
- The Temporal Dead Zone is the period between entering scope and variable declaration with `let`/`const` where the variable cannot be accessed.

---

## 3. Closures

**Definition:** A closure is a function that remembers its lexical scope even when executed outside that scope.

**Common Questions:**

- What is a closure?
- Give a practical use case for closures.

**Answers:**

- A closure is created when a function accesses variables from its outer scope.
- Use cases: data privacy, function factories, event handlers, currying.

---

## 4. Prototype & Inheritance

**Definition:** Every JS object has a prototype. Inheritance is achieved via the prototype chain.

**Common Questions:**

- How does prototypal inheritance work?
- What is the difference between `__proto__` and `prototype`?

**Answers:**

- Objects inherit properties from their prototype. If a property is not found, JS looks up the prototype chain.
- `prototype` is a property of constructor functions; `__proto__` is an internal property of all objects pointing to their prototype.

---

## 5. The `this` Keyword

**Definition:** `this` refers to the object that is executing the current function.

**Common Questions:**

- How is `this` determined?
- How does `this` behave in arrow functions?

**Answers:**

- `this` is determined by how a function is called: global, object, constructor, call/apply/bind.
- Arrow functions do not have their own `this`; they inherit from the enclosing scope.

---

## 6. ES6+ Features

**Definition:** Modern JavaScript (ES6+) introduced let/const, arrow functions, classes, template literals, destructuring, spread/rest, promises, modules, etc.

**Common Questions:**

- What are arrow functions and how do they differ from regular functions?
- What is destructuring?
- How do promises work?

**Answers:**

- Arrow functions are concise, do not have their own `this`, cannot be used as constructors.
- Destructuring allows unpacking values from arrays/objects into variables.
- Promises represent asynchronous operations; they have `then`, `catch`, and `finally` methods.

---

## 7. Event Loop & Asynchronous JS

**Definition:** The event loop handles async operations by managing the call stack, callback queue, and microtask queue.

**Common Questions:**

- What is the event loop?
- What is the difference between microtasks and macrotasks?

**Answers:**

- The event loop checks the call stack and processes tasks from the callback/microtask queue when the stack is empty.
- Microtasks (promises, mutation observers) are processed before macrotasks (setTimeout, setInterval).
