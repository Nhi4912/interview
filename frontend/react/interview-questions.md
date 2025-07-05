# React Interview Questions & Answers

## 🎯 React Component Lifecycle Visualization

```
┌─────────────────────────────────────────────────────────────────────┐
│                          REACT COMPONENT LIFECYCLE                  │
│                                                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐  │
│  │    MOUNTING     │    │    UPDATING     │    │   UNMOUNTING    │  │
│  │                 │    │                 │    │                 │  │
│  │ constructor()   │    │ getDerivedState │    │ componentWill   │  │
│  │       ↓         │    │ FromProps()     │    │ Unmount()       │  │
│  │ getDerivedState │    │       ↓         │    │                 │  │
│  │ FromProps()     │    │ shouldComponent │    │                 │  │
│  │       ↓         │    │ Update()        │    │                 │  │
│  │ render()        │    │       ↓         │    │                 │  │
│  │       ↓         │    │ render()        │    │                 │  │
│  │ componentDid    │    │       ↓         │    │                 │  │
│  │ Mount()         │    │ getSnapshotBefore│   │                 │  │
│  │                 │    │ Update()        │    │                 │  │
│  │                 │    │       ↓         │    │                 │  │
│  │                 │    │ componentDid    │    │                 │  │
│  │                 │    │ Update()        │    │                 │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## 🎯 Progressive Interview Questions

### 🟢 BEGINNER LEVEL

#### Q1: What is React and what are its key features?

**Answer:**
React is a JavaScript library for building user interfaces, particularly for web applications. It was created by Facebook and is now maintained by Meta and the open-source community.

**Key Features:**

**1. Component-Based Architecture:**
```javascript
// Functional Component
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

**2. Virtual DOM:**
```
Real DOM vs Virtual DOM Performance:

┌─────────────────┐      ┌─────────────────┐
│   Real DOM      │      │   Virtual DOM   │
│                 │      │                 │
│ • Expensive     │  vs  │ • Fast          │
│ • Direct        │      │ • In-memory     │
│ • Browser API   │      │ • JavaScript    │
│ • Slow Updates  │      │ • Diffing       │
└─────────────────┘      └─────────────────┘
```

**3. JSX (JavaScript XML):**
```javascript
// JSX allows HTML-like syntax in JavaScript
const element = (
    <div className="greeting">
        <h1>Hello, World!</h1>
        <p>Welcome to React</p>
    </div>
);

// Compiles to:
const element = React.createElement(
    'div',
    { className: 'greeting' },
    React.createElement('h1', null, 'Hello, World!'),
    React.createElement('p', null, 'Welcome to React')
);
```

**4. Unidirectional Data Flow:**
```
Parent Component
        ↓ (props)
Child Component
        ↓ (callbacks)
Parent Component
```

#### Q2: What's the difference between functional and class components?

**Answer:**

| Feature | Functional Components | Class Components |
|---------|----------------------|------------------|
| Syntax | Function declaration | ES6 Class |
| State | useState Hook | this.state |
| Lifecycle | useEffect Hook | Lifecycle methods |
| Performance | Slightly faster | Slightly slower |
| Code | Less boilerplate | More boilerplate |
| `this` binding | Not needed | Required |

**Examples:**

**Functional Component:**
```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);
    
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```

**Class Component:**
```javascript
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        document.title = `Count: ${this.state.count}`;
    }
    
    componentDidUpdate() {
        document.title = `Count: ${this.state.count}`;
    }
    
    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.handleClick}>
                    Click me
                </button>
            </div>
        );
    }
}
```

#### Q3: Explain React Virtual DOM and how it works.

**Answer:**
The Virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize updates and improve performance.

**How Virtual DOM Works:**

