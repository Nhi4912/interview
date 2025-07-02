# React Core: Definitions, Interview Questions & Answers

## 1. JSX

**Definition:** JSX is a syntax extension for JavaScript that looks like HTML and is used to describe UI in React.

**Common Questions:**

- What is JSX?
- How does JSX get compiled?

**Answers:**

- JSX allows you to write HTML-like code in JavaScript. It is compiled to `React.createElement` calls.
- Babel transpiles JSX into JavaScript objects that React can render.

---

## 2. Components

**Definition:** Components are reusable, self-contained building blocks of a React UI.

**Common Questions:**

- What are functional vs class components?
- How do you pass data to a component?

**Answers:**

- Functional components are functions that return JSX. Class components extend `React.Component` and have lifecycle methods.
- Data is passed via props.

---

## 3. Props & State

**Definition:** Props are read-only data passed from parent to child. State is local, mutable data managed by the component.

**Common Questions:**

- What is the difference between props and state?
- How do you update state?

**Answers:**

- Props are immutable and set by the parent. State is mutable and managed within the component.
- Use `useState` in functional components or `this.setState` in class components.

---

## 4. Hooks

**Definition:** Hooks are functions that let you use state and other React features in functional components.

**Common Questions:**

- What are hooks? Name some built-in hooks.
- What rules must hooks follow?

**Answers:**

- Hooks include `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, etc.
- Hooks must be called at the top level of a function component and not inside loops or conditions.

---

## 5. Lifecycle

**Definition:** Lifecycle methods are special methods in class components that run at specific points (mount, update, unmount).

**Common Questions:**

- What are the main lifecycle methods?
- How do you replicate lifecycle behavior in functional components?

**Answers:**

- Main methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.
- Use `useEffect` to replicate lifecycle behavior in functional components.

---

## 6. Context

**Definition:** Context provides a way to pass data through the component tree without passing props down manually at every level.

**Common Questions:**

- What is context? When should you use it?
- How do you create and use context?

**Answers:**

- Context is for sharing global data (theme, user, locale) across the tree.
- Use `React.createContext`, wrap with a Provider, and consume with `useContext` or `Context.Consumer`.
