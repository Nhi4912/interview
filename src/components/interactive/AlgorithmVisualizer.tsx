'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Settings, 
  Zap,
  TrendingUp,
  BarChart3,
  Shuffle
} from 'lucide-react';

interface AlgorithmStep {
  id: number;
  description: string;
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  current?: number;
  highlight?: number[];
}

interface AlgorithmVisualizerProps {
  algorithm: 'bubble-sort' | 'quick-sort' | 'merge-sort' | 'binary-search' | 'dfs' | 'bfs';
  initialArray?: number[];
  speed?: number;
  showCode?: boolean;
  className?: string;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithm,
  initialArray = [64, 34, 25, 12, 22, 11, 90],
  speed = 1000,
  showCode = true,
  className = ''
}) => {
  const [array, setArray] = useState<number[]>(initialArray);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(speed);
  const [showSettings, setShowSettings] = useState(false);
  const [arraySize, setArraySize] = useState(initialArray.length);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    timeComplexity: '',
    spaceComplexity: ''
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxValue = Math.max(...array);

  // Generate random array
  const generateRandomArray = (size: number = arraySize) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setStats({ comparisons: 0, swaps: 0, timeComplexity: '', spaceComplexity: '' });
  };

  // Bubble Sort Implementation
  const bubbleSort = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    
    steps.push({
      id: 0,
      description: 'Starting Bubble Sort',
      array: [...array]
    });
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        
        steps.push({
          id: steps.length,
          description: `Comparing elements at positions ${j} and ${j + 1}`,
          array: [...array],
          comparing: [j, j + 1]
        });
        
        if (array[j] > array[j + 1]) {
          swaps++;
          
          steps.push({
            id: steps.length,
            description: `Swapping elements at positions ${j} and ${j + 1}`,
            array: [...array],
            swapping: [j, j + 1]
          });
          
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          
          steps.push({
            id: steps.length,
            description: `Elements swapped`,
            array: [...array]
          });
        }
      }
      
      steps.push({
        id: steps.length,
        description: `Position ${array.length - i - 1} is now sorted`,
        array: [...array],
        sorted: Array.from({ length: i + 1 }, (_, idx) => array.length - idx - 1)
      });
    }
    
    steps.push({
      id: steps.length,
      description: 'Bubble Sort Complete!',
      array: [...array],
      sorted: array.map((_, idx) => idx)
    });
    
    setStats({
      comparisons,
      swaps,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
    });
    
    return steps;
  };

  // Quick Sort Implementation
  const quickSort = (arr: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    
    steps.push({
      id: 0,
      description: 'Starting Quick Sort',
      array: [...array]
    });
    
    const partition = (low: number, high: number): number => {
      const pivot = array[high];
      let i = low - 1;
      
      steps.push({
        id: steps.length,
        description: `Partitioning with pivot ${pivot} at position ${high}`,
        array: [...array],
        pivot: high,
        highlight: [low, high]
      });
      
      for (let j = low; j < high; j++) {
        comparisons++;
        
        steps.push({
          id: steps.length,
          description: `Comparing ${array[j]} with pivot ${pivot}`,
          array: [...array],
          pivot: high,
          comparing: [j, high]
        });
        
        if (array[j] <= pivot) {
          i++;
          if (i !== j) {
            swaps++;
            steps.push({
              id: steps.length,
              description: `Swapping ${array[i]} and ${array[j]}`,
              array: [...array],
              swapping: [i, j]
            });
            
            [array[i], array[j]] = [array[j], array[i]];
          }
        }
      }
      
      swaps++;
      steps.push({
        id: steps.length,
        description: `Placing pivot ${pivot} in correct position`,
        array: [...array],
        swapping: [i + 1, high]
      });
      
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      
      return i + 1;
    };
    
    const sort = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        
        steps.push({
          id: steps.length,
          description: `Pivot positioned correctly at ${pi}`,
          array: [...array],
          sorted: [pi]
        });
        
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    };
    
    sort(0, array.length - 1);
    
    steps.push({
      id: steps.length,
      description: 'Quick Sort Complete!',
      array: [...array],
      sorted: array.map((_, idx) => idx)
    });
    
    setStats({
      comparisons,
      swaps,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)'
    });
    
    return steps;
  };

  // Binary Search Implementation
  const binarySearch = (arr: number[], target: number): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...arr].sort((a, b) => a - b);
    let left = 0;
    let right = sortedArray.length - 1;
    let comparisons = 0;
    
    steps.push({
      id: 0,
      description: `Searching for ${target} in sorted array`,
      array: [...sortedArray],
      highlight: [left, right]
    });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
      
      steps.push({
        id: steps.length,
        description: `Checking middle element ${sortedArray[mid]} at position ${mid}`,
        array: [...sortedArray],
        current: mid,
        highlight: [left, right]
      });
      
      if (sortedArray[mid] === target) {
        steps.push({
          id: steps.length,
          description: `Found target ${target} at position ${mid}!`,
          array: [...sortedArray],
          highlight: [mid]
        });
        break;
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
        steps.push({
          id: steps.length,
          description: `Target is larger, searching right half`,
          array: [...sortedArray],
          highlight: [left, right]
        });
      } else {
        right = mid - 1;
        steps.push({
          id: steps.length,
          description: `Target is smaller, searching left half`,
          array: [...sortedArray],
          highlight: [left, right]
        });
      }
    }
    
    if (left > right) {
      steps.push({
        id: steps.length,
        description: `Target ${target} not found in array`,
        array: [...sortedArray]
      });
    }
    
    setStats({
      comparisons,
      swaps: 0,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)'
    });
    
    return steps;
  };

  // Generate steps based on algorithm
  const generateSteps = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let newSteps: AlgorithmStep[] = [];
      
      switch (algorithm) {
        case 'bubble-sort':
          newSteps = bubbleSort(array);
          break;
        case 'quick-sort':
          newSteps = quickSort(array);
          break;
        case 'binary-search':
          const target = array[Math.floor(Math.random() * array.length)];
          newSteps = binarySearch(array, target);
          break;
        default:
          newSteps = bubbleSort(array);
      }
      
      setSteps(newSteps);
      setCurrentStep(0);
      setIsGenerating(false);
    }, 100);
  };

  // Play/Pause functionality
  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      if (currentStep < steps.length - 1) {
        setIsPlaying(true);
      }
    }
  };

  // Reset visualization
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Step forward/backward
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, playbackSpeed]);

  // Generate steps when array changes
  useEffect(() => {
    generateSteps();
  }, [array, algorithm]);

  const currentStepData = steps[currentStep];
  const getBarColor = (index: number) => {
    if (!currentStepData) return '#3b82f6';
    
    if (currentStepData.sorted?.includes(index)) return '#10b981';
    if (currentStepData.swapping?.includes(index)) return '#ef4444';
    if (currentStepData.comparing?.includes(index)) return '#f59e0b';
    if (currentStepData.highlight?.includes(index)) return '#8b5cf6';
    if (currentStepData.pivot === index) return '#ec4899';
    if (currentStepData.current === index) return '#06b6d4';
    
    return '#3b82f6';
  };

  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
            <BarChart3 size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
              {algorithm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Visualizer
            </h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {currentStepData?.description || 'Click Start to begin visualization'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg border border-secondary-200 dark:border-secondary-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Array Size
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-secondary-600 dark:text-secondary-400">{arraySize}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Speed (ms)
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-secondary-600 dark:text-secondary-400">{playbackSpeed}ms</span>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => generateRandomArray()}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Shuffle size={16} />
                  <span>New Array</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-center gap-2 h-64 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg border">
          {isGenerating ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">Generating steps...</p>
              </div>
            </div>
          ) : (
            (currentStepData?.array || array).map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                initial={{ height: 0 }}
                animate={{ 
                  height: `${(value / maxValue) * 200}px`,
                  backgroundColor: getBarColor(index)
                }}
                transition={{ duration: 0.3 }}
                className="relative min-w-8 rounded-t-lg flex items-end justify-center"
                style={{ backgroundColor: getBarColor(index) }}
              >
                <span className="text-white text-xs font-medium mb-1">
                  {value}
                </span>
                <span className="absolute -bottom-6 text-xs text-secondary-600 dark:text-secondary-400">
                  {index}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={stepBackward}
            disabled={currentStep === 0}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={togglePlayback}
            disabled={steps.length === 0 || currentStep >= steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          
          <button
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipForward size={16} />
          </button>
          
          <button
            onClick={resetVisualization}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <div className="w-32 bg-secondary-200 dark:bg-secondary-600 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-200"
              style={{ width: `${steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {stats.comparisons}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Comparisons
          </div>
        </div>
        
        <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {stats.swaps}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Swaps
          </div>
        </div>
        
        <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {stats.timeComplexity}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Time Complexity
          </div>
        </div>
        
        <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {stats.spaceComplexity}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Space Complexity
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Highlighted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded"></div>
          <span className="text-secondary-600 dark:text-secondary-400">Pivot</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;