'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookmarkCheck, Play, ArrowRight } from 'lucide-react';
import { LearningPathSection, LearningPathTopic, UserProgress } from '@/types/learning-path';

interface TopicNavigationProps {
  sections: LearningPathSection[];
  progress: UserProgress | null;
  currentTopic: LearningPathTopic | null;
  onTopicSelect: (topic: LearningPathTopic) => void;
  className?: string;
}

const TopicNavigation: React.FC<TopicNavigationProps> = ({
  sections,
  progress,
  currentTopic,
  onTopicSelect,
  className = ''
}) => {
  const isTopicCompleted = (topicId: string): boolean => {
    return progress?.completedTopics.includes(topicId) || false;
  };

  const isTopicBookmarked = (topicId: string): boolean => {
    return progress?.bookmarkedTopics.includes(topicId) || false;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success-600 bg-success-100 dark:bg-success-900/20 dark:text-success-400';
      case 'intermediate': return 'text-warning-600 bg-warning-100 dark:bg-warning-900/20 dark:text-warning-400';
      case 'advanced': return 'text-error-600 bg-error-100 dark:bg-error-900/20 dark:text-error-400';
      default: return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-700 dark:text-secondary-400';
    }
  };

  const getTopicStatus = (topic: LearningPathTopic) => {
    const isCompleted = isTopicCompleted(topic.id);
    const isCurrent = currentTopic?.id === topic.id;
    const isBookmarked = isTopicBookmarked(topic.id);
    
    return { isCompleted, isCurrent, isBookmarked };
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {sections.map((section, sectionIndex) => {
        const completedTopics = section.topics.filter(topic => isTopicCompleted(topic.id)).length;
        const totalTopics = section.topics.length;
        const sectionProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
        
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden"
          >
            {/* Section Header */}
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                  {sectionIndex + 1}. {section.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                  <Clock size={14} />
                  <span>{section.estimatedHours}h</span>
                </div>
              </div>
              
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                {section.description}
              </p>
              
              {/* Section Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Progress
                </span>
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  {completedTopics}/{totalTopics} topics
                </span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sectionProgress}%` }}
                />
              </div>
            </div>
            
            {/* Topics */}
            <div className="p-4 space-y-2">
              {section.topics.map((topic, topicIndex) => {
                const { isCompleted, isCurrent, isBookmarked } = getTopicStatus(topic);
                
                return (
                  <motion.div
                    key={topic.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTopicSelect(topic)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isCurrent
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                        : isCompleted
                        ? 'border-success-200 bg-success-50 dark:bg-success-900/10 hover:border-success-300'
                        : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {/* Status Icon */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 mt-1 flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle size={20} className="text-success-500" />
                          ) : isCurrent ? (
                            <Play size={16} className="text-primary-500" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              isCurrent ? 'border-primary-500' : 'border-secondary-300 dark:border-secondary-600'
                            }`} />
                          )}
                        </div>
                        
                        {/* Topic Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-medium truncate ${
                              isCurrent
                                ? 'text-primary-900 dark:text-primary-100'
                                : isCompleted
                                ? 'text-success-900 dark:text-success-100'
                                : 'text-secondary-900 dark:text-secondary-100'
                            }`}>
                              {topic.title}
                            </h4>
                            
                            {topic.optional && (
                              <span className="px-2 py-0.5 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 text-xs rounded-full flex-shrink-0">
                                Optional
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-2">
                            {topic.description}
                          </p>
                          
                          {/* Topic Meta */}
                          <div className="flex items-center gap-3 text-xs text-secondary-500 dark:text-secondary-400">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{topic.estimatedMinutes}min</span>
                            </div>
                            
                            <span className={`px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </span>
                            
                            <span className="capitalize">{topic.type}</span>
                          </div>
                          
                          {/* Tags */}
                          {topic.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {topic.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {topic.tags.length > 3 && (
                                <span className="px-2 py-0.5 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">
                                  +{topic.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Icons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isBookmarked && (
                          <BookmarkCheck size={16} className="text-warning-500" />
                        )}
                        
                        {isCurrent && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        )}
                        
                        <ArrowRight size={16} className={`transition-transform ${
                          isCurrent ? 'text-primary-500' : 'text-secondary-400 group-hover:translate-x-1'
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopicNavigation;