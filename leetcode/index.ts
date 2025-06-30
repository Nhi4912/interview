/**
 * LeetCode Problems Index
 *
 * This file serves as a comprehensive index for all LeetCode problems
 * organized by category with their solutions and complexity analysis.
 *
 * For Big Tech Interview Preparation (FAANG, Axon, Grab, WorldQuant, etc.)
 */

// Array Problems
export * from "./array/problems/01-remove-duplicates-from-sorted-array";
export * from "./array/problems/02-best-time-to-buy-and-sell-stock-ii";
export * from "./array/problems/03-rotate-array";
export * from "./array/problems/04-two-sum";

// String Problems
export {
  reverseString,
  reverseStringArrayMethod,
  reverseStringRecursive,
  reverseStringXOR,
  reverseStringStack,
  reverseStringManual,
  testReverseString,
  performanceComparison as stringPerformanceComparison,
  testUnicode,
} from "./string/problems/01-reverse-string";

// Linked List Problems
export {
  ListNode,
  reverseList,
  reverseListRecursive,
  reverseListStack,
  reverseListTwoPointers,
  reverseListArray,
  reverseListTailRecursive,
  createLinkedList,
  linkedListToArray,
  testReverseLinkedList,
  performanceComparison as linkedListPerformanceComparison,
  memoryUsageTest as linkedListMemoryUsageTest,
} from "./linked-list/problems/01-reverse-linked-list";

// Tree/Graph Problems
export {
  TreeNode,
  maxDepth,
  maxDepthIterativeDFS,
  maxDepthBFS,
  maxDepthTailRecursive,
  maxDepthMorris,
  maxDepthPostOrder,
  createBinaryTree,
  printTree,
  testMaxDepth,
  performanceComparison as treePerformanceComparison,
  memoryUsageTest as treeMemoryUsageTest,
} from "./tree-graph/problems/01-maximum-depth-of-binary-tree";

// Dynamic Programming Problems
export {
  climbStairs,
  climbStairsOptimized,
  climbStairsMemo,
  climbStairsMatrix,
  climbStairsBruteForce,
  climbStairsBinet,
  testClimbStairs,
  performanceComparison as dpPerformanceComparison,
  fibonacciSequence,
} from "./dp/problems/01-climbing-stairs";

// Design Problems
export {
  MinStack,
  MinStackPairs,
  MinStackMath,
  MinStackSimple,
  MinStackPriorityQueue,
  testMinStack,
  performanceComparison as designPerformanceComparison,
  memoryAnalysis as designMemoryAnalysis,
} from "./design/problems/01-min-stack";

// Backtracking Problems
export {
  letterCombinations,
  letterCombinationsIterative,
  letterCombinationsQueue,
  letterCombinationsFunctional,
  letterCombinationsWithGenerator,
  letterCombinationsBitwise,
  letterCombinationsGenerator,
  testLetterCombinations,
  performanceComparison as backtrackingPerformanceComparison,
  memoryAnalysis as backtrackingMemoryAnalysis,
} from "./backtracking/problems/01-letter-combinations-of-a-phone-number";

// Math Problems
export {
  fizzBuzz,
  fizzBuzzConcatenation,
  fizzBuzzMap,
  fizzBuzzFunctional,
  fizzBuzzBitwise,
  fizzBuzzLookup,
  fizzBuzzWithGenerator,
  fizzBuzzGenerator,
  fizzBuzzClass,
  FizzBuzzSolver,
  testFizzBuzz,
  performanceComparison as mathPerformanceComparison,
  patternAnalysis,
} from "./math/problems/01-fizz-buzz";

// Sorting & Searching Problems
export {
  merge,
  mergeWithExtraSpace,
  mergeWithArrayMethods,
  mergeWithGap,
  mergeWithHeap,
  mergeRecursive,
  MinHeap,
  testMergeSortedArray,
  performanceComparison as sortingPerformanceComparison,
} from "./sorting-searching/problems/01-merge-sorted-array";

