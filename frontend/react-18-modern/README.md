# React 18+ Modern Features: Complete Interview Guide

## Overview

React 18 introduced groundbreaking features that fundamentally changed how React applications work. Understanding these features is crucial for Big Tech interviews in 2025, as they represent the current state of React development and future direction.

## 🚀 React 18 Core Features

### 1. Concurrent Rendering

**What is Concurrent Rendering?**
Concurrent rendering allows React to interrupt rendering work to handle higher-priority tasks, making apps more responsive.

```javascript
// Before React 18 - Blocking rendering
function App() {
  const [count, setCount] = useState(0);
  
  // Heavy computation blocks UI
  const heavyComputation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <div>{heavyComputation()}</div>
    </div>
  );
}
```

```javascript
// React 18 - Non-blocking with concurrent features
import { useDeferredValue, useTransition } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  // Defer expensive computation
  const deferredItems = useDeferredValue(items);
  
  const handleSearch = (query) => {
    startTransition(() => {
      // Heavy computation is interruptible
      setItems(generateLargeList(query));
    });
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count} {/* Always responsive */}
      </button>
      <SearchInput onSearch={handleSearch} />
      {isPending && <div>Loading...</div>}
      <ItemList items={deferredItems} />
    </div>
  );
}
```

### 2. Automatic Batching

**Enhanced Batching in React 18**
React 18 automatically batches all state updates, even in promises, timeouts, and native event handlers.

```javascript
// React 17 - Manual batching needed
import { unstable_batchedUpdates } from 'react-dom';

function handleClick() {
  // These would cause 2 re-renders in React 17
  setTimeout(() => {
    unstable_batchedUpdates(() => {
      setCount(count + 1);
      setName('John');
    });
  }, 1000);
}

// React 18 - Automatic batching everywhere
function handleClick() {
  // Only 1 re-render in React 18
  setTimeout(() => {
    setCount(count + 1);
    setName('John');
  }, 1000);
  
  // Also batched in promises
  fetch('/api/data').then(() => {
    setLoading(false);
    setData(result);
  });
}
```

### 3. Suspense for Data Fetching

**Advanced Suspense Patterns**

```javascript
// Data fetching with Suspense
function ProfilePage({ userId }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileHeader userId={userId} />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts userId={userId} />
      </Suspense>
    </Suspense>
  );
}

// Resource-based data fetching
function createResource(promise) {
  let status = 'pending';
  let result;
  
  const suspender = promise.then(
    (response) => {
      status = 'success';
      result = response;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );
  
  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    }
  };
}

// Usage with Suspense
const userResource = createResource(fetchUser(userId));

function UserProfile() {
  const user = userResource.read(); // Suspends on first render
  return <div>{user.name}</div>;
}
```

### 4. Server Components (RSC)

**Understanding Server Components**

```javascript
// Server Component (runs on server)
// app/page.js
import { Suspense } from 'react';
import UserProfile from './UserProfile';
import ClientCounter from './ClientCounter';

// This is a Server Component by default
export default async function Page() {
  // Can directly access databases, files, etc.
  const user = await fetchUserFromDatabase();
  
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={user.id} />
      </Suspense>
      {/* Client component for interactivity */}
      <ClientCounter />
    </div>
  );
}
```

```javascript
// Client Component (runs in browser)
// app/ClientCounter.js
'use client';

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Server/Client Component Boundaries**

```javascript
// ❌ Cannot import client components in server components
// app/ServerComponent.js
import ClientComponent from './ClientComponent'; // This works

export default function ServerComponent() {
  return (
    <div>
      <ClientComponent>
        {/* ❌ Cannot pass functions/event handlers */}
        <button onClick={() => alert('hello')}>Click</button>
      </ClientComponent>
    </div>
  );
}
```

```javascript
// ✅ Correct pattern
// app/ServerComponent.js
import ClientWrapper from './ClientWrapper';

export default function ServerComponent() {
  const data = await fetchData();
  
  return (
    <div>
      <ClientWrapper data={data} />
    </div>
  );
}

