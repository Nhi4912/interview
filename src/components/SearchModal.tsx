'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock, Tag, Star, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchService, SearchResult } from '@/lib/search-service';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popularContent, setPopularContent] = useState<SearchResult[]>([]);
  const [recentContent, setRecentContent] = useState<SearchResult[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      // Load popular and recent content
      setPopularContent(searchService.getPopularContent(4));
      setRecentContent(searchService.getRecentContent(4));
    } else {
      // Reset state when closing
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      
      // Debounce search
      const timer = setTimeout(() => {
        const searchResults = searchService.search(query, { limit: 8 });
        setResults(searchResults);
        setSelectedIndex(0);
        
        // Get search suggestions
        const searchSuggestions = searchService.getSearchSuggestions(query, 4);
        setSuggestions(searchSuggestions);
        
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/docs/${result.path}`);
    onClose();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success-600 dark:text-success-400';
      case 'intermediate':
        return 'text-warning-600 dark:text-warning-400';
      case 'advanced':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-secondary-600 dark:text-secondary-400';
    }
  };

  const getEstimatedTime = (minutes?: number) => {
    if (!minutes) return '5 min';
    if (minutes < 60) return `${minutes} min`;
    return `${Math.round(minutes / 60)} hr`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white dark:bg-secondary-900 rounded-lg shadow-2xl border border-secondary-200 dark:border-secondary-700 overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                <Search size={20} className="text-secondary-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-1 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                    <span className="ml-2 text-secondary-600 dark:text-secondary-400">Searching...</span>
                  </div>
                )}

                {query && !isLoading && results.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2 px-2">
                      Search Results
                    </div>
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left p-3 rounded-lg transition-colors mb-1 ${
                          index === selectedIndex
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                            : 'hover:bg-secondary-50 dark:hover:bg-secondary-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen size={16} className="text-secondary-400 flex-shrink-0" />
                              <span className="font-medium text-secondary-900 dark:text-secondary-100 truncate">
                                {result.title}
                              </span>
                            </div>
                            
                            {result.description && (
                              <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-2">
                                {result.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-3 text-xs text-secondary-500 dark:text-secondary-400">
                              {result.category && (
                                <div className="flex items-center gap-1">
                                  <Tag size={12} />
                                  <span>{result.category}</span>
                                </div>
                              )}
                              
                              {result.difficulty && (
                                <div className={`flex items-center gap-1 ${getDifficultyColor(result.difficulty)}`}>
                                  <div className="w-2 h-2 rounded-full bg-current" />
                                  <span className="capitalize">{result.difficulty}</span>
                                </div>
                              )}
                              
                              {result.estimatedMinutes && (
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>{getEstimatedTime(result.estimatedMinutes)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <ArrowRight size={16} className="text-secondary-400 flex-shrink-0 ml-2" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {query && !isLoading && results.length === 0 && (
                  <div className="text-center py-8 text-secondary-600 dark:text-secondary-400">
                    <Search size={48} className="mx-auto mb-4 text-secondary-300 dark:text-secondary-600" />
                    <p className="text-lg font-medium mb-2">No results found</p>
                    <p className="text-sm">Try adjusting your search terms or browse popular content below.</p>
                  </div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-2 border-t border-secondary-200 dark:border-secondary-700">
                    <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2 px-2">
                      Suggestions
                    </div>
                    <div className="flex flex-wrap gap-2 px-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Content */}
                {!query && popularContent.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2 px-2">
                      Popular Content
                    </div>
                    {popularContent.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors mb-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star size={16} className="text-warning-500" />
                            <span className="font-medium text-secondary-900 dark:text-secondary-100">
                              {result.title}
                            </span>
                          </div>
                          <ArrowRight size={16} className="text-secondary-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Content */}
                {!query && recentContent.length > 0 && (
                  <div className="p-2 border-t border-secondary-200 dark:border-secondary-700">
                    <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2 px-2">
                      Recent Updates
                    </div>
                    {recentContent.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors mb-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-secondary-400" />
                            <span className="font-medium text-secondary-900 dark:text-secondary-100">
                              {result.title}
                            </span>
                          </div>
                          <ArrowRight size={16} className="text-secondary-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-secondary-200 dark:border-secondary-700 text-xs text-secondary-500 dark:text-secondary-400">
                <div className="flex items-center justify-between">
                  <span>Press ↑↓ to navigate, ↵ to select, ESC to close</span>
                  <span>Powered by Fuse.js</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;