import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import KnowledgeCard from "../components/KnowledgeCard";

const HeroSection = styled.div`
  padding: 64px 0;
  text-align: center;
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
`;

const StatsCard = styled.div`
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Typography = styled.div`
  font-family: inherit;
  
  &.h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  
  &.h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 24px;
  }
  
  &.h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  
  &.subtitle {
    font-size: 1.125rem;
    color: #666;
    margin-bottom: 32px;
  }
  
  &.body {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
`;

const Button = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  
  &.hero-content {
    margin-bottom: 48px;
  }
  
  &.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  }
`;

const LinearProgress = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    background: #3b82f6;
    width: ${props => props.value || 0}%;
    transition: width 0.3s ease;
  }
`;

const Chip = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const HomePage = () => {
  const router = useRouter();

  const knowledgeCards = [
    // Frontend Fundamentals
    {
      title: "JavaScript Advanced Fundamentals",
      description:
        "Deep dive into closures, scope, prototypes, and advanced JavaScript concepts.",
      icon: "⚡",
      difficulty: "Advanced",
      status: "completed",
      href: "/frontend/fundamentals/javascript-advanced-fundamentals",
    },
    {
      title: "DOM Manipulation Deep Dive",
      description:
        "Master DOM manipulation, event handling, and browser APIs for dynamic web applications.",
      icon: "🌐",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/fundamentals/dom-manipulation-deep-dive",
    },
    {
      title: "Event Loop Deep Dive",
      description:
        "Understand JavaScript's event loop, async programming, and concurrency model.",
      icon: "🔄",
      difficulty: "Advanced",
      status: "in-progress",
      href: "/frontend/fundamentals/event-loop-deep-dive",
    },
    {
      title: "Closure & Scope Deep Dive",
      description:
        "Master lexical scoping, closures, and variable hoisting in JavaScript.",
      icon: "🔒",
      difficulty: "Advanced",
      status: "completed",
      href: "/frontend/fundamentals/closure-scope-deep-dive",
    },
    {
      title: "Browser Internals Fundamentals",
      description:
        "Learn about browser architecture, rendering pipeline, and performance optimization.",
      icon: "🔧",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/fundamentals/browser-internals-fundamentals",
    },
    {
      title: "HTML & CSS Advanced Fundamentals",
      description:
        "Advanced HTML semantics, CSS architecture, and modern layout techniques.",
      icon: "🎨",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/fundamentals/html-css-advanced-fundamentals",
    },
    {
      title: "Networking & HTTP Fundamentals",
      description:
        "HTTP protocols, REST APIs, WebSockets, and network optimization strategies.",
      icon: "🌐",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/fundamentals/networking-http-fundamentals",
    },
    {
      title: "Performance Optimization Fundamentals",
      description:
        "Core performance concepts, metrics, and optimization techniques for web applications.",
      icon: "⚡",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/fundamentals/performance-optimization-fundamentals",
    },
    {
      title: "Algorithms & Data Structures Frontend",
      description:
        "Essential algorithms and data structures for frontend development and optimization.",
      icon: "🧮",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/fundamentals/algorithms-data-structures-frontend",
    },

    // React Ecosystem
    {
      title: "React Core Concepts",
      description:
        "React fundamentals, components, props, state, and lifecycle methods.",
      icon: "⚛️",
      difficulty: "Intermediate",
      status: "completed",
      href: "/frontend/react/core",
    },
    {
      title: "React Advanced Patterns",
      description:
        "Advanced React patterns, hooks, context, and performance optimization techniques.",
      icon: "🚀",
      difficulty: "Advanced",
      status: "in-progress",
      href: "/frontend/react/advanced-patterns",
    },

    // TypeScript
    {
      title: "TypeScript Fundamentals",
      description:
        "Type safety, interfaces, generics, and TypeScript best practices.",
      icon: "📘",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/typescript",
    },

    // HTML & CSS
    {
      title: "HTML & CSS Mastery",
      description:
        "Modern HTML semantics, CSS Grid, Flexbox, and responsive design patterns.",
      icon: "🎨",
      difficulty: "Beginner",
      status: "completed",
      href: "/frontend/html-css",
    },

    // Advanced Topics
    {
      title: "JavaScript Memory & Performance",
      description:
        "Memory management, garbage collection, and performance optimization techniques.",
      icon: "🧠",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/advanced/javascript-memory-performance-optimization",
    },

    // System Design
    {
      title: "Frontend System Design",
      description:
        "Frontend architecture patterns, scalability, and system design principles.",
      icon: "🏗️",
      difficulty: "Advanced",
      status: "in-progress",
      href: "/frontend/system-design/frontend-architecture",
    },
    {
      title: "Component Design",
      description:
        "Designing reusable, maintainable, and scalable React components.",
      icon: "🧩",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/system-design/component-design",
    },
    {
      title: "Design Systems",
      description:
        "Building and maintaining design systems for consistent user experiences.",
      icon: "🎯",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/system-design/design-systems",
    },
    {
      title: "State Management",
      description:
        "State management patterns, Redux, Context API, and data flow optimization.",
      icon: "📊",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/system-design/state-management",
    },
    {
      title: "Performance Optimization",
      description:
        "Frontend performance optimization, lazy loading, and bundle optimization.",
      icon: "⚡",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/system-design/performance",
    },
    {
      title: "Visual Architecture",
      description:
        "Creating visual architecture diagrams and system design documentation.",
      icon: "📐",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/system-design/visual-architecture-diagrams",
    },

    // Testing
    {
      title: "Component Testing",
      description:
        "Unit testing React components with Jest and React Testing Library.",
      icon: "🧪",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/testing/01-component-testing",
    },

    // Security
    {
      title: "XSS & CSRF Security",
      description:
        "Cross-site scripting, CSRF attacks, and security best practices for web applications.",
      icon: "🔒",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/security/01-xss-csrf",
    },
    {
      title: "Advanced Security Patterns",
      description:
        "Advanced security patterns, authentication, and authorization strategies.",
      icon: "🛡️",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/security/advanced-security-patterns",
    },

    // Performance
    {
      title: "Lazy Loading",
      description:
        "Implementing lazy loading for images, components, and route-based code splitting.",
      icon: "📦",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/performance/01-lazy-loading",
    },

    // Networking
    {
      title: "API Integration",
      description:
        "RESTful API integration, error handling, and data fetching strategies.",
      icon: "🔗",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/networking/01-api-integration",
    },

    // Coding Problems
    {
      title: "Dynamic Table Implementation",
      description:
        "Building dynamic, sortable, and filterable data tables with React.",
      icon: "📋",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/01-dynamic-table",
    },
    {
      title: "Debounce & Throttle",
      description:
        "Implementing debounce and throttle functions for performance optimization.",
      icon: "⏱️",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/02-debounce-throttle",
    },
    {
      title: "React Form Validation",
      description:
        "Building robust form validation systems with React and custom hooks.",
      icon: "📝",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/03-react-form-validation",
    },
    {
      title: "Virtual Scrolling",
      description:
        "Implementing virtual scrolling for large datasets and performance optimization.",
      icon: "📜",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/04-virtual-scrolling",
    },
    {
      title: "State Management Solutions",
      description:
        "Building custom state management solutions and global state patterns.",
      icon: "🗂️",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/05-state-management",
    },
    {
      title: "Autocomplete Component",
      description:
        "Building intelligent autocomplete components with search and filtering.",
      icon: "🔍",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/06-autocomplete",
    },
    {
      title: "Infinite Scroll",
      description:
        "Implementing infinite scroll with React and performance optimization.",
      icon: "📜",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/07-infinite-scroll",
    },
    {
      title: "Modal Dialog System",
      description:
        "Building accessible modal dialogs with React and proper focus management.",
      icon: "🪟",
      difficulty: "Beginner",
      status: "not-started",
      href: "/frontend/coding-problems/08-modal-dialog",
    },
    {
      title: "File Uploader",
      description:
        "Building robust file upload components with drag-and-drop and progress tracking.",
      icon: "📁",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/09-file-uploader",
    },
    {
      title: "Notification System",
      description: "Building toast notifications and alert systems with React.",
      icon: "🔔",
      difficulty: "Beginner",
      status: "not-started",
      href: "/frontend/coding-problems/10-notification-system",
    },
    {
      title: "Drag and Drop",
      description:
        "Implementing drag-and-drop functionality with React and HTML5 APIs.",
      icon: "🖱️",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/11-drag-and-drop",
    },
    {
      title: "Dashboard Layout",
      description:
        "Building responsive dashboard layouts with CSS Grid and Flexbox.",
      icon: "📊",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/12-dashboard-layout",
    },
    {
      title: "Undo/Redo System",
      description:
        "Implementing undo/redo functionality with command pattern and state management.",
      icon: "↩️",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/13-undo-redo",
    },
    {
      title: "Custom Hooks",
      description:
        "Building reusable custom hooks for common React patterns and functionality.",
      icon: "🎣",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/14-custom-hook",
    },
    {
      title: "Error Boundary",
      description:
        "Implementing error boundaries for graceful error handling in React applications.",
      icon: "🛡️",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/coding-problems/15-error-boundary",
    },
    {
      title: "TypeScript Challenges",
      description: "Advanced TypeScript challenges and type system mastery.",
      icon: "📘",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/16-typescript-challenges",
    },
    {
      title: "Advanced React Patterns",
      description:
        "Advanced React patterns including compound components, render props, and HOCs.",
      icon: "🚀",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/17-advanced-react-patterns",
    },
    {
      title: "WebGL & Canvas Challenges",
      description:
        "Building interactive graphics and animations with WebGL and Canvas APIs.",
      icon: "🎨",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/18-webgl-canvas-challenges",
    },
    {
      title: "Web APIs Advanced",
      description:
        "Advanced web APIs including Web Workers, Service Workers, and modern browser features.",
      icon: "🔧",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/coding-problems/19-web-apis-advanced",
    },

    // LeetCode Problems
    {
      title: "LeetCode Array Problems",
      description:
        "Array manipulation, two pointers, sliding window, and sorting algorithms.",
      icon: "📊",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/leetcode/array",
    },
    {
      title: "LeetCode String Problems",
      description:
        "String manipulation, pattern matching, and text processing algorithms.",
      icon: "📝",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/leetcode/string",
    },
    {
      title: "LeetCode Tree & Graph",
      description:
        "Binary trees, graphs, traversal algorithms, and tree-based data structures.",
      icon: "🌳",
      difficulty: "Advanced",
      status: "not-started",
      href: "/leetcode/tree-graph",
    },
    {
      title: "LeetCode Dynamic Programming",
      description:
        "Dynamic programming problems with memoization and optimization techniques.",
      icon: "🧮",
      difficulty: "Advanced",
      status: "not-started",
      href: "/leetcode/dp",
    },
    {
      title: "LeetCode Design Problems",
      description:
        "Data structure design, system design, and object-oriented programming challenges.",
      icon: "🎨",
      difficulty: "Advanced",
      status: "not-started",
      href: "/leetcode/design",
    },
    {
      title: "LeetCode Backtracking",
      description:
        "Backtracking algorithms, permutations, combinations, and recursive solutions.",
      icon: "🔍",
      difficulty: "Advanced",
      status: "not-started",
      href: "/leetcode/backtracking",
    },
    {
      title: "LeetCode Linked List",
      description:
        "Linked list manipulation, cycle detection, and pointer-based algorithms.",
      icon: "🔗",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/leetcode/linked-list",
    },
    {
      title: "LeetCode Math Problems",
      description:
        "Mathematical algorithms, number theory, and computational mathematics.",
      icon: "🔢",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/leetcode/math",
    },
    {
      title: "LeetCode Sorting & Searching",
      description:
        "Sorting algorithms, binary search, and search optimization techniques.",
      icon: "🔍",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/leetcode/sorting-searching",
    },
    {
      title: "LeetCode Other Problems",
      description:
        "Miscellaneous algorithmic challenges and problem-solving techniques.",
      icon: "🧩",
      difficulty: "Mixed",
      status: "not-started",
      href: "/leetcode/others",
    },
  ];

  const progressData = [
    {
      title: "JavaScript Fundamentals",
      percentage: 95,
      topics: ["Closures", "Promises", "Event Loop", "Prototypes"],
    },
    {
      title: "React & Modern Frameworks",
      percentage: 85,
      topics: ["Hooks", "State Management", "Performance", "Testing"],
    },
    {
      title: "System Design",
      percentage: 60,
      topics: ["Architecture", "Scalability", "Performance", "Security"],
    },
    {
      title: "Algorithms & Data Structures",
      percentage: 70,
      topics: ["Arrays", "Trees", "Sorting", "Dynamic Programming"],
    },
  ];

  const stats = [
    { number: "15+", label: "Topics Covered" },
    { number: "100+", label: "Coding Problems" },
    { number: "126", label: "LeetCode Problems" },
    { number: "6 Week", label: "Study Plan" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Typography className="h1">
            Frontend Interview Mastery
          </Typography>
          <Typography className="subtitle">
            Your comprehensive guide to acing frontend interviews at top tech
            companies. Track progress, visualize knowledge, and master
            fundamentals.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 4,
            }}
                      >
              <Button
                onClick={() => router.push("/frontend-interview-complete-guide")}
              >
                Complete Guide
              </Button>
              <Button
                onClick={() => router.push("/interview-checklist")}
              >
                Start Preparation
              </Button>
              <Button
                onClick={() => router.push("/progress-tracker")}
              >
                Browse Topics
              </Button>
          </Box>
        </Container>
      </HeroSection>

              {/* Stats Section */}
        <Container>
          <Box className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index}>
                <Typography className="h3">
                  {stat.number}
                </Typography>
                <Typography className="body">
                  {stat.label}
                </Typography>
              </StatsCard>
            ))}
          </Box>
        </Container>

      {/* Progress Section */}
      <Container>
        <Typography className="h2" style={{ textAlign: "center" }}>
          Learning Progress
        </Typography>
        <Grid>
          {progressData.map((item, index) => (
            <Card key={index}>
              <CardContent>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <Typography className="h3">{item.title}</Typography>
                  <Typography className="h3" style={{ color: "#3b82f6" }}>
                    {item.percentage}%
                  </Typography>
                </Box>
                <LinearProgress value={item.percentage} />
                <Box className="chip-container">
                  {item.topics.map((topic, topicIndex) => (
                    <Chip key={topicIndex}>
                      {topic}
                    </Chip>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>

      {/* Knowledge Map Section */}
      <Container>
        <Typography className="h2" style={{ textAlign: "center" }}>
          Knowledge Map
        </Typography>
        <Grid>
          {knowledgeCards.map((card, index) => (
            <KnowledgeCard key={index} {...card} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
