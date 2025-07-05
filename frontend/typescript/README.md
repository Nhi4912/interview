# TypeScript Interview Preparation Guide

## 🎯 Overview

TypeScript has become essential for modern frontend development. This guide covers advanced TypeScript concepts, patterns, and interview questions specifically designed for mid-level frontend developers.

## 📚 Table of Contents

1. [Core Concepts](#core-concepts)
2. [Advanced Types](#advanced-types)
3. [Generic Patterns](#generic-patterns)
4. [Utility Types](#utility-types)
5. [Advanced Patterns](#advanced-patterns)
6. [React + TypeScript](#react--typescript)
7. [Performance & Best Practices](#performance--best-practices)
8. [Interview Questions](#interview-questions)
9. [Practical Examples](#practical-examples)

---

## 🔧 Core Concepts

### Type System Fundamentals

TypeScript's type system is structural, not nominal. This means types are compatible if they have the same structure, regardless of their names.

```typescript
// Structural typing example
interface Point {
  x: number;
  y: number;
}

interface Vector2D {
  x: number;
  y: number;
}

// These are compatible because they have the same structure
const point: Point = { x: 1, y: 2 };
const vector: Vector2D = point; // ✅ Valid
```

**Visual Representation:**

```
TypeScript Type System
├── Structural Typing
│   ├── Shape-based compatibility
│   ├── Duck typing principle
│   └── No nominal type checking
├── Static Analysis
│   ├── Compile-time type checking
│   ├── IDE support and IntelliSense
│   └── Refactoring safety
└── Gradual Adoption
    ├── JavaScript compatibility
    ├── Optional type annotations
    └── Progressive enhancement
```

### Type Inference

TypeScript can infer types automatically in many cases:

```typescript
// Basic inference
const message = "Hello World"; // type: string
const numbers = [1, 2, 3]; // type: number[]
const user = { name: "John", age: 30 }; // type: { name: string; age: number; }

// Function return inference
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}

// Generic inference
function identity<T>(arg: T): T {
  return arg;
}

const result = identity("hello"); // T inferred as string
```

---

## 🚀 Advanced Types

### Union and Intersection Types

```typescript
// Union Types - "OR" relationship
type Status = "loading" | "success" | "error";
type ID = string | number;

// Intersection Types - "AND" relationship
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge; // Must have both name AND age

// Practical example
type ButtonProps = {
  variant: "primary" | "secondary" | "danger";
  size: "small" | "medium" | "large";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
```

**Visual Diagram:**

```
Union Types (|)
┌─────────────┐    ┌─────────────┐
│   String    │ OR │   Number    │
└─────────────┘    └─────────────┘
       │                   │
       └─────┬─────────────┘
             │
    ┌────────▼────────┐
    │ String | Number │
    └─────────────────┘

Intersection Types (&)
┌─────────────┐    ┌─────────────┐
│   HasName   │AND │   HasAge    │
└─────────────┘    └─────────────┘
       │                   │
       └─────┬─────────────┘
             │
    ┌────────▼────────┐
    │ HasName & HasAge │
    └─────────────────┘
```

### Conditional Types

Conditional types allow you to create types that depend on other types:

```typescript
// Basic conditional type
type NonNullable<T> = T extends null | undefined ? never : T;

// Advanced conditional type with inference
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Practical example: Extract props from React component
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// Usage
interface MyComponentProps {
  title: string;
  count: number;
}

const MyComponent: React.FC<MyComponentProps> = () => null;
type ExtractedProps = ComponentProps<typeof MyComponent>; // MyComponentProps
```

**Conditional Type Flow:**

```
Input Type T
     │
     ▼
┌─────────────┐
│ T extends U │
└─────────────┘
     │
     ▼
┌─────────────┐
│   True?     │
└─────────────┘
     │
     ▼
┌─────────────┐    ┌─────────────┐
│   Type A    │ OR │   Type B    │
└─────────────┘    └─────────────┘
```

### Mapped Types

Mapped types allow you to create new types by transforming existing ones:

```typescript
// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Optional properties
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Required properties
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Practical example: API response transformation
interface User {
  id: number;
  name: string;
  email: string;
}

type CreateUserRequest = Partial<User>; // All fields optional
type UpdateUserRequest = Partial<User> & { id: number }; // id required, others optional
```

---

## 🔄 Generic Patterns

### Generic Constraints

```typescript
// Basic constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Multiple constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Advanced constraint with conditional types
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type StringArray = string[];
type StringElement = ArrayElement<StringArray>; // string
```

### Generic Utility Functions

```typescript
// Generic debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Generic memoization
function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
```

---

## 🛠️ Utility Types

### Built-in Utility Types

```typescript
// Partial - makes all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string; }

// Pick - selects specific properties
type UserCredentials = Pick<User, "email" | "name">;

// Omit - excludes specific properties
type UserWithoutId = Omit<User, "id">;

// Record - creates object type with specific keys and values
type StatusMap = Record<"loading" | "success" | "error", string>;

// ReturnType - extracts return type of function
type FetchResult = ReturnType<typeof fetch>;

// Parameters - extracts parameter types of function
type FetchParams = Parameters<typeof fetch>;
```

### Custom Utility Types

```typescript
// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Extract function types
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// Extract promise types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Extract array types
type UnwrapArray<T> = T extends (infer U)[] ? U : T;
```

---

## 🎯 Advanced Patterns

### Template Literal Types

```typescript
// Basic template literal types
type EventName = "click" | "hover" | "focus";
type HandlerName = `on${Capitalize<EventName>}`;
// Result: 'onClick' | 'onHover' | 'onFocus'

// Advanced template literal types
type CSSUnits = "px" | "em" | "rem" | "%";
type CSSValue = `${number}${CSSUnits}`;
// Result: '10px' | '2em' | '1.5rem' | '50%'

// API endpoint types
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint = `/api/${string}`;
type APIHandler = `${HTTPMethod} ${APIEndpoint}`;
```

### Branded Types

```typescript
// Branded types for type safety
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

// Type guards
function isUserId(value: string): value is UserId {
  return /^[a-zA-Z0-9]{8,}$/.test(value);
}

function isEmail(value: string): value is Email {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Usage
function createUser(id: string, email: string) {
  if (!isUserId(id)) throw new Error("Invalid user ID");
  if (!isEmail(email)) throw new Error("Invalid email");

  // Now TypeScript knows these are branded types
  return { id: id as UserId, email: email as Email };
}
```

### Discriminated Unions

```typescript
// Discriminated union pattern
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// Usage with type guards
function handleRequest<T>(state: RequestState<T>) {
  switch (state.status) {
    case "idle":
      return "Ready to fetch";
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data}`; // TypeScript knows data exists
    case "error":
      return `Error: ${state.error}`; // TypeScript knows error exists
  }
}
```

---

## ⚛️ React + TypeScript

### Component Types

```typescript
// Function component with props
interface ButtonProps {
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  children,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
```

### Hook Types

```typescript
// Custom hook with proper typing
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
const [user, setUser] = useLocalStorage<User | null>("user", null);
```

### Event Handlers

```typescript
// Properly typed event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, onChange }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleInputChange} />
    </form>
  );
};
```

---

## ⚡ Performance & Best Practices

### Type Performance

```typescript
// Avoid complex conditional types in hot paths
// ❌ Bad - complex conditional type
type ComplexType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : never;

// ✅ Good - use union types when possible
type SimpleType = string | number | boolean;

// Use const assertions for better inference
const colors = ["red", "green", "blue"] as const;
type Color = (typeof colors)[number]; // 'red' | 'green' | 'blue'
```

### Compiler Performance

```typescript
// Use project references for large codebases
// tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/components" }
  ]
}

// Use path mapping for better imports
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}
```

---

## ❓ Interview Questions

### Basic Level

**Q1: What is the difference between `interface` and `type`?**

**Answer:**

```typescript
// Interfaces can be extended and merged
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}
// Result: Animal has both name and age

// Types cannot be merged
type Animal = {
  name: string;
};

type Animal = {
  // ❌ Error: Duplicate identifier
  age: number;
};

// Interfaces can only describe object shapes
interface User {
  name: string;
}

// Types can describe unions, primitives, etc.
type Status = "loading" | "success" | "error";
type UserOrNull = User | null;
```

**Q2: Explain the `keyof` operator**

**Answer:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // 'id' | 'name' | 'email'

// Practical usage
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "John", email: "john@example.com" };
const name = getProperty(user, "name"); // string
const id = getProperty(user, "id"); // number
```

### Intermediate Level

**Q3: How do you create a type-safe event emitter?**

**Answer:**

```typescript
type EventMap = {
  userLogin: { userId: string; timestamp: number };
  userLogout: { userId: string };
  message: { text: string; from: string };
};

class TypedEventEmitter {
  private listeners: {
    [K in keyof EventMap]?: Array<(data: EventMap[K]) => void>;
  } = {};

  on<K extends keyof EventMap>(
    event: K,
    listener: (data: EventMap[K]) => void
  ) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

// Usage
const emitter = new TypedEventEmitter();
emitter.on("userLogin", (data) => {
  console.log(data.userId); // TypeScript knows this is string
  console.log(data.timestamp); // TypeScript knows this is number
});
```

**Q4: How do you implement a type-safe API client?**

**Answer:**

```typescript
// Define API endpoints with their types
type APIEndpoints = {
  "GET /users": { response: User[]; params: { page?: number } };
  "POST /users": { response: User; body: CreateUserRequest };
  "GET /users/:id": { response: User; params: { id: string } };
  "PUT /users/:id": {
    response: User;
    body: UpdateUserRequest;
    params: { id: string };
  };
};

class TypedAPIClient {
  async request<K extends keyof APIEndpoints>(
    endpoint: K,
    options: {
      method?: "GET" | "POST" | "PUT" | "DELETE";
      params?: APIEndpoints[K]["params"];
      body?: APIEndpoints[K] extends { body: any }
        ? APIEndpoints[K]["body"]
        : never;
    } = {}
  ): Promise<APIEndpoints[K]["response"]> {
    // Implementation here
    return {} as APIEndpoints[K]["response"];
  }
}

// Usage
const api = new TypedAPIClient();

// TypeScript ensures type safety
const users = await api.request("GET /users", { params: { page: 1 } });
const newUser = await api.request("POST /users", {
  body: { name: "John", email: "john@example.com" },
});
```

### Advanced Level

**Q5: How do you implement a type-safe state machine?**

**Answer:**

```typescript
type StateMachine<TState extends string, TEvent extends string> = {
  [K in TState]: {
    [E in TEvent]?: TState;
  };
};

type TrafficLightState = "red" | "yellow" | "green";
type TrafficLightEvent = "next" | "emergency";

const trafficLightMachine: StateMachine<TrafficLightState, TrafficLightEvent> =
  {
    red: {
      next: "green",
      emergency: "red",
    },
    yellow: {
      next: "red",
      emergency: "red",
    },
    green: {
      next: "yellow",
      emergency: "red",
    },
  };

class StateMachineController<TState extends string, TEvent extends string> {
  private currentState: TState;
  private machine: StateMachine<TState, TEvent>;

  constructor(initialState: TState, machine: StateMachine<TState, TEvent>) {
    this.currentState = initialState;
    this.machine = machine;
  }

  transition(event: TEvent): TState {
    const currentStateConfig = this.machine[this.currentState];
    const nextState = currentStateConfig[event];

    if (!nextState) {
      throw new Error(`Invalid transition: ${this.currentState} -> ${event}`);
    }

    this.currentState = nextState;
    return nextState;
  }

  getCurrentState(): TState {
    return this.currentState;
  }
}

// Usage
const controller = new StateMachineController("red", trafficLightMachine);
const newState = controller.transition("next"); // 'green'
```

**Q6: How do you create a type-safe builder pattern?**

**Answer:**

```typescript
class QueryBuilder<T extends Record<string, any> = {}> {
  private query: T;

  constructor(query: T = {} as T) {
    this.query = query;
  }

  select<K extends keyof T>(fields: K[]): QueryBuilder<Pick<T, K>> {
    return new QueryBuilder<Pick<T, K>>(
      fields.reduce((acc, field) => {
        acc[field] = this.query[field];
        return acc;
      }, {} as Pick<T, K>)
    );
  }

  where<K extends keyof T>(
    field: K,
    operator: "eq" | "gt" | "lt",
    value: T[K]
  ): QueryBuilder<T> {
    return new QueryBuilder({
      ...this.query,
      [field]: { operator, value },
    });
  }

  build(): T {
    return this.query;
  }
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const query = new QueryBuilder<User>()
  .select(["name", "email"])
  .where("age", "gt", 18)
  .build();

// TypeScript ensures type safety throughout the chain
```

---

## 🎯 Practical Examples

### Type-Safe Form Validation

```typescript
type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

class FormValidator<T extends Record<string, any>> {
  private schema: ValidationSchema<T>;

  constructor(schema: ValidationSchema<T>) {
    this.schema = schema;
  }

  validate(data: T): {
    isValid: boolean;
    errors: Partial<Record<keyof T, string[]>>;
  } {
    const errors: Partial<Record<keyof T, string[]>> = {};
    let isValid = true;

    for (const [field, rules] of Object.entries(this.schema)) {
      if (rules) {
        const fieldErrors: string[] = [];
        const value = data[field as keyof T];

        for (const rule of rules) {
          if (!rule.validate(value)) {
            fieldErrors.push(rule.message);
            isValid = false;
          }
        }

        if (fieldErrors.length > 0) {
          errors[field as keyof T] = fieldErrors;
        }
      }
    }

    return { isValid, errors };
  }
}

// Usage
interface LoginForm {
  email: string;
  password: string;
}

const loginSchema: ValidationSchema<LoginForm> = {
  email: [
    {
      validate: (value) => value.includes("@"),
      message: "Email must contain @",
    },
    {
      validate: (value) => value.length > 0,
      message: "Email is required",
    },
  ],
  password: [
    {
      validate: (value) => value.length >= 8,
      message: "Password must be at least 8 characters",
    },
  ],
};

const validator = new FormValidator(loginSchema);
const result = validator.validate({
  email: "invalid-email",
  password: "123",
});

console.log(result.errors); // Type-safe error object
```

### Type-Safe API Response Handling

```typescript
type APIResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string; code: number };

class APIClient {
  async request<T>(url: string): Promise<APIResponse<T>> {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        return { status: "success", data };
      } else {
        return {
          status: "error",
          error: data.message || "Unknown error",
          code: response.status,
        };
      }
    } catch (error) {
      return {
        status: "error",
        error: error instanceof Error ? error.message : "Network error",
        code: 0,
      };
    }
  }
}

// Usage with type guards
function handleResponse<T>(response: APIResponse<T>): T {
  if (response.status === "success") {
    return response.data; // TypeScript knows this is T
  } else {
    throw new Error(`${response.code}: ${response.error}`);
  }
}

const client = new APIClient();
const userResponse = await client.request<User>("/api/users/1");

if (userResponse.status === "success") {
  console.log(userResponse.data.name); // TypeScript knows this is safe
} else {
  console.error(userResponse.error); // TypeScript knows this is error
}
```

---

## 📊 Performance Monitoring

### TypeScript Performance Metrics

```typescript
// Measure type checking performance
interface PerformanceMetrics {
  compilationTime: number;
  typeCheckingTime: number;
  bundleSize: number;
  memoryUsage: number;
}

class TypeScriptPerformanceMonitor {
  private startTime: number = 0;
  private typeCheckStart: number = 0;

  startCompilation() {
    this.startTime = performance.now();
  }

  startTypeChecking() {
    this.typeCheckStart = performance.now();
  }

  endTypeChecking(): number {
    return performance.now() - this.typeCheckStart;
  }

  endCompilation(): PerformanceMetrics {
    const compilationTime = performance.now() - this.startTime;

    return {
      compilationTime,
      typeCheckingTime: this.endTypeChecking(),
      bundleSize: this.getBundleSize(),
      memoryUsage: this.getMemoryUsage(),
    };
  }

  private getBundleSize(): number {
    // Implementation to get bundle size
    return 0;
  }

  private getMemoryUsage(): number {
    // Implementation to get memory usage
    return 0;
  }
}
```

---

## 🔗 Related Topics

- [JavaScript Fundamentals](./javascript/fundamentals.md)
- [React Advanced Patterns](./react/advanced-patterns.md)
- [Performance Optimization](./performance/README.md)
- [Build Tools](./tools/README.md)

---

## 📚 Additional Resources

- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Design Patterns](https://refactoring.guru/design-patterns/typescript)
- [Advanced TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

---

This comprehensive TypeScript guide provides the knowledge and practical examples needed to excel in frontend interviews. Focus on understanding the type system deeply and practicing with real-world scenarios.