// app/ClientWrapper.js
'use client';

export default function ClientWrapper({ data }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <div>Server data: {data.title}</div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

## 🔄 Advanced Hooks

### 1. useTransition Hook

```javascript
import { useTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (newQuery) => {
    // Urgent update - not wrapped in transition
    setQuery(newQuery);
    
    // Non-urgent update - wrapped in transition
    startTransition(() => {
      setResults(searchItems(newQuery));
    });
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <div>Searching...</div>}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. useDeferredValue Hook

```javascript
import { useDeferredValue, useState, useMemo } from 'react';

function ProductList() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  // Expensive filtering operation
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter products..."
      />
      {/* Shows stale results while filtering */}
      <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### 3. useId Hook

```javascript
import { useId } from 'react';

function FormField({ label, type = 'text' }) {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

// Multiple instances won't have ID conflicts
function ContactForm() {
  return (
    <form>
      <FormField label="Name" />
      <FormField label="Email" type="email" />
      <FormField label="Phone" type="tel" />
    </form>
  );
}
```

### 4. useSyncExternalStore Hook

```javascript
import { useSyncExternalStore } from 'react';

// Custom store implementation
class Store {
  constructor() {
    this.state = { count: 0 };
    this.listeners = new Set();
  }
  
  getState = () => this.state;
  
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  
  setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener());
  };
}

const store = new Store();

// Hook to connect to external store
function useStore() {
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState // Server snapshot
  );
}

// Component using external store
function Counter() {
  const state = useStore();
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => store.setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

## 🏗️ Modern Patterns

### 1. Compound Components with Hooks

```javascript
import { createContext, useContext, useState } from 'react';

// Context for compound component
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={`tab ${activeTab === index ? 'active' : ''}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== index) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// Compound component API
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Home</Tabs.Tab>
        <Tabs.Tab index={1}>About</Tabs.Tab>
        <Tabs.Tab index={2}>Contact</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel index={0}>Home content</Tabs.Panel>
        <Tabs.Panel index={1}>About content</Tabs.Panel>
        <Tabs.Panel index={2}>Contact content</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

### 2. Custom Hooks for Complex Logic

```javascript
// useAsync hook for data fetching
function useAsync(asyncFunction, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    let cancelled = false;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    asyncFunction()
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({ data: null, loading: false, error });
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, dependencies);
  
  return state;
}

// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}

// useDebounce hook
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

// Usage in component
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useLocalStorage('searchResults', []);
  
  const { data, loading, error } = useAsync(
    () => searchAPI(debouncedQuery),
    [debouncedQuery]
  );
  
  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data, setResults]);
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {results.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## 🔥 Common Interview Questions

### Q1: Explain React 18's Concurrent Features

**Answer:**
React 18 introduces concurrent rendering, which allows React to pause, resume, and prioritize rendering work. Key features include:

1. **Automatic Batching**: All state updates are batched automatically
2. **Transitions**: Mark non-urgent updates with `useTransition`
3. **Suspense**: Better support for data fetching and code splitting
4. **Server Components**: Components that run on the server

**Example:**
```javascript
function App() {
  const [urgent, setUrgent] = useState('');
  const [nonUrgent, setNonUrgent] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (value) => {
    // Urgent update - blocks rendering
    setUrgent(value);
    
    // Non-urgent update - can be interrupted
    startTransition(() => {
      setNonUrgent(expensiveComputation(value));
    });
  };
  
  return (
    <div>
      <input onChange={(e) => handleChange(e.target.value)} />
      <div>Urgent: {urgent}</div>
      <div>Non-urgent: {nonUrgent}</div>
      {isPending && <div>Computing...</div>}
    </div>
  );
}
```

### Q2: How do Server Components work?

**Answer:**
Server Components run on the server and can directly access databases, files, and other server resources. They render to a special format that's sent to the client.

**Key Points:**
- Cannot use state or effects
- Cannot use browser APIs
- Can import and use Client Components
- Reduce bundle size and improve performance

**Example:**
```javascript
// Server Component
export default async function UserProfile({ userId }) {
  const user = await db.user.findById(userId);
  const posts = await db.posts.findByUserId(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <ClientInteractiveComponent posts={posts} />
    </div>
  );
}

// Client Component
'use client';
export default function ClientInteractiveComponent({ posts }) {
  const [filter, setFilter] = useState('');
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter posts..."
      />
      {posts.filter(post => post.title.includes(filter)).map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Q3: When would you use useTransition vs useDeferredValue?

**Answer:**
- **useTransition**: Use when you control the state update and want to mark it as non-urgent
- **useDeferredValue**: Use when you want to defer a value you receive from props or another hook

**useTransition Example:**
```javascript
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery); // Urgent
    startTransition(() => {
      setResults(searchItems(newQuery)); // Non-urgent
    });
  };
  
  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <div>Loading...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

