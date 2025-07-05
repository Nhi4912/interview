# JavaScript Fundamentals for Big Tech Interviews

## 🎯 Overview

JavaScript is the foundation of modern frontend development. Big Tech companies expect deep understanding of JavaScript fundamentals, including ES6+ features, asynchronous programming, and advanced concepts.

## 📚 Core Concepts / Khái niệm cốt lõi

### 📊 JavaScript Memory Model Visualization

```
┌─────────────────────────────────────────────────────┐
│                JAVASCRIPT MEMORY                    │
│                                                     │
│  ┌─────────────────────┐  ┌─────────────────────┐   │
│  │     CALL STACK      │  │        HEAP         │   │
│  │    (Primitives)     │  │     (Objects)       │   │
│  │                     │  │                     │   │
│  │  ┌───────────────┐  │  │  ┌───────────────┐  │   │
│  │  │ num: 42       │  │  │  │ obj: {        │  │   │
│  │  │ str: "hello"  │  │  │  │   key: "val"  │  │   │
│  │  │ bool: true    │  │  │  │ }             │  │   │
│  │  └───────────────┘  │  │  └───────────────┘  │   │
│  │                     │  │                     │   │
│  │  ┌───────────────┐  │  │  ┌───────────────┐  │   │
│  │  │ objRef: 0x001 │──┼──┼─→│ arr: [1,2,3]  │  │   │
│  │  │ arrRef: 0x002 │──┼──┼─→│               │  │   │
│  │  └───────────────┘  │  │  └───────────────┘  │   │
│  └─────────────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 1. Variables & Data Types / Biến và kiểu dữ liệu

#### Primitive Types / Kiểu dữ liệu nguyên thủy

```javascript
// Number
let num = 42;
let float = 3.14;
let infinity = Infinity;
let notANumber = NaN;

// String
let str = "Hello World";
let template = `Hello ${name}`;

// Boolean
let isTrue = true;
let isFalse = false;

// Undefined
let undefinedVar;

// Null
let nullVar = null;

// Symbol (ES6)
let symbol = Symbol("description");

// BigInt (ES2020)
let bigInt = 9007199254740991n;
```

#### Reference Types / Kiểu dữ liệu tham chiếu

```javascript
// Object
let obj = { key: "value" };

// Array
let arr = [1, 2, 3];

// Function
function myFunction() {}

// Date
let date = new Date();
```

### 2. Scope & Hoisting / Phạm vi và Hoisting

#### Variable Scope / Phạm vi biến

```javascript
// Global scope
let globalVar = "I am global";

function example() {
  // Function scope
  let functionVar = "I am in function";

  if (true) {
    // Block scope (ES6)
    let blockVar = "I am in block";
    var oldVar = "I am hoisted"; // Function scoped
  }

  console.log(oldVar); // Accessible
  // console.log(blockVar); // Error - not accessible
}
```

#### Hoisting / Nâng biến

```javascript
// Function declarations are hoisted
hoistedFunction(); // Works

function hoistedFunction() {
  console.log("I am hoisted");
}

// Variable declarations are hoisted, but not assignments
console.log(hoistedVar); // undefined
var hoistedVar = "I am hoisted";

// let and const are hoisted but not initialized (Temporal Dead Zone)
// console.log(letVar); // Error
let letVar = "I am not hoisted";
```

### 3. Closures / Closure

#### Basic Closure / Closure cơ bản

```javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y; // x is captured from outer scope
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
```

#### Practical Examples / Ví dụ thực tế

```javascript
// Data privacy
function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
console.log(counter.getCount()); // 1

// Module pattern
const calculator = (function () {
  let result = 0;

  return {
    add: (x) => {
      result += x;
      return result;
    },
    subtract: (x) => {
      result -= x;
      return result;
    },
    getResult: () => result,
  };
})();
```

### 4. Prototypes & Inheritance / Prototype và Kế thừa

#### Prototype Chain / Chuỗi prototype

```javascript
// Constructor function
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

const person = new Person("John");
console.log(person.sayHello()); // "Hello, I'm John"

// Prototype chain
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```

#### ES6 Classes / Lớp ES6

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Rex", "Golden Retriever");
console.log(dog.speak()); // "Rex barks"
```

### 5. Asynchronous Programming / Lập trình bất đồng bộ

#### Callbacks / Hàm callback

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(null, data);
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
});
```

#### Promises / Promise

```javascript
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ id: 1, name: "John" });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
}

