# React Core: Complete Interview Guide with Progressive Q&A

## Table of Contents

- [🟢 Beginner Level](#-beginner-level)
  - [JSX](#jsx)
  - [Components](#components)
  - [Props & State](#props--state)
  - [Basic Hooks](#basic-hooks)
  - [Event Handling](#event-handling)
- [🟡 Intermediate Level](#-intermediate-level)
  - [Lifecycle Methods](#lifecycle-methods)
  - [Advanced Hooks](#advanced-hooks)
  - [Context API](#context-api)
  - [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)
  - [Reconciliation & Virtual DOM](#reconciliation--virtual-dom)
- [🔴 Advanced Level](#-advanced-level)
  - [Performance Optimization](#performance-optimization)
  - [Error Boundaries](#error-boundaries)
  - [Code Splitting & Lazy Loading](#code-splitting--lazy-loading)
  - [Custom Hooks](#custom-hooks)
  - [Advanced Patterns](#advanced-patterns)
- [🎯 Common Interview Traps](#-common-interview-traps)
- [🚀 Follow-up Questions](#-follow-up-questions)
- [💡 Quick Reference](#-quick-reference)
- [🛠️ Practice Problems](#️-practice-problems)

---

## 🟢 Beginner Level

### JSX

#### Q1: What is JSX and how does it work?

**Answer:**

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It gets compiled to `React.createElement()` calls.

**Visual Transformation:**
```
JSX:                          Compiled JavaScript:
┌─────────────────────────┐   ┌─────────────────────────────────────┐
│ const element = (       │   │ const element =                     │
│   <h1 className="title">│   │   React.createElement(              │
│     Hello, World!       │ → │     'h1',                           │
│   </h1>                 │   │     { className: 'title' },         │
│ );                      │   │     'Hello, World!'                 │
│                         │   │   );                                │
└─────────────────────────┘   └─────────────────────────────────────┘
```

**Key Rules:**
1. **Single Parent Element:** Must wrap multiple elements in a parent or Fragment
2. **CamelCase Attributes:** `className` instead of `class`, `onClick` instead of `onclick`
3. **JavaScript Expressions:** Use `{}` to embed JavaScript
4. **Self-Closing Tags:** `<img />`, `<br />`, etc.

**Examples:**
```jsx
// ✅ Valid JSX
const element = (
  <div>
    <h1>Hello {user.name}!</h1>
    <img src={user.avatar} alt="Avatar" />
  </div>
);

// ✅ Using React Fragment
const element = (
  <React.Fragment>
    <h1>Title</h1>
    <p>Content</p>
  </React.Fragment>
);

// ✅ Short Fragment syntax
const element = (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// ❌ Invalid - Multiple root elements
const element = (
  <h1>Title</h1>
  <p>Content</p>
);
```

**Follow-up Questions:**
- Why do we need to import React even if we don't use it directly?
- What's the difference between `className` and `class`?
- How do you handle conditional rendering in JSX?

### Components

#### Q2: What are React components and what types exist?

**Answer:**

Components are reusable, self-contained pieces of UI that can accept inputs (props) and return React elements describing what should appear on screen.

**Component Types:**

**1. Functional Components (Modern):**
```jsx
// Simple functional component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// Implicit return
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;
```

**2. Class Components (Legacy):**
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

**Component Composition:**
```jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
```

**Visual Component Tree:**
```
         App
         |
    ┌────┼────┐
    │    │    │
 Welcome Welcome Welcome
 (Alice)  (Bob) (Charlie)
```

**Best Practices:**
- Use PascalCase for component names
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance

### Props & State

#### Q3: What's the difference between props and state?

**Answer:**

| Aspect | Props | State |
|--------|-------|-------|
| **Source** | Passed from parent | Managed internally |
| **Mutability** | Immutable | Mutable (via setState) |
| **Purpose** | Configure component | Track changing data |
| **Scope** | External | Internal |
| **Triggering Re-render** | When parent re-renders | When state changes |

**Visual Data Flow:**
```
Parent Component
┌─────────────────────────────────────────┐
│  state: { user: 'John', count: 5 }      │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │        Child Component            │  │
│  │  props: { user: 'John' }          │  │
│  │  state: { expanded: false }       │  │
│  └───────────────────────────────────┘  │
│                  ↑                      │
│                  │                      │
│         Props flow down                 │
│         Events flow up                  │
└─────────────────────────────────────────┘
```

**Props Example:**
```jsx
// Parent passes props down
function Parent() {
  const user = { name: 'John', age: 30 };
  
  return <UserCard user={user} isVip={true} />;
}

// Child receives props
function UserCard({ user, isVip }) {
  return (
    <div className={isVip ? 'vip-card' : 'regular-card'}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

**State Example:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**State Update Patterns:**
```jsx
// ✅ Correct - using functional update
setCount(prevCount => prevCount + 1);

// ❌ Incorrect - mutating state directly
count++; // Never do this!

// ✅ Correct - object state update
setUser(prevUser => ({
  ...prevUser,
  name: 'New Name'
}));

// ❌ Incorrect - mutating object
user.name = 'New Name'; // Never do this!
```

### Basic Hooks

#### Q4: Explain useState and useEffect hooks

**Answer:**

**useState Hook:**
Manages local state in functional components.

```jsx
const [state, setState] = useState(initialValue);
```

**Examples:**
```jsx
// Primitive state
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isVisible, setIsVisible] = useState(false);

// Object state
const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
});

// Array state
const [items, setItems] = useState([]);

// Function as initial state (lazy initialization)
const [expensiveValue, setExpensiveValue] = useState(() => {
  return computeExpensiveValue();
});
```

**useEffect Hook:**
Handles side effects in functional components.

```jsx
useEffect(() => {
  // Side effect logic
  return () => {
    // Cleanup logic (optional)
  };
}, [dependencies]); // Dependency array
```

**useEffect Patterns:**

**1. Component Did Mount (runs once):**
```jsx
useEffect(() => {
  console.log('Component mounted');
  fetchUserData();
}, []); // Empty dependency array
```

**2. Component Did Update (runs on specific changes):**
```jsx
useEffect(() => {
  console.log('User ID changed');
  fetchUserData(userId);
}, [userId]); // Runs when userId changes
```

**3. Component Will Unmount (cleanup):**
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);
  
  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);
```

**4. Multiple Effects:**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // Effect for fetching user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect for fetching posts
  useEffect(() => {
    if (user) {
      fetchUserPosts(user.id).then(setPosts);
    }
  }, [user]);
  
  // Effect for document title
  useEffect(() => {
    document.title = user ? `${user.name}'s Profile` : 'Loading...';
  }, [user]);
  
  return (
    <div>
      {user && <h1>{user.name}</h1>}
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}
```

**Common useEffect Mistakes:**
```jsx
// ❌ Missing dependency
useEffect(() => {
  fetchData(userId); // userId should be in dependency array
}, []); // Empty array is wrong!

// ✅ Correct dependency
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Object in dependency array
useEffect(() => {
  doSomething(config);
}, [config]); // config object will cause infinite re-renders

// ✅ Destructure object properties
useEffect(() => {
  doSomething(config);
}, [config.apiUrl, config.timeout]);
```

### Event Handling

#### Q5: How does event handling work in React?

**Answer:**

React uses **SyntheticEvents** - a wrapper around native events that provides consistent behavior across browsers.

**Basic Event Handling:**
```jsx
function Button() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Button clicked!');
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

**Event Handler Patterns:**

**1. Inline Handlers:**
```jsx
// ✅ Simple cases
<button onClick={() => setCount(count + 1)}>+</button>

// ❌ Avoid for complex logic (creates new function on each render)
<button onClick={() => {
  // Complex logic here
  performComplexOperation();
  updateMultipleStates();
}}>Click</button>
```

**2. Function References:**
```jsx
function handleSubmit(event) {
  event.preventDefault();
  // Handle form submission
}

// ✅ Pass function reference
<form onSubmit={handleSubmit}>
  {/* form content */}
</form>
```

**3. Parameterized Handlers:**
```jsx
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {/* ✅ Using arrow function for parameters */}
          <button onClick={() => onToggle(todo.id)}>Toggle</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**4. Custom Event Handlers:**
```jsx
function NumberInput({ onValueChange }) {
  const handleChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    onValueChange(value);
  };
  
  return (
    <input
      type="number"
      onChange={handleChange}
      placeholder="Enter a number"
    />
  );
}
```

**Event Object Properties:**
```jsx
function EventExample() {
  const handleEvent = (event) => {
    // SyntheticEvent properties
    console.log('Event type:', event.type);
    console.log('Target:', event.target);
    console.log('Current target:', event.currentTarget);
    
    // Access native event if needed
    const nativeEvent = event.nativeEvent;
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event propagation
    event.stopPropagation();
  };
  
  return <div onClick={handleEvent}>Click me</div>;
}
```

**Form Handling:**
```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Send data to server
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

## 🟡 Intermediate Level

### Lifecycle Methods

#### Q6: Explain React component lifecycle and how useEffect relates to it

**Answer:**

React components go through three main phases: **Mounting**, **Updating**, and **Unmounting**.

**Visual Lifecycle Flow:**
```
Component Lifecycle Phases:

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   MOUNTING  │ -> │  UPDATING   │ -> │ UNMOUNTING  │
│             │    │             │    │             │
│ Born        │    │ Growing     │    │ Dying       │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
 componentDidMount   componentDidUpdate  componentWillUnmount
       │                  │                  │
       ▼                  ▼                  ▼
   useEffect([])    useEffect([deps])   useEffect cleanup
```

**Class Component Lifecycle:**
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }
  
  componentDidMount() {
    console.log('2. Component Did Mount');
    // Fetch data, set up subscriptions
    this.fetchData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('3. Component Did Update');
    // Respond to prop or state changes
    if (prevProps.userId !== this.props.userId) {
      this.fetchData();
    }
  }
  
  componentWillUnmount() {
    console.log('4. Component Will Unmount');
    // Cleanup: remove listeners, cancel requests
    this.cleanup();
  }
  
  render() {
    console.log('Render');
    return <div>Count: {this.state.count}</div>;
  }
}
```

**Functional Component with useEffect:**
```jsx
function MyComponent({ userId }) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  
  // componentDidMount equivalent
  useEffect(() => {
    console.log('Component mounted');
    fetchInitialData();
  }, []); // Empty dependency array
  
  // componentDidUpdate equivalent
  useEffect(() => {
    console.log('userId changed');
    fetchUserData(userId);
  }, [userId]); // Runs when userId changes
  
  // componentWillUnmount equivalent
  useEffect(() => {
    const subscription = subscribeToUpdates();
    
    return () => {
      console.log('Cleanup');
      subscription.unsubscribe();
    };
  }, []);
  
  // Combined lifecycle with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Mount timer, cleanup on unmount
  
  return <div>Count: {count}</div>;
}
```

**useEffect Mapping to Lifecycle:**

| Class Lifecycle | useEffect Equivalent |
|-----------------|---------------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup; }, [])` |
| `componentDidMount` + `componentDidUpdate` | `useEffect(() => {})` (no deps) |

### Advanced Hooks

#### Q7: Explain useCallback, useMemo, and useRef hooks

**Answer:**

**useCallback - Memoize Functions:**
Prevents function recreation on every render.

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  
  // ❌ Function recreated on every render
  const handleAddTodo = () => {
    addTodo(newTodo);
    setNewTodo('');
  };
  
  // ✅ Function memoized, only recreated when dependencies change
  const handleAddTodo = useCallback(() => {
    addTodo(newTodo);
    setNewTodo('');
  }, [newTodo, addTodo]);
  
  // ✅ Memoized filter function
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'completed': return todo.completed;
        case 'active': return !todo.completed;
        default: return true;
      }
    });
  }, [todos, filter]);
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <TodoItems todos={filteredTodos} />
    </div>
  );
}

// Child component using React.memo
const TodoItems = React.memo(({ todos }) => {
  console.log('TodoItems rendered');
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
});
```

**useMemo - Memoize Values:**
Prevents expensive calculations on every render.

```jsx
function ExpensiveComponent({ items, multiplier }) {
  // ❌ Expensive calculation runs on every render
  const expensiveValue = items.reduce((sum, item) => {
    return sum + (item.value * multiplier);
  }, 0);
  
  // ✅ Expensive calculation memoized
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return items.reduce((sum, item) => {
      return sum + (item.value * multiplier);
    }, 0);
  }, [items, multiplier]);
  
  // ✅ Memoized object to prevent child re-renders
  const config = useMemo(() => ({
    theme: 'dark',
    language: 'en',
    multiplier
  }), [multiplier]);
  
  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <ChildComponent config={config} />
    </div>
  );
}
```

**useRef - Persistent References:**
Holds mutable values that don't cause re-renders.

```jsx
function RefExamples() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const previousValueRef = useRef();
  const [count, setCount] = useState(0);
  
  // Store previous value
  useEffect(() => {
    previousValueRef.current = count;
  });
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  const incrementWithoutRender = () => {
    countRef.current += 1;
    console.log('Ref count:', countRef.current);
    // This won't cause a re-render!
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
      
      <p>State count: {count}</p>
      <p>Previous count: {previousValueRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment State</button>
      <button onClick={incrementWithoutRender}>Increment Ref</button>
    </div>
  );
}
```

**Performance Comparison:**
```jsx
// Performance monitoring with useRef
function PerformanceMonitor({ children }) {
  const renderCountRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  
  renderCountRef.current += 1;
  
  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTimeRef.current;
    console.log(`Render #${renderCountRef.current} took ${renderTime}ms`);
    startTimeRef.current = endTime;
  });
  
  return children;
}
```

### Context API

#### Q8: How does React Context work and when should you use it?

**Answer:**

React Context provides a way to share data between components without passing props through every level of the component tree (avoiding "prop drilling").

**Visual Prop Drilling Problem:**
```
Without Context (Prop Drilling):

     App
      │
   props │ user
      ▼
   Header
      │
   props │ user (just passing through)
      ▼
 Navigation
      │
   props │ user (just passing through)
      ▼
 UserMenu
      │
      ▼
 Finally uses user data!
```

**With Context Solution:**
```
With Context:

     App (Provider)
      │
      ├─ Header
      │   └─ Navigation
      │       └─ UserMenu ─────► useContext(UserContext)
      │                         (direct access!)
      └─ Main
          └─ Profile ──────────► useContext(UserContext)
                                (direct access!)
```

**Basic Context Implementation:**
```jsx
// 1. Create Context
const UserContext = createContext();

// 2. Create Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);
  
  const login = async (credentials) => {
    const user = await loginUser(credentials);
    setUser(user);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    loading,
    login,
    logout
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create Custom Hook for Easy Access
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Use in Components
function App() {
  return (
    <UserProvider>
      <Header />
      <Main />
    </UserProvider>
  );
}

function Header() {
  const { user, logout } = useUser();
  
  return (
    <header>
      {user ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginButton />
      )}
    </header>
  );
}

function Profile() {
  const { user, loading } = useUser();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Advanced Context Pattern - Multiple Contexts:**
```jsx
// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Settings Context
const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: false,
    language: 'en'
  });
  
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Combined Provider
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
```

**Context Performance Optimization:**
```jsx
// Split context to prevent unnecessary re-renders
const UserStateContext = createContext();
const UserActionsContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  // Memoize actions to prevent re-renders
  const actions = useMemo(() => ({
    login: async (credentials) => {
      const user = await loginUser(credentials);
      setUser(user);
    },
    logout: () => setUser(null)
  }), []);
  
  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>
        {children}
      </UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
}

// Separate hooks for state and actions
function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) throw new Error('useUserState must be used within UserProvider');
  return context;
}

function useUserActions() {
  const context = useContext(UserActionsContext);
  if (!context) throw new Error('useUserActions must be used within UserProvider');
  return context;
}
```

**When to Use Context:**
- ✅ Global state (user authentication, theme, language)
- ✅ Avoiding prop drilling for deeply nested components
- ✅ Sharing state between sibling components
- ❌ Frequent updates (use state management library instead)
- ❌ Simple prop passing (2-3 levels deep)
- ❌ Performance-critical frequent changes

### Controlled vs Uncontrolled Components

#### Q9: What's the difference between controlled and uncontrolled components?

**Answer:**

The difference lies in where the form data is stored and managed.

**Controlled Components:**
Form data is handled by React state.

```jsx
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    console.log('Submitted:', { email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email} // Controlled by React state
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          value={password} // Controlled by React state
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

**Uncontrolled Components:**
Form data is handled by the DOM itself, accessed via refs.

```jsx
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access values directly from DOM
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    // Basic validation
    if (!email || password.length < 6) {
      alert('Please fill all fields correctly');
      return;
    }
    
    console.log('Submitted:', { email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={emailRef}
        type="email"
        defaultValue="" // Default value, not controlled
        placeholder="Email"
      />
      
      <input
        ref={passwordRef}
        type="password"
        defaultValue="" // Default value, not controlled
        placeholder="Password"
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

**Comparison Table:**

| Feature | Controlled | Uncontrolled |
|---------|------------|-------------|
| **Data Storage** | React state | DOM |
| **Access Method** | `value` prop | `ref.current.value` |
| **Real-time Validation** | ✅ Easy | ❌ Difficult |
| **Format Input** | ✅ Easy | ❌ Difficult |
| **Performance** | ❌ Re-renders | ✅ No re-renders |
| **Testing** | ✅ Easy | ❌ More complex |
| **Debugging** | ✅ React DevTools | ❌ DOM inspection |

**Hybrid Approach:**
```jsx
function HybridForm() {
  // Controlled for important fields
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Uncontrolled for less critical fields
  const nameRef = useRef();
  const commentsRef = useRef();
  
  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : 'Invalid email format');
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current.value,
      email,
      comments: commentsRef.current.value
    };
    
    console.log('Submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Uncontrolled - simple field */}
      <input
        ref={nameRef}
        placeholder="Name"
        defaultValue=""
      />
      
      {/* Controlled - needs validation */}
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className={emailError ? 'error' : ''}
        />
        {emailError && <span className="error">{emailError}</span>}
      </div>
      
      {/* Uncontrolled - large text area */}
      <textarea
        ref={commentsRef}
        placeholder="Comments"
        defaultValue=""
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**File Input (Always Uncontrolled):**
```jsx
function FileUpload() {
  const fileInputRef = useRef();
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Process file
    }
  };
  
  const clearFile = () => {
    fileInputRef.current.value = '';
  };
  
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
      <button onClick={clearFile}>Clear</button>
    </div>
  );
}
```

## 🔴 Advanced Level

### Performance Optimization

#### Q10: How do you optimize React application performance?

**Answer:**

React performance optimization involves preventing unnecessary re-renders and optimizing expensive operations.

**1. React.memo - Component Memoization:**
```jsx
// Prevents re-render when props haven't changed
const ExpensiveComponent = React.memo(({ data, theme }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div className={theme}>
      {data.map(item => (
        <ComplexItem key={item.id} item={item} />
      ))}
    </div>
  );
});

// Custom comparison function
const SmartComponent = React.memo(({ user, settings }) => {
  return <div>{user.name} - {settings.theme}</div>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.settings.theme === nextProps.settings.theme
  );
});
```

**2. useMemo - Value Memoization:**
```jsx
function DataProcessor({ items, filter, sortBy }) {
  // Expensive calculation memoized
  const processedData = useMemo(() => {
    console.log('Processing data...');
    
    return items
      .filter(item => item.category === filter)
      .sort((a, b) => {
        switch (sortBy) {
          case 'name': return a.name.localeCompare(b.name);
          case 'date': return new Date(a.date) - new Date(b.date);
          case 'price': return a.price - b.price;
          default: return 0;
        }
      })
      .map(item => ({
        ...item,
        formattedPrice: `$${item.price.toFixed(2)}`,
        formattedDate: new Date(item.date).toLocaleDateString()
      }));
  }, [items, filter, sortBy]);
  
  return (
    <div>
      {processedData.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

**3. useCallback - Function Memoization:**
```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // Memoized functions to prevent child re-renders
  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);
  
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);
  
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(todo => !todo.completed);
      case 'completed': return todos.filter(todo => todo.completed);
      default: return todos;
    }
  }, [todos, filter]);
  
  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

// Memoized child components
const AddTodo = React.memo(({ onAdd }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
});
```

**4. Virtualization for Large Lists:**
```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}

// Manual virtualization implementation
function ManualVirtualList({ items, itemHeight = 50, containerHeight = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              <ItemComponent item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**5. Code Splitting and Lazy Loading:**
```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Preload on hover
function NavigationLink({ to, children }) {
  const handleMouseEnter = () => {
    // Preload the component
    switch (to) {
      case '/dashboard':
        import('./Dashboard');
        break;
      case '/profile':
        import('./Profile');
        break;
    }
  };
  
  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}
```

**6. Performance Monitoring:**
```jsx
function PerformanceProfiler({ children, id }) {
  const handleRender = (id, phase, actualDuration) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
    
    // Send to analytics
    if (actualDuration > 16) { // Longer than one frame
      analytics.track('slow_render', {
        component: id,
        duration: actualDuration,
        phase
      });
    }
  };
  
  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
}

// Usage
function App() {
  return (
    <PerformanceProfiler id="App">
      <Header />
      <PerformanceProfiler id="Main">
        <Main />
      </PerformanceProfiler>
    </PerformanceProfiler>
  );
}
```

**7. Debouncing and Throttling:**
```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce(onSearch, 300),
    [onSearch]
  );
  
  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

// Throttled scroll handler
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 16); // ~60fps
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return <div>Scroll position: {scrollY}</div>;
}
```

**Performance Checklist:**
- ✅ Use React.memo for pure components
- ✅ Memoize expensive calculations with useMemo
- ✅ Memoize functions with useCallback
- ✅ Implement virtualization for large lists
- ✅ Use lazy loading for route-based code splitting
- ✅ Optimize bundle size with tree shaking
- ✅ Use React DevTools Profiler
- ✅ Debounce user input
- ✅ Avoid creating objects/arrays in render
- ✅ Use keys properly in lists

## 🎯 Common Interview Traps

### Trap 1: Infinite useEffect Loop
```jsx
// ❌ Infinite loop
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }); // Missing dependency array!
  
  return <div>{user?.name}</div>;
}

