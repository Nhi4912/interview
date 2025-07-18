'use client';

import Fuse from 'fuse.js';
import { ContentNode } from '@/types';

export interface SearchResult {
  id: string;
  title: string;
  path: string;
  type: 'file' | 'directory';
  description?: string;
  category?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes?: number;
  score?: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: number[][];
  }>;
}

export interface SearchOptions {
  limit?: number;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  includeContent?: boolean;
}

export class SearchService {
  private fuse: Fuse<SearchResult> | null = null;
  private searchIndex: SearchResult[] = [];

  constructor() {
    this.initializeSearchIndex();
  }

  private async initializeSearchIndex() {
    try {
      // In a real app, this would fetch from an API or static JSON
      // For now, we'll create a sample index
      this.searchIndex = await this.buildSearchIndex();
      this.initializeFuse();
    } catch (error) {
      console.error('Failed to initialize search index:', error);
    }
  }

  private async buildSearchIndex(): Promise<SearchResult[]> {
    // Sample search index - in a real app, this would be built from the content
    const sampleIndex: SearchResult[] = [
      {
        id: 'javascript-fundamentals',
        title: 'JavaScript Fundamentals',
        path: 'frontend/javascript/fundamentals',
        type: 'file',
        description: 'Master the core concepts of JavaScript including variables, functions, objects, and modern ES6+ features.',
        category: 'JavaScript',
        tags: ['Variables', 'Functions', 'Objects', 'ES6+', 'Closures', 'Scope'],
        difficulty: 'beginner',
        estimatedMinutes: 180,
      },
      {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        path: 'frontend/react/core',
        type: 'file',
        description: 'Learn the core concepts of React including components, props, state, and modern hooks.',
        category: 'React',
        tags: ['Components', 'Props', 'State', 'Hooks', 'JSX', 'Virtual DOM'],
        difficulty: 'intermediate',
        estimatedMinutes: 240,
      },
      {
        id: 'html-css-fundamentals',
        title: 'HTML & CSS Fundamentals',
        path: 'frontend/html-css/README',
        type: 'file',
        description: 'Master semantic HTML and modern CSS techniques including Flexbox, Grid, and responsive design.',
        category: 'Frontend',
        tags: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design', 'Accessibility'],
        difficulty: 'beginner',
        estimatedMinutes: 180,
      },
      {
        id: 'system-design',
        title: 'System Design',
        path: 'frontend/system-design/README',
        type: 'file',
        description: 'Learn how to design scalable frontend systems and architectures.',
        category: 'System Design',
        tags: ['Scalability', 'Architecture', 'Performance', 'CDN', 'Caching'],
        difficulty: 'advanced',
        estimatedMinutes: 300,
      },
      {
        id: 'algorithms',
        title: 'Algorithms & Data Structures',
        path: 'frontend/algorithms/README',
        type: 'file',
        description: 'Practice algorithms and data structures commonly asked in technical interviews.',
        category: 'Algorithms',
        tags: ['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming'],
        difficulty: 'intermediate',
        estimatedMinutes: 360,
      },
      {
        id: 'performance-optimization',
        title: 'Performance Optimization',
        path: 'frontend/performance/README',
        type: 'file',
        description: 'Optimize web applications for speed and user experience.',
        category: 'Performance',
        tags: ['Web Vitals', 'Lazy Loading', 'Code Splitting', 'Caching', 'Bundle Size'],
        difficulty: 'advanced',
        estimatedMinutes: 240,
      },
      {
        id: 'accessibility',
        title: 'Web Accessibility',
        path: 'frontend/accessibility/README',
        type: 'file',
        description: 'Make websites accessible to all users including those with disabilities.',
        category: 'Accessibility',
        tags: ['WCAG', 'Screen Readers', 'Keyboard Navigation', 'ARIA', 'Semantic HTML'],
        difficulty: 'intermediate',
        estimatedMinutes: 180,
      },
      {
        id: 'testing',
        title: 'Testing Frontend Applications',
        path: 'frontend/testing/README',
        type: 'file',
        description: 'Learn testing strategies for frontend applications including unit, integration, and E2E tests.',
        category: 'Testing',
        tags: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Jest', 'Cypress', 'Testing Library'],
        difficulty: 'intermediate',
        estimatedMinutes: 240,
      },
      {
        id: 'typescript',
        title: 'TypeScript for Frontend',
        path: 'frontend/typescript/README',
        type: 'file',
        description: 'Master TypeScript for type-safe frontend development.',
        category: 'TypeScript',
        tags: ['Types', 'Interfaces', 'Generics', 'Type Guards', 'Utility Types'],
        difficulty: 'intermediate',
        estimatedMinutes: 200,
      },
      {
        id: 'browser-apis',
        title: 'Browser APIs',
        path: 'frontend/browser-apis/README',
        type: 'file',
        description: 'Learn about modern browser APIs for enhanced web applications.',
        category: 'Browser APIs',
        tags: ['Fetch API', 'WebGL', 'Service Workers', 'WebRTC', 'IndexedDB', 'Web Storage'],
        difficulty: 'advanced',
        estimatedMinutes: 280,
      },
    ];

    return sampleIndex;
  }

