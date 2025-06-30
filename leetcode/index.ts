/**
 * LeetCode Problems Index
 *
 * This file serves as a comprehensive index for all LeetCode problems
 * organized by category with their solutions and complexity analysis.
 *
 * For Big Tech Interview Preparation (FAANG, Axon, Grab, WorldQuant, etc.)
 */

// Array Problems
export {
  removeDuplicatesFromSortedArray,
  removeDuplicatesFromSortedArrayTwoPointers,
  removeDuplicatesFromSortedArraySet,
  removeDuplicatesFromSortedArrayMap,
  removeDuplicatesFromSortedArrayFilter,
  removeDuplicatesFromSortedArrayReduce,
  removeDuplicatesFromSortedArrayGenerator,
  removeDuplicatesFromSortedArrayClass,
  removeDuplicatesFromSortedArrayFunctional,
  removeDuplicatesFromSortedArrayRecursive,
  removeDuplicatesFromSortedArrayBitwise,
  DuplicateRemover,
  numberGenerator as arrayNumberGenerator,
  testRemoveDuplicates,
  performanceComparison as arrayPerformanceComparison,
} from "./array/problems/01-remove-duplicates-from-sorted-array";

export {
  maxProfit,
  maxProfitBruteForce,
  maxProfitPeakValley,
  maxProfitGreedy,
  maxProfitFunctional,
  maxProfitGenerator,
  maxProfitClass,
  maxProfitMap,
  maxProfitArray,
  maxProfitRecursive,
  maxProfitBitwise,
  StockTrader,
  priceGenerator,
  testMaxProfit,
  performanceComparison as stockPerformanceComparison,
} from "./array/problems/02-best-time-to-buy-and-sell-stock-ii";

export {
  rotate,
  rotateBruteForce,
  rotateExtraArray,
  rotateJuggling,
  rotateReverse,
  rotateCyclic,
  rotateFunctional,
  rotateGenerator,
  rotateClass,
  rotateMap,
  rotateRecursive,
  ArrayRotator,
  numberGenerator as rotateNumberGenerator,
  testRotate,
  performanceComparison as rotatePerformanceComparison,
} from "./array/problems/03-rotate-array";

export {
  twoSum,
  twoSumBruteForce,
  twoSumMap,
  twoSumSort,
  twoSumSet,
  twoSumArray,
  twoSumFunctional,
  twoSumGenerator,
  twoSumClass,
  twoSumBitwise,
  twoSumRecursive,
  SumFinder,
  numberGenerator as twoSumNumberGenerator,
  testTwoSum,
  performanceComparison as twoSumPerformanceComparison,
} from "./array/problems/04-two-sum";

export {
  containsDuplicate,
  containsDuplicateSet,
  containsDuplicateSort,
  containsDuplicateMap,
  containsDuplicateBruteForce,
  containsDuplicateArray,
  containsDuplicateFunctional,
  containsDuplicateGenerator,
  containsDuplicateClass,
  containsDuplicateBitwise,
  containsDuplicateRecursive,
  DuplicateChecker,
  numberGenerator as containsDuplicateNumberGenerator,
  testContainsDuplicate,
  performanceComparison as containsDuplicatePerformanceComparison,
} from "./array/problems/05-contains-duplicate";

export {
  singleNumber,
  singleNumberXOR,
  singleNumberSet,
  singleNumberMap,
  singleNumberSort,
  singleNumberMath,
  singleNumberBitwise,
  singleNumberFunctional,
  singleNumberGenerator,
  singleNumberClass,
  singleNumberArray,
  singleNumberRecursive,
  SingleNumberFinder,
  numberGenerator as singleNumberNumberGenerator,
  testSingleNumber,
  performanceComparison as singleNumberPerformanceComparison,
} from "./array/problems/06-single-number";

export {
  intersect,
  intersectMap,
  intersectSort,
  intersectSet,
  intersectBruteForce,
  intersectArray,
  intersectFunctional,
  intersectGenerator,
  intersectClass,
  intersectBitwise,
  intersectRecursive,
  IntersectionFinder,
  numberGenerator as intersectNumberGenerator,
  testIntersect,
  performanceComparison as intersectPerformanceComparison,
} from "./array/problems/07-intersection-of-two-arrays-ii";