// ✅ Correct
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Proper dependency array
  
  return <div>{user?.name}</div>;
}
```

### Trap 2: Stale Closure
```jsx
// ❌ Stale closure
function BadCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // Always uses initial count (0)
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty deps causes stale closure
  
  return <div>{count}</div>;
}

// ✅ Correct solutions
function GoodCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1); // Use functional update
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty deps is fine with functional update
  
  return <div>{count}</div>;
}
```

### Trap 3: Key Prop Misuse
```jsx
// ❌ Using array index as key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li> // Bad!
      ))}
    </ul>
  );
}

// ✅ Using stable unique key
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> // Good!
      ))}
    </ul>
  );
}
```

### Trap 4: Creating Objects in Render
```jsx
// ❌ Creates new object on every render
function BadComponent({ data }) {
  return (
    <ExpensiveChild
      config={{ theme: 'dark', size: 'large' }} // New object every time!
      data={data}
    />
  );
}

// ✅ Memoized object
function GoodComponent({ data }) {
  const config = useMemo(() => ({
    theme: 'dark',
    size: 'large'
  }), []); // Memoized
  
  return (
    <ExpensiveChild
      config={config}
      data={data}
    />
  );
}
```

## 🚀 Follow-up Questions

### After useState Questions:
- How does React batch state updates?
- What happens if you call setState with the same value?
- When would you use useReducer instead of useState?

### After useEffect Questions:
- How do you handle cleanup in useEffect?
- What's the difference between useEffect and useLayoutEffect?
- How do you optimize useEffect performance?

### After Context Questions:
- When should you split context into multiple contexts?
- How do you prevent unnecessary re-renders with context?
- What are the alternatives to Context for state management?

### After Performance Questions:
- How do you measure React performance?
- What tools do you use for performance debugging?
- How do you implement progressive loading?

## 💡 Quick Reference

### Key Concepts:
1. **Components**: Building blocks of React apps
2. **JSX**: JavaScript syntax extension
3. **Props**: Data passed from parent to child
4. **State**: Local component data
5. **Hooks**: Functions for state and lifecycle
6. **Context**: Global state sharing
7. **Virtual DOM**: React's reconciliation system

### Common Patterns:
- **Container/Presentational**: Separate logic from UI
- **Higher-Order Components**: Enhance components with additional functionality
- **Render Props**: Share code between components using a function prop
- **Custom Hooks**: Extract reusable stateful logic

### Performance Tips:
- Use React.memo, useMemo, useCallback
- Implement virtualization for large lists
- Code split at route level
- Optimize bundle size
- Monitor with React DevTools Profiler

## 🛠️ Practice Problems

### 1. Build a Todo App with Advanced Features
- Add, edit, delete todos
- Filter by status (all, active, completed)
- Persist to localStorage
- Add due dates and priorities
- Implement search functionality

### 2. Create a Data Fetching Hook
- Handle loading, success, and error states
- Implement caching
- Add retry functionality
- Support for cancellation
- TypeScript support

### 3. Implement a Modal System
- Multiple modal support
- Focus management
- Escape key handling
- Click outside to close
- Animation support

### 4. Build a Form Validation System
- Real-time validation
- Custom validation rules
- Field dependencies
- Error message management
- Async validation support

### 5. Create a Infinite Scroll Component
- Load more data on scroll
- Loading indicators
- Error handling
- Virtual scrolling for performance
- Search integration

---

_This comprehensive React guide covers all essential concepts with progressive difficulty levels, visual explanations, and practical examples needed for frontend interviews at any level._
