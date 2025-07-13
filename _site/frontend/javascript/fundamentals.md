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

# JavaScript Fundamentals Interview Preparation Guide

## Table of Contents

- [Core Concepts](#core-concepts)
- [Common Interview Questions](#common-interview-questions)
- [Advanced Questions](#advanced-questions)
- [Practice Problems](#practice-problems)
- [Solutions](#solutions)

## Core Concepts

### JavaScript Fundamentals

#### 1. Variables and Data Types

**Definition**: JavaScript has dynamic typing with primitive and reference types.

**Primitive Types**:

- `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

**Reference Types**:

- `object`, `array`, `function`

#### 2. Scope and Hoisting

**Definition**: Scope determines variable accessibility, hoisting moves declarations to the top.

**Types of Scope**:

- Global scope
- Function scope
- Block scope (ES6)

#### 3. Closures

**Definition**: Function that has access to variables in its outer scope.

#### 4. Prototypes and Inheritance

**Definition**: JavaScript uses prototypal inheritance for object-oriented programming.

## Common Interview Questions

### Q1: Explain the difference between `var`, `let`, and `const`

**Answer**:

- **`var`**: Function-scoped, hoisted, can be redeclared
- **`let`**: Block-scoped, not hoisted, cannot be redeclared
- **`const`**: Block-scoped, not hoisted, cannot be reassigned

**Example**:

```javascript
// var - function scoped
function example() {
  var x = 1;
  if (true) {
    var x = 2; // Same variable
  }
  console.log(x); // 2
}

// let - block scoped
function example() {
  let x = 1;
  if (true) {
    let x = 2; // Different variable
  }
  console.log(x); // 1
}

// const - cannot be reassigned
const PI = 3.14;
PI = 3.15; // Error: Assignment to constant variable
```

### Q2: What is the difference between `==` and `===`?

**Answer**:

- **`==`**: Loose equality (type coercion)
- **`===`**: Strict equality (no type coercion)

**Examples**:

```javascript
console.log(5 == "5"); // true (type coercion)
console.log(5 === "5"); // false (no coercion)

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(0 == false); // true
console.log(0 === false); // false
```

### Q3: Explain closures with an example

**Answer**:
A closure is a function that has access to variables in its outer scope.

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Practical Example**:

{% raw %}
```javascript
function createGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

console.log(sayHello("John")); // "Hello, John!"
console.log(sayGoodbye("John")); // "Goodbye, John!"
```
{% endraw %}

### Q4: What is the event loop in JavaScript?

**Answer**:
The event loop is JavaScript's mechanism for handling asynchronous operations.

**How it works**:

1. Synchronous code executes in the call stack
2. Asynchronous operations are moved to Web APIs
3. When complete, callbacks go to the callback queue
4. Event loop checks if call stack is empty
5. If empty, moves callback from queue to stack

**Example**:

```javascript
console.log("1"); // Synchronous

setTimeout(() => {
  console.log("2"); // Asynchronous
}, 0);

console.log("3"); // Synchronous

// Output: 1, 3, 2
```

### Q5: Explain promises and async/await

**Answer**:
Promises represent eventual completion of asynchronous operations.

**Promise Example**:

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: "John" };
      resolve(data);
    }, 1000);
  });
};

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**Async/Await Example**:

```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## Advanced Questions

### Q6: Implement a debounce function

**Answer**:

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);

// Only executes after 300ms of no calls
debouncedSearch("hello");
debouncedSearch("hello world");
```

### Q7: Implement a throttle function

**Answer**:

```javascript
function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  console.log("Scroll event");
}, 100);
```

### Q8: Deep clone an object

**Answer**:

```javascript
// Method 1: JSON (limited)
function deepCloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Method 2: Recursive
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item));
  }

  if (typeof obj === "object") {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// Usage
const original = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  address: {
    city: "New York",
    country: "USA",
  },
};

const cloned = deepClone(original);
```

### Q9: Implement a memoization function

**Answer**:

```javascript
function memoize(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveFunction = memoize((n) => {
  console.log("Computing...");
  return n * 2;
});

console.log(expensiveFunction(5)); // Computing... 10
console.log(expensiveFunction(5)); // 10 (from cache)
```

### Q10: Create a custom event emitter

**Answer**:

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on("userLogin", (user) => {
  console.log(`User logged in: ${user.name}`);
});

emitter.emit("userLogin", { name: "John", id: 1 });
```

## Practice Problems

### Problem 1: Implement Array Methods

Implement your own versions of `map`, `filter`, `reduce`, and `forEach`.

**Solution**:

```javascript
// forEach
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

// map
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// filter
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// reduce
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  const startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Usage
const numbers = [1, 2, 3, 4, 5];

numbers.myForEach((num) => console.log(num));
const doubled = numbers.myMap((num) => num * 2);
const evens = numbers.myFilter((num) => num % 2 === 0);
const sum = numbers.myReduce((acc, num) => acc + num, 0);
```

### Problem 2: Implement a Promise.all

**Solution**:

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Usage
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises).then((results) => {
  console.log(results); // [1, 2, 3]
});
```

### Problem 3: Implement a sleep function

**Solution**:

```javascript
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage with async/await
async function example() {
  console.log("Start");
  await sleep(2000);
  console.log("After 2 seconds");
}

// Usage with then
sleep(1000).then(() => {
  console.log("After 1 second");
});
```

### Problem 4: Create a singleton pattern

**Solution**:

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  getInstance() {
    return this;
  }
}

// Alternative with module pattern
const singleton = (function () {
  let instance;

  function createInstance() {
    return {
      data: "singleton data",
      getData: function () {
        return this.data;
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

// Usage
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### Problem 5: Implement a queue with two stacks

**Solution**:

```javascript
class QueueWithStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  enqueue(item) {
    this.stack1.push(item);
  }

  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    if (this.stack2.length === 0) {
      throw new Error("Queue is empty");
    }

    return this.stack2.pop();
  }

  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    if (this.stack2.length === 0) {
      throw new Error("Queue is empty");
    }

    return this.stack2[this.stack2.length - 1];
  }

  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

// Usage
const queue = new QueueWithStacks();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue()); // 1
console.log(queue.peek()); // 2
```

### Problem 6: Implement a LRU Cache

**Solution**:

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// Usage
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1 (not found)
```

### Problem 7: Implement a binary search tree

**Solution**:

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value === current.value) return this;

      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    if (!this.root) return false;

    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return found;
  }

  // In-order traversal
  inOrder() {
    const result = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return result;
  }
}

// Usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);

console.log(bst.find(8)); // true
console.log(bst.inOrder()); // [3, 6, 8, 10, 15]
```

### Problem 8: Implement a graph with BFS and DFS

**Solution**:

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // Breadth First Search
  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // Depth First Search (Recursive)
  dfsRecursive(start) {
    const result = [];
    const visited = {};

    const dfs = (vertex) => {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);

      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    };

    dfs(start);
    return result;
  }

  // Depth First Search (Iterative)
  dfsIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (stack.length) {
      const currentVertex = stack.pop();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }

    return result;
  }
}

// Usage
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log(graph.bfs("A")); // ["A", "B", "C", "D", "E", "F"]
console.log(graph.dfsRecursive("A")); // ["A", "B", "D", "E", "C", "F"]
console.log(graph.dfsIterative("A")); // ["A", "C", "E", "F", "D", "B"]
```

---

_This comprehensive guide covers essential JavaScript concepts, advanced patterns, and practical implementation problems. Practice these concepts thoroughly for frontend interviews at Big Tech companies._