// Other Problems
export {
  isValid,
  isValidSwitch,
  isValidFunctional,
  isValidMap,
  isValidASCII,
  isValidRecursive,
  isValidRegex,
  isValidGenerator,
  bracketValidator,
  testValidParentheses,
  performanceComparison as otherPerformanceComparison,
} from "./others/problems/01-valid-parentheses";

// Main export function to run all tests
export function runAllTests() {
  console.log("🚀 Running all LeetCode problem tests...\n");

  // Array tests
  console.log("=== ARRAY PROBLEMS ===");
  // testRemoveDuplicates();
  // testBestTimeToBuyAndSellStockII();
  // testRotateArray();
  // testTwoSum();

  // String tests
  console.log("=== STRING PROBLEMS ===");
  // testReverseString();

  // Linked List tests
  console.log("=== LINKED LIST PROBLEMS ===");
  // testReverseLinkedList();

  // Tree/Graph tests
  console.log("=== TREE/GRAPH PROBLEMS ===");
  // testMaxDepth();

  // Dynamic Programming tests
  console.log("=== DYNAMIC PROGRAMMING PROBLEMS ===");
  // testClimbStairs();

  // Design tests
  console.log("=== DESIGN PROBLEMS ===");
  // testMinStack();

  // Backtracking tests
  console.log("=== BACKTRACKING PROBLEMS ===");
  // testLetterCombinations();

  // Math tests
  console.log("=== MATH PROBLEMS ===");
  // testFizzBuzz();

  // Sorting & Searching tests
  console.log("=== SORTING & SEARCHING PROBLEMS ===");
  // testMergeSortedArray();

  // Other tests
  console.log("=== OTHER PROBLEMS ===");
  // testValidParentheses();

  console.log("✅ All tests completed!");
}

// Performance comparison function
export function runAllPerformanceComparisons() {
  console.log("⚡ Running all performance comparisons...\n");

  // stringPerformanceComparison();
  // linkedListPerformanceComparison();
  // treePerformanceComparison();
  // dpPerformanceComparison();
  // designPerformanceComparison();
  // backtrackingPerformanceComparison();
  // mathPerformanceComparison();
  // sortingPerformanceComparison();
  // otherPerformanceComparison();

  console.log("✅ All performance comparisons completed!");
}

