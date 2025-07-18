'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, BookOpen, Award, Calendar, Star } from 'lucide-react';
import { learningPathService } from '@/lib/learning-paths';
import { ProgressStats, LearningPath } from '@/types/learning-path';
import LearningPathCard from './LearningPathCard';

interface ProgressDashboardProps {
  className?: string;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [continuePaths, setContinuePaths] = useState<LearningPath[]>([]);
  const [recommendedPaths, setRecommendedPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = () => {
      try {
        const progressStats = learningPathService.getProgressStats();
        const continuePathsData = learningPathService.getContinueLearningPaths();
        const recommendedPathsData = learningPathService.getRecommendedPaths();

        setStats(progressStats);
        setContinuePaths(continuePathsData);
        setRecommendedPaths(recommendedPathsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary-100 dark:bg-secondary-800 rounded-lg h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg h-64"></div>
          <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <BookOpen size={48} className="mx-auto mb-4 text-secondary-400" />
        <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
          No Progress Yet
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
          Start your first learning path to see your progress here.
        </p>
      </div>
    );
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getCompletionRate = () => {
    if (stats.totalTopics === 0) return 0;
    return (stats.completedTopics / stats.totalTopics) * 100;
  };

  return (
    <div className={className}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <BookOpen size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {stats.totalPaths}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Total Paths
              </div>
            </div>
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {stats.completedPaths} completed • {stats.inProgressPaths} in progress
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
              <Target size={24} className="text-success-600 dark:text-success-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {Math.round(getCompletionRate())}%
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Completion Rate
              </div>
            </div>
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {stats.completedTopics} of {stats.totalTopics} topics completed
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
              <Clock size={24} className="text-warning-600 dark:text-warning-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {formatTime(stats.totalTimeSpent)}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Time Spent
              </div>
            </div>
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Learning consistently
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent-100 dark:bg-accent-900/20 rounded-lg">
              <TrendingUp size={24} className="text-accent-600 dark:text-accent-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {stats.streak}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Day Streak
              </div>
            </div>
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Keep it up!
          </div>
        </motion.div>
      </div>

      {/* Continue Learning & Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 flex items-center gap-2">
              <BookOpen size={20} />
              Continue Learning
            </h3>
            {continuePaths.length > 0 && (
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                {continuePaths.length} in progress
              </span>
            )}
          </div>
          
          {continuePaths.length > 0 ? (
            <div className="space-y-4">
              {continuePaths.slice(0, 3).map((path) => {
                const progress = learningPathService.getUserProgress(path.id);
                return (
                  <div key={path.id} className="flex items-center gap-4 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                        {path.title}
                      </h4>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                        {path.shortDescription}
                      </p>
                      {progress && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary-200 dark:bg-secondary-600 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress.completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                            {Math.round(progress.completionPercentage)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <motion.a
                      href={`/learn/${path.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      Continue
                    </motion.a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 text-secondary-300 dark:text-secondary-600" />
              <p className="text-secondary-600 dark:text-secondary-400">
                No learning paths in progress. Start a new one!
              </p>
            </div>
          )}
        </motion.div>

        {/* Recommended for You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-secondary-800 rounded-lg p-6 border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 flex items-center gap-2">
              <Star size={20} />
              Recommended for You
            </h3>
          </div>
          
          <div className="space-y-4">
            {recommendedPaths.slice(0, 3).map((path) => (
              <div key={path.id} className="flex items-center gap-4 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1">
                    {path.title}
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                    {path.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{path.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={12} />
                      <span className="capitalize">{path.level}</span>
                    </div>
                  </div>
                </div>
                <motion.a
                  href={`/learn/${path.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  Start
                </motion.a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressDashboard;