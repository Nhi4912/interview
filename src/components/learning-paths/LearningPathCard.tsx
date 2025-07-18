'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, Star, BookOpen, CheckCircle, Play } from 'lucide-react';
import { LearningPath, UserProgress } from '@/types/learning-path';

interface LearningPathCardProps {
  path: LearningPath;
  progress?: UserProgress;
  className?: string;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, progress, className = '' }) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      case 'intermediate':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'advanced':
        return 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-success-500';
    if (percentage >= 50) return 'bg-warning-500';
    return 'bg-primary-500';
  };

  const completionPercentage = progress?.completionPercentage || 0;
  const isCompleted = completionPercentage >= 100;
  const isInProgress = completionPercentage > 0 && completionPercentage < 100;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.level)}`}>
                {path.level}
              </span>
              {path.featured && (
                <span className="px-2 py-1 bg-accent-100 text-accent-800 dark:bg-accent-900/20 dark:text-accent-400 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
              {isCompleted && (
                <CheckCircle size={16} className="text-success-500" />
              )}
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
              {path.title}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
              {path.shortDescription}
            </p>
          </div>
          
          {path.popularity && (
            <div className="flex items-center gap-1 text-warning-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">{path.popularity}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Progress
              </span>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(completionPercentage)}`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{path.estimatedHours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{path.sections.length} sections</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{path.category}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {path.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {path.tags.length > 3 && (
            <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-xs rounded-full">
              +{path.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Link
            href={`/learn/${path.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isCompleted ? (
              <>
                <CheckCircle size={16} />
                <span>Review</span>
              </>
            ) : isInProgress ? (
              <>
                <Play size={16} />
                <span>Continue</span>
              </>
            ) : (
              <>
                <BookOpen size={16} />
                <span>Start Learning</span>
              </>
            )}
          </Link>
          
          <Link
            href={`/learn/${path.id}`}
            className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPathCard;