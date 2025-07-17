export interface TopicData {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  content: string;
  estimatedTime: string;
  relatedTopics: string[];
}

export const topicContent: Record<string, TopicData> = {
  'javascript-fundamentals': {
    title: 'JavaScript Fundamentals',
    difficulty: 'Beginner',
    category: 'JavaScript',
    description: 'Master the core concepts of JavaScript including variables, functions, objects, and modern ES6+ features.',
    tags: ['Variables', 'Functions', 'Objects', 'ES6+', 'Closures', 'Scope'],
    estimatedTime: '2-3 hours',
    content: `
# JavaScript Fundamentals

## Overview

JavaScript is the programming language of the web. This guide covers the fundamental concepts you need to master to become proficient in JavaScript development.

## Variables and Data Types

### Primitive Types

\`\`\`javascript
// Numbers
const age = 25;
const price = 19.99;

// Strings
const name = "Alice";
const message = \`Hello, \${name}!\`;

// Booleans
const isActive = true;
const isComplete = false;

// Null and Undefined
const data = null;
let value; // undefined
\`\`\`

### Variable Declarations

\`\`\`javascript
// let (block-scoped)
let count = 0;

// const (block-scoped, cannot be reassigned)
const PI = 3.14159;

// var (function-scoped, avoid in modern JavaScript)
var oldStyle = "deprecated";
\`\`\`

## Functions

### Function Declarations and Expressions

\`\`\`javascript
// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function expression
const greet2 = function(name) {
    return \`Hello, \${name}!\`;
};

// Arrow function
const greet3 = (name) => \`Hello, \${name}!\`;
\`\`\`

### Higher-Order Functions

\`\`\`javascript
// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);
\`\`\`

## Objects and Classes

### Object Creation

\`\`\`javascript
// Object literal
const person = {
    name: "Alice",
    age: 30,
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
};

// ES6 Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}
\`\`\`

## Asynchronous JavaScript

### Promises and Async/Await

\`\`\`javascript
// Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 1000);
    });
};

// Async/Await
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
\`\`\`

## Best Practices

1. **Use strict mode**: \`"use strict";\`
2. **Prefer const and let over var**
3. **Use meaningful variable names**
4. **Handle errors properly**
5. **Avoid global variables**

This foundation will prepare you for advanced JavaScript concepts and frameworks like React.
    `,
    relatedTopics: ['react-fundamentals', 'typescript-basics', 'async-javascript']
  },
  
  'react-fundamentals': {
    title: 'React Fundamentals',
    difficulty: 'Intermediate',
    category: 'React',
    description: 'Learn the core concepts of React including components, props, state, and modern hooks.',
    tags: ['Components', 'Props', 'State', 'Hooks', 'JSX', 'Virtual DOM'],
    estimatedTime: '3-4 hours',
    content: `
# React Fundamentals

## Overview

React is a popular JavaScript library for building user interfaces. This guide covers the fundamental concepts you need to build modern React applications.

## Components and JSX

### Functional Components

\`\`\`jsx
// Basic functional component
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Welcome = (props) => <h1>Hello, {props.name}!</h1>;
\`\`\`

### JSX Rules

\`\`\`jsx
function App() {
    const name = "Alice";
    const isLoggedIn = true;
    
    return (
        <div className="app">
            <h1>Welcome, {name}!</h1>
            {isLoggedIn && <p>You are logged in</p>}
            {isLoggedIn ? <Dashboard /> : <Login />}
        </div>
    );
}
\`\`\`

## State with Hooks

### useState Hook

\`\`\`jsx
import { useState } from 'react';

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
\`\`\`

### useEffect Hook

\`\`\`jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);
    
    if (loading) return <div>Loading...</div>;
    
    return <div>Data: {JSON.stringify(data)}</div>;
}
\`\`\`

## Event Handling

### Form Handling

\`\`\`jsx
function ContactForm() {
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
        console.log('Form submitted:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
            />
            <button type="submit">Send</button>
        </form>
    );
}
\`\`\`

## Best Practices

1. **Use functional components with hooks**
2. **Keep components small and focused**
3. **Use proper key props for lists**
4. **Handle errors with error boundaries**
5. **Optimize performance with memoization**

React provides a powerful foundation for building interactive user interfaces.
    `,
    relatedTopics: ['javascript-fundamentals', 'react-hooks', 'component-patterns']
  },
  
  'html-css-fundamentals': {
    title: 'HTML & CSS Fundamentals',
    difficulty: 'Beginner',
    category: 'Frontend',
    description: 'Master semantic HTML and modern CSS techniques including Flexbox, Grid, and responsive design.',
    tags: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'Accessibility'],
    estimatedTime: '2-3 hours',
    content: `
# HTML & CSS Fundamentals

## Overview

HTML and CSS form the foundation of web development. This guide covers semantic HTML, modern CSS layout techniques, and best practices.

## Semantic HTML

### Document Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h1>Main Heading</h1>
            <article>
                <h2>Article Title</h2>
                <p>Content here...</p>
            </article>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Company Name</p>
    </footer>
</body>
</html>
\`\`\`

## CSS Layout

### Flexbox

\`\`\`css
.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.flex-item {
    flex: 1;
}
\`\`\`

### CSS Grid

\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
\`\`\`

## Responsive Design

### Mobile-First Approach

\`\`\`css
/* Base styles (mobile) */
.container {
    padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
    }
}
\`\`\`

## Accessibility

### ARIA and Semantic Elements

\`\`\`html
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<button aria-label="Close dialog">×</button>
\`\`\`

## Best Practices

1. **Use semantic HTML elements**
2. **Design mobile-first**
3. **Optimize for accessibility**
4. **Use CSS custom properties**
5. **Keep specificity low**

HTML and CSS form the foundation of all web development.
    `,
    relatedTopics: ['responsive-design', 'css-grid', 'accessibility']
  }
};

export function getTopicContent(topic: string): TopicData | null {
  return topicContent[topic] || null;
}

export function getAllTopics(): string[] {
  return Object.keys(topicContent);
}

export function generateStaticParams() {
  return getAllTopics().map(topic => ({ topic }));
}
