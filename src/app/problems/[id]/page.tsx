import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Play, Code, FileText } from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";

// Mock problems data
const mockProblems = {
  1: {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    solved: false,
    starred: false,
    content: `
# Two Sum

## Problem Description

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Examples

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Input: nums = [3,2,4], target = 6
Output: [1,2]

Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

## Solution

### Approach 1: Brute Force

\`\`\`javascript
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
\`\`\`

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

### Approach 2: Hash Map (Optimal)

\`\`\`javascript
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}
\`\`\`

**Time Complexity:** O(n)
**Space Complexity:** O(n)

## Related Problems

- Two Sum II - Input Array Is Sorted (Easy)
- Two Sum III - Data Structure Design (Easy)
    `,
  },
  2: {
    id: 2,
    title: "Virtual Scrolling Implementation",
    difficulty: "Medium",
    category: "Frontend",
    description:
      "Implement a virtual scrolling component for handling large datasets efficiently in React.",
    tags: ["React", "Performance", "DOM"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    solved: false,
    starred: true,
    content: `
# Virtual Scrolling Implementation

## Problem Description

Implement a virtual scrolling component that can efficiently render large lists of data by only rendering the visible items and a small buffer.

## Solution

\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';

const VirtualScroller = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: itemHeight,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderBottom: '1px solid #eee'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Usage
const App = () => {
  const items = Array.from({ length: 10000 }, (_, i) => \`Item \${i + 1}\`);
  
  return (
    <VirtualScroller
      items={items}
      itemHeight={50}
      containerHeight={400}
    />
  );
};
\`\`\`

## Key Concepts

1. **Viewport Calculation**: Calculate how many items fit in the visible area
2. **Start/End Index**: Determine which items to render based on scroll position
3. **Transform**: Use CSS transform to position the visible items correctly
4. **Buffer**: Render extra items above and below for smooth scrolling

## Performance Benefits

- **Memory**: Only renders visible items + buffer
- **DOM Nodes**: Minimal DOM manipulation
- **Scrolling**: Smooth performance even with millions of items
- **Responsive**: Adapts to different screen sizes

This implementation provides a solid foundation for virtual scrolling that can handle large datasets efficiently while maintaining good user experience.
    `,
  },
};

// Generate static params for all problems
export function generateStaticParams() {
  const problemIds = Object.keys(mockProblems);
  return problemIds.map((id) => ({
    id: id.toString(),
  }));
}

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const problemId = parseInt(params.id);
  const problem = mockProblems[problemId as keyof typeof mockProblems];

  if (!problem) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Problem Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The problem you're looking for doesn't exist.
          </p>
          <Link href="/problems">
            <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors mx-auto">
              <ArrowLeft size={16} />
              Back to Problems
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/problems">
          <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
            <ArrowLeft size={16} />
            Back to Problems
          </button>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              <Play size={16} />
              Solve
            </button>
            <button className="flex items-center gap-2 bg-transparent text-gray-700 border border-gray-300 px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
              <Star
                size={16}
                fill={problem.starred ? "currentColor" : "none"}
              />
              {problem.starred ? "Starred" : "Star"}
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              problem.difficulty === "Easy"
                ? "bg-green-500"
                : problem.difficulty === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {problem.difficulty}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Code size={16} />
            {problem.category}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            Time: {problem.timeComplexity}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText size={16} />
            Space: {problem.spaceComplexity}
          </div>
          {problem.solved && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              Solved
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          {problem.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <MarkdownViewer content={problem.content} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Problem Info
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Difficulty:</strong> {problem.difficulty}
              </div>
              <div>
                <strong>Category:</strong> {problem.category}
              </div>
              <div>
                <strong>Time Complexity:</strong> {problem.timeComplexity}
              </div>
              <div>
                <strong>Space Complexity:</strong> {problem.spaceComplexity}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Related Problems
            </h3>
            {problemId === 1 && (
              <Link href="/problems/2">
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                  <Code size={16} />
                  Virtual Scrolling Implementation
                </div>
              </Link>
            )}
            {problemId === 2 && (
              <Link href="/problems/1">
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                  <Code size={16} />
                  Two Sum
                </div>
              </Link>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Study Resources
            </h3>
            <Link href="/learn">
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Learn Fundamentals
              </div>
            </Link>
            <Link href="/study-guide">
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                <FileText size={16} />
                Study Guide
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
