import { LearningPath, LearningPathFilter, UserProgress, ProgressStats } from '@/types/learning-path';

// Sample learning paths data
const learningPathsData: LearningPath[] = [
  {
    id: 'frontend-fundamentals',
    title: 'Frontend Fundamentals',
    description: 'Master the core technologies of frontend development including HTML, CSS, and JavaScript.',
    shortDescription: 'Essential frontend technologies and best practices',
    category: 'Frontend',
    level: 'beginner',
    estimatedHours: 40,
    sections: [
      {
        id: 'html-css-basics',
        title: 'HTML & CSS Foundations',
        description: 'Learn semantic HTML and modern CSS techniques',
        topics: [
          {
            id: 'html-semantics',
            title: 'Semantic HTML',
            description: 'Learn proper HTML structure and semantic elements',
            type: 'reading',
            contentUrl: '/docs/frontend/html-css/README',
            estimatedMinutes: 45,
            tags: ['HTML', 'Semantics', 'Structure'],
            difficulty: 'beginner',
          },
          {
            id: 'css-flexbox',
            title: 'CSS Flexbox',
            description: 'Master flexible layouts with CSS Flexbox',
            type: 'reading',
            contentUrl: '/docs/frontend/css/advanced-layouts',
            estimatedMinutes: 60,
            tags: ['CSS', 'Flexbox', 'Layout'],
            difficulty: 'beginner',
          },
          {
            id: 'css-grid',
            title: 'CSS Grid',
            description: 'Create complex layouts with CSS Grid',
            type: 'reading',
            contentUrl: '/docs/frontend/css/advanced-layouts',
            estimatedMinutes: 75,
            tags: ['CSS', 'Grid', 'Layout'],
            difficulty: 'intermediate',
          },
        ],
        estimatedHours: 3,
        order: 1,
      },
      {
        id: 'javascript-fundamentals',
        title: 'JavaScript Fundamentals',
        description: 'Core JavaScript concepts and modern ES6+ features',
        topics: [
          {
            id: 'js-basics',
            title: 'JavaScript Basics',
            description: 'Variables, functions, and basic programming concepts',
            type: 'reading',
            contentUrl: '/docs/frontend/javascript/fundamentals',
            estimatedMinutes: 90,
            tags: ['JavaScript', 'Variables', 'Functions'],
            difficulty: 'beginner',
          },
          {
            id: 'js-advanced',
            title: 'Advanced JavaScript',
            description: 'Closures, prototypes, and advanced patterns',
            type: 'reading',
            contentUrl: '/docs/frontend/javascript/advanced-patterns',
            estimatedMinutes: 120,
            tags: ['JavaScript', 'Closures', 'Prototypes'],
            difficulty: 'intermediate',
          },
        ],
        estimatedHours: 3.5,
        order: 2,
      },
    ],
    prerequisites: [],
    outcomes: [
      'Build responsive web pages with HTML and CSS',
      'Write modern JavaScript applications',
      'Understand DOM manipulation and events',
      'Apply best practices for web accessibility',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend', 'Web Development'],
    featured: true,
    popularity: 95,
    lastUpdated: '2024-01-15',
  },
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description: 'Comprehensive React development from basics to advanced patterns and performance optimization.',
    shortDescription: 'Complete React development skills',
    category: 'React',
    level: 'intermediate',
    estimatedHours: 60,
    sections: [
      {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        description: 'Core React concepts and component development',
        topics: [
          {
            id: 'components-jsx',
            title: 'Components and JSX',
            description: 'Learn React component structure and JSX syntax',
            type: 'reading',
            contentUrl: '/docs/frontend/react/core',
            estimatedMinutes: 90,
            tags: ['React', 'Components', 'JSX'],
            difficulty: 'beginner',
          },
          {
            id: 'state-props',
            title: 'State and Props',
            description: 'Manage component state and pass data with props',
            type: 'reading',
            contentUrl: '/docs/frontend/react/core',
            estimatedMinutes: 75,
            tags: ['React', 'State', 'Props'],
            difficulty: 'beginner',
          },
        ],
        estimatedHours: 2.5,
        order: 1,
      },
      {
        id: 'react-hooks',
        title: 'React Hooks',
        description: 'Modern React development with hooks',
        topics: [
          {
            id: 'useState-useEffect',
            title: 'useState and useEffect',
            description: 'Essential hooks for state and side effects',
            type: 'reading',
            contentUrl: '/docs/frontend/react-js-ts/hooks',
            estimatedMinutes: 120,
            tags: ['React', 'Hooks', 'useState', 'useEffect'],
            difficulty: 'intermediate',
          },
          {
            id: 'custom-hooks',
            title: 'Custom Hooks',
            description: 'Create reusable logic with custom hooks',
            type: 'reading',
            contentUrl: '/docs/frontend/react-js-ts/hooks',
            estimatedMinutes: 90,
            tags: ['React', 'Custom Hooks', 'Reusability'],
            difficulty: 'intermediate',
          },
        ],
        estimatedHours: 3.5,
        order: 2,
      },
    ],
    prerequisites: ['frontend-fundamentals'],
    outcomes: [
      'Build modern React applications with hooks',
      'Implement effective state management',
      'Create reusable component patterns',
      'Optimize React applications for performance',
    ],
    tags: ['React', 'Hooks', 'Components', 'State Management'],
    featured: true,
    popularity: 88,
    lastUpdated: '2024-01-20',
  },
  {
    id: 'algorithms-data-structures',
    title: 'Algorithms & Data Structures',
    description: 'Master fundamental algorithms and data structures for technical interviews.',
    shortDescription: 'Essential algorithms and data structures',
    category: 'Algorithms',
    level: 'intermediate',
    estimatedHours: 80,
    sections: [
      {
        id: 'arrays-strings',
        title: 'Arrays and Strings',
        description: 'Master array and string manipulation techniques',
        topics: [
          {
            id: 'array-problems',
            title: 'Array Problems',
            description: 'Common array manipulation and searching problems',
            type: 'coding',
            contentUrl: '/docs/frontend/algorithms/array',
            estimatedMinutes: 180,
            tags: ['Arrays', 'Algorithms', 'Problem Solving'],
            difficulty: 'intermediate',
          },
          {
            id: 'string-problems',
            title: 'String Problems',
            description: 'String manipulation and pattern matching',
            type: 'coding',
            contentUrl: '/docs/frontend/algorithms/string',
            estimatedMinutes: 150,
            tags: ['Strings', 'Algorithms', 'Pattern Matching'],
            difficulty: 'intermediate',
          },
        ],
        estimatedHours: 5.5,
        order: 1,
      },
      {
        id: 'trees-graphs',
        title: 'Trees and Graphs',
        description: 'Tree and graph algorithms for complex problems',
        topics: [
          {
            id: 'tree-problems',
            title: 'Tree Problems',
            description: 'Binary trees, BSTs, and tree traversal',
            type: 'coding',
            contentUrl: '/docs/frontend/algorithms/tree-graph',
            estimatedMinutes: 240,
            tags: ['Trees', 'Binary Trees', 'Traversal'],
            difficulty: 'advanced',
          },
          {
            id: 'graph-problems',
            title: 'Graph Problems',
            description: 'Graph traversal and shortest path algorithms',
            type: 'coding',
            contentUrl: '/docs/frontend/algorithms/tree-graph',
            estimatedMinutes: 300,
            tags: ['Graphs', 'DFS', 'BFS', 'Shortest Path'],
            difficulty: 'advanced',
          },
        ],
        estimatedHours: 9,
        order: 2,
      },
    ],
    prerequisites: ['frontend-fundamentals'],
    outcomes: [
      'Solve complex algorithmic problems efficiently',
      'Implement and optimize data structures',
      'Analyze time and space complexity',
      'Excel in technical interviews',
    ],
    tags: ['Algorithms', 'Data Structures', 'Problem Solving', 'Interview Prep'],
    featured: true,
    popularity: 92,
    lastUpdated: '2024-01-18',
  },
];

