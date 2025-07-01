// Array Problems
export * from "./array/problems/01-remove-duplicates-from-sorted-array";
export * from "./array/problems/02-best-time-to-buy-and-sell-stock-ii";
export * from "./array/problems/03-rotate-array";
export * from "./array/problems/04-two-sum";
export * from "./array/problems/05-contains-duplicate";
export * from "./array/problems/06-single-number";
export * from "./array/problems/07-intersection-of-two-arrays-ii";
export * from "./array/problems/08-plus-one";
export * from "./array/problems/09-move-zeroes";
export * from "./array/problems/10-valid-sudoku";
export * from "./array/problems/11-rotate-image";
export * from "./array/problems/12-3sum";
export * from "./array/problems/13-set-matrix-zeroes";
export * from "./array/problems/14-increasing-triplet-subsequence";
export * from "./array/problems/15-missing-ranges";
export * from "./array/problems/16-count-and-say";

// String Problems
export * from "./string/problems/01-reverse-string";
export * from "./string/problems/02-reverse-integer";
export * from "./string/problems/03-first-unique-character-in-a-string";
export * from "./string/problems/04-valid-anagram";
export * from "./string/problems/05-valid-palindrome";
export * from "./string/problems/06-string-to-integer-atoi";
export * from "./string/problems/07-implement-strstr";
export * from "./string/problems/08-longest-common-prefix";
export * from "./string/problems/09-group-anagrams";
export * from "./string/problems/10-longest-substring-without-repeating-characters";
export * from "./string/problems/11-longest-palindromic-substring";

// Linked List Problems
export * from "./linked-list/problems/01-reverse-linked-list";
export * from "./linked-list/problems/02-merge-two-sorted-lists";
export * from "./linked-list/problems/03-palindrome-linked-list";
export * from "./linked-list/problems/04-remove-nth-node-from-end-of-list";
export * from "./linked-list/problems/05-delete-node-in-a-linked-list";
export * from "./linked-list/problems/06-linked-list-cycle";
export * from "./linked-list/problems/07-add-two-numbers";
export * from "./linked-list/problems/08-odd-even-linked-list";
export * from "./linked-list/problems/09-intersection-of-two-linked-lists";

// Tree/Graph Problems
export * from "./tree-graph/problems/01-maximum-depth-of-binary-tree";
export * from "./tree-graph/problems/02-validate-binary-search-tree";
export * from "./tree-graph/problems/03-binary-tree-level-order-traversal";

// Design Problems
export * from "./design/problems/01-min-stack";

// Dynamic Programming Problems
export * from "./dp/problems/01-climbing-stairs";

// Backtracking Problems
export * from "./backtracking/problems/01-letter-combinations-of-a-phone-number";
export * from "./backtracking/problems/02-subsets";
export * from "./backtracking/problems/03-permutations";
export * from "./backtracking/problems/04-generate-parentheses";
export * from "./backtracking/problems/05-combination-sum";
export * from "./backtracking/problems/06-word-search";
export * from "./backtracking/problems/07-n-queens";
export * from "./backtracking/problems/08-sudoku-solver";

// Math Problems
export * from "./math/problems/01-fizz-buzz";

// Sorting & Searching Problems
export * from "./sorting-searching/problems/01-merge-sorted-array";

// Others Problems
export * from "./others/problems/01-valid-parentheses";

