# JavaScript Interview Questions & Answers

## 🎯 Progressive Interview Questions

### 🟢 BEGINNER LEVEL

#### Q1: What are the different data types in JavaScript?
**Answer:**
JavaScript has 8 data types:

**Primitive Types (7):**
1. `number` - integers and floats
2. `string` - text data
3. `boolean` - true/false
4. `undefined` - declared but not assigned
5. `null` - intentionally empty value
6. `symbol` - unique identifier (ES6)
7. `bigint` - large integers (ES2020)

**Reference Type (1):**
8. `object` - including arrays, functions, dates, etc.

**Example:**
```javascript
typeof 42          // "number"
typeof "hello"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (known quirk!)
typeof Symbol()    // "symbol"
typeof 123n        // "bigint"
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
```

**Follow-up:** Why does `typeof null` return "object"?
This is a famous JavaScript bug that can't be fixed due to backward compatibility.

#### Q2: Explain the difference between `let`, `const`, and `var`.

**Answer:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclaration | Allowed | Error | Error |
| Reassignment | Allowed | Allowed | Error |
| Temporal Dead Zone | No | Yes | Yes |

**Visual Example:**
```javascript
// VAR - Function Scoped
function varExample() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - accessible outside block
}

// LET - Block Scoped
function letExample() {
    if (true) {
        let y = 1;
    }
    console.log(y); // ReferenceError: y is not defined
}

// CONST - Block Scoped + Immutable Binding
function constExample() {
    const z = 1;
    z = 2; // TypeError: Assignment to constant variable
    
    const obj = { a: 1 };
    obj.a = 2; // OK - object content can change
    obj = {}; // TypeError - can't reassign
}
```

#### Q3: What is hoisting in JavaScript?

**Answer:**
Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation.

**Visual Representation:**
```javascript
// What you write:
console.log(x); // undefined (not ReferenceError)
var x = 5;
sayHello(); // "Hello!" - works fine

function sayHello() {
    console.log("Hello!");
}

// How JavaScript interprets it:
var x; // hoisted declaration
function sayHello() { // function hoisted completely
    console.log("Hello!");
}

console.log(x); // undefined
x = 5; // assignment stays in place
sayHello(); // "Hello!"
```

**Different Hoisting Behaviors:**
```javascript
// var: hoisted as undefined
console.log(a); // undefined
var a = 1;

// let/const: hoisted but in Temporal Dead Zone
console.log(b); // ReferenceError
let b = 2;

// Function declaration: fully hoisted
console.log(func1()); // "works"
function func1() { return "works"; }

// Function expression: not hoisted
console.log(func2()); // TypeError
var func2 = function() { return "error"; };
```

#### Q4: Explain the concept of closures with examples.

**Answer:**
A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has finished executing.

**Visual Explanation:**
```
┌─────────────────────────────────────────┐
│           CLOSURE CREATION              │
│                                         │
│  function outer(x) {                    │
│    let outerVar = x;                    │
│    ┌─────────────────────────────────┐   │
│    │ function inner(y) {             │   │
│    │   return outerVar + y;          │   │
│    │ }                               │   │
│    │                                 │   │
│    │ Captures: outerVar = x          │   │
│    └─────────────────────────────────┘   │
│    return inner;                        │
│  }                                      │
│                                         │
│  const closure = outer(10);             │
│  // outer() finishes, but inner()       │
│  // still remembers outerVar = 10       │
└─────────────────────────────────────────┘
```

**Practical Examples:**

**1. Counter Function:**
```javascript
function createCounter() {
    let count = 0;
    
    return function() {
        return ++count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (independent closure)
```

**2. Module Pattern:**
```javascript
const calculator = (function() {
    let result = 0;
    
    return {
        add: function(x) {
            result += x;
            return this;
        },
        multiply: function(x) {
            result *= x;
            return this;
        },
        getResult: function() {
            return result;
        }
    };
})();

calculator.add(5).multiply(2).getResult(); // 10
```

#### Q5: What is the difference between `==` and `===`?

**Answer:**

| Operator | Name | Type Conversion | Example |
|----------|------|----------------|---------|
| `==` | Loose Equality | Yes | `"5" == 5` → `true` |
| `===` | Strict Equality | No | `"5" === 5` → `false` |