// Progress tracking in localStorage
const PROGRESS_KEY = 'learningPath.progress';
const STATS_KEY = 'learningPath.stats';

export class LearningPathService {
  private static instance: LearningPathService;
  private progressData: Map<string, UserProgress> = new Map();
  private stats: ProgressStats;

  private constructor() {
    this.loadProgress();
    this.stats = this.loadStats();
  }

  static getInstance(): LearningPathService {
    if (!LearningPathService.instance) {
      LearningPathService.instance = new LearningPathService();
    }
    return LearningPathService.instance;
  }

  private loadProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        const progressArray = JSON.parse(stored);
        this.progressData = new Map(progressArray.map((p: UserProgress) => [p.pathId, p]));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }

  private saveProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const progressArray = Array.from(this.progressData.values());
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressArray));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  private loadStats(): ProgressStats {
    if (typeof window === 'undefined') {
      return {
        totalPaths: 0,
        completedPaths: 0,
        inProgressPaths: 0,
        totalTopics: 0,
        completedTopics: 0,
        totalTimeSpent: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString(),
      };
    }
    
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
    
    return {
      totalPaths: 0,
      completedPaths: 0,
      inProgressPaths: 0,
      totalTopics: 0,
      completedTopics: 0,
      totalTimeSpent: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
    };
  }

  private saveStats(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  getAllLearningPaths(): LearningPath[] {
    return learningPathsData;
  }

  getLearningPath(id: string): LearningPath | undefined {
    return learningPathsData.find(path => path.id === id);
  }

  filterLearningPaths(filters: LearningPathFilter): LearningPath[] {
    return learningPathsData.filter(path => {
      if (filters.category && path.category !== filters.category) return false;
      if (filters.level && path.level !== filters.level) return false;
      if (filters.featured !== undefined && path.featured !== filters.featured) return false;
      
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          path.tags.some(pathTag => pathTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }
      
      if (filters.estimatedHours) {
        if (filters.estimatedHours.min && path.estimatedHours < filters.estimatedHours.min) return false;
        if (filters.estimatedHours.max && path.estimatedHours > filters.estimatedHours.max) return false;
      }
      
      return true;
    });
  }

  getUserProgress(pathId: string): UserProgress | undefined {
    return this.progressData.get(pathId);
  }

  startLearningPath(pathId: string): void {
    const path = this.getLearningPath(pathId);
    if (!path) return;

    const progress: UserProgress = {
      userId: 'current-user',
      pathId,
      completedTopics: [],
      currentSection: path.sections[0]?.id || '',
      currentTopic: path.sections[0]?.topics[0]?.id,
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      completionPercentage: 0,
      timeSpent: 0,
      bookmarkedTopics: [],
    };

    this.progressData.set(pathId, progress);
    this.saveProgress();
    this.updateStats();
  }

  completeTopicIn(pathId: string, topicId: string): void {
    const progress = this.progressData.get(pathId);
    if (!progress) return;

    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
      progress.lastAccessedAt = new Date().toISOString();
      
      const path = this.getLearningPath(pathId);
      if (path) {
        const totalTopics = path.sections.reduce((sum, section) => sum + section.topics.length, 0);
        progress.completionPercentage = (progress.completedTopics.length / totalTopics) * 100;
        
        // Find next topic
        const nextTopic = this.findNextTopic(path, topicId);
        if (nextTopic) {
          progress.currentTopic = nextTopic.topicId;
          progress.currentSection = nextTopic.sectionId;
        }
      }
      
      this.progressData.set(pathId, progress);
      this.saveProgress();
      this.updateStats();
    }
  }

  private findNextTopic(path: LearningPath, currentTopicId: string): { sectionId: string; topicId: string } | null {
    for (let i = 0; i < path.sections.length; i++) {
      const section = path.sections[i];
      const topicIndex = section.topics.findIndex(t => t.id === currentTopicId);
      
      if (topicIndex >= 0) {
        // Next topic in same section
        if (topicIndex < section.topics.length - 1) {
          return {
            sectionId: section.id,
            topicId: section.topics[topicIndex + 1].id,
          };
        }
        // Next section
        if (i < path.sections.length - 1) {
          const nextSection = path.sections[i + 1];
          if (nextSection.topics.length > 0) {
            return {
              sectionId: nextSection.id,
              topicId: nextSection.topics[0].id,
            };
          }
        }
      }
    }
    return null;
  }

  toggleBookmark(pathId: string, topicId: string): void {
    const progress = this.progressData.get(pathId);
    if (!progress) return;

    const index = progress.bookmarkedTopics.indexOf(topicId);
    if (index >= 0) {
      progress.bookmarkedTopics.splice(index, 1);
    } else {
      progress.bookmarkedTopics.push(topicId);
    }

    progress.lastAccessedAt = new Date().toISOString();
    this.progressData.set(pathId, progress);
    this.saveProgress();
  }

  getProgressStats(): ProgressStats {
    return this.stats;
  }

  private updateStats(): void {
    const allProgress = Array.from(this.progressData.values());
    
    this.stats = {
      totalPaths: allProgress.length,
      completedPaths: allProgress.filter(p => p.completionPercentage >= 100).length,
      inProgressPaths: allProgress.filter(p => p.completionPercentage > 0 && p.completionPercentage < 100).length,
      totalTopics: allProgress.reduce((sum, p) => {
        const path = this.getLearningPath(p.pathId);
        return sum + (path ? path.sections.reduce((s, sec) => s + sec.topics.length, 0) : 0);
      }, 0),
      completedTopics: allProgress.reduce((sum, p) => sum + p.completedTopics.length, 0),
      totalTimeSpent: allProgress.reduce((sum, p) => sum + p.timeSpent, 0),
      streak: this.calculateStreak(),
      lastActiveDate: new Date().toISOString(),
    };
    
    this.saveStats();
  }

  private calculateStreak(): number {
    // Simple streak calculation - days with activity
    const today = new Date();
    const lastActive = new Date(this.stats.lastActiveDate);
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    return diffDays <= 1 ? this.stats.streak + 1 : 1;
  }

  getRecommendedPaths(): LearningPath[] {
    const userProgress = Array.from(this.progressData.values());
    const completedPaths = userProgress.filter(p => p.completionPercentage >= 100).map(p => p.pathId);
    
    // Filter out completed paths and sort by popularity
    return learningPathsData
      .filter(path => !completedPaths.includes(path.id))
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 3);
  }

  getContinueLearningPaths(): LearningPath[] {
    const userProgress = Array.from(this.progressData.values());
    const inProgressPaths = userProgress
      .filter(p => p.completionPercentage > 0 && p.completionPercentage < 100)
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime());
    
    return inProgressPaths
      .map(p => this.getLearningPath(p.pathId))
      .filter(Boolean) as LearningPath[];
  }
}

export const learningPathService = LearningPathService.getInstance();