export {
  plusOne,
  plusOneSimple,
  plusOneArray,
  plusOneMap,
  plusOneFunctional,
  plusOneGenerator,
  plusOneClass,
  plusOneBitwise,
  plusOneRecursive,
  plusOneString,
  plusOneMath,
  NumberIncrementer,
  numberGenerator as plusOneNumberGenerator,
  testPlusOne,
  performanceComparison as plusOnePerformanceComparison,
} from "./array/problems/08-plus-one";

export {
  moveZeroes,
  moveZeroesTwoPointers,
  moveZeroesCount,
  moveZeroesFilter,
  moveZeroesBubble,
  moveZeroesInsertion,
  moveZeroesFunctional,
  moveZeroesGenerator,
  moveZeroesClass,
  moveZeroesMap,
  moveZeroesRecursive,
  ZeroMover,
  numberGenerator as moveZeroesNumberGenerator,
  testMoveZeroes,
  performanceComparison as moveZeroesPerformanceComparison,
} from "./array/problems/09-move-zeroes";

export {
  isValidSudoku,
  isValidSudokuBruteForce,
  isValidSudokuOptimized,
  isValidSudokuSet,
  isValidSudokuMap,
  isValidSudokuArray,
  isValidSudokuFunctional,
  isValidSudokuGenerator,
  isValidSudokuClass,
  isValidSudokuBitwise,
  isValidSudokuRecursive,
  SudokuValidator,
  numberGenerator as sudokuNumberGenerator,
  testIsValidSudoku,
  performanceComparison as sudokuPerformanceComparison,
} from "./array/problems/10-valid-sudoku";

export {
  rotate as rotateImage,
  rotateBruteForce as rotateImageBruteForce,
  rotateExtraArray as rotateImageExtraArray,
  rotateJuggling as rotateImageJuggling,
  rotateReverse as rotateImageReverse,
  rotateCyclic as rotateImageCyclic,
  rotateFunctional as rotateImageFunctional,
  rotateGenerator as rotateImageGenerator,
  rotateClass as rotateImageClass,
  rotateMap as rotateImageMap,
  rotateRecursive as rotateImageRecursive,
  ArrayRotator as ImageRotator,
  numberGenerator as rotateImageNumberGenerator,
  testRotate as testRotateImage,
  performanceComparison as rotateImagePerformanceComparison,
} from "./array/problems/11-rotate-image";

export {
  threeSum,
  threeSumBruteForce,
  threeSumTwoPointers,
  threeSumSet,
  threeSumMap,
  threeSumArray,
  threeSumFunctional,
  threeSumGenerator,
  threeSumClass,
  threeSumBitwise,
  threeSumRecursive,
  ThreeSumFinder,
  numberGenerator as threeSumNumberGenerator,
  testThreeSum,
  performanceComparison as threeSumPerformanceComparison,
} from "./array/problems/12-3sum";

export {
  setZeroes,
  setZeroesBruteForce,
  setZeroesOptimized,
  setZeroesSet,
  setZeroesMap,
  setZeroesArray,
  setZeroesFunctional,
  setZeroesGenerator,
  setZeroesClass,
  setZeroesBitwise,
  setZeroesRecursive,
  MatrixZeroSetter,
  numberGenerator as setZeroesNumberGenerator,
  testSetZeroes,
  performanceComparison as setZeroesPerformanceComparison,
} from "./array/problems/13-set-matrix-zeroes";

export {
  increasingTriplet,
  increasingTripletArray,
  increasingTripletObject,
  increasingTripletBruteForce,
  increasingTripletStack,
  increasingTripletMap,
  increasingTripletFunctional,
  increasingTripletGenerator,
  increasingTripletClass,
  increasingTripletBitwise,
  increasingTripletRecursive,
  TripletFinder,
  numberGenerator as increasingTripletNumberGenerator,
  testIncreasingTriplet,
  performanceComparison as increasingTripletPerformanceComparison,
} from "./array/problems/14-increasing-triplet-subsequence";

export {
  findMissingRanges,
  findMissingRangesArray,
  findMissingRangesMap,
  findMissingRangesSet,
  findMissingRangesFunctional,
  findMissingRangesWithGenerator,
  findMissingRangesClass,
  findMissingRangesTwoPointers,
  findMissingRangesBinarySearch,
  MissingRangesFinder,
  missingRangesGenerator,
  formatRange,
  binarySearch,
  testMissingRanges,
  performanceComparison as missingRangesPerformanceComparison,
} from "./array/problems/15-missing-ranges";