**useDeferredValue Example:**
```javascript
function ProductList({ query }) {
  const deferredQuery = useDeferredValue(query);
  const products = useMemo(() => 
    searchProducts(deferredQuery), [deferredQuery]
  );
  
  return (
    <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Q4: How do you handle error boundaries with Server Components?

**Answer:**
Error boundaries work differently with Server Components. Server-side errors are caught and handled during server rendering, while client-side errors need traditional error boundaries.

```javascript
// Server Component with error handling
export default async function ServerComponent() {
  try {
    const data = await riskyServerOperation();
    return <DataDisplay data={data} />;
  } catch (error) {
    return <ErrorFallback error={error} />;
  }
}

// Client-side error boundary
'use client';
import { ErrorBoundary } from 'react-error-boundary';

function ClientErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div>
          <h2>Something went wrong:</h2>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('Client error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Q5: Explain the benefits of automatic batching in React 18

**Answer:**
Automatic batching reduces unnecessary re-renders by grouping multiple state updates into a single update, even in promises, timeouts, and event handlers.

**Benefits:**
1. Better performance - fewer re-renders
2. More predictable state updates
3. Consistent behavior across different execution contexts

**Example:**
```javascript
// React 17 - Multiple re-renders
function handleClick() {
  setCount(count + 1);     // Re-render 1
  setName('John');         // Re-render 2
  setEmail('john@example.com'); // Re-render 3
}

// React 18 - Single re-render
function handleClick() {
  setCount(count + 1);     // 
  setName('John');         // All batched into
  setEmail('john@example.com'); // single re-render
}

// Even in async contexts
function handleAsync() {
  setTimeout(() => {
    setCount(count + 1);     // 
    setName('John');         // Still batched
    setEmail('john@example.com'); // in React 18
  }, 1000);
}
```

## 🎯 Advanced Implementation Patterns

### 1. Streaming SSR with Suspense

```javascript
// app/layout.js
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>
          <nav>Navigation</nav>
        </header>
        <main>
          <Suspense fallback={<div>Loading content...</div>}>
            {children}
          </Suspense>
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

// app/page.js
import { Suspense } from 'react';
import UserProfile from './UserProfile';
import RecentPosts from './RecentPosts';
import Recommendations from './Recommendations';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to our site</h1>
      
      {/* Fast loading content */}
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      
      {/* Slower loading content */}
      <Suspense fallback={<PostsSkeleton />}>
        <RecentPosts />
      </Suspense>
      
      {/* Slowest loading content */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>
    </div>
  );
}
```

### 2. Advanced State Management Patterns

```javascript
// Context with useReducer and concurrent features
const AppContext = createContext();

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    data: null,
    loading: false,
    error: null
  });
  
  const [isPending, startTransition] = useTransition();
  
  const loadData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const data = await fetchData();
      startTransition(() => {
        dispatch({ type: 'SET_DATA', payload: data });
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };
  
  return (
    <AppContext.Provider value={{ ...state, loadData, isPending }}>
      {children}
    </AppContext.Provider>
  );
}
```

This comprehensive guide covers the essential React 18+ features that are crucial for Big Tech interviews in 2025. The concurrent features, Server Components, and modern patterns represent the cutting edge of React development.