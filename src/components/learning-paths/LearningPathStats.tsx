'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';
import { LearningPath, UserProgress } from '@/types/learning-path';

interface LearningPathStatsProps {
  path: LearningPath;
  progress: UserProgress | null;
  className?: string;
}

const LearningPathStats: React.FC<LearningPathStatsProps> = ({
  path,
  progress,
  className = ''
}) => {
  const totalTopics = path.sections.reduce((sum, section) => sum + section.topics.length, 0);
  const completedTopics = progress?.completedTopics.length || 0;
  const completionPercentage = progress?.completionPercentage || 0;
  const timeSpent = progress?.timeSpent || 0;
  const bookmarkedTopics = progress?.bookmarkedTopics.length || 0;
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };
  
  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const stats = [
    {
      icon: <BookOpen size={20} />,
      label: 'Total Topics',
      value: totalTopics,
      color: 'text-primary-600 bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400'
    },
    {
      icon: <CheckCircle size={20} />,
      label: 'Completed',
      value: completedTopics,
      color: 'text-success-600 bg-success-100 dark:bg-success-900/20 dark:text-success-400'
    },
    {
      icon: <Target size={20} />,
      label: 'Progress',
      value: `${Math.round(completionPercentage)}%`,
      color: 'text-warning-600 bg-warning-100 dark:bg-warning-900/20 dark:text-warning-400'
    },
    {
      icon: <Clock size={20} />,
      label: 'Time Spent',
      value: formatTime(timeSpent),
      color: 'text-accent-600 bg-accent-100 dark:bg-accent-900/20 dark:text-accent-400'
    },
    {
      icon: <Award size={20} />,
      label: 'Bookmarks',
      value: bookmarkedTopics,
      color: 'text-error-600 bg-error-100 dark:bg-error-900/20 dark:text-error-400'
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Estimated Time',
      value: `${path.estimatedHours}h`,
      color: 'text-secondary-600 bg-secondary-100 dark:bg-secondary-700 dark:text-secondary-400'
    }
  ];
  
  return (
    <div className={className}>
      {/* Main Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
            Learning Progress
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
            <BarChart3 size={16} />
            <span>Overview</span>
          </div>
        </div>
        
        {/* Progress Ring */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary-200 dark:text-secondary-700"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionPercentage / 100)}`}
                className="text-primary-600 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                  {Math.round(completionPercentage)}%
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Complete
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {completedTopics}
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              Topics Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {totalTopics - completedTopics}
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              Topics Remaining
            </div>
          </div>
        </div>
        
        {progress && (
          <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>Started {getDaysAgo(progress.startedAt)} days ago</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} />
                <span>Last active {getDaysAgo(progress.lastAccessedAt)} days ago</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Path Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 mt-6"
      >
        <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          Learning Path Details
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Category</span>
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {path.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Difficulty</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              path.level === 'beginner' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400' :
              path.level === 'intermediate' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400' :
              'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400'
            }`}>
              {path.level}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Sections</span>
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {path.sections.length}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Last Updated</span>
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {new Date(path.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            Tags
          </h5>
          <div className="flex flex-wrap gap-2">
            {path.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Learning Outcomes */}
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            Learning Outcomes
          </h5>
          <ul className="space-y-1">
            {path.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                <CheckCircle size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default LearningPathStats;