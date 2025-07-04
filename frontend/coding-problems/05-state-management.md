# Problem 5: Simple State Management System

## Problem Description

Implement a simple state management system similar to Redux but lightweight.

## Requirements

- Centralized state store
- Action dispatching
- Reducer pattern
- State subscriptions
- Middleware support

## Solution

```javascript
class SimpleStore {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.state = initialState;
    this.subscribers = new Set();
    this.middlewares = [];

    this.dispatch = this.dispatch.bind(this);
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    if (typeof action === "function") {
      return action(this.dispatch, this.getState);
    }

    // Apply middlewares
    let processedAction = action;
    for (const middleware of this.middlewares) {
      processedAction = middleware(this)(processedAction);
      if (!processedAction) return;
    }

    // Update state
    const previousState = this.state;
    this.state = this.reducer(this.state, processedAction);

    // Notify subscribers
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state, previousState, processedAction);
    });

    return processedAction;
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  useMiddleware(middleware) {
    this.middlewares.push(middleware);
  }
}

// Example reducer
const todoReducer = (state = { todos: [], filter: "all" }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

// Action creators
const addTodo = (text) => ({
  type: "ADD_TODO",
  payload: text,
});

const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  payload: id,
});

const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: id,
});

const setFilter = (filter) => ({
  type: "SET_FILTER",
  payload: filter,
});

// Middleware examples
const loggerMiddleware = (store) => (action) => {
  console.log("Previous State:", store.getState());
  console.log("Action:", action);
  const result = action;
  console.log("Next State:", store.getState());
  return result;
};

const thunkMiddleware = (store) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return action;
};

// Usage
const store = new SimpleStore(todoReducer, {
  todos: [],
  filter: "all",
});

store.useMiddleware(loggerMiddleware);
store.useMiddleware(thunkMiddleware);

const unsubscribe = store.subscribe((state, previousState, action) => {
  console.log("State changed:", action.type);
  renderApp(state);
});

// Dispatch actions
store.dispatch(addTodo("Learn Redux"));
store.dispatch(addTodo("Build an app"));
store.dispatch(toggleTodo(1));
```

## React Integration

```javascript
import { useState, useEffect } from "react";

const useStore = (store, selector) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      const newSelectedState = selector(newState);
      setState(newSelectedState);
    });

    return unsubscribe;
  }, [store, selector]);

  return [state, store.dispatch];
};

const TodoApp = ({ store }) => {
  const [state, dispatch] = useStore(store, (state) => state);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue("");
    }
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button
          className={state.filter === "all" ? "active" : ""}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className={state.filter === "active" ? "active" : ""}
          onClick={() => dispatch(setFilter("active"))}
        >
          Active
        </button>
        <button
          className={state.filter === "completed" ? "active" : ""}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## CSS Styling

```css
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.todo-app h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.todo-app form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-app input[type="text"] {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.todo-app button {
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.todo-app button:hover {
  background: #0056b3;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters button {
  padding: 8px 16px;
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.filters button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  background: white;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.todo-list button {
  padding: 6px 12px;
  background: #dc3545;
  font-size: 14px;
}

.todo-list button:hover {
  background: #c82333;
}
```

## Key Features

1. **Centralized State**: Single source of truth
2. **Predictable Updates**: State changes through actions
3. **Middleware Support**: Extensible with custom middleware
4. **React Integration**: Custom hook for React
5. **Subscription System**: Efficient state change notifications
6. **Action Creators**: Reusable action functions
7. **Immutable Updates**: Always return new state objects
8. **Debugging**: Built-in logging middleware