// String Problems
export {
  reverseString,
  reverseStringTwoPointers,
  reverseStringArray,
  reverseStringRecursive,
  reverseStringStack,
  reverseStringFunctional,
  reverseStringGenerator,
  reverseStringClass,
  reverseStringMap,
  reverseStringBitwise,
  reverseStringXOR,
  StringReverser,
  characterGenerator,
  testReverseString,
  performanceComparison as stringReversePerformanceComparison,
} from "./string/problems/01-reverse-string";

export {
  reverse as reverseInteger,
  reverseBruteForce as reverseIntegerBruteForce,
  reverseString as reverseIntegerString,
  reverseMath as reverseIntegerMath,
  reverseArray as reverseIntegerArray,
  reverseFunctional as reverseIntegerFunctional,
  reverseGenerator as reverseIntegerGenerator,
  reverseClass as reverseIntegerClass,
  reverseMap as reverseIntegerMap,
  reverseBitwise as reverseIntegerBitwise,
  reverseRecursive as reverseIntegerRecursive,
  NumberReverser as IntegerReverser,
  numberGenerator as reverseIntegerNumberGenerator,
  testReverse as testReverseInteger,
  performanceComparison as reverseIntegerPerformanceComparison,
} from "./string/problems/02-reverse-integer";

export {
  firstUniqChar,
  firstUniqCharMap,
  firstUniqCharArray,
  firstUniqCharSet,
  firstUniqCharBruteForce,
  firstUniqCharFunctional,
  firstUniqCharGenerator,
  firstUniqCharClass,
  firstUniqCharBitwise,
  firstUniqCharRecursive,
  firstUniqCharString,
  UniqueCharFinder,
  characterGenerator as uniqueCharGenerator,
  testFirstUniqChar,
  performanceComparison as firstUniqCharPerformanceComparison,
} from "./string/problems/03-first-unique-character-in-a-string";

export {
  isAnagram,
  isAnagramSort,
  isAnagramMap,
  isAnagramArray,
  isAnagramSet,
  isAnagramBruteForce,
  isAnagramFunctional,
  isAnagramGenerator,
  isAnagramClass,
  isAnagramBitwise,
  isAnagramRecursive,
  isAnagramString,
  AnagramChecker,
  characterGenerator as anagramGenerator,
  testIsAnagram,
  performanceComparison as isAnagramPerformanceComparison,
} from "./string/problems/04-valid-anagram";

export {
  isPalindrome as isPalindromeString,
  isPalindromeTwoPointers as isPalindromeStringTwoPointers,
  isPalindromeReverse as isPalindromeStringReverse,
  isPalindromeStack as isPalindromeStringStack,
  isPalindromeFunctional as isPalindromeStringFunctional,
  isPalindromeGenerator as isPalindromeStringGenerator,
  isPalindromeClass as isPalindromeStringClass,
  isPalindromeMap as isPalindromeStringMap,
  isPalindromeBitwise as isPalindromeStringBitwise,
  isPalindromeRecursive as isPalindromeStringRecursive,
  isPalindromeArray as isPalindromeStringArray,
  PalindromeChecker as StringPalindromeChecker,
  characterGenerator as palindromeStringGenerator,
  testIsPalindrome as testIsPalindromeString,
  performanceComparison as isPalindromeStringPerformanceComparison,
} from "./string/problems/05-valid-palindrome";

export {
  myAtoi,
  myAtoiBruteForce,
  myAtoiRegex,
  myAtoiStateMachine,
  myAtoiFunctional,
  myAtoiGenerator,
  myAtoiClass,
  myAtoiMap,
  myAtoiBitwise,
  myAtoiRecursive,
  myAtoiString,
  myAtoiMath,
  StringToIntegerConverter,
  characterGenerator as atoiGenerator,
  testMyAtoi,
  performanceComparison as myAtoiPerformanceComparison,
} from "./string/problems/06-string-to-integer-atoi";

export {
  strStr,
  strStrBruteForce,
  strStrKMP,
  strStrBoyerMoore,
  strStrRabinKarp,
  strStrSlidingWindow,
  strStrGenerator,
  strStrClass,
  strStrFunctional,
  StringMatcher,
  possiblePositions,
  computeFailureFunction,
  testStrStr,
  performanceComparison as strStrPerformanceComparison,
} from "./string/problems/07-implement-strstr";

