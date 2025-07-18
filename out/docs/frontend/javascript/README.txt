2:I[5907,["918","static/chunks/918-3273b83890f10546.js","930","static/chunks/930-3262a6c9c5acace4.js","687","static/chunks/app/docs/%5B...slug%5D/page-036ada1d0a865043.js"],"default"]
4:I[4707,[],""]
6:I[6423,[],""]
7:I[2,["918","static/chunks/918-3273b83890f10546.js","710","static/chunks/710-dfaa11b4dff08f8e.js","972","static/chunks/972-011bba60ed155615.js","233","static/chunks/233-3e0c1d820a17eca9.js","185","static/chunks/app/layout-333f4adcd11f8f39.js"],"default",1]
3:T2ddc,# JavaScript Fundamentals for Big Tech Interviews

**Kiến thức cơ bản JavaScript cho phỏng vấn Big Tech**

## 🎯 Overview / Tổng quan

JavaScript is the foundation of modern frontend development. Big Tech companies expect deep understanding of JavaScript fundamentals, including ES6+ features, asynchronous programming, and advanced concepts.

## 📚 Core Concepts / Khái niệm cốt lõi

### 1. Variables & Data Types / Biến và kiểu dữ liệu

#### Primitive Types / Kiểu dữ liệu nguyên thủy

{% raw %}
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
{% endraw %}

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

## 📝 Interview Questions / Câu hỏi phỏng vấn

### Basic Level / Mức cơ bản

1. What is the difference between `var`, `let`, and `const`?
2. Explain hoisting in JavaScript
3. What are closures and how do they work?
4. Explain the difference between `==` and `===`
5. What is the event loop?

### Intermediate Level / Mức trung bình

1. How does prototypal inheritance work?
2. Explain the difference between synchronous and asynchronous code
3. What are promises and how do they work?
4. Explain the concept of "this" in JavaScript
5. How do you handle memory leaks?

### Advanced Level / Mức nâng cao

1. Implement a debounce function
2. Create a deep clone function
3. Implement a promise from scratch
4. Explain the module pattern
5. How would you implement a custom event system?

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
5:["slug","frontend/javascript/README","c"]
0:["fjDGwqtt1UnBZeA2uH4xO",[[["",{"children":["docs",{"children":[["slug","frontend/javascript/README","c"],{"children":["__PAGE__?{\"slug\":[\"frontend\",\"javascript\",\"README\"]}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["docs",{"children":[["slug","frontend/javascript/README","c"],{"children":["__PAGE__",{},[["$L1",["$","div",null,{"style":{"maxWidth":"1200px","margin":"0 auto","padding":"2rem","paddingTop":"6rem"},"children":[["$","div",null,{"style":{"marginBottom":"2rem"},"children":[["$","nav",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"1rem"},"children":[["$","a",null,{"href":"/interview","style":{"color":"#3b82f6","textDecoration":"none"},"children":"Home"}]," > ",["$","span",null,{"children":"frontend > javascript > README"}]]}],["$","h1",null,{"style":{"fontSize":"2.5rem","fontWeight":"800","marginBottom":"0.5rem","color":"#1e293b"},"children":"README"}],["$","div",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"2rem"},"children":[["$","span",null,{"children":["📁 ","frontend/javascript/README.md"]}],"$undefined","$undefined"]}]]}],["$","$L2",null,{"content":"$3"}]]}],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children","$5","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/interview/_next/static/css/387024c6a2216908.css","precedence":"next","crossOrigin":"$undefined"}]],["$","$L7",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],"params":{}}]],null],null],["$L8",null]]]]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"README - Frontend Interview Docs"}],["$","meta","3",{"name":"description","content":"# JavaScript Fundamentals for Big Tech Interviews  **Kiến thức cơ bản JavaScript cho phỏng vấn Big Tech**  ## 🎯 Overview / Tổng quan  JavaScript is the foundat"}],["$","meta","4",{"property":"og:title","content":"README - Frontend Interview Docs"}],["$","meta","5",{"property":"og:description","content":"# JavaScript Fundamentals for Big Tech Interviews  **Kiến thức cơ bản JavaScript cho phỏng vấn Big Tech**  ## 🎯 Overview / Tổng quan  JavaScript is the foundat"}],["$","meta","6",{"property":"og:type","content":"article"}],["$","meta","7",{"name":"twitter:card","content":"summary"}],["$","meta","8",{"name":"twitter:title","content":"README - Frontend Interview Docs"}],["$","meta","9",{"name":"twitter:description","content":"# JavaScript Fundamentals for Big Tech Interviews  **Kiến thức cơ bản JavaScript cho phỏng vấn Big Tech**  ## 🎯 Overview / Tổng quan  JavaScript is the foundat"}],["$","meta","10",{"name":"next-size-adjust"}]]
1:null