```
┌─────────────────────────────────────────────────────────────┐
│                    VIRTUAL DOM PROCESS                      │
│                                                             │
│  1. State Change                                            │
│     ↓                                                       │
│  2. Create New Virtual DOM Tree                             │
│     ↓                                                       │
│  3. Diff with Previous Virtual DOM                          │
│     ↓                                                       │
│  4. Calculate Minimal Changes                               │
│     ↓                                                       │
│  5. Update Real DOM (Reconciliation)                       │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Previous    │    │   Current   │    │    Real     │     │
│  │ Virtual DOM │───▶│ Virtual DOM │───▶│    DOM      │     │
│  │             │    │             │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                             │                              │
│                             ▼                              │
│                      ┌─────────────┐                       │
│                      │   Diffing   │                       │
│                      │  Algorithm  │                       │
│                      └─────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

**Example:**
```javascript
// Initial state
const initialVirtualDOM = {
    type: 'ul',
    props: {},
    children: [
        { type: 'li', props: {}, children: ['Item 1'] },
        { type: 'li', props: {}, children: ['Item 2'] }
    ]
};

// After adding item
const newVirtualDOM = {
    type: 'ul',
    props: {},
    children: [
        { type: 'li', props: {}, children: ['Item 1'] },
        { type: 'li', props: {}, children: ['Item 2'] },
        { type: 'li', props: {}, children: ['Item 3'] } // New item
    ]
};

// React will only add the new <li> to the real DOM
// Instead of re-rendering the entire list
```

#### Q4: What are props and how do you pass data between components?

**Answer:**
Props (properties) are read-only data passed from parent components to child components.

**Basic Props Example:**
```javascript
// Parent Component
function App() {
    const user = {
        name: "John Doe",
        age: 25,
        email: "john@example.com"
    };
    
    return (
        <div>
            <UserProfile 
                user={user} 
                isLoggedIn={true}
                onLogout={() => console.log('Logged out')}
            />
        </div>
    );
}

// Child Component
function UserProfile({ user, isLoggedIn, onLogout }) {
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            {isLoggedIn && (
                <button onClick={onLogout}>Logout</button>
            )}
        </div>
    );
}
```

**Props Flow Visualization:**
```
┌─────────────────┐
│  Parent (App)   │
│                 │
│ user={user}     │
│ isLoggedIn=true │
│ onLogout={fn}   │
└─────────┬───────┘
          │ props
          ▼
┌─────────────────┐
│ Child (Profile) │
│                 │
│ Receives props  │
│ as parameters   │
└─────────────────┘
```

**PropTypes for Type Checking:**
```javascript
import PropTypes from 'prop-types';

UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func.isRequired
};

UserProfile.defaultProps = {
    isLoggedIn: false
};
```

#### Q5: What is state and how do you manage it in React?

**Answer:**
State is mutable data that belongs to a component and can change over time, triggering re-renders.

**useState Hook (Functional Components):**
```javascript
import React, { useState } from 'react';

function Counter() {
    // State declaration
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [user, setUser] = useState({ id: 1, name: 'John' });
    
    // State updates
    const increment = () => setCount(count + 1);
    const updateName = (e) => setName(e.target.value);
    const updateUser = () => setUser(prev => ({ 
        ...prev, 
        name: 'Jane' 
    }));
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            
            <input 
                value={name} 
                onChange={updateName}
                placeholder="Enter name"
            />
            
            <p>User: {user.name}</p>
            <button onClick={updateUser}>Update User</button>
        </div>
    );
}
```

**Class Component State:**
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: '',
            user: { id: 1, name: 'John' }
        };
    }
    
    increment = () => {
        this.setState({ count: this.state.count + 1 });
        // or
        this.setState(prevState => ({ 
            count: prevState.count + 1 
        }));
    };
    
    updateName = (e) => {
        this.setState({ name: e.target.value });
    };
    
    updateUser = () => {
        this.setState(prevState => ({
            user: { ...prevState.user, name: 'Jane' }
        }));
    };
    
    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>+</button>
                
                <input 
                    value={this.state.name} 
                    onChange={this.updateName}
                    placeholder="Enter name"
                />
                
                <p>User: {this.state.user.name}</p>
                <button onClick={this.updateUser}>Update User</button>
            </div>
        );
    }
}
```

### 🟡 INTERMEDIATE LEVEL

#### Q6: Explain React Hooks and their benefits.

**Answer:**
React Hooks are functions that let you use state and other React features in functional components.

**Core Hooks:**

**1. useState:**
```javascript
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);
    
    return { count, increment, decrement, reset };
}

// Usage
function Counter() {
    const { count, increment, decrement, reset } = useCounter(10);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

**2. useEffect:**
```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Effect runs after render
        async function fetchUser() {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUser();
        
        // Cleanup function (optional)
        return () => {
            // Cancel API request if component unmounts
        };
    }, [userId]); // Dependency array - effect runs when userId changes
    
    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;
    
    return <div>Welcome, {user.name}!</div>;
}
```

**3. useContext:**
```javascript
// Create context
const ThemeContext = React.createContext();

// Provider component
function App() {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Header />
            <MainContent />
        </ThemeContext.Provider>
    );
}

// Consumer component
function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    return (
        <header className={theme}>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </header>
    );
}
```

**4. useReducer:**
```javascript
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.text, done: false }];
        case 'TOGGLE_TODO':
            return state.map(todo => 
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
};

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [inputText, setInputText] = useState('');
    
    const addTodo = () => {
        if (inputText.trim()) {
            dispatch({ type: 'ADD_TODO', text: inputText });
            setInputText('');
        }
    };
    
    return (
        <div>
            <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add Todo</button>
            
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span 
                            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**Hook Rules:**
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Custom hooks must start with "use"

#### Q7: What is the difference between controlled and uncontrolled components?

**Answer:**

**Controlled Components:**
React controls the form data through state.

```javascript
function ControlledForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

**Uncontrolled Components:**
DOM handles the form data, React uses refs to access values.

```javascript
function UncontrolledForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        };
        console.log('Form data:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                ref={nameRef}
                defaultValue=""
                placeholder="Name"
            />
            <input
                type="email"
                ref={emailRef}
                defaultValue=""
                placeholder="Email"
            />
            <textarea
                ref={messageRef}
                defaultValue=""
                placeholder="Message"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

**Comparison:**

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| Data flow | React state | DOM |
| Validation | Real-time | On submit |
| Performance | Re-renders on change | No re-renders |
| Testing | Easier | Requires DOM |
| Default values | `value` prop | `defaultValue` prop |

#### Q8: Explain React's reconciliation algorithm.

**Answer:**
Reconciliation is the process React uses to update the DOM efficiently by comparing the new Virtual DOM tree with the previous one.

**Reconciliation Process:**

```
┌─────────────────────────────────────────────────────────────┐
│                    RECONCILIATION ALGORITHM                 │
│                                                             │
│  Step 1: Element Type Comparison                            │
│  ┌─────────────┐    ┌─────────────┐                        │
│  │ <div>       │ vs │ <span>      │ → Different types      │
│  │   content   │    │   content   │   Replace entirely     │
│  └─────────────┘    └─────────────┘                        │
│                                                             │
│  Step 2: Same Type - Update Props                          │
│  ┌─────────────┐    ┌─────────────┐                        │
│  │ <div        │ vs │ <div        │ → Same type            │
│  │  class="a"> │    │  class="b"> │   Update class only    │
│  └─────────────┘    └─────────────┘                        │
│                                                             │
│  Step 3: Children Reconciliation                           │
│  Using keys for efficient list updates                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Concepts:**

**1. Element Type Comparison:**
```javascript
// Different types - complete replacement
const before = <div>Hello</div>;
const after = <span>Hello</span>;
// React will destroy the div and create a new span

// Same type - update props only
const before = <div className="old">Hello</div>;
const after = <div className="new">Hello</div>;
// React will only update the className attribute
```

**2. Keys for List Reconciliation:**
```javascript
// Without keys (inefficient)
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li>{todo.text}</li> // React can't track items efficiently
            ))}
        </ul>
    );
}

// With keys (efficient)
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li> // React can track each item
            ))}
        </ul>
    );
}
```

**3. Reconciliation Example:**
```javascript
// Initial render
<ul>
    <li key="a">Apple</li>
    <li key="b">Banana</li>
</ul>

// After adding item at beginning
<ul>
    <li key="c">Cherry</li>  // New item
    <li key="a">Apple</li>   // Moved but same element
    <li key="b">Banana</li>  // Moved but same element
</ul>

// Without keys: React would update all <li> contents
// With keys: React inserts new <li> and moves existing ones
```

#### Q9: What are React patterns like Higher-Order Components and Render Props?

**Answer:**

**Higher-Order Components (HOCs):**
A HOC is a function that takes a component and returns a new component with additional props or behavior.

```javascript
// HOC for authentication
function withAuth(WrappedComponent) {
    return function AuthenticatedComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            // Check authentication status
            checkAuthStatus()
                .then(setIsAuthenticated)
                .finally(() => setLoading(false));
        }, []);
        
        if (loading) {
            return <div>Loading...</div>;
        }
        
        if (!isAuthenticated) {
            return <div>Please log in</div>;
        }
        
        return <WrappedComponent {...props} />;
    };
}

// Usage
const Dashboard = ({ user }) => <div>Welcome, {user.name}!</div>;
const AuthenticatedDashboard = withAuth(Dashboard);

// HOC for loading states
function withLoading(WrappedComponent) {
    return function LoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        
        return <WrappedComponent {...props} />;
    };
}
```

**Render Props:**
A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```javascript
// Mouse tracker with render props
class MouseTracker extends React.Component {
    state = { x: 0, y: 0 };
    
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    };
    
    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

// Usage
function App() {
    return (
        <MouseTracker
            render={({ x, y }) => (
                <div>
                    <h1>Mouse position:</h1>
                    <p>X: {x}, Y: {y}</p>
                </div>
            )}
        />
    );
}

// Children as function (variant of render props)
function App() {
    return (
        <MouseTracker>
            {({ x, y }) => (
                <div>
                    <h1>Mouse position:</h1>
                    <p>X: {x}, Y: {y}</p>
                </div>
            )}
        </MouseTracker>
    );
}
```

**Modern Alternative - Custom Hooks:**
```javascript
// Custom hook replaces both HOCs and render props
function useMouse() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        function handleMouseMove(event) {
            setPosition({ x: event.clientX, y: event.clientY });
        }
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    
    return position;
}

// Usage
function App() {
    const { x, y } = useMouse();
    
    return (
        <div>
            <h1>Mouse position:</h1>
            <p>X: {x}, Y: {y}</p>
        </div>
    );
}
```

#### Q10: How do you optimize React performance?

**Answer:**

**1. React.memo for Component Memoization:**
```javascript
// Expensive component that only updates when props change
const ExpensiveComponent = React.memo(({ user, settings }) => {
    const expensiveValue = useMemo(() => {
        return performExpensiveCalculation(user, settings);
    }, [user, settings]);
    
    return <div>{expensiveValue}</div>;
});

// Custom comparison function
const MyComponent = React.memo(({ user }) => {
    return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id;
});
```

**2. useMemo and useCallback:**
```javascript
function TodoApp({ todos, filter }) {
    // Memoize expensive calculations
    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            switch (filter) {
                case 'completed': return todo.completed;
                case 'pending': return !todo.completed;
                default: return true;
            }
        });
    }, [todos, filter]);
    
    // Memoize callback functions
    const handleToggle = useCallback((id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []); // Empty dependency array - function never changes
    
    const handleDelete = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);
    
    return (
        <div>
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
```

**3. Code Splitting with React.lazy:**
```javascript
// Lazy load components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Profile = React.lazy(() => import('./Profile'));
const Settings = React.lazy(() => import('./Settings'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

// Dynamic imports with conditions
function loadComponent(componentName) {
    return React.lazy(() => 
        import(`./components/${componentName}`).catch(() => 
            import('./components/ErrorComponent')
        )
    );
}
```

**4. Virtual Scrolling for Large Lists:**
```javascript
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
    const Row = ({ index, style }) => (
        <div style={style}>
            <div>Item {items[index].name}</div>
        </div>
    );
    
    return (
        <List
            height={600}
            itemCount={items.length}
            itemSize={50}
            width="100%"
        >
            {Row}
        </List>
    );
}
```

**5. State Structure Optimization:**
```javascript
// Bad: Deeply nested state
const [user, setUser] = useState({
    profile: {
        personal: {
            name: '',
            email: ''
        },
        preferences: {
            theme: 'light',
            notifications: true
        }
    }
});

// Good: Flat state structure
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [theme, setTheme] = useState('light');
const [notifications, setNotifications] = useState(true);

// Or use useReducer for complex state
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};
```

### 🔴 ADVANCED LEVEL

#### Q11: Explain React's Fiber architecture.

**Answer:**
React Fiber is a complete rewrite of React's core algorithm, introduced in React 16 to enable incremental rendering and better handling of priority updates.

**Key Concepts:**

**1. Fiber Node Structure:**
```javascript
// Simplified Fiber node
const fiberNode = {
    // Component information
    type: 'div',                    // Element type
    props: { className: 'container' }, // Properties
    
    // Tree structure
    child: null,                    // First child
    sibling: null,                  // Next sibling
    return: null,                   // Parent fiber
    
    // State and effects
    memoizedState: null,            // Current state
    pendingProps: null,             // New props
    
    // Work tracking
    lanes: 0,                       // Priority lanes
    childLanes: 0,                  // Child priority
    
    // Effects
    flags: NoFlags,                 // Side effects
    subtreeFlags: NoFlags,          // Subtree effects
    
    // Alternate for double buffering
    alternate: null                 // Previous fiber
};
```

**2. Fiber Tree Traversal:**
```
┌─────────────────────────────────────────────────────────────┐
│                    FIBER TREE TRAVERSAL                     │
│                                                             │
│     App                                                     │
│    ┌─────┐                                                 │
│    │  1  │ ←── Start here                                  │
│    └──┬──┘                                                 │
│       │ child                                              │
│       ▼                                                    │
│     Header                                                 │
│    ┌─────┐                                                │
│    │  2  │                                                │
│    └──┬──┘                                                │
│       │ sibling                                           │
│       ▼                                                   │
│     Main                                                  │
│    ┌─────┐                                               │
│    │  3  │                                               │
│    └──┬──┘                                               │
│       │ child                                            │
│       ▼                                                  │
│     Content                                              │
│    ┌─────┐                                              │
│    │  4  │                                              │
│    └─────┘                                              │
│                                                         │
│  Traversal order: 1 → 2 → 3 → 4 → 3 → 2 → 1           │
│  (child-first, then sibling, then return to parent)    │
└─────────────────────────────────────────────────────────────┘
```

**3. Priority and Scheduling:**
```javascript
// React uses lanes for priority scheduling
const Lanes = {
    NoLanes: 0b0000000000000000,
    SyncLane: 0b0000000000000001,           // Highest priority
    InputContinuousLane: 0b0000000000000100, // User input
    DefaultLane: 0b0000000000010000,         // Normal updates
    TransitionLane: 0b0000000001000000,      // Transitions
    IdleLane: 0b0100000000000000,            // Lowest priority
};

// Example of how priorities work
function PriorityExample() {
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    
    const handleUrgentUpdate = () => {
        // High priority - user input
        setCount(c => c + 1);
    };
    
    const handleNormalUpdate = () => {
        // Normal priority
        setSearch('some value');
    };
    
    const handleLowPriorityUpdate = () => {
        // Low priority - can be interrupted
        startTransition(() => {
            setSearch('expensive operation result');
        });
    };
    
    return (
        <div>
            <button onClick={handleUrgentUpdate}>Urgent: {count}</button>
            <button onClick={handleNormalUpdate}>Normal</button>
            <button onClick={handleLowPriorityUpdate}>Low Priority</button>
        </div>
    );
}
```

**4. Work Loop:**
```javascript
// Simplified work loop
function workLoop(deadline) {
    let shouldYield = false;
    
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
    
    requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
    // 1. Perform work on current fiber
    if (fiber.tag === FunctionComponent) {
        updateFunctionComponent(fiber);
    } else if (fiber.tag === HostComponent) {
        updateHostComponent(fiber);
    }
    
    // 2. Return next unit of work
    if (fiber.child) {
        return fiber.child;
    }
    
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}
```

#### Q12: Implement a custom Hook for data fetching with error handling and caching.

**Answer:**
```javascript
import { useState, useEffect, useRef, useCallback } from 'react';

// Cache object to store API responses
const cache = new Map();

function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const abortControllerRef = useRef();
    const retryCountRef = useRef(0);
    
    const {
        cacheTime = 5 * 60 * 1000,  // 5 minutes
        retryCount = 3,
        retryDelay = 1000,
        onSuccess,
        onError,
        enabled = true,
        dependencies = []
    } = options;
    
    const fetchData = useCallback(async () => {
        if (!enabled || !url) return;
        
        // Check cache first
        const cacheKey = url;
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheTime) {
            setData(cached.data);
            setLoading(false);
            setError(null);
            return;
        }
        
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(url, {
                signal: abortControllerRef.current.signal,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            
            // Cache the response
            cache.set(cacheKey, {
                data: responseData,
                timestamp: Date.now()
            });
            
            setData(responseData);
            setError(null);
            retryCountRef.current = 0;
            
            if (onSuccess) {
                onSuccess(responseData);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                return; // Request was cancelled
            }
            
            const shouldRetry = retryCountRef.current < retryCount;
            
            if (shouldRetry) {
                retryCountRef.current += 1;
                setTimeout(() => {
                    fetchData();
                }, retryDelay * retryCountRef.current);
            } else {
                setError(err);
                if (onError) {
                    onError(err);
                }
            }
        } finally {
            setLoading(false);
        }
    }, [url, enabled, cacheTime, retryCount, retryDelay, onSuccess, onError, ...dependencies]);
    
    const refetch = useCallback(() => {
        retryCountRef.current = 0;
        fetchData();
    }, [fetchData]);
    
    const clearCache = useCallback(() => {
        cache.delete(url);
    }, [url]);
    
    useEffect(() => {
        fetchData();
        
        // Cleanup on unmount
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);
    
    return {
        data,
        loading,
        error,
        refetch,
        clearCache,
        isStale: data && cache.has(url) && 
                 Date.now() - cache.get(url).timestamp > cacheTime
    };
}

// Advanced version with React Query-like features
function useAdvancedApi(queryKey, queryFn, options = {}) {
    const [queryState, setQueryState] = useState({
        data: undefined,
        error: null,
        loading: true,
        isFetching: false,
        isStale: false
    });
    
    const queryKeyRef = useRef(queryKey);
    const abortControllerRef = useRef();
    
    const {
        staleTime = 0,
        cacheTime = 5 * 60 * 1000,
        refetchOnWindowFocus = true,
        refetchInterval,
        enabled = true,
        retry = 3,
        retryDelay = attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        onSuccess,
        onError,
        select,
        placeholderData
    } = options;
    
    const fetchQuery = useCallback(async (background = false) => {
        if (!enabled) return;
        
        const currentQueryKey = JSON.stringify(queryKey);
        
        // Check cache
        const cached = cache.get(currentQueryKey);
        const isStale = !cached || Date.now() - cached.timestamp > staleTime;
        
        if (cached && !isStale && !background) {
            setQueryState(prev => ({
                ...prev,
                data: select ? select(cached.data) : cached.data,
                loading: false,
                error: null
            }));
            return;
        }
        
        if (!background) {
            setQueryState(prev => ({
                ...prev,
                loading: !cached,
                isFetching: true,
                isStale: Boolean(cached && isStale)
            }));
        } else {
            setQueryState(prev => ({
                ...prev,
                isFetching: true,
                isStale: true
            }));
        }
        
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        
        let retryCount = 0;
        
        const attemptFetch = async () => {
            try {
                const result = await queryFn({
                    signal: abortControllerRef.current.signal,
                    queryKey
                });
                
                // Cache the result
                cache.set(currentQueryKey, {
                    data: result,
                    timestamp: Date.now()
                });
                
                const processedData = select ? select(result) : result;
                
                setQueryState(prev => ({
                    ...prev,
                    data: processedData,
                    error: null,
                    loading: false,
                    isFetching: false,
                    isStale: false
                }));
                
                if (onSuccess) {
                    onSuccess(processedData);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                }
                
                if (retryCount < retry) {
                    retryCount++;
                    const delay = typeof retryDelay === 'function' 
                        ? retryDelay(retryCount) 
                        : retryDelay;
                    
                    setTimeout(attemptFetch, delay);
                    return;
                }
                
                setQueryState(prev => ({
                    ...prev,
                    error,
                    loading: false,
                    isFetching: false
                }));
                
                if (onError) {
                    onError(error);
                }
            }
        };
        
        await attemptFetch();
    }, [queryKey, queryFn, enabled, staleTime, retry, retryDelay, onSuccess, onError, select]);
    
    // Refetch function
    const refetch = useCallback(() => {
        return fetchQuery(false);
    }, [fetchQuery]);
    
    // Invalidate and refetch
    const invalidateAndRefetch = useCallback(() => {
        cache.delete(JSON.stringify(queryKey));
        return fetchQuery(false);
    }, [queryKey, fetchQuery]);
    
    // Initial fetch
    useEffect(() => {
        queryKeyRef.current = queryKey;
        fetchQuery();
        
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchQuery]);
    
    // Refetch interval
    useEffect(() => {
        if (refetchInterval && enabled) {
            const interval = setInterval(() => {
                fetchQuery(true);
            }, refetchInterval);
            
            return () => clearInterval(interval);
        }
    }, [refetchInterval, enabled, fetchQuery]);
    
    // Refetch on window focus
    useEffect(() => {
        if (refetchOnWindowFocus && enabled) {
            const handleFocus = () => fetchQuery(true);
            window.addEventListener('focus', handleFocus);
            return () => window.removeEventListener('focus', handleFocus);
        }
    }, [refetchOnWindowFocus, enabled, fetchQuery]);
    
    return {
        ...queryState,
        refetch,
        invalidateAndRefetch,
        isLoading: queryState.loading,
        isFetching: queryState.isFetching,
        isError: Boolean(queryState.error),
        isSuccess: !queryState.loading && !queryState.error && queryState.data !== undefined
    };
}

// Usage examples
function UserProfile({ userId }) {
    // Simple usage
    const { data: user, loading, error, refetch } = useApi(`/api/users/${userId}`, {
        enabled: Boolean(userId),
        onSuccess: (data) => console.log('User loaded:', data),
        onError: (error) => console.error('Failed to load user:', error)
    });
    
    // Advanced usage
    const { 
        data: posts, 
        isLoading, 
        isError, 
        isFetching, 
        refetch: refetchPosts 
    } = useAdvancedApi(
        ['posts', userId],
        async ({ signal }) => {
            const response = await fetch(`/api/users/${userId}/posts`, { signal });
            if (!response.ok) throw new Error('Failed to fetch posts');
            return response.json();
        },
        {
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 5 * 60 * 1000, // 5 minutes
            refetchInterval: 30000, // 30 seconds
            enabled: Boolean(userId),
            select: (data) => data.filter(post => post.published)
        }
    );
    
    if (loading || isLoading) return <div>Loading...</div>;
    if (error || isError) return <div>Error loading data</div>;
    
    return (
        <div>
            <h1>{user?.name}</h1>
            <button onClick={refetch}>Refresh User</button>
            <button onClick={refetchPosts}>Refresh Posts</button>
            {isFetching && <span>Updating...</span>}
            
            <h2>Posts</h2>
            {posts?.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
}
```

## 🎯 Common React Interview Traps & Tips

### ❌ Trap 1: useState with Objects
```javascript
// Wrong - mutating state
const [user, setUser] = useState({ name: 'John', age: 25 });
const updateAge = () => {
    user.age = 26; // Mutation!
    setUser(user); // React won't re-render
};

// Correct - creating new object
const updateAge = () => {
    setUser(prev => ({ ...prev, age: 26 }));
};
```

### ❌ Trap 2: useEffect Infinite Loops
```javascript
// Wrong - missing dependency
useEffect(() => {
    fetchData(userId);
}, []); // Missing userId dependency

// Wrong - object in dependencies
useEffect(() => {
    fetchData(config);
}, [config]); // Object reference changes on every render

// Correct solutions
useEffect(() => {
    fetchData(userId);
}, [userId]);

// For objects, use useMemo or destructure
const { apiKey, endpoint } = config;
useEffect(() => {
    fetchData({ apiKey, endpoint });
}, [apiKey, endpoint]);
```

### ❌ Trap 3: Keys in Lists
```javascript
// Wrong - using index as key
{items.map((item, index) => (
    <Item key={index} data={item} />
))}

// Correct - using stable unique ID
{items.map(item => (
    <Item key={item.id} data={item} />
))}
```

### ✅ Pro Tips:
1. Always use functional updates for state that depends on previous state
2. Memoize expensive calculations with useMemo
3. Use useCallback for functions passed to child components
4. Prefer composition over inheritance
5. Keep components small and focused
6. Use TypeScript for better developer experience