  private initializeFuse() {
    const options: Fuse.IFuseOptions<SearchResult> = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
    };

    this.fuse = new Fuse(this.searchIndex, options);
  }

  public search(query: string, options: SearchOptions = {}): SearchResult[] {
    if (!this.fuse || !query.trim()) {
      return [];
    }

    const {
      limit = 10,
      category,
      difficulty,
      tags,
    } = options;

    let results = this.fuse.search(query, { limit: limit * 2 }); // Get more results for filtering

    // Apply filters
    let filteredResults = results;

    if (category) {
      filteredResults = filteredResults.filter(result => 
        result.item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty) {
      filteredResults = filteredResults.filter(result => 
        result.item.difficulty === difficulty
      );
    }

    if (tags && tags.length > 0) {
      filteredResults = filteredResults.filter(result => 
        tags.some(tag => 
          result.item.tags?.some(itemTag => 
            itemTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Limit results
    filteredResults = filteredResults.slice(0, limit);

    // Transform results
    return filteredResults.map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches?.map(match => ({
        key: match.key || '',
        value: match.value || '',
        indices: match.indices || [],
      })) || [],
    }));
  }

  public searchByCategory(category: string, limit: number = 10): SearchResult[] {
    return this.searchIndex
      .filter(item => item.category?.toLowerCase() === category.toLowerCase())
      .slice(0, limit);
  }

  public searchByTags(tags: string[], limit: number = 10): SearchResult[] {
    return this.searchIndex
      .filter(item => 
        tags.some(tag => 
          item.tags?.some(itemTag => 
            itemTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      )
      .slice(0, limit);
  }

  public searchByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced', limit: number = 10): SearchResult[] {
    return this.searchIndex
      .filter(item => item.difficulty === difficulty)
      .slice(0, limit);
  }

  public getPopularContent(limit: number = 5): SearchResult[] {
    // For now, return items sorted by estimated time (longer = more comprehensive)
    return this.searchIndex
      .sort((a, b) => (b.estimatedMinutes || 0) - (a.estimatedMinutes || 0))
      .slice(0, limit);
  }

  public getRecentContent(limit: number = 5): SearchResult[] {
    // For now, return first items (in a real app, this would be sorted by date)
    return this.searchIndex.slice(0, limit);
  }

  public getRelatedContent(contentId: string, limit: number = 5): SearchResult[] {
    const item = this.searchIndex.find(item => item.id === contentId);
    if (!item) return [];

    // Find content with similar tags or category
    const related = this.searchIndex
      .filter(other => other.id !== contentId)
      .map(other => {
        let score = 0;
        
        // Same category gets higher score
        if (other.category === item.category) {
          score += 3;
        }
        
        // Common tags get score
        if (item.tags && other.tags) {
          const commonTags = item.tags.filter(tag => 
            other.tags!.some(otherTag => 
              otherTag.toLowerCase() === tag.toLowerCase()
            )
          );
          score += commonTags.length * 2;
        }
        
        // Similar difficulty gets small bonus
        if (other.difficulty === item.difficulty) {
          score += 1;
        }
        
        return { ...other, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return related;
  }

  public getAllCategories(): string[] {
    const categories = new Set<string>();
    this.searchIndex.forEach(item => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    return Array.from(categories).sort();
  }

  public getAllTags(): string[] {
    const tags = new Set<string>();
    this.searchIndex.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }

  public getSearchSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim()) return [];
    
    const suggestions = new Set<string>();
    
    // Add matching titles
    this.searchIndex.forEach(item => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(item.title);
      }
    });
    
    // Add matching tags
    this.searchIndex.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(tag);
          }
        });
      }
    });
    
    // Add matching categories
    this.searchIndex.forEach(item => {
      if (item.category && item.category.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(item.category);
      }
    });
    
    return Array.from(suggestions).slice(0, limit);
  }

  public updateSearchIndex(newIndex: SearchResult[]) {
    this.searchIndex = newIndex;
    this.initializeFuse();
  }

  public getSearchIndex(): SearchResult[] {
    return this.searchIndex;
  }
}

// Export singleton instance
export const searchService = new SearchService();