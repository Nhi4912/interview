export interface KnowledgeNode {
  id: string;
  title: string;
  category: KnowledgeCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  prerequisites: string[];
  relatedTopics: string[];
  estimatedTime: number; // minutes
  importance: number; // 1-10
  content: {
    theory: string;
    examples: CodeExample[];
    exercises: Exercise[];
    visualizations: Visualization[];
  };
  tags: string[];
  resources: Resource[];
  assessmentQuestions: AssessmentQuestion[];
  realWorldApplications: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  explanation: string;
  complexity: {
    time: string;
    space: string;
  };
  tags: string[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  solution: string;
  testCases: TestCase[];
  companies: string[];
}

export interface TestCase {
  input: any;
  output: any;
  explanation: string;
}

export interface Visualization {
  id: string;
  title: string;
  type: 'diagram' | 'animation' | 'interactive' | 'flowchart';
  description: string;
  data: any;
  component: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'documentation' | 'book' | 'course';
  quality: number; // 1-5
  free: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'coding';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type KnowledgeCategory = 
  | 'JavaScript Fundamentals'
  | 'React & Frontend Frameworks'
  | 'TypeScript'
  | 'HTML & CSS'
  | 'Web APIs & Browser'
  | 'Performance Optimization'
  | 'Testing'
  | 'System Design'
  | 'Data Structures'
  | 'Algorithms'
  | 'Security'
  | 'Accessibility'
  | 'Tools & Build Systems'
  | 'Soft Skills';

export const knowledgeGraph: KnowledgeNode[] = [
  {
    id: 'js-closures',
    title: 'JavaScript Closures',
    category: 'JavaScript Fundamentals',
    difficulty: 'Intermediate',
    description: 'Understanding closures, lexical scoping, and practical applications in JavaScript',
    prerequisites: ['js-functions', 'js-scope'],
    relatedTopics: ['js-hoisting', 'js-memory-management', 'js-modules'],
    estimatedTime: 45,
    importance: 9,
    content: {
      theory: `
# JavaScript Closures

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. Closures are created every time a function is created, at function creation time.

## Key Concepts:
1. **Lexical Scoping**: JavaScript uses lexical scoping, meaning the scope is determined by where variables are declared
2. **Closure Creation**: When a function is declared inside another function, it creates a closure
3. **Persistent Scope**: The inner function maintains access to the outer function's variables even after the outer function returns

## How Closures Work:
- When a function is created, it gets a reference to its lexical environment
- This environment includes any local variables that were in-scope at the time the closure was created
- The closure maintains these references even after the outer function finishes executing

## Common Use Cases:
- Data privacy and encapsulation
- Module pattern implementation
- Event handlers and callbacks
- Currying and partial application
- Creating factory functions
      `,
      examples: [
        {
          id: 'closure-basic',
          title: 'Basic Closure Example',
          description: 'A simple closure that maintains access to outer variable',
          code: `function outerFunction(x) {
  // This is the outer function's scope
  
  function innerFunction(y) {
    // This inner function has access to both x and y
    return x + y;
  }
  
  return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(10)); // 15

// Even though outerFunction has finished executing,
// the returned function still has access to x (5)`,
          language: 'javascript',
          explanation: 'The inner function maintains access to the outer function\'s parameter x even after outerFunction has returned.',
          complexity: {
            time: 'O(1)',
            space: 'O(1)'
          },
          tags: ['closures', 'scope', 'functions']
        },
        {
          id: 'closure-data-privacy',
          title: 'Data Privacy with Closures',
          description: 'Using closures to create private variables',
          code: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

// count is not accessible directly
console.log(counter.count); // undefined`,
          language: 'javascript',
          explanation: 'The count variable is private and can only be accessed through the returned methods, demonstrating encapsulation.',
          complexity: {
            time: 'O(1)',
            space: 'O(1)'
          },
          tags: ['closures', 'encapsulation', 'privacy']
        },
        {
          id: 'closure-module-pattern',
          title: 'Module Pattern with Closures',
          description: 'Creating modules using closures for better organization',
          code: `const UserModule = (function() {
  // Private variables and functions
  let users = [];
  let nextId = 1;
  
  function validateUser(user) {
    return user && user.name && user.email;
  }
  
  // Public API
  return {
    addUser: function(name, email) {
      const user = { id: nextId++, name, email };
      if (validateUser(user)) {
        users.push(user);
        return user;
      }
      throw new Error('Invalid user data');
    },
    
    getUser: function(id) {
      return users.find(user => user.id === id);
    },
    
    getAllUsers: function() {
      return [...users]; // Return a copy
    },
    
    getUserCount: function() {
      return users.length;
    }
  };
})();

// Usage
const user1 = UserModule.addUser('John', 'john@example.com');
const user2 = UserModule.addUser('Jane', 'jane@example.com');
console.log(UserModule.getUserCount()); // 2
console.log(UserModule.getUser(1)); // { id: 1, name: 'John', email: 'john@example.com' }`,
          language: 'javascript',
          explanation: 'The module pattern uses an IIFE (Immediately Invoked Function Expression) to create a closure that encapsulates private data and methods.',
          complexity: {
            time: 'O(1) for most operations',
            space: 'O(n) where n is number of users'
          },
          tags: ['closures', 'module-pattern', 'iife', 'encapsulation']
        }
      ],
      exercises: [
        {
          id: 'closure-exercise-1',
          title: 'Create a Multiplier Factory',
          description: 'Write a function that returns a function that multiplies its input by a fixed number',
          difficulty: 'Easy',
          hints: [
            'Use a closure to remember the multiplier value',
            'Return a function that uses the captured variable'
          ],
          solution: `function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

// Usage
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12`,
          testCases: [
            {
              input: 'createMultiplier(2)(5)',
              output: 10,
              explanation: 'Should multiply 5 by 2 to get 10'
            },
            {
              input: 'createMultiplier(3)(4)',
              output: 12,
              explanation: 'Should multiply 4 by 3 to get 12'
            }
          ],
          companies: ['Google', 'Meta', 'Microsoft']
        },
        {
          id: 'closure-exercise-2',
          title: 'Banking Account with Closures',
          description: 'Create a banking account system with private balance using closures',
          difficulty: 'Medium',
          hints: [
            'Use closures to keep balance private',
            'Implement methods for deposit, withdraw, and getBalance',
            'Add validation for withdrawals'
          ],
          solution: `function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return balance;
      }
      throw new Error('Deposit amount must be positive');
    },
    
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error('Invalid withdrawal amount');
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

// Usage
const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120`,
          testCases: [
            {
              input: 'createBankAccount(100).deposit(50)',
              output: 150,
              explanation: 'Should add 50 to initial balance of 100'
            },
            {
              input: 'createBankAccount(100).withdraw(30)',
              output: 70,
              explanation: 'Should subtract 30 from initial balance of 100'
            }
          ],
          companies: ['Amazon', 'Apple', 'Netflix']
        }
      ],
      visualizations: [
        {
          id: 'closure-scope-chain',
          title: 'Closure Scope Chain Visualization',
          type: 'diagram',
          description: 'Visual representation of how closures maintain access to outer scope',
          data: {
            nodes: [
              { id: 'global', label: 'Global Scope', level: 0 },
              { id: 'outer', label: 'Outer Function', level: 1 },
              { id: 'inner', label: 'Inner Function (Closure)', level: 2 }
            ],
            connections: [
              { from: 'inner', to: 'outer', label: 'has access to' },
              { from: 'inner', to: 'global', label: 'has access to' }
            ]
          },
          component: 'ScopeChainDiagram'
        },
        {
          id: 'closure-memory-model',
          title: 'Closure Memory Model',
          type: 'animation',
          description: 'How closures work in memory with references',
          data: {
            steps: [
              { step: 1, description: 'Outer function creates local variables' },
              { step: 2, description: 'Inner function is created with reference to outer scope' },
              { step: 3, description: 'Outer function returns, but scope remains' },
              { step: 4, description: 'Inner function still has access to outer variables' }
            ]
          },
          component: 'MemoryModelAnimation'
        }
      ]
    },
    tags: ['javascript', 'closures', 'scope', 'functions', 'encapsulation'],
    resources: [
      {
        title: 'MDN: Closures',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
        type: 'documentation',
        quality: 5,
        free: true
      },
      {
        title: 'JavaScript.info: Closures',
        url: 'https://javascript.info/closure',
        type: 'article',
        quality: 5,
        free: true
      },
      {
        title: 'You Don\'t Know JS: Scope & Closures',
        url: 'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures',
        type: 'book',
        quality: 5,
        free: true
      }
    ],
    assessmentQuestions: [
      {
        id: 'closure-q1',
        question: 'What will be the output of the following code?\\n\\n```javascript\\nfor (var i = 0; i < 3; i++) {\\n  setTimeout(() => console.log(i), 100);\\n}\\n```',
        type: 'multiple-choice',
        options: ['0 1 2', '3 3 3', '0 0 0', 'undefined undefined undefined'],
        correctAnswer: 1,
        explanation: 'The variable i is shared across all iterations due to var scoping. By the time the setTimeout callbacks execute, the loop has finished and i is 3.',
        difficulty: 'Medium'
      },
      {
        id: 'closure-q2',
        question: 'How would you fix the previous code to print 0, 1, 2?',
        type: 'short-answer',
        correctAnswer: 'Use let instead of var, or create a closure to capture each value of i',
        explanation: 'Either use let (block scoping) or create a closure with IIFE: (function(index) { setTimeout(() => console.log(index), 100); })(i)',
        difficulty: 'Medium'
      }
    ],
    realWorldApplications: [
      'Module pattern for creating private variables and methods',
      'Event handlers that need to remember state',
      'Currying and partial application in functional programming',
      'Creating factory functions for object creation',
      'Implementing debounce and throttle functions',
      'State management in React hooks (useState, useEffect)',
      'Creating middleware functions in Express.js',
      'Implementing the observer pattern'
    ]
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    category: 'React & Frontend Frameworks',
    difficulty: 'Intermediate',
    description: 'Understanding and mastering React Hooks for state management and side effects',
    prerequisites: ['js-functions', 'js-closures', 'react-components'],
    relatedTopics: ['react-state', 'react-lifecycle', 'react-context', 'react-performance'],
    estimatedTime: 60,
    importance: 10,
    content: {
      theory: `
# React Hooks

React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and provide a more direct API to the React concepts you already know.

## Key Principles:
1. **Only call Hooks at the top level** - Don't call Hooks inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** - Call them from React function components or custom Hooks
3. **Hooks allow you to reuse stateful logic** - Without changing your component hierarchy

## Built-in Hooks:
- **useState**: Manages local state in functional components
- **useEffect**: Performs side effects in functional components
- **useContext**: Consumes React Context in functional components
- **useReducer**: Alternative to useState for complex state logic
- **useMemo**: Memoizes expensive calculations
- **useCallback**: Memoizes functions to prevent unnecessary re-renders
- **useRef**: Creates a mutable reference that persists across renders

## Custom Hooks:
You can create your own Hooks to extract component logic into reusable functions.
      `,
      examples: [
        {
          id: 'useState-example',
          title: 'useState Hook',
          description: 'Managing state in functional components',
          code: `import React, { useState } from 'react';

function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const increment = () => {
    setCount(count + 1);
    // or use functional update for better performance
    // setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input 
        type="text" 
        value={name} 
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default Counter;`,
          language: 'javascript',
          explanation: 'useState allows functional components to have local state. It returns an array with the current state value and a function to update it.',
          complexity: {
            time: 'O(1)',
            space: 'O(1)'
          },
          tags: ['react', 'hooks', 'useState', 'state']
        },
        {
          id: 'useEffect-example',
          title: 'useEffect Hook',
          description: 'Handling side effects and lifecycle events',
          code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Effect runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array

  // Effect runs when userId changes
  useEffect(() => {
    if (!userId) return;
    
    let isCancelled = false;
    setLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(userData => {
        if (!isCancelled) {
          setUser(userData);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function to cancel the request
    return () => {
      isCancelled = true;
    };
  }, [userId]); // Effect depends on userId

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;`,
          language: 'javascript',
          explanation: 'useEffect handles side effects like API calls, subscriptions, and DOM manipulation. The dependency array controls when the effect runs.',
          complexity: {
            time: 'O(1)',
            space: 'O(1)'
          },
          tags: ['react', 'hooks', 'useEffect', 'side-effects']
        },
        {
          id: 'custom-hook-example',
          title: 'Custom Hook',
          description: 'Creating reusable logic with custom hooks',
          code: `import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return response.json();
      })
      .then(result => {
        if (!isCancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage in components
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  const [favoriteUsers, setFavoriteUsers] = useLocalStorage('favoriteUsers', []);

  const toggleFavorite = (userId) => {
    setFavoriteUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      {users?.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => toggleFavorite(user.id)}>
            {favoriteUsers.includes(user.id) ? '❤️' : '🤍'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;`,
          language: 'javascript',
          explanation: 'Custom hooks allow you to extract and reuse stateful logic between components. They follow the naming convention of starting with "use".',
          complexity: {
            time: 'O(1)',
            space: 'O(n) for data storage'
          },
          tags: ['react', 'hooks', 'custom-hooks', 'reusability']
        }
      ],
      exercises: [
        {
          id: 'hook-exercise-1',
          title: 'Create a useToggle Hook',
          description: 'Build a custom hook that manages boolean state with toggle functionality',
          difficulty: 'Easy',
          hints: [
            'Use useState to manage boolean state',
            'Return the current state and a toggle function',
            'Consider accepting an initial value parameter'
          ],
          solution: `import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  
  return [value, toggle];
}

// Usage
function ToggleExample() {
  const [isVisible, toggleVisibility] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(true);

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>This content is visible!</p>}
      
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}`,
          testCases: [
            {
              input: 'useToggle(false)',
              output: '[false, toggleFunction]',
              explanation: 'Should return false as initial value with toggle function'
            },
            {
              input: 'useToggle(true)',
              output: '[true, toggleFunction]',
              explanation: 'Should return true as initial value with toggle function'
            }
          ],
          companies: ['Meta', 'Netflix', 'Spotify']
        }
      ],
      visualizations: [
        {
          id: 'hook-lifecycle',
          title: 'React Hook Lifecycle',
          type: 'animation',
          description: 'Visual representation of how hooks work during component lifecycle',
          data: {
            phases: ['Mount', 'Update', 'Unmount'],
            hooks: ['useState', 'useEffect', 'useContext']
          },
          component: 'HookLifecycleAnimation'
        }
      ]
    },
    tags: ['react', 'hooks', 'state', 'side-effects', 'functional-components'],
    resources: [
      {
        title: 'React Hooks Documentation',
        url: 'https://react.dev/reference/react',
        type: 'documentation',
        quality: 5,
        free: true
      },
      {
        title: 'A Complete Guide to useEffect',
        url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
        type: 'article',
        quality: 5,
        free: true
      }
    ],
    assessmentQuestions: [
      {
        id: 'hooks-q1',
        question: 'What are the rules of hooks?',
        type: 'multiple-choice',
        options: [
          'Only call hooks at the top level and only from React functions',
          'Hooks can be called conditionally',
          'Hooks can be called in loops',
          'Hooks can be called from regular JavaScript functions'
        ],
        correctAnswer: 0,
        explanation: 'Hooks must be called at the top level of React functions (components or custom hooks) and never inside loops, conditions, or nested functions.',
        difficulty: 'Easy'
      }
    ],
    realWorldApplications: [
      'State management in React functional components',
      'Side effect handling (API calls, subscriptions)',
      'Performance optimization with useMemo and useCallback',
      'Custom hooks for reusable logic',
      'Form handling and validation',
      'Real-time data with WebSocket connections',
      'Animation and gesture handling'
    ]
  }
];

export const getKnowledgeById = (id: string): KnowledgeNode | undefined => {
  return knowledgeGraph.find(node => node.id === id);
};

export const getKnowledgeByCategory = (category: KnowledgeCategory): KnowledgeNode[] => {
  return knowledgeGraph.filter(node => node.category === category);
};

export const getPrerequisites = (nodeId: string): KnowledgeNode[] => {
  const node = getKnowledgeById(nodeId);
  if (!node) return [];
  
  return node.prerequisites
    .map(prereqId => getKnowledgeById(prereqId))
    .filter(Boolean) as KnowledgeNode[];
};

export const getRelatedTopics = (nodeId: string): KnowledgeNode[] => {
  const node = getKnowledgeById(nodeId);
  if (!node) return [];
  
  return node.relatedTopics
    .map(relatedId => getKnowledgeById(relatedId))
    .filter(Boolean) as KnowledgeNode[];
};

export const getKnowledgeByDifficulty = (difficulty: KnowledgeNode['difficulty']): KnowledgeNode[] => {
  return knowledgeGraph.filter(node => node.difficulty === difficulty);
};

export const searchKnowledge = (query: string): KnowledgeNode[] => {
  const lowerQuery = query.toLowerCase();
  return knowledgeGraph.filter(node => 
    node.title.toLowerCase().includes(lowerQuery) ||
    node.description.toLowerCase().includes(lowerQuery) ||
    node.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getKnowledgeByImportance = (minImportance: number): KnowledgeNode[] => {
  return knowledgeGraph
    .filter(node => node.importance >= minImportance)
    .sort((a, b) => b.importance - a.importance);
};

export const getLearningPath = (targetNodeId: string): KnowledgeNode[] => {
  const visited = new Set<string>();
  const path: KnowledgeNode[] = [];
  
  function buildPath(nodeId: string): void {
    if (visited.has(nodeId)) return;
    
    const node = getKnowledgeById(nodeId);
    if (!node) return;
    
    visited.add(nodeId);
    
    // Add prerequisites first
    node.prerequisites.forEach(prereqId => {
      if (!visited.has(prereqId)) {
        buildPath(prereqId);
      }
    });
    
    // Add current node
    path.push(node);
  }
  
  buildPath(targetNodeId);
  return path;
};