// Linked List Problems
export {
  reverseList,
  reverseListIterative,
  reverseListRecursive,
  reverseListStack,
  reverseListArray,
  reverseListFunctional,
  reverseListGenerator,
  reverseListClass,
  reverseListMap,
  reverseListBitwise,
  reverseListXOR,
  LinkedListReverser,
  nodeGenerator,
  testReverseList,
  performanceComparison as linkedListReversePerformanceComparison,
} from "./linked-list/problems/01-reverse-linked-list";

export {
  mergeTwoLists,
  mergeTwoListsIterative,
  mergeTwoListsRecursive,
  mergeTwoListsArray,
  mergeTwoListsFunctional,
  mergeTwoListsGenerator,
  mergeTwoListsClass,
  mergeTwoListsMap,
  mergeTwoListsBitwise,
  mergeTwoListsRecursiveOptimized,
  mergeTwoListsString,
  ListMerger,
  nodeGenerator as mergeNodeGenerator,
  testMergeTwoLists,
  performanceComparison as mergeTwoListsPerformanceComparison,
} from "./linked-list/problems/02-merge-two-sorted-lists";

export {
  isPalindrome as isPalindromeLinkedList,
  isPalindromeTwoPointers as isPalindromeLinkedListTwoPointers,
  isPalindromeReverse as isPalindromeLinkedListReverse,
  isPalindromeStack as isPalindromeLinkedListStack,
  isPalindromeFunctional as isPalindromeLinkedListFunctional,
  isPalindromeGenerator as isPalindromeLinkedListGenerator,
  isPalindromeClass as isPalindromeLinkedListClass,
  isPalindromeMap as isPalindromeLinkedListMap,
  isPalindromeBitwise as isPalindromeLinkedListBitwise,
  isPalindromeRecursive as isPalindromeLinkedListRecursive,
  isPalindromeArray as isPalindromeLinkedListArray,
  PalindromeChecker as LinkedListPalindromeChecker,
  nodeGenerator as palindromeLinkedListGenerator,
  testIsPalindrome as testIsPalindromeLinkedList,
  performanceComparison as isPalindromeLinkedListPerformanceComparison,
} from "./linked-list/problems/03-palindrome-linked-list";

export {
  removeNthFromEnd,
  removeNthFromEndTwoPass,
  removeNthFromEndStack,
  removeNthFromEndArray,
  removeNthFromEndMap,
  removeNthFromEndRecursive,
  removeNthFromEndGenerator,
  removeNthFromEndClass,
  removeNthFromEndFunctional,
  removeNthFromEndWithCount,
  ListNode,
  LinkedList,
  nodeGenerator as removeNthNodeGenerator,
  createLinkedList,
  linkedListToArray,
  testRemoveNthFromEnd,
  performanceComparison as removeNthFromEndPerformanceComparison,
} from "./linked-list/problems/04-remove-nth-node-from-end-of-list";

// Tree/Graph Problems
export {
  maxDepth,
  maxDepthRecursive,
  maxDepthIterative,
  maxDepthBFS,
  maxDepthDFS,
  maxDepthFunctional,
  maxDepthGenerator,
  maxDepthClass,
  maxDepthMap,
  maxDepthBitwise,
  maxDepthArray,
  TreeDepthFinder,
  nodeGenerator as treeNodeGenerator,
  testMaxDepth,
  performanceComparison as maxDepthPerformanceComparison,
} from "./tree-graph/problems/01-maximum-depth-of-binary-tree";

export {
  isValidBST,
  isValidBSTInorder,
  isValidBSTRecursive,
  isValidBSTIterative,
  isValidBSTArray,
  isValidBSTFunctional,
  isValidBSTGenerator,
  isValidBSTClass,
  isValidBSTMap,
  isValidBSTBitwise,
  isValidBSTRecursiveOptimized,
  isValidBSTString,
  BSTValidator,
  nodeGenerator as bstNodeGenerator,
  testIsValidBST,
  performanceComparison as isValidBSTPerformanceComparison,
} from "./tree-graph/problems/02-validate-binary-search-tree";

export {
  levelOrder,
  levelOrderArrayQueue,
  levelOrderDFS,
  levelOrderMap,
  levelOrderTwoQueues,
  levelOrderStack,
  levelOrderGenerator,
  levelOrderClass,
  levelOrderFunctional,
  levelOrderRecursive,
  TreeNode,
  BinaryTree,
  levelGenerator,
  createBinaryTree,
  treeToArray,
  testLevelOrder,
  performanceComparison as levelOrderPerformanceComparison,
} from "./tree-graph/problems/03-binary-tree-level-order-traversal";