**Type Coercion Examples:**
```javascript
// Loose equality (==) with type coercion
"5" == 5        // true
true == 1       // true
false == 0      // true
null == undefined // true
"" == 0         // true
[] == 0         // true
[1,2] == "1,2"  // true

// Strict equality (===) no coercion
"5" === 5       // false
true === 1      // false
null === undefined // false
"" === 0        // false
[] === 0        // false
```

**Visual Coercion Process:**
```
"5" == 5
    ↓
Number("5") == 5
    ↓
5 == 5
    ↓
true
```

### 🟡 INTERMEDIATE LEVEL

#### Q6: Explain the `this` keyword in different contexts.

**Answer:**
The value of `this` depends on how a function is called, not where it's defined.

**Context Rules:**

**1. Global Context:**
```javascript
console.log(this); // Window object (browser) or global (Node.js)
```

**2. Object Method:**
```javascript
const obj = {
    name: "John",
    greet: function() {
        console.log(this.name); // "John"
    }
};
obj.greet(); // this = obj
```

**3. Function Call:**
```javascript
function regularFunction() {
    console.log(this); // Window (non-strict) or undefined (strict)
}
regularFunction();
```

**4. Arrow Functions:**
```javascript
const obj = {
    name: "John",
    greet: function() {
        const arrowFunc = () => {
            console.log(this.name); // "John" - inherits from greet()
        };
        arrowFunc();
    }
};
```

**5. Event Handlers:**
```javascript
button.addEventListener('click', function() {
    console.log(this); // button element
});

button.addEventListener('click', () => {
    console.log(this); // lexical this (likely Window)
});
```

**6. Explicit Binding:**
```javascript
function greet() {
    console.log(`Hello, ${this.name}`);
}

const person = { name: "Alice" };

greet.call(person);   // "Hello, Alice"
greet.apply(person);  // "Hello, Alice"
greet.bind(person)(); // "Hello, Alice"
```

#### Q7: What are Promises and how do they work?

**Answer:**
Promises are objects representing the eventual completion or failure of an asynchronous operation.

**Promise States:**
```
┌─────────────┐
│   Pending   │ ──────┐
└─────────────┘       │
                      ▼
              ┌─────────────┐     ┌─────────────┐
              │  Fulfilled  │  or │  Rejected   │
              │ (resolved)  │     │  (error)    │
              └─────────────┘     └─────────────┘
                      │                 │
                      ▼                 ▼
              ┌─────────────┐     ┌─────────────┐
              │   .then()   │     │   .catch()  │
              └─────────────┘     └─────────────┘
```

**Creating Promises:**
```javascript
// Promise constructor
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Consuming promises
promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Cleanup"));
```

**Promise Chaining:**
```javascript
fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(`/api/posts/${user.id}`))
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.error('Error:', error));
```

#### Q8: Explain async/await and how it relates to Promises.

**Answer:**
`async/await` is syntactic sugar over Promises, making asynchronous code look and behave more like synchronous code.

**Comparison:**

**Promise Syntax:**
```javascript
function getUserPosts() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
```

**Async/Await Syntax:**
```javascript
async function getUserPosts() {
    try {
        const userResponse = await fetch('/api/user');
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        return posts;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

**Key Points:**
- `async` functions always return a Promise
- `await` can only be used inside `async` functions
- `await` pauses execution until Promise resolves
- Error handling with try/catch instead of .catch()

**Parallel Execution:**
```javascript
// Sequential (slower)
async function sequential() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    return { user, posts };
}

// Parallel (faster)
async function parallel() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}
```

#### Q9: What is the prototype chain in JavaScript?

**Answer:**
The prototype chain is JavaScript's inheritance mechanism where objects can inherit properties and methods from other objects.

**Visual Representation:**
```
┌─────────────────┐
│   obj instance  │
│                 │
│ __proto__       │──────┐
└─────────────────┘      │
                         ▼
┌─────────────────┐  ┌─────────────────┐
│ Constructor     │  │ Constructor     │
│ .prototype      │◄─│ .prototype      │
│                 │  │                 │
│ __proto__       │──┼─▶ __proto__     │──────┐
└─────────────────┘  └─────────────────┘      │
                                              ▼
                     ┌─────────────────┐  ┌─────────────────┐
                     │ Object          │  │ Object          │
                     │ .prototype      │◄─│ .prototype      │
                     │                 │  │                 │
                     │ __proto__: null │  │ __proto__: null │
                     └─────────────────┘  └─────────────────┘
