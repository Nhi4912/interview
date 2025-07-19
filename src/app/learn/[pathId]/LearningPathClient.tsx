'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  SkipForward, 
  SkipBack,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import Link from 'next/link';
import { learningPathService } from '@/lib/learning-paths';
import { LearningPath, LearningPathTopic, UserProgress } from '@/types/learning-path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface LearningPathClientProps {
  pathId: string;
}

const LearningPathClient: React.FC<LearningPathClientProps> = ({ pathId }) => {
  const router = useRouter();
  
  const [path, setPath] = useState<LearningPath | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentTopic, setCurrentTopic] = useState<LearningPathTopic | null>(null);
  const [currentContent, setCurrentContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (!pathId) return;
    
    const loadPath = async () => {
      try {
        const learningPath = learningPathService.getLearningPath(pathId);
        if (!learningPath) {
          router.push('/learn');
          return;
        }
        
        setPath(learningPath);
        
        // Get or create progress
        let userProgress = learningPathService.getUserProgress(pathId);
        if (!userProgress) {
          learningPathService.startLearningPath(pathId);
          userProgress = learningPathService.getUserProgress(pathId);
        }
        
        setProgress(userProgress);
        
        // Set current topic based on progress
        if (userProgress?.currentTopic) {
          const topic = findTopicById(learningPath, userProgress.currentTopic);
          if (topic) {
            setCurrentTopic(topic);
            await loadTopicContent(topic);
          }
        } else {
          // Start with first topic
          const firstTopic = learningPath.sections[0]?.topics[0];
          if (firstTopic) {
            setCurrentTopic(firstTopic);
            await loadTopicContent(firstTopic);
          }
        }
      } catch (error) {
        console.error('Error loading learning path:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPath();
  }, [pathId, router]);

  const findTopicById = (learningPath: LearningPath, topicId: string): LearningPathTopic | null => {
    for (const section of learningPath.sections) {
      const topic = section.topics.find(t => t.id === topicId);
      if (topic) return topic;
    }
    return null;
  };

  const loadTopicContent = async (topic: LearningPathTopic) => {
    try {
      const content = {
        title: topic.title,
        description: topic.description,
        estimatedMinutes: topic.estimatedMinutes,
        difficulty: topic.difficulty,
        tags: topic.tags,
        content: `# ${topic.title}\n\n${topic.description}\n\nThis is a placeholder for the actual content that would be loaded from ${topic.contentUrl}.\n\n## Learning Objectives\n\n- Understand the core concepts\n- Apply the knowledge through examples\n- Practice with hands-on exercises\n\n## Prerequisites\n\n${topic.prerequisites?.map(p => `- ${p}`).join('\n') || 'None'}\n\n## Estimated Time\n\n${topic.estimatedMinutes} minutes`
      };
      
      const mdxSource = await serialize(content.content);
      setCurrentContent({ ...content, mdxSource });
    } catch (error) {
      console.error('Error loading topic content:', error);
    }
  };

  const handleTopicSelect = async (topic: LearningPathTopic) => {
    setCurrentTopic(topic);
    await loadTopicContent(topic);
  };

  const handleTopicComplete = () => {
    if (!currentTopic || !path) return;
    
    learningPathService.completeTopicIn(path.id, currentTopic.id);
    
    // Update progress state
    const updatedProgress = learningPathService.getUserProgress(path.id);
    setProgress(updatedProgress);
    
    // Auto-advance to next topic
    const nextTopic = findNextTopic();
    if (nextTopic) {
      handleTopicSelect(nextTopic);
    }
  };

  const findNextTopic = (): LearningPathTopic | null => {
    if (!path || !currentTopic) return null;
    
    for (let i = 0; i < path.sections.length; i++) {
      const section = path.sections[i];
      const topicIndex = section.topics.findIndex(t => t.id === currentTopic.id);
      
      if (topicIndex >= 0) {
        // Next topic in same section
        if (topicIndex < section.topics.length - 1) {
          return section.topics[topicIndex + 1];
        }
        // First topic in next section
        if (i < path.sections.length - 1) {
          return path.sections[i + 1].topics[0];
        }
      }
    }
    return null;
  };

  const findPreviousTopic = (): LearningPathTopic | null => {
    if (!path || !currentTopic) return null;
    
    for (let i = 0; i < path.sections.length; i++) {
      const section = path.sections[i];
      const topicIndex = section.topics.findIndex(t => t.id === currentTopic.id);
      
      if (topicIndex >= 0) {
        // Previous topic in same section
        if (topicIndex > 0) {
          return section.topics[topicIndex - 1];
        }
        // Last topic in previous section
        if (i > 0) {
          const prevSection = path.sections[i - 1];
          return prevSection.topics[prevSection.topics.length - 1];
        }
      }
    }
    return null;
  };

  const toggleBookmark = () => {
    if (!currentTopic || !path) return;
    
    learningPathService.toggleBookmark(path.id, currentTopic.id);
    const updatedProgress = learningPathService.getUserProgress(path.id);
    setProgress(updatedProgress);
  };

  const isTopicCompleted = (topicId: string): boolean => {
    return progress?.completedTopics.includes(topicId) || false;
  };

  const isTopicBookmarked = (topicId: string): boolean => {
    return progress?.bookmarkedTopics.includes(topicId) || false;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading learning path...</p>
        </div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Learning Path Not Found</h1>
          <Link href="/learn" className="text-blue-600 hover:text-blue-700">
            ← Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '320px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
          >
            <div className="p-4">
              {/* Header */}
              <div className="mb-6">
                <Link
                  href="/learn"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm">Back to Learning Paths</span>
                </Link>
                
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {path.title}
                </h1>
                
                {progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(progress.completionPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sections */}
              <div className="space-y-4">
                {path.sections.map((section, sectionIndex) => (
                  <div key={section.id} className="">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {sectionIndex + 1}. {section.title}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {section.topics.map((topic) => {
                        const isCompleted = isTopicCompleted(topic.id);
                        const isBookmarked = isTopicBookmarked(topic.id);
                        const isCurrent = currentTopic?.id === topic.id;
                        
                        return (
                          <div
                            key={topic.id}
                            onClick={() => handleTopicSelect(topic)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isCurrent
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {isCompleted ? (
                                    <CheckCircle size={16} className="text-green-500" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                  )}
                                  <span className={`text-sm font-medium ${
                                    isCurrent ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                                  }`}>
                                    {topic.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                  <Clock size={12} />
                                  <span>{topic.estimatedMinutes}min</span>
                                  <span className={`px-2 py-0.5 rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                                    {topic.difficulty}
                                  </span>
                                </div>
                              </div>
                              {isBookmarked && (
                                <BookmarkCheck size={16} className="text-yellow-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <BookOpen size={20} />
              </button>
              
              {currentTopic && (
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {currentTopic.title}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentTopic.difficulty)}`}>
                    {currentTopic.difficulty}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const prevTopic = findPreviousTopic();
                  if (prevTopic) handleTopicSelect(prevTopic);
                }}
                disabled={!findPreviousTopic()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  currentTopic && isTopicBookmarked(currentTopic.id)
                    ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {currentTopic && isTopicBookmarked(currentTopic.id) ? (
                  <BookmarkCheck size={20} />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
              
              <button
                onClick={() => {
                  const nextTopic = findNextTopic();
                  if (nextTopic) handleTopicSelect(nextTopic);
                }}
                disabled={!findNextTopic()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipForward size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentContent ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <MDXRemote {...currentContent.mdxSource} />
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>Estimated time: {currentTopic?.estimatedMinutes} minutes</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {currentTopic && !isTopicCompleted(currentTopic.id) && (
                      <button
                        onClick={handleTopicComplete}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <CheckCircle size={16} />
                        Mark as Complete
                      </button>
                    )}
                    
                    {findNextTopic() && (
                      <button
                        onClick={() => {
                          const nextTopic = findNextTopic();
                          if (nextTopic) handleTopicSelect(nextTopic);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <span>Next Topic</span>
                        <ArrowLeft size={16} className="rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Select a topic to get started
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a topic from the sidebar to begin learning
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathClient;