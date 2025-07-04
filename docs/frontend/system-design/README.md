# System Design Interview Preparation Guide

## Table of Contents

- [Core Concepts](#core-concepts)
- [Frontend Architecture](#frontend-architecture)
- [Component Design](#component-design)
- [State Management](#state-management)
- [Common Interview Questions](#common-interview-questions)
- [Design Patterns](#design-patterns)
- [Scalability](#scalability)
- [Practice Problems](#practice-problems)

## Core Concepts

### System Design Fundamentals

#### 1. Scalability

**Definition**: Ability of a system to handle increased load without performance degradation.

**Types**:

- **Horizontal Scaling**: Adding more machines/servers
- **Vertical Scaling**: Adding more resources to existing machines
- **Load Balancing**: Distributing traffic across multiple servers

#### 2. Availability

**Definition**: Percentage of time a system is operational and accessible.

**Metrics**:

- **99.9% (Three nines)**: 8.76 hours downtime per year
- **99.99% (Four nines)**: 52.56 minutes downtime per year
- **99.999% (Five nines)**: 5.26 minutes downtime per year

#### 3. Performance

**Definition**: How fast a system responds to user requests.

**Key Metrics**:

- Response time
- Throughput
- Latency
- Bandwidth utilization

## Frontend Architecture

### Modern Frontend Architecture

#### 1. Micro-Frontends

**Definition**: Architectural pattern where frontend applications are composed of independent, deployable micro-applications.

**Benefits**:

- Independent development and deployment
- Technology diversity
- Team autonomy
- Scalable development

**Implementation**:

```javascript
// Module Federation (Webpack 5)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
    }),
  ],
};
```

#### 2. Monorepo Architecture

**Definition**: Single repository containing multiple related projects.

**Benefits**:

- Shared tooling and dependencies
- Atomic commits across projects
- Easier refactoring
- Consistent development experience

**Tools**:

- Lerna
- Nx
- Yarn Workspaces
- Rush

#### 3. Component-Driven Architecture

**Definition**: Building applications from reusable, composable components.

**Principles**:

- Single responsibility
- Composition over inheritance
- Props down, events up
- Controlled vs uncontrolled components

### Application Architecture Patterns

#### 1. Layered Architecture

**Definition**: Organizing code into distinct layers with specific responsibilities.

**Layers**:

- **Presentation Layer**: UI components, routing
- **Business Logic Layer**: Services, utilities
- **Data Access Layer**: API calls, state management
- **Infrastructure Layer**: Configuration, logging

#### 2. Feature-Based Architecture

**Definition**: Organizing code by features rather than technical concerns.

**Structure**:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   ├── dashboard/
│   └── settings/
├── shared/
│   ├── components/
│   ├── utilities/
│   └── types/
└── app/
```

## Component Design

### Component Design Principles

#### 1. Single Responsibility Principle

**Definition**: Each component should have one reason to change.

**Example**:

```javascript
// Good: Single responsibility
const UserAvatar = ({ user, size }) => (
  <img
    src={user.avatar}
    alt={user.name}
    style={{ width: size, height: size }}
  />
);

const UserInfo = ({ user }) => (
  <div>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
);

// Bad: Multiple responsibilities
const UserCard = ({ user }) => (
  <div>
    <img src={user.avatar} alt={user.name} />
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <button onClick={() => editUser(user.id)}>Edit</button>
    <button onClick={() => deleteUser(user.id)}>Delete</button>
  </div>
);
```

#### 2. Composition Pattern

**Definition**: Building complex components from simpler ones.

```javascript
const Card = ({ children, ...props }) => (
  <div className="card" {...props}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }) => <div className="card-body">{children}</div>;

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>;
```

#### 3. Render Props Pattern

**Definition**: Passing a function as a prop to control rendering.

```javascript
const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return children({ data, loading, error });
};

// Usage
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>;
```

### Advanced Component Patterns

#### 1. Higher-Order Components (HOC)

**Definition**: Function that takes a component and returns a new component with additional props.

```javascript
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
      // Fetch data logic
      setLoading(false);
    }, []);

    if (loading) return <Spinner />;
    return <WrappedComponent {...props} data={data} />;
  };
};

const UserList = withLoading(({ data }) => (
  <div>
    {data.map((user) => (
      <User key={user.id} user={user} />
    ))}
  </div>
));
```

#### 2. Custom Hooks

**Definition**: Reusable logic extracted into custom functions.

```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light");
```

## State Management

### State Management Patterns

#### 1. Local State

**Definition**: State managed within a component using useState.

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

#### 2. Global State

**Definition**: State shared across multiple components.

**Redux Example**:

```javascript
// Store
const store = createStore(counterReducer);

// Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Component
const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
    </div>
  );
};
```

#### 3. Server State

**Definition**: State that comes from external APIs.

**React Query Example**:

```javascript
const useUsers = () => {
  return useQuery("users", async () => {
    const response = await fetch("/api/users");
    return response.json();
  });
};

const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};
```

## Common Interview Questions

### Q1: Design a scalable frontend architecture for a large application

**Answer**:

1. **Micro-Frontends**: Split into independent applications
2. **Monorepo**: Shared tooling and dependencies
3. **Component Library**: Reusable UI components
4. **State Management**: Centralized state with Redux/Zustand
5. **API Layer**: Centralized API management
6. **Build System**: Module federation for code sharing
7. **Testing Strategy**: Unit, integration, and E2E tests
8. **Performance**: Code splitting, lazy loading, caching

### Q2: How would you design a component library?

**Answer**:

1. **Design System**: Consistent design tokens and patterns
2. **Component Structure**: Atomic design principles
3. **API Design**: Consistent props and interfaces
4. **Documentation**: Storybook for component documentation
5. **Testing**: Comprehensive test coverage
6. **Versioning**: Semantic versioning for releases
7. **Distribution**: NPM package with tree-shaking support
8. **Accessibility**: WCAG compliance and keyboard navigation

### Q3: Explain the difference between Redux and Context API

**Answer**:
**Redux**:

- Predictable state container
- DevTools for debugging
- Middleware support
- Large ecosystem
- More boilerplate code

**Context API**:

- Built into React
- Simpler setup
- No external dependencies
- Less boilerplate
- Limited debugging tools

### Q4: How would you optimize a slow React application?

**Answer**:

1. **Code Splitting**: Lazy loading components and routes
2. **Memoization**: React.memo, useMemo, useCallback
3. **Virtual Scrolling**: For large lists
4. **Bundle Analysis**: Identify large dependencies
5. **Tree Shaking**: Remove unused code
6. **Performance Monitoring**: Profiling with DevTools
7. **State Optimization**: Minimize re-renders
8. **Image Optimization**: Lazy loading and compression

### Q5: Design a real-time chat application

**Answer**:
**Architecture**:

1. **Frontend**: React with WebSocket connection
2. **State Management**: Redux for chat state
3. **Real-time**: WebSocket for instant messaging
4. **Offline Support**: Service worker for caching
5. **Notifications**: Push notifications for new messages
6. **File Sharing**: Upload and download capabilities
7. **Search**: Full-text search with debouncing
8. **Security**: End-to-end encryption

**Component Structure**:

```
ChatApp/
├── ChatList/
├── ChatRoom/
│   ├── MessageList/
│   ├── MessageInput/
│   └── FileUpload/
├── UserList/
└── NotificationCenter/
```

## Design Patterns

### Frontend Design Patterns

#### 1. Observer Pattern

**Definition**: Objects subscribe to events and get notified when events occur.

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

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}
```

#### 2. Factory Pattern

**Definition**: Creating objects without specifying their exact class.

```javascript
const createButton = (type, text) => {
  switch (type) {
    case "primary":
      return <button className="btn-primary">{text}</button>;
    case "secondary":
      return <button className="btn-secondary">{text}</button>;
    default:
      return <button>{text}</button>;
  }
};
```

#### 3. Strategy Pattern

**Definition**: Defining a family of algorithms and making them interchangeable.

```javascript
const sortingStrategies = {
  bubble: (arr) => arr.sort((a, b) => a - b),
  quick: (arr) => arr.sort((a, b) => a - b),
  merge: (arr) => arr.sort((a, b) => a - b),
};

const Sorter = ({ strategy, data }) => {
  const sortedData = sortingStrategies[strategy](data);
  return <div>{sortedData.join(", ")}</div>;
};
```

## Scalability

### Scaling Frontend Applications

#### 1. Code Splitting

**Definition**: Splitting code into smaller chunks loaded on demand.

```javascript
// Route-based splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Component-based splitting
const HeavyComponent = lazy(() => import("./components/HeavyComponent"));
```

#### 2. Caching Strategies

**Definition**: Storing frequently accessed data to improve performance.

**Types**:

- **Browser Cache**: HTTP cache headers
- **Application Cache**: In-memory caching
- **CDN Cache**: Distributed caching
- **Service Worker Cache**: Offline caching

#### 3. Load Balancing

**Definition**: Distributing traffic across multiple servers.

**Frontend Considerations**:

- CDN for static assets
- Multiple API endpoints
- Geographic distribution
- Health checks and failover

## Practice Problems

### Problem 1: Design a Social Media Feed

Design a scalable social media feed with infinite scrolling, real-time updates, and content filtering.

### Problem 2: Build a Component Library

Create a comprehensive component library with documentation, testing, and distribution strategy.

### Problem 3: Design a Real-time Dashboard

Build a real-time dashboard with multiple data sources, charts, and user customization.

### Problem 4: Implement Micro-Frontends

Design and implement a micro-frontend architecture for an e-commerce platform.

### Problem 5: Create a State Management Solution

Build a custom state management library with middleware support and DevTools integration.

### Problem 6: Design a File Upload System

Create a file upload system with progress tracking, chunked uploads, and resume capability.

### Problem 7: Build a Search Interface

Implement a search interface with autocomplete, filters, and result highlighting.

### Problem 8: Design a Notification System

Create a notification system with real-time updates, user preferences, and cross-platform support.

---

_This guide covers essential system design concepts for frontend interviews at Big Tech companies. Focus on understanding scalable architectures, component design patterns, and practical implementation strategies._