```

**Example:**
```javascript
// Constructor function
function Person(name) {
    this.name = name;
}

// Add method to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

// Create instance
const john = new Person("John");

// Prototype chain lookup
console.log(john.name);        // "John" (own property)
console.log(john.greet());     // "Hello, I'm John" (from Person.prototype)
console.log(john.toString());  // "[object Object]" (from Object.prototype)

// Check prototype chain
console.log(john.__proto__ === Person.prototype);           // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);           // true
```

#### Q10: Explain event delegation and its benefits.

**Answer:**
Event delegation is a pattern where you add a single event listener to a parent element to handle events for multiple child elements.

**Without Event Delegation:**
```javascript
// Bad: Adding listener to each button
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

function handleClick(e) {
    console.log('Button clicked:', e.target.textContent);
}
```

**With Event Delegation:**
```javascript
// Good: Single listener on parent
document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.classList.contains('button')) {
        console.log('Button clicked:', e.target.textContent);
    }
});
```

**Benefits:**
1. **Memory Efficient**: Fewer event listeners
2. **Dynamic Elements**: Works with elements added later
3. **Better Performance**: Especially with many elements
4. **Easier Management**: Single point of control

**Real-world Example:**
```javascript
// Todo list with event delegation
document.getElementById('todo-list').addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('delete-btn')) {
        // Handle delete
        target.closest('.todo-item').remove();
    } else if (target.classList.contains('edit-btn')) {
        // Handle edit
        const todoItem = target.closest('.todo-item');
        editTodo(todoItem);
    } else if (target.classList.contains('complete-btn')) {
        // Handle complete
        target.closest('.todo-item').classList.toggle('completed');
    }
});
```

### 🔴 ADVANCED LEVEL

#### Q11: Implement a deep clone function.

**Answer:**
```javascript
function deepClone(obj, visited = new WeakMap()) {
    // Handle null and primitive types
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle circular references
    if (visited.has(obj)) {
        return visited.get(obj);
    }
    
    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    // Handle RegExp
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }
    
    // Handle Array
    if (Array.isArray(obj)) {
        const cloned = [];
        visited.set(obj, cloned);
        for (let i = 0; i < obj.length; i++) {
            cloned[i] = deepClone(obj[i], visited);
        }
        return cloned;
    }
    
    // Handle Object
    const cloned = {};
    visited.set(obj, cloned);
    
    // Clone all enumerable properties
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key], visited);
        }
    }
    
    return cloned;
}

// Test cases
const original = {
    name: "John",
    age: 30,
    hobbies: ["reading", "gaming"],
    address: {
        city: "New York",
        country: "USA"
    },
    birthday: new Date('1990-01-01'),
    pattern: /hello/gi
};

// Create circular reference
original.self = original;

const cloned = deepClone(original);
console.log(cloned); // Complete deep copy
console.log(cloned === original); // false
console.log(cloned.self === cloned); // true (circular reference preserved)
```

#### Q12: Implement a function that debounces another function.

**Answer:**
```javascript
function debounce(func, delay, options = {}) {
    let timeoutId;
    let lastArgs;
    let lastCallTime;
    let result;
    
    const { 
        leading = false,    // Execute on leading edge
        trailing = true,    // Execute on trailing edge
        maxWait            // Maximum wait time
    } = options;
    
    function invokeFunc(time) {
        const args = lastArgs;
        lastArgs = undefined;
        result = func.apply(this, args);
        return result;
    }
    
    function leadingEdge(time) {
        lastCallTime = time;
        timeoutId = setTimeout(timerExpired, delay);
        return leading ? invokeFunc(time) : result;
    }
    
    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - (lastInvokeTime || 0);
        const timeWaiting = delay - timeSinceLastCall;
        
        return maxWait !== undefined
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - (lastInvokeTime || 0);
        
        return (lastCallTime === undefined || 
                timeSinceLastCall >= delay ||
                timeSinceLastCall < 0 ||
                (maxWait !== undefined && timeSinceLastInvoke >= maxWait));
    }
    
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timeoutId = setTimeout(timerExpired, remainingWait(time));
    }
    
    function trailingEdge(time) {
        timeoutId = undefined;
        
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = undefined;
        return result;
    }
    
    function cancel() {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        lastCallTime = 0;
        lastArgs = timeoutId = undefined;
    }
    
    function flush() {
        return timeoutId === undefined ? result : trailingEdge(Date.now());
    }
    
    function pending() {
        return timeoutId !== undefined;
    }
    
    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        
        lastArgs = args;
        lastCallTime = time;
        
        if (isInvoking) {
            if (timeoutId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxWait) {
                timeoutId = setTimeout(timerExpired, delay);
                return invokeFunc(lastCallTime);
            }
        }
        if (timeoutId === undefined) {
            timeoutId = setTimeout(timerExpired, delay);
        }
        return result;
    }
    
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    
    return debounced;
}

