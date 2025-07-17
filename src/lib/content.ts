import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

// Cache for markdown content
const contentCache = new Map<string, TopicData>();

// Content directories to scan
const CONTENT_DIRS = [
  'src/content/frontend',
  'frontend',
  'src/content/leetcode',
  'leetcode'
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseMarkdownFile(filePath: string): TopicData | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Extract title from frontmatter or first heading
    let title = data.title || '';
    if (!title) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1] : path.basename(filePath, '.md');
    }
    
    // Extract description from frontmatter or first paragraph
    let description = data.description || '';
    if (!description) {
      const paragraphMatch = content.match(/(?:^|\n\n)([^#\n].*?)(?:\n\n|$)/);
      description = paragraphMatch ? paragraphMatch[1].substring(0, 200) + '...' : '';
    }
    
    return {
      title,
      description,
      difficulty: data.difficulty || 'Intermediate',
      category: data.category || 'General',
      tags: data.tags || [],
      content: content,
      estimatedTime: data.estimatedTime || '2-3 hours',
      relatedTopics: data.relatedTopics || []
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function scanContentDirectory(dir: string): Map<string, TopicData> {
  const topicMap = new Map<string, TopicData>();
  
  if (!fs.existsSync(dir)) {
    return topicMap;
  }
  
  function scanRecursive(currentDir: string, prefix: string = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subPrefix = prefix ? `${prefix}-${entry.name}` : entry.name;
        scanRecursive(fullPath, subPrefix);
      } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
        // Process markdown files
        const topicData = parseMarkdownFile(fullPath);
        if (topicData) {
          const slug = prefix ? `${prefix}-${slugify(path.basename(entry.name, '.md'))}` : slugify(path.basename(entry.name, '.md'));
          topicMap.set(slug, topicData);
        }
      } else if (entry.name === 'README.md') {
        // Handle README.md files with directory name
        const topicData = parseMarkdownFile(fullPath);
        if (topicData) {
          const dirName = path.basename(currentDir);
          const slug = prefix ? `${prefix}-${slugify(dirName)}` : slugify(dirName);
          topicMap.set(slug, topicData);
        }
      }
    }
  }
  
  scanRecursive(dir);
  return topicMap;
}

function loadAllContent(): Map<string, TopicData> {
  if (contentCache.size > 0) {
    return contentCache;
  }
  
  const allContent = new Map<string, TopicData>();
  
  // Add some hardcoded content for common topics
  const hardcodedContent = {
    'javascript-fundamentals': {
      title: 'JavaScript Fundamentals',
      difficulty: 'Beginner',
      category: 'JavaScript',
      description: 'Master the core concepts of JavaScript including variables, functions, objects, and modern ES6+ features.',
      tags: ['Variables', 'Functions', 'Objects', 'ES6+', 'Closures', 'Scope'],
      estimatedTime: '2-3 hours',
      content: `# JavaScript Fundamentals

## Overview
JavaScript is the programming language of the web. This guide covers the fundamental concepts you need to master to become proficient in JavaScript development.

## Variables and Data Types
Learn about primitive types, variable declarations, and scope.

## Functions
Master function declarations, expressions, and arrow functions.

## Objects and Classes
Understand object creation, prototypes, and ES6 classes.

## Asynchronous JavaScript
Learn about promises, async/await, and the event loop.

## Best Practices
Follow modern JavaScript best practices for clean, maintainable code.`,
      relatedTopics: ['react-fundamentals', 'typescript-basics', 'async-javascript']
    },
    'react-fundamentals': {
      title: 'React Fundamentals',
      difficulty: 'Intermediate',
      category: 'React',
      description: 'Learn the core concepts of React including components, props, state, and modern hooks.',
      tags: ['Components', 'Props', 'State', 'Hooks', 'JSX', 'Virtual DOM'],
      estimatedTime: '3-4 hours',
      content: `# React Fundamentals

## Overview
React is a popular JavaScript library for building user interfaces. This guide covers the fundamental concepts you need to build modern React applications.

## Components and JSX
Learn about functional components and JSX syntax.

## State with Hooks
Master useState and useEffect hooks for state management.

## Event Handling
Handle user interactions and form submissions.

## Best Practices
Follow React best practices for performance and maintainability.`,
      relatedTopics: ['javascript-fundamentals', 'react-hooks', 'component-patterns']
    },
    'html-css-fundamentals': {
      title: 'HTML & CSS Fundamentals',
      difficulty: 'Beginner',
      category: 'Frontend',
      description: 'Master semantic HTML and modern CSS techniques including Flexbox, Grid, and responsive design.',
      tags: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'Accessibility'],
      estimatedTime: '2-3 hours',
      content: `# HTML & CSS Fundamentals

## Overview
HTML and CSS form the foundation of web development. This guide covers semantic HTML, modern CSS layout techniques, and best practices.

## Semantic HTML
Learn about proper HTML structure and semantic elements.

## CSS Layout
Master Flexbox and CSS Grid for modern layouts.

## Responsive Design
Create websites that work on all devices.

## Accessibility
Make your websites accessible to all users.`,
      relatedTopics: ['responsive-design', 'css-grid', 'accessibility']
    }
  };
  
  // Add hardcoded content first
  for (const [key, value] of Object.entries(hardcodedContent)) {
    allContent.set(key, value);
  }
  
  // Scan content directories
  for (const dir of CONTENT_DIRS) {
    const contentMap = scanContentDirectory(dir);
    for (const [key, value] of contentMap) {
      allContent.set(key, value);
    }
  }
  
  // Cache the content
  for (const [key, value] of allContent) {
    contentCache.set(key, value);
  }
  
  return allContent;
}

export function getTopicContent(topic: string): TopicData | null {
  const allContent = loadAllContent();
  return allContent.get(topic) || null;
}

export function getAllTopics(): string[] {
  const allContent = loadAllContent();
  return Array.from(allContent.keys());
}

export function generateStaticParams() {
  return getAllTopics().map(topic => ({ topic }));
}

export function getTopicsByCategory(): Record<string, string[]> {
  const allContent = loadAllContent();
  const categories: Record<string, string[]> = {};
  
  for (const [slug, data] of allContent) {
    if (!categories[data.category]) {
      categories[data.category] = [];
    }
    categories[data.category].push(slug);
  }
  
  return categories;
}

export function searchTopics(query: string): string[] {
  const allContent = loadAllContent();
  const results: string[] = [];
  
  for (const [slug, data] of allContent) {
    if (
      data.title.toLowerCase().includes(query.toLowerCase()) ||
      data.description.toLowerCase().includes(query.toLowerCase()) ||
      data.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push(slug);
    }
  }
  
  return results;
}
