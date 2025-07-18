import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  buildContentStructure,
  getContentNodeById,
  getAllContentNodes,
  getContentNodesByCategory,
  searchContentNodes,
  getRelatedContentNodes,
  slugify,
} from './content-indexer';
import { getContentFilePath } from './content-router';
import { ContentNode } from '../types';

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

/**
 * Convert ContentNode to TopicData
 */
function contentNodeToTopicData(node: ContentNode, content: string): TopicData {
  return {
    title: node.title,
    description: node.metadata?.description || '',
    difficulty: node.metadata?.difficulty || 'intermediate',
    category: node.metadata?.category || 'General',
    tags: node.metadata?.tags || [],
    content: content,
    estimatedTime: node.metadata?.estimatedMinutes
      ? `${Math.round(node.metadata.estimatedMinutes / 60)} hours`
      : '2-3 hours',
    relatedTopics: getRelatedContentNodes(node.id, 5).map(n => n.id),
  };
}

/**
 * Parse markdown file content
 */
function parseMarkdownFile(filePath: string): { content: string; data: any } {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { content, data };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return { content: '', data: {} };
  }
}

/**
 * Load all content from the content structure
 */
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
      description:
        'Master the core concepts of JavaScript including variables, functions, objects, and modern ES6+ features.',
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
      relatedTopics: ['react-fundamentals', 'typescript-basics', 'async-javascript'],
    },
    'react-fundamentals': {
      title: 'React Fundamentals',
      difficulty: 'Intermediate',
      category: 'React',
      description:
        'Learn the core concepts of React including components, props, state, and modern hooks.',
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
      relatedTopics: ['javascript-fundamentals', 'react-hooks', 'component-patterns'],
    },
    'html-css-fundamentals': {
      title: 'HTML & CSS Fundamentals',
      difficulty: 'Beginner',
      category: 'Frontend',
      description:
        'Master semantic HTML and modern CSS techniques including Flexbox, Grid, and responsive design.',
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
      relatedTopics: ['responsive-design', 'css-grid', 'accessibility'],
    },
  };

  // Add hardcoded content first
  for (const [key, value] of Object.entries(hardcodedContent)) {
    allContent.set(key, value);
  }

  // Build content structure
  buildContentStructure();

  // Get all content nodes
  const contentNodes = getAllContentNodes().filter(node => node.type === 'file');

  // Convert content nodes to topic data
  for (const node of contentNodes) {
    const filePath = getContentFilePath(node);

    if (filePath) {
      const { content } = parseMarkdownFile(filePath);
      const topicData = contentNodeToTopicData(node, content);
      allContent.set(node.id, topicData);
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
  if (!query || query.trim() === '') {
    return [];
  }

  const searchResults = searchContentNodes(query);
  return searchResults.map(node => node.id);
}

/**
 * Get content structure for navigation
 */
export function getContentStructure() {
  return buildContentStructure();
}

/**
 * Clear content cache
 */
export function clearContentCache() {
  contentCache.clear();
}