fetchDataPromise()
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));
```

#### Async/Await / Async/Await

```javascript
async function fetchUserData() {
  try {
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Usage
async function main() {
  try {
    const userData = await fetchUserData();
    console.log("User data:", userData);
  } catch (error) {
    console.error("Main error:", error);
  }
}
```

### 6. Event Loop / Vòng lặp sự kiện

#### Understanding the Event Loop / Hiểu vòng lặp sự kiện

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");

// Output:
// 1. Start
// 4. End
// 3. Promise
// 2. Timeout
```

#### Microtasks vs Macrotasks / Microtask vs Macrotask

```javascript
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("Promise 2");
  });

console.log("Script end");

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```

## 🔧 Advanced Concepts / Khái niệm nâng cao

### 1. Memory Management / Quản lý bộ nhớ

#### Memory Leaks / Rò rỉ bộ nhớ

```javascript
// Common memory leak patterns
function createLeak() {
  const element = document.getElementById("myElement");

  // Memory leak: element reference not cleaned up
  element.addEventListener("click", function () {
    console.log("Clicked");
  });
}

// Proper cleanup
function createProperHandler() {
  const element = document.getElementById("myElement");
  const handler = function () {
    console.log("Clicked");
  };

  element.addEventListener("click", handler);

  // Cleanup function
  return function cleanup() {
    element.removeEventListener("click", handler);
  };
}
```

### 2. Functional Programming / Lập trình hàm

#### Pure Functions / Hàm thuần khiết

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function
let total = 0;
function addToTotal(value) {
  total += value; // Side effect
  return total;
}
```

#### Higher-Order Functions / Hàm bậc cao

```javascript
// Function that returns a function
function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5)); // 10

// Function that takes a function as parameter
function processArray(arr, processor) {
  return arr.map(processor);
}

const numbers = [1, 2, 3, 4];
const doubled = processArray(numbers, (x) => x * 2);
console.log(doubled); // [2, 4, 6, 8]
```

### 3. Error Handling / Xử lý lỗi

#### Try-Catch / Try-Catch

```javascript
function riskyOperation() {
  throw new Error("Something went wrong");
}

try {
  riskyOperation();
} catch (error) {
  console.error("Caught error:", error.message);
} finally {
  console.log("Always executed");
}
```

#### Custom Errors / Lỗi tùy chỉnh

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
  if (!user.email) {
    throw new ValidationError("Email is required", "email");
  }
}
```

## 📝 Interview Questions & Answers / Câu hỏi phỏng vấn & Trả lời

### Progressive Difficulty Levels / Các mức độ khó

## 🟢 Beginner Level / Mức cơ bản

### Q1: What is the difference between `var`, `let`, and `const`?

**Answer:**

| Feature | `var` | `let` | `const` |
|---------|-------|-------|----------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclaration | ✅ | ❌ | ❌ |
| Reassignment | ✅ | ✅ | ❌ |
| Temporal Dead Zone | ❌ | ✅ | ✅ |

**Example:**
```javascript
// var - Function scoped, can be redeclared
function example() {
  var x = 1;
  if (true) {
    var x = 2; // Same variable
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let - Block scoped, cannot be redeclared
function example() {
  let x = 1;
  if (true) {
    let x = 2; // Different variable
    console.log(x); // 2
  }
  console.log(x); // 1
}

// const - Block scoped, cannot be reassigned
const obj = { name: 'John' };
obj.name = 'Jane'; // ✅ Object mutation allowed
obj = {}; // ❌ Error: Assignment to constant variable
```

**Follow-up Questions:**
- What happens when you try to access a `let` variable before declaration?
- Can you change properties of a `const` object?
- What is the Temporal Dead Zone?

### Q2: Explain hoisting in JavaScript

**Answer:**

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation phase.

**Visual Representation:**
```
Actual Code:           What JavaScript "sees":
┌─────────────────┐    ┌─────────────────────┐
│ console.log(x); │    │ var x; // undefined │
│ var x = 5;      │ => │ console.log(x);     │
│ console.log(x); │    │ x = 5;              │
└─────────────────┘    │ console.log(x);     │
                       └─────────────────────┘
```

**Types of Hoisting:**

1. **Variable Hoisting:**
```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Equivalent to:
var x;
console.log(x); // undefined
x = 5;
```

2. **Function Hoisting:**
```javascript
// Function declarations are fully hoisted
sayHello(); // "Hello!" - Works!

function sayHello() {
  console.log('Hello!');
}

// Function expressions are not hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() {
  console.log('Bye!');
};
```

3. **let/const Hoisting (Temporal Dead Zone):**
```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// ASCII Diagram of TDZ:
// ┌─────────────────────────────────────────────────────────┐
// │ let x;  ←─── Declaration hoisted to top                 │
// │ ┌─────────────────────────────────────────────────────┐ │
// │ │           TEMPORAL DEAD ZONE                       │ │
// │ │     (x exists but cannot be accessed)              │ │
// │ └─────────────────────────────────────────────────────┘ │
// │ let x = 5;  ←─── Initialization                         │
// │ console.log(x); // Now accessible                      │
// └─────────────────────────────────────────────────────────┘
```

**Interview Trap:**
```javascript
var a = 1;
function test() {
  console.log(a); // undefined (not 1!)
  var a = 2;
}
test();

// Why? Because of hoisting:
function test() {
  var a; // hoisted
  console.log(a); // undefined
  a = 2;
}
```

### Q3: What are closures and how do they work?

**Answer:**

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

**Visual Representation:**
```
Outer Function Scope
┌─────────────────────────────────────────────────────┐
│ function outerFunction(x) {                         │
│   let outerVariable = x;                            │
│                                                     │
│   Inner Function Scope                              │
│   ┌─────────────────────────────────────────────┐   │
│   │ function innerFunction(y) {                 │   │
│   │   return outerVariable + y; // Closure!    │   │
│   │ }                                           │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   return innerFunction;                             │
│ }                                                   │
└─────────────────────────────────────────────────────┘

// Even after outerFunction returns, innerFunction
// still has access to outerVariable
const addFive = outerFunction(5);
addFive(3); // 8
```

**Practical Examples:**

1. **Data Privacy:**
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
account.deposit(50);
console.log(account.getBalance()); // 150
// balance is not directly accessible from outside
```

2. **Function Factories:**
```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

3. **Event Handlers:**
```javascript
function attachListeners() {
  let count = 0;
  
  document.getElementById('button').addEventListener('click', function() {
    count++;
    console.log(`Button clicked ${count} times`);
  });
}
```

**Common Closure Trap:**
```javascript
// ❌ Common mistake
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 100);
}

// ✅ Solutions:
// 1. Use let instead of var
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}

// 2. Use closure
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}
```

### Q4: Explain the difference between `==` and `===`

**Answer:**

| Operator | Name | Type Coercion | Comparison |
|----------|------|---------------|------------|
| `==` | Equality | ✅ Yes | Value after conversion |
| `===` | Strict Equality | ❌ No | Value and type |

**Type Coercion Examples:**
```javascript
// == performs type coercion
'5' == 5        // true (string '5' converted to number 5)
0 == false      // true (false converted to 0)
'' == false     // true (empty string converted to false)
null == undefined // true (special case)

// === does not perform type coercion
'5' === 5       // false (different types)
0 === false     // false (different types)
'' === false    // false (different types)
null === undefined // false (different types)
```

**Type Coercion Algorithm (Simplified):**
```
When comparing x == y:
1. If x and y are same type, return x === y
2. If x is null and y is undefined (or vice versa), return true
3. If x is number and y is string, return x == ToNumber(y)
4. If x is boolean, return ToNumber(x) == y
5. If x is object and y is primitive, return ToPrimitive(x) == y
6. Return false
```

**Common Gotchas:**
```javascript
// Tricky comparisons
[] == ![]    // true (both sides become 0)
[] == 0      // true ([] becomes 0)
'0' == 0     // true ('0' becomes 0)
'0' == false // true (both become 0)
'0' == []    // false ('0' stays '0', [] becomes '')

// Always use === for predictable results
[] === ![]   // false
[] === 0     // false
'0' === 0    // false
```

### Q5: What is the event loop?

**Answer:**

The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

**Visual Representation:**
```
┌─────────────────────────────────────────────────────┐
│                 JavaScript Runtime                  │
│                                                     │
│  Call Stack        │    Web APIs                    │
│  ┌─────────────┐   │   ┌─────────────────────────┐   │
│  │ function()  │   │   │ setTimeout, DOM events  │   │
│  ├─────────────┤   │   │ HTTP requests, etc.     │   │
│  │ function()  │   │   └─────────────────────────┘   │
│  ├─────────────┤   │               │                 │
│  │   main()    │   │               ▼                 │
│  └─────────────┘   │   ┌─────────────────────────┐   │
│                    │   │      Task Queue         │   │
│                    │   │  ┌─────────────────┐    │   │
│                    │   │  │ setTimeout cb   │    │   │
│                    │   │  ├─────────────────┤    │   │
│                    │   │  │ event cb        │    │   │
│                    │   │  └─────────────────┘    │   │
│                    │   └─────────────────────────┘   │
│                    │               ▲                 │
│                    │               │                 │
│                    │    ┌─────────────────────────┐  │
│                    │    │    Event Loop           │  │
│                    │    │  "Is call stack empty?" │  │
│                    │    │  "Move task to stack"   │  │
│                    │    └─────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Simple Example:**
```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');

