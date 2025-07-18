// Global type definitions for the project

// Theme type definitions
export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
  code: {
    background: string;
    text: string;
    comment: string;
    keyword: string;
    string: string;
    function: string;
    variable: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

// Content type definitions
export interface ContentNode {
  id: string;
  title: string;
  path: string;
  type: 'directory' | 'file';
  children?: ContentNode[];
  metadata?: {
    description?: string;
    tags?: string[];
    category?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedMinutes?: number;
  };
}

// Learning path type definitions
export interface LearningPathTopic {
  id: string;
  title: string;
  contentPath: string;
  optional: boolean;
}

export interface LearningPathLevel {
  id: string;
  title: string;
  topics: LearningPathTopic[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  levels: LearningPathLevel[];
}

// User progress type definitions
export interface TopicProgress {
  completedAt: string;
  revisited: number;
}

export interface LearningPathProgress {
  currentTopic: string;
  progress: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
}

export interface UserProgress {
  completedContent: Record<string, TopicProgress>;
  learningPaths: Record<string, LearningPathProgress>;
  preferences: UserPreferences;
}
