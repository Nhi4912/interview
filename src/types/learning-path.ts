export interface LearningPathTopic {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'coding' | 'quiz' | 'video' | 'practice';
  contentUrl: string;
  estimatedMinutes: number;
  prerequisites?: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  optional?: boolean;
}

export interface LearningPathSection {
  id: string;
  title: string;
  description: string;
  topics: LearningPathTopic[];
  estimatedHours: number;
  order: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  sections: LearningPathSection[];
  prerequisites?: string[];
  outcomes: string[];
  tags: string[];
  featured?: boolean;
  popularity?: number;
  lastUpdated: string;
}

export interface UserProgress {
  userId: string;
  pathId: string;
  completedTopics: string[];
  currentSection: string;
  currentTopic?: string;
  startedAt: string;
  lastAccessedAt: string;
  completionPercentage: number;
  timeSpent: number; // in minutes
  bookmarkedTopics: string[];
}

export interface ProgressStats {
  totalPaths: number;
  completedPaths: number;
  inProgressPaths: number;
  totalTopics: number;
  completedTopics: number;
  totalTimeSpent: number;
  streak: number;
  lastActiveDate: string;
}

export interface LearningPathFilter {
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  estimatedHours?: {
    min?: number;
    max?: number;
  };
  featured?: boolean;
}