// Problem Categories Summary
export const PROBLEM_CATEGORIES = {
  ARRAY: {
    name: "Array Problems",
    count: 16,
    problems: [
      "Remove Duplicates from Sorted Array",
      "Best Time to Buy and Sell Stock II",
      "Rotate Array",
      "Contains Duplicate",
      "Single Number",
      "Intersection of Two Arrays II",
      "Plus One",
      "Move Zeroes",
      "Two Sum",
      "Valid Sudoku",
      "Rotate Image",
      "3Sum",
      "Set Matrix Zeroes",
      "Group Anagrams",
      "Longest Substring Without Repeating Characters",
      "Longest Palindromic Substring",
    ],
  },
  STRING: {
    name: "String Problems",
    count: 14,
    problems: [
      "Reverse String",
      "Reverse Integer",
      "First Unique Character in a String",
      "Valid Anagram",
      "Valid Palindrome",
      "String to Integer (atoi)",
      "Implement strStr()",
      "Longest Common Prefix",
      "Group Anagrams",
      "Longest Substring Without Repeating Characters",
      "Longest Palindromic Substring",
      "Increasing Triplet Subsequence",
      "Missing Ranges",
      "Count and Say",
    ],
  },
  LINKED_LIST: {
    name: "Linked List Problems",
    count: 9,
    problems: [
      "Delete Node in a Linked List",
      "Remove Nth Node From End of List",
      "Reverse Linked List",
      "Merge Two Sorted Lists",
      "Palindrome Linked List",
      "Linked List Cycle",
      "Add Two Numbers",
      "Odd Even Linked List",
      "Intersection of Two Linked Lists",
    ],
  },
  TREE_GRAPH: {
    name: "Tree & Graph Problems",
    count: 12,
    problems: [
      "Maximum Depth of Binary Tree",
      "Validate Binary Search Tree",
      "Symmetric Tree",
      "Binary Tree Level Order Traversal",
      "Convert Sorted Array to Binary Search Tree",
      "Binary Tree Inorder Traversal",
      "Binary Tree Zigzag Level Order Traversal",
      "Construct Binary Tree from Preorder and Inorder Traversal",
      "Populating Next Right Pointers in Each Node",
      "Kth Smallest Element in a BST",
      "Inorder Successor in BST",
      "Number of Islands",
    ],
  },
  DYNAMIC_PROGRAMMING: {
    name: "Dynamic Programming Problems",
    count: 8,
    problems: [
      "Climbing Stairs",
      "Best Time to Buy and Sell Stock",
      "Maximum Subarray",
      "House Robber",
      "Jump Game",
      "Unique Paths",
      "Coin Change",
      "Longest Increasing Subsequence",
    ],
  },
  DESIGN: {
    name: "Design Problems",
    count: 6,
    problems: [
      "Shuffle an Array",
      "Min Stack",
      "Flatten 2D Vector",
      "Serialize and Deserialize Binary Tree",
      "Insert Delete GetRandom O(1)",
      "Design Tic-Tac-Toe",
    ],
  },
  MATH: {
    name: "Math Problems",
    count: 11,
    problems: [
      "Fizz Buzz",
      "Count Primes",
      "Power of Three",
      "Roman to Integer",
      "Happy Number",
      "Factorial Trailing Zeroes",
      "Excel Sheet Column Number",
      "Pow(x, n)",
      "Sqrt(x)",
      "Divide Two Integers",
      "Fraction to Recurring Decimal",
    ],
  },
};

// Study Plan
export const STUDY_PLAN = {
  WEEK_1: {
    name: "Foundation Week",
    focus: "Easy problems and basic patterns",
    problems: [
      "Remove Duplicates from Sorted Array",
      "Two Sum",
      "Reverse String",
      "Valid Palindrome",
      "Maximum Depth of Binary Tree",
      "Climbing Stairs",
      "Fizz Buzz",
    ],
  },
  WEEK_2: {
    name: "Intermediate Week",
    focus: "Medium problems and optimization",
    problems: [
      "Best Time to Buy and Sell Stock II",
      "Rotate Array",
      "Valid Sudoku",
      "Reverse Linked List",
      "Validate Binary Search Tree",
      "House Robber",
      "Min Stack",
    ],
  },
  WEEK_3: {
    name: "Advanced Week",
    focus: "Complex problems and multiple solutions",
    problems: [
      "3Sum",
      "Longest Substring Without Repeating Characters",
      "Add Two Numbers",
      "Binary Tree Level Order Traversal",
      "Coin Change",
      "Serialize and Deserialize Binary Tree",
      "Pow(x, n)",
    ],
  },
};

// Complexity Analysis Summary
export const COMPLEXITY_GUIDE = {
  TIME_COMPLEXITY: {
    O_1: "Constant time - operations that take the same time regardless of input size",
    O_LOG_N: "Logarithmic time - binary search, divide and conquer",
    O_N: "Linear time - single pass through data structure",
    O_N_LOG_N: "Linearithmic time - sorting, divide and conquer with merge",
    O_N_SQUARED: "Quadratic time - nested loops, bubble sort",
    O_2_N: "Exponential time - recursive algorithms without memoization",
    O_N_FACTORIAL: "Factorial time - generating all permutations",
  },
  SPACE_COMPLEXITY: {
    O_1: "Constant space - no extra space needed",
    O_LOG_N: "Logarithmic space - recursion depth, balanced tree traversal",
    O_N: "Linear space - storing all elements, recursion stack",
    O_N_SQUARED: "Quadratic space - 2D arrays, adjacency matrices",
  },
};

// Common Patterns
export const COMMON_PATTERNS = {
  TWO_POINTERS: {
    description: "Use two pointers to traverse array/list efficiently",
    problems: [
      "Two Sum",
      "Remove Duplicates",
      "Valid Palindrome",
      "Reverse String",
    ],
    template: `
function twoPointersTemplate(arr: number[]): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Process elements at left and right
        if (condition) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;
}`,
  },
  SLIDING_WINDOW: {
    description:
      "Maintain a window of elements that satisfies certain conditions",
    problems: [
      "Longest Substring Without Repeating Characters",
      "Minimum Window Substring",
    ],
    template: `
function slidingWindowTemplate(s: string): number {
    let left = 0;
    let right = 0;
    let maxLength = 0;
    const window = new Set();
    
    while (right < s.length) {
        // Expand window
        window.add(s[right]);
        
        // Shrink window if needed
        while (window.size > k) {
            window.delete(s[left]);
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
        right++;
    }
    
    return maxLength;
}`,
  },
  DYNAMIC_PROGRAMMING: {
    description:
      "Solve complex problems by breaking them into simpler subproblems",
    problems: ["Climbing Stairs", "House Robber", "Coin Change"],
    template: `
function dpTemplate(n: number): number {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // Base case
    
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]; // Recurrence relation
    }
    
    return dp[n];
}`,
  },
  BINARY_SEARCH: {
    description: "Efficiently find elements in sorted arrays",
    problems: ["Sqrt(x)", "Search in Rotated Sorted Array"],
    template: `
function binarySearchTemplate(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
  },
};

// Interview Tips
export const INTERVIEW_TIPS = {
  BEFORE_INTERVIEW: [
    "Practice explaining your thought process out loud",
    "Review time and space complexity analysis",
    "Prepare questions about the company and role",
    "Get familiar with the coding environment",
    "Practice with mock interviews",
  ],
  DURING_INTERVIEW: [
    "Clarify the problem requirements first",
    "Start with a brute force solution if needed",
    "Explain your approach before coding",
    "Consider edge cases and test your solution",
    "Ask clarifying questions when needed",
  ],
  AFTER_INTERVIEW: [
    "Reflect on what went well and what to improve",
    "Practice similar problems",
    "Review the optimal solution",
    "Learn from feedback",
    "Keep practicing consistently",
  ],
};

// Company-Specific Focus Areas
export const COMPANY_FOCUS = {
  GOOGLE: {
    focus: "Algorithm efficiency, system design, clean code",
    commonTopics: [
      "Graph algorithms",
      "Dynamic programming",
      "String manipulation",
    ],
    difficulty: "High",
  },
  AMAZON: {
    focus: "Data structures, object-oriented design, behavioral questions",
    commonTopics: ["Trees and graphs", "Hash tables", "Arrays and strings"],
    difficulty: "Medium-High",
  },
  FACEBOOK: {
    focus: "Problem solving, system design, cultural fit",
    commonTopics: ["Dynamic programming", "Tree traversal", "Graph algorithms"],
    difficulty: "High",
  },
  MICROSOFT: {
    focus: "Problem solving, coding quality, system design",
    commonTopics: ["Arrays and strings", "Linked lists", "Trees"],
    difficulty: "Medium-High",
  },
  AXON: {
    focus: "Frontend development, React, JavaScript/TypeScript",
    commonTopics: [
      "Array manipulation",
      "String processing",
      "DOM manipulation",
    ],
    difficulty: "Medium",
  },
  GRAB: {
    focus: "Full-stack development, system design, scalability",
    commonTopics: ["Graph algorithms", "Dynamic programming", "System design"],
    difficulty: "Medium-High",
  },
};

export default {
  PROBLEM_CATEGORIES,
  STUDY_PLAN,
  COMPLEXITY_GUIDE,
  COMMON_PATTERNS,
  INTERVIEW_TIPS,
  COMPANY_FOCUS,
};