// Usage examples
const searchAPI = debounce((query) => {
    console.log('Searching for:', query);
    // Make API call
}, 300);

const saveData = debounce((data) => {
    console.log('Saving:', data);
}, 1000, { leading: true, trailing: false });

// React hook example
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}
```

#### Q13: Explain the JavaScript module system and different patterns.

**Answer:**

**1. CommonJS (Node.js):**
```javascript
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
// or
exports.add = add;
exports.subtract = subtract;

// main.js
const { add, subtract } = require('./math');
const math = require('./math');
```

**2. ES6 Modules:**
```javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export default function multiply(a, b) {
    return a * b;
}

// Alternative export syntax
const divide = (a, b) => a / b;
export { divide };

// main.js
import multiply, { add, subtract, divide } from './math.js';
import * as MathUtils from './math.js';
```

**3. AMD (Asynchronous Module Definition):**
```javascript
// Using RequireJS
define(['dependency1', 'dependency2'], function(dep1, dep2) {
    return {
        method: function() {
            // Use dep1 and dep2
        }
    };
});
```

**4. UMD (Universal Module Definition):**
```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['dependency'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory(require('dependency'));
    } else {
        // Browser globals
        root.MyModule = factory(root.Dependency);
    }
}(typeof self !== 'undefined' ? self : this, function (dependency) {
    return {
        // Module code here
    };
}));
```

**5. Module Pattern (IIFE):**
```javascript
const MyModule = (function() {
    // Private variables
    let privateVar = 0;
    
    // Private functions
    function privateFunction() {
        return privateVar++;
    }
    
    // Public API
    return {
        publicMethod: function() {
            return privateFunction();
        },
        get count() {
            return privateVar;
        }
    };
})();
```

#### Q14: Implement a custom Promise class.

**Answer:**
```javascript
class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        };
        
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
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
            const handleFulfilled = () => {
                try {
                    if (typeof onFulfilled === 'function') {
                        const result = onFulfilled(this.value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } else {
                        resolve(this.value);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            const handleRejected = () => {
                try {
                    if (typeof onRejected === 'function') {
                        const result = onRejected(this.reason);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } else {
                        reject(this.reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            if (this.state === 'fulfilled') {
                setTimeout(handleFulfilled, 0);
            } else if (this.state === 'rejected') {
                setTimeout(handleRejected, 0);
            } else {
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
            value => MyPromise.resolve(onFinally()).then(() => value),
            reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
        );
    }
    
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }
    
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
    
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'));
            }
            
            if (promises.length === 0) {
                return resolve([]);
            }
            
            const results = [];
            let resolvedCount = 0;
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = value;
                        resolvedCount++;
                        if (resolvedCount === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => reject(reason)
                );
            });
        });
    }
    
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'));
            }
            
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }
    
    static allSettled(promises) {
        return new MyPromise((resolve) => {
            if (!Array.isArray(promises)) {
                return resolve([]);
            }
            
            if (promises.length === 0) {
                return resolve([]);
            }
            
            const results = [];
            let settledCount = 0;
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = { status: 'fulfilled', value };
                        settledCount++;
                        if (settledCount === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => {
                        results[index] = { status: 'rejected', reason };
                        settledCount++;
                        if (settledCount === promises.length) {
                            resolve(results);
                        }
                    }
                );
            });
        });
    }
}

// Usage example
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('Success!'), 1000);
});

promise
    .then(value => console.log(value))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));