// Output:
// Start
// End
// Timeout
```

**Step-by-step execution:**
1. `console.log('Start')` → Call stack → Output: "Start"
2. `setTimeout(...)` → Web API handles timer → Callback queued
3. `console.log('End')` → Call stack → Output: "End"
4. Call stack empty → Event loop moves callback to stack
5. Callback executes → Output: "Timeout"

## 🟡 Intermediate Level / Mức trung bình

### Q6: How does prototypal inheritance work?

**Answer:**

JavaScript uses prototypal inheritance where objects can inherit properties and methods from other objects through the prototype chain.

**Visual Representation:**
```
Prototype Chain Diagram:

instance
  |
  ▼
[[Prototype]] ──────────────────────────────────────────┐
                                                       │
                                                       ▼
                                              Constructor.prototype
                                                       |
                                                       ▼
                                              [[Prototype]]
                                                       |
                                                       ▼
                                              Object.prototype
                                                       |
                                                       ▼
                                                     null
```

**Example:**
```javascript
// Constructor function
function Animal(name) {
  this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

// Create inheritance
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add dog-specific method
Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

// Usage
const dog = new Dog('Rex', 'Golden Retriever');
console.log(dog.speak()); // "Rex makes a sound" (inherited)
console.log(dog.bark());  // "Rex barks!" (own method)

// Prototype chain lookup:
// dog.speak() →
// 1. Check dog object (not found)
// 2. Check Dog.prototype (not found)
// 3. Check Animal.prototype (found!)
```

**Modern ES6 Class Syntax:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    return `${this.name} barks!`;
  }
}
```

### Q7: Explain Promises and how they work

**Answer:**

Promises are objects representing the eventual completion or failure of an asynchronous operation.

**Promise States:**
```
Promise State Diagram:

     pending
        |
        ▼
   ┌─────────────────────────────────────────────┐
   │                                             │
   ▼                                             ▼
fulfilled                                   rejected
(resolved)                                 (rejected)
   |
   ▼
.then() callback                          .catch() callback
```

**Basic Promise Usage:**
```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');
    } else {
      reject(new Error('Operation failed!'));
    }
  }, 1000);
});

// Consuming the promise
myPromise
  .then(result => {
    console.log(result); // Success case
  })
  .catch(error => {
    console.error(error); // Error case
  })
  .finally(() => {
    console.log('Cleanup'); // Always executes
  });
```

**Promise Chaining:**
```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    console.log('User:', user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**Async/Await (Syntactic Sugar):**
```javascript
async function fetchUserAndPosts() {
  try {
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

**Promise Utilities:**
```javascript
// Promise.all - Wait for all promises
const promises = [fetch('/api/users'), fetch('/api/posts')];
Promise.all(promises)
  .then(responses => {
    // All requests completed
  })
  .catch(error => {
    // Any request failed
  });

// Promise.allSettled - Wait for all, regardless of outcome
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Error:', result.reason);
      }
    });
  });

// Promise.race - First to complete wins
Promise.race(promises)
  .then(result => {
    console.log('First completed:', result);
  });
```

## 🔴 Advanced Level / Mức nâng cao

### Q8: Implement a debounce function

**Answer:**

Debouncing delays function execution until after a specified time has passed since the last invocation.

**Visual Representation:**
```
Function calls: |---X---X---X-----------X---X---|
Debounced:      |                       |       |
                |                       |       |
                |                     Execute Execute
                |                    (after delay)
                |                      
              Reset timer each time
```

**Implementation:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function debounced(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Enhanced version with immediate execution option
function debounce(func, delay, immediate = false) {
  let timeoutId;
  
  return function debounced(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    }, delay);
    
    if (callNow) func.apply(this, args);
  };
}

// Usage examples
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Event listener
document.getElementById('search').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### Q9: Create a deep clone function

**Answer:**

Deep cloning creates a completely independent copy of an object, including all nested objects.

**Challenges:**
- Circular references
- Different data types (Date, RegExp, etc.)
- Functions and symbols
- Prototype chain

**Implementation:**
```javascript
function deepClone(obj, visited = new WeakMap()) {
  // Handle null and non-objects
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp objects
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Arrays
  if (Array.isArray(obj)) {
    const cloned = [];
    visited.set(obj, cloned);
    
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepClone(obj[i], visited);
    }
    
    return cloned;
  }
  
  // Handle Objects
  const cloned = Object.create(Object.getPrototypeOf(obj));
  visited.set(obj, cloned);
  
  // Clone all enumerable properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], visited);
    }
  }
  
  // Clone non-enumerable properties
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  for (const key in descriptors) {
    if (!descriptors[key].enumerable) {
      Object.defineProperty(cloned, key, {
        ...descriptors[key],
        value: deepClone(descriptors[key].value, visited)
      });
    }
  }
  
  return cloned;
}

// Test with complex object
const original = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding'],
  address: {
    street: '123 Main St',
    city: 'Boston'
  },
  birthDate: new Date('1990-01-01'),
  pattern: /[a-z]+/gi
};

// Add circular reference
original.self = original;

const cloned = deepClone(original);
console.log(cloned.self === cloned); // true (circular reference maintained)
console.log(cloned.address === original.address); // false (deep clone)
```

### Q10: Implement a Promise from scratch

**Answer:**

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    
    // Arrays to store callbacks
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        
        // Execute all fulfilled callbacks
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        
        // Execute all rejected callbacks
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      if (this.state === 'fulfilled') {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        // Store callbacks for later execution
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(onFinally) {
    return this.then(
      value => {
        onFinally();
        return value;
      },
      reason => {
        onFinally();
        throw reason;
      }
    );
  }
  
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;
      
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          reason => reject(reason)
        );
      });
    });
  }
}

