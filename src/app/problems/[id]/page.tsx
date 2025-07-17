import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Play, Code, FileText } from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Problem mappings from number to file path
const problemMappings: { [key: string]: string } = {
  '1': 'leetcode/array/problems/01-remove-duplicates-from-sorted-array.md',
  '2': 'leetcode/array/problems/02-best-time-to-buy-and-sell-stock-ii.md',
  '3': 'leetcode/array/problems/03-rotate-array.md',
  '4': 'leetcode/array/problems/04-two-sum.md',
  '5': 'leetcode/array/problems/05-contains-duplicate.md',
  '6': 'leetcode/array/problems/06-single-number.md',
  '7': 'leetcode/array/problems/07-intersection-of-two-arrays-ii.md',
  '8': 'leetcode/array/problems/08-plus-one.md',
  '9': 'leetcode/array/problems/09-move-zeroes.md',
  '10': 'leetcode/array/problems/10-valid-sudoku.md',
  '11': 'leetcode/array/problems/11-rotate-image.md',
  '12': 'leetcode/array/problems/12-3sum.md',
  '13': 'leetcode/array/problems/13-set-matrix-zeroes.md',
  '14': 'leetcode/array/problems/14-increasing-triplet-subsequence.md',
  '15': 'leetcode/array/problems/15-missing-ranges.md',
  '16': 'leetcode/array/problems/16-count-and-say.md',
  '17': 'leetcode/array/problems/17-product-of-array-except-self.md',
  '18': 'leetcode/array/problems/18-container-with-most-water.md',
  '19': 'leetcode/array/problems/19-merge-intervals.md',
  '20': 'leetcode/array/problems/20-trapping-rain-water.md',
};

// Function to get problem data from markdown file
function getProblemData(problemId: string) {
  const filePath = problemMappings[problemId];
  if (!filePath) return null;
  
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Extract problem number from filename
    const fileName = path.basename(filePath, '.md');
    const match = fileName.match(/^(\d+)-(.+)$/);
    const problemNumber = match ? parseInt(match[1]) : parseInt(problemId);
    const problemTitle = match ? match[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : data.title || 'Problem';
    
    return {
      id: problemNumber,
      title: data.title || problemTitle,
      difficulty: data.difficulty || 'Medium',
      category: data.category || 'Array',
      description: data.description || content.substring(0, 200) + '...',
      tags: data.tags || ['Array'],
      timeComplexity: data.timeComplexity || 'O(n)',
      spaceComplexity: data.spaceComplexity || 'O(1)',
      solved: false,
      starred: false,
      content: content,
      filePath: filePath,
      leetcodeUrl: data.leetcode_url
    };
  } catch (error) {
    console.error('Error reading problem file:', error);
    return null;
  }
}

// Generate static params for all problems
export function generateStaticParams() {
  const problemIds = Object.keys(problemMappings);
  return problemIds.map((id) => ({
    id: id.toString(),
  }));
}

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const problemId = params.id;
  const problem = getProblemData(problemId);

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
            {problem.leetcodeUrl && (
              <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                  <Code size={16} />
                  View on LeetCode
                </div>
              </a>
            )}
            <Link href={`/interview/docs/${problem.filePath.replace(/\.md$/, '')}`}>
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                <FileText size={16} />
                View Full Documentation
              </div>
            </Link>
            {/* Show related problems in same category */}
            {parseInt(problemId) > 1 && (
              <Link href={`/problems/${parseInt(problemId) - 1}`}>
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                  <Code size={16} />
                  Previous Problem
                </div>
              </Link>
            )}
            {parseInt(problemId) < 20 && (
              <Link href={`/problems/${parseInt(problemId) + 1}`}>
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                  <Code size={16} />
                  Next Problem
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