```

#### Q15: Explain memory management and garbage collection in JavaScript.

**Answer:**

**Memory Lifecycle:**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Allocate   │───▶│    Use      │───▶│   Release   │
│   Memory    │    │   Memory    │    │   Memory    │
└─────────────┘    └─────────────┘    └─────────────┘
```

**1. Memory Allocation:**
```javascript
// Primitive values - stack allocation
let num = 42;
let str = "hello";

// Objects - heap allocation
let obj = { name: "John" };
let arr = [1, 2, 3];
let func = function() { return "test"; };
```

**2. Garbage Collection Algorithms:**

**Mark and Sweep (Main Algorithm):**
```
Step 1: Mark Phase
┌─────────────────────────────────────┐
│  Start from Root Objects            │
│  ┌─────────┐                        │
│  │ Global  │────┐                   │
│  │ Object  │    │                   │
│  └─────────┘    ▼                   │
│                ┌─────────┐           │
│                │ Object A│───┐       │
│                └─────────┘   │       │
│                              ▼       │
│                            ┌─────────┐│
│                            │ Object B││
│                            └─────────┘│
│                                       │
│  ┌─────────┐  ← Unreachable           │
│  │ Object C│                         │
│  └─────────┘                         │
└─────────────────────────────────────────┘

Step 2: Sweep Phase
- Deallocate unmarked objects (Object C)
- Keep marked objects (A, B)
```

**3. Common Memory Leaks:**

**a) Global Variables:**
```javascript
// Bad: Creates global variable
function createLeak() {
    leak = "I'm global!"; // No var/let/const
}

// Good: Proper scoping
function noLeak() {
    let local = "I'm local!";
}
```

**b) Event Listeners:**
```javascript
// Bad: Memory leak
function attachListener() {
    const element = document.getElementById('button');
    const data = new Array(1000000); // Large data
    
    element.addEventListener('click', function() {
        // Closure keeps 'data' alive
        console.log('Clicked');
    });
}

// Good: Cleanup
function attachListenerSafe() {
    const element = document.getElementById('button');
    const data = new Array(1000000);
    
    function clickHandler() {
        console.log('Clicked');
    }
    
    element.addEventListener('click', clickHandler);
    
    // Cleanup function
    return function cleanup() {
        element.removeEventListener('click', clickHandler);
    };
}
```

**c) Circular References:**
```javascript
// Bad: Circular reference
function createCircular() {
    const obj1 = {};
    const obj2 = {};
    
    obj1.ref = obj2;
    obj2.ref = obj1; // Circular reference
    
    return obj1;
}

// Good: Break the cycle
function createSafe() {
    const obj1 = {};
    const obj2 = {};
    
    obj1.ref = obj2;
    obj2.ref = obj1;
    
    // Cleanup
    function cleanup() {
        obj1.ref = null;
        obj2.ref = null;
    }
    
    return { obj1, cleanup };
}
```

**4. Memory Profiling Tools:**
```javascript
// Performance API
console.log(performance.memory);
// {
//   usedJSHeapSize: 10000000,
//   totalJSHeapSize: 15000000,
//   jsHeapSizeLimit: 2190000000
// }

// WeakMap for private data (prevents memory leaks)
const privateData = new WeakMap();

class MyClass {
    constructor(value) {
        privateData.set(this, { value });
    }
    
    getValue() {
        return privateData.get(this).value;
    }
}

// When MyClass instance is garbage collected,
// its entry in WeakMap is automatically removed
```

**5. Best Practices:**
- Set variables to `null` when done
- Remove event listeners
- Use WeakMap/WeakSet for temporary references
- Avoid global variables
- Be careful with closures
- Monitor memory usage in production

## 🎯 Common Interview Traps & Tips

### ❌ Trap 1: The Classic Loop + setTimeout
```javascript
// What will this print?
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Answer: 3, 3, 3 (not 0, 1, 2)
```

### ❌ Trap 2: Array Equality
```javascript
console.log([] == []); // false
console.log([] == 0);  // true
console.log("" == 0);  // true
```

### ❌ Trap 3: Floating Point Math
```javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004
```

### ✅ Pro Tips:
1. Always explain your reasoning
2. Consider edge cases
3. Mention browser compatibility
4. Discuss performance implications
5. Show alternative approaches