// Main export function to run all tests
export function runAllTests() {
  console.log("Running all LeetCode problem tests...\n");

  // Array Tests
  console.log("=== ARRAY PROBLEMS ===");
  // testRemoveDuplicates();
  // testMaxProfit();
  // testRotate();
  // testTwoSum();
  // testContainsDuplicate();
  // testSingleNumber();
  // testIntersect();
  // testPlusOne();
  // testMoveZeroes();
  // testIsValidSudoku();
  // testRotateImage();
  // testThreeSum();
  // testSetZeroes();
  // testIncreasingTriplet();
  // testMissingRanges();
  // testCountAndSay();

  // String Tests
  console.log("\n=== STRING PROBLEMS ===");
  // testReverseString();
  // testReverseInteger();
  // testFirstUniqChar();
  // testIsAnagram();
  // testIsPalindromeString();
  // testMyAtoi();
  // testStrStr();
  // testLongestCommonPrefix();
  // testGroupAnagrams();
  // testLengthOfLongestSubstring();
  // testLongestPalindrome();

  // Linked List Tests
  console.log("\n=== LINKED LIST PROBLEMS ===");
  // testReverseList();
  // testMergeTwoLists();
  // testIsPalindromeLinkedList();
  // testRemoveNthFromEnd();
  // testDeleteNode();
  // testHasCycle();
  // testAddTwoNumbers();
  // testOddEvenList();
  // testGetIntersectionNode();

  // Tree/Graph Tests
  console.log("\n=== TREE/GRAPH PROBLEMS ===");
  // testMaxDepth();
  // testIsValidBST();
  // testLevelOrder();

  // Design Tests
  console.log("\n=== DESIGN PROBLEMS ===");
  // testMinStack();

  // DP Tests
  console.log("\n=== DYNAMIC PROGRAMMING PROBLEMS ===");
  // testClimbStairs();

  // Backtracking Tests
  console.log("\n=== BACKTRACKING PROBLEMS ===");
  // testLetterCombinations();
  // testSubsets();
  // testPermute();
  // testGenerateParenthesis();
  // testCombinationSum();
  // testExist();
  // testSolveNQueens();
  // testSolveSudoku();

  // Math Tests
  console.log("\n=== MATH PROBLEMS ===");
  // testFizzBuzz();

  // Sorting & Searching Tests
  console.log("\n=== SORTING & SEARCHING PROBLEMS ===");
  // testMerge();

  // Others Tests
  console.log("\n=== OTHERS PROBLEMS ===");
  // testIsValid();

  console.log("\nAll tests completed!");
}

// Export all problem categories for easy access
export const problemCategories = {
  array: {
    name: "Array Problems",
    problems: [
      "Remove Duplicates from Sorted Array",
      "Best Time to Buy and Sell Stock II",
      "Rotate Array",
      "Two Sum",
      "Contains Duplicate",
      "Single Number",
      "Intersection of Two Arrays II",
      "Plus One",
      "Move Zeroes",
      "Valid Sudoku",
      "Rotate Image",
      "3Sum",
      "Set Matrix Zeroes",
      "Increasing Triplet Subsequence",
      "Missing Ranges",
      "Count and Say",
    ],
  },
  string: {
    name: "String Problems",
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
    ],
  },
  linkedList: {
    name: "Linked List Problems",
    problems: [
      "Reverse Linked List",
      "Merge Two Sorted Lists",
      "Palindrome Linked List",
      "Remove Nth Node From End of List",
      "Delete Node in a Linked List",
      "Linked List Cycle",
      "Add Two Numbers",
      "Odd Even Linked List",
      "Intersection of Two Linked Lists",
    ],
  },
  treeGraph: {
    name: "Tree/Graph Problems",
    problems: [
      "Maximum Depth of Binary Tree",
      "Validate Binary Search Tree",
      "Binary Tree Level Order Traversal",
    ],
  },
  design: {
    name: "Design Problems",
    problems: ["Min Stack"],
  },
  dp: {
    name: "Dynamic Programming Problems",
    problems: ["Climbing Stairs"],
  },
  backtracking: {
    name: "Backtracking Problems",
    problems: [
      "Letter Combinations of a Phone Number",
      "Subsets",
      "Permutations",
      "Generate Parentheses",
      "Combination Sum",
      "Word Search",
      "N-Queens",
      "Sudoku Solver",
    ],
  },
  math: {
    name: "Math Problems",
    problems: ["Fizz Buzz"],
  },
  sortingSearching: {
    name: "Sorting & Searching Problems",
    problems: ["Merge Sorted Array"],
  },
  others: {
    name: "Others Problems",
    problems: ["Valid Parentheses"],
  },
};