// Usage
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## 🎯 Common Interview Traps & How to Avoid Them

### Trap 1: Variable Hoisting Confusion
```javascript
// ❌ Trap
var a = 1;
function test() {
  console.log(a); // What gets logged?
  var a = 2;
}
test();

// Answer: undefined (not 1!)
// Why: Local 'a' is hoisted, shadowing global 'a'
```

### Trap 2: Closure in Loops
```javascript
// ❌ Trap
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// ✅ Solution
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
```

### Trap 3: This Binding
```javascript
// ❌ Trap
const obj = {
  name: 'Object',
  getName: function() {
    return this.name;
  }
};

const getName = obj.getName;
getName(); // undefined (this is global/undefined)

// ✅ Solution
const boundGetName = obj.getName.bind(obj);
boundGetName(); // 'Object'
```

### Trap 4: Async/Await Error Handling
```javascript
// ❌ Trap
async function fetchData() {
  const data = await fetch('/api/data').json(); // Error!
  return data;
}

// ✅ Solution
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## 💡 Follow-up Questions Interviewers Ask

### After Closure Questions:
- How do closures affect memory usage?
- Can you create a memory leak with closures?
- What's the difference between closure and scope?

### After Promise Questions:
- How do you handle multiple concurrent requests?
- What's the difference between Promise.all and Promise.allSettled?
- How do you implement promise cancellation?

### After Event Loop Questions:
- What's the difference between microtasks and macrotasks?
- How does the event loop work in Node.js vs browsers?
- What happens if you block the event loop?

### After Prototypal Inheritance Questions:
- How do you check if an object is an instance of a constructor?
- What's the difference between `__proto__` and `prototype`?
- How do you implement multiple inheritance in JavaScript?

## 🚀 Quick Reference for Interviews

### Key Concepts to Remember:
1. **Hoisting**: Declarations move to top, but not assignments
2. **Closures**: Functions remember their lexical scope
3. **Event Loop**: Single-threaded but non-blocking
4. **Prototypes**: Objects inherit from other objects
5. **Promises**: Handle async operations elegantly
6. **Coercion**: `==` converts types, `===` doesn't

### Common Patterns:
- **Module Pattern**: Use closures for privacy
- **Factory Pattern**: Functions that return objects
- **Observer Pattern**: Event-driven programming
- **Debouncing**: Limit function execution frequency
- **Throttling**: Control function execution rate

## 🛠️ Practice Exercises / Bài tập thực hành

### Exercise 1: Implement Debounce

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
  console.log("Searching for:", query);
}, 300);
```

### Exercise 2: Deep Clone

```javascript
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
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
}
```

### Exercise 3: Promise Implementation

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.state === "rejected") {
      onRejected(this.reason);
    } else {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }
}
```

## 📚 Resources / Tài nguyên

### Books

- "You Don't Know JS" by Kyle Simpson
- "Eloquent JavaScript" by Marijn Haverbeke
- "JavaScript: The Good Parts" by Douglas Crockford

### Online Resources

- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [ECMAScript Specification](https://tc39.es/ecma262/)

### Practice Platforms

- [JavaScript30](https://javascript30.com/)
- [Codewars](https://www.codewars.com/)
- [LeetCode](https://leetcode.com/)

---

**Next: [ES6+ Features](./es6-features.md)**