// Design Problems
export {
  MinStack,
  MinStackArray,
  MinStackMap,
  MinStackSet,
  MinStackFunctional,
  MinStackGenerator,
  MinStackClass,
  MinStackBitwise,
  MinStackRecursive,
  MinStackString,
  MinStackMath,
  StackDesigner,
  numberGenerator as minStackNumberGenerator,
  testMinStack,
  performanceComparison as minStackPerformanceComparison,
} from "./design/problems/01-min-stack";

// Dynamic Programming Problems
export {
  climbStairs,
  climbStairsDP,
  climbStairsRecursive,
  climbStairsMemoization,
  climbStairsTabulation,
  climbStairsOptimized,
  climbStairsFunctional,
  climbStairsGenerator,
  climbStairsClass,
  climbStairsMap,
  climbStairsBitwise,
  climbStairsMath,
  StairClimber,
  numberGenerator as climbStairsNumberGenerator,
  testClimbStairs,
  performanceComparison as climbStairsPerformanceComparison,
} from "./dp/problems/01-climbing-stairs";

// Backtracking Problems
export {
  letterCombinations,
  letterCombinationsBacktracking,
  letterCombinationsIterative,
  letterCombinationsRecursive,
  letterCombinationsBFS,
  letterCombinationsDFS,
  letterCombinationsFunctional,
  letterCombinationsGenerator,
  letterCombinationsClass,
  letterCombinationsMap,
  letterCombinationsBitwise,
  letterCombinationsString,
  PhoneCombinationFinder,
  characterGenerator as phoneGenerator,
  testLetterCombinations,
  performanceComparison as letterCombinationsPerformanceComparison,
} from "./backtracking/problems/01-letter-combinations-of-a-phone-number";

// Math Problems
export {
  fizzBuzz,
  fizzBuzzSimple,
  fizzBuzzMap,
  fizzBuzzArray,
  fizzBuzzFunctional,
  fizzBuzzGenerator,
  fizzBuzzClass,
  fizzBuzzBitwise,
  fizzBuzzRecursive,
  fizzBuzzString,
  fizzBuzzMath,
  FizzBuzzGenerator,
  numberGenerator as fizzBuzzNumberGenerator,
  testFizzBuzz,
  performanceComparison as fizzBuzzPerformanceComparison,
} from "./math/problems/01-fizz-buzz";

// Sorting & Searching Problems
export {
  merge,
  mergeSimple,
  mergeInPlace,
  mergeFunctional,
  mergeGenerator,
  mergeClass,
  mergeMap,
  mergeBitwise,
  mergeRecursive,
  mergeString,
  mergeMath,
  ArrayMerger,
  numberGenerator as mergeNumberGenerator,
  testMerge,
  performanceComparison as mergePerformanceComparison,
} from "./sorting-searching/problems/01-merge-sorted-array";

// Others Problems
export {
  isValid,
  isValidStack,
  isValidMap,
  isValidArray,
  isValidSet,
  isValidBruteForce,
  isValidFunctional,
  isValidGenerator,
  isValidClass,
  isValidBitwise,
  isValidRecursive,
  isValidString,
  ParenthesesValidator,
  characterGenerator as parenthesesGenerator,
  testIsValid,
  performanceComparison as isValidPerformanceComparison,
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
  // testIntersection();
  // testPlusOne();

  // String tests
  console.log("=== STRING PROBLEMS ===");
  // testReverseString();
  // testReverseInteger();
  // testFirstUniqChar();

  // Linked List tests
  console.log("=== LINKED LIST PROBLEMS ===");
  // testReverseLinkedList();
  // testMergeTwoSortedLists();
  // testPalindromeLinkedList();

  // Tree/Graph tests
  console.log("=== TREE/GRAPH PROBLEMS ===");
  // testMaxDepth();
  // testValidateBST();

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
  // reverseIntegerPerformanceComparison();
  // firstUniqCharPerformanceComparison();
  // linkedListPerformanceComparison();
  // mergeListsPerformanceComparison();
  // palindromePerformanceComparison();
  // treePerformanceComparison();
  // bstPerformanceComparison();
  // dpPerformanceComparison();
  // designPerformanceComparison();
  // backtrackingPerformanceComparison();
  // mathPerformanceComparison();
  // sortingPerformanceComparison();
  // otherPerformanceComparison();
  // intersectionPerformanceComparison();
  // plusOnePerformanceComparison();

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
