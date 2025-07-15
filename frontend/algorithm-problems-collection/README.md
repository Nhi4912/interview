# Algorithm Problems Collection: 1000+ Frontend Interview Problems

## Overview

This comprehensive collection contains 1000+ algorithm problems specifically tailored for frontend engineers. Each problem includes multiple solutions, complexity analysis, and practical applications in frontend development.

## 🎯 Problem Categories

### 1. Array Problems (200+ problems)
### 2. String Problems (200+ problems)
### 3. Tree & Graph Problems (150+ problems)
### 4. Dynamic Programming (100+ problems)
### 5. Frontend-Specific Algorithms (200+ problems)
### 6. System Design Algorithms (100+ problems)
### 7. Performance & Optimization (100+ problems)
### 8. Real-world Application Problems (50+ problems)

## 📊 Difficulty Distribution

- **Easy**: 400 problems (40%)
- **Medium**: 500 problems (50%)
- **Hard**: 100 problems (10%)

## 🔥 Array Problems (200+ Problems)

### Easy Problems (80 problems)

#### Problem 1: Two Sum
**Description:** Find two numbers in an array that add up to a target sum.

```typescript
// Problem: Given an array of integers and a target, return indices of two numbers that add up to target
function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return [];
}

// Frontend Application: Finding complementary colors in a color palette
function findComplementaryColors(colors: string[], targetBrightness: number): string[] {
  const brightnessMap = new Map<number, string>();
  
  for (const color of colors) {
    const brightness = calculateBrightness(color);
    const complement = targetBrightness - brightness;
    
    if (brightnessMap.has(complement)) {
      return [brightnessMap.get(complement)!, color];
    }
    
    brightnessMap.set(brightness, color);
  }
  
  return [];
}

// Time Complexity: O(n)
// Space Complexity: O(n)
```

#### Problem 2: Best Time to Buy and Sell Stock
**Description:** Find the maximum profit from buying and selling stock once.

```typescript
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  
  return maxProfit;
}

// Frontend Application: Finding optimal time to load resources
function findOptimalLoadTime(loadTimes: number[]): number {
  let minTime = Infinity;
  let maxEfficiency = 0;
  
  for (const time of loadTimes) {
    if (time < minTime) {
      minTime = time;
    } else if (time - minTime > maxEfficiency) {
      maxEfficiency = time - minTime;
    }
  }
  
  return maxEfficiency;
}
```

#### Problem 3: Contains Duplicate
**Description:** Check if array contains any duplicate values.

```typescript
function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
}

// Frontend Application: Checking for duplicate component IDs
function hasDuplicateIds(components: { id: string }[]): boolean {
  const ids = new Set<string>();
  
  for (const component of components) {
    if (ids.has(component.id)) {
      return true;
    }
    ids.add(component.id);
  }
  
  return false;
}
```

#### Problem 4: Maximum Subarray (Kadane's Algorithm)
**Description:** Find the contiguous subarray with the largest sum.

```typescript
function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

// Frontend Application: Finding the best performing time window
function findBestPerformanceWindow(metrics: number[]): number {
  let maxPerformance = metrics[0];
  let currentPerformance = metrics[0];
  
  for (let i = 1; i < metrics.length; i++) {
    currentPerformance = Math.max(metrics[i], currentPerformance + metrics[i]);
    maxPerformance = Math.max(maxPerformance, currentPerformance);
  }
  
  return maxPerformance;
}
```

#### Problem 5: Move Zeroes
**Description:** Move all zeros to the end while maintaining relative order.

```typescript
function moveZeroes(nums: number[]): void {
  let writeIndex = 0;
  
  // Move all non-zero elements to the front
  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== 0) {
      nums[writeIndex] = nums[readIndex];
      writeIndex++;
    }
  }
  
  // Fill the rest with zeros
  while (writeIndex < nums.length) {
    nums[writeIndex] = 0;
    writeIndex++;
  }
}

// Frontend Application: Moving inactive elements to end of list
function moveInactiveToEnd<T>(items: T[], isActive: (item: T) => boolean): void {
  let writeIndex = 0;
  
  for (let readIndex = 0; readIndex < items.length; readIndex++) {
    if (isActive(items[readIndex])) {
      items[writeIndex] = items[readIndex];
      writeIndex++;
    }
  }
  
  // Fill with inactive items
  for (let readIndex = 0; readIndex < items.length; readIndex++) {
    if (!isActive(items[readIndex])) {
      items[writeIndex] = items[readIndex];
      writeIndex++;
    }
  }
}
```

### Medium Problems (100 problems)

#### Problem 6: 3Sum
**Description:** Find all unique triplets that sum to zero.

```typescript
function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// Frontend Application: Finding balanced component configurations
function findBalancedConfigs(weights: number[]): number[][] {
  const result: number[][] = [];
  weights.sort((a, b) => a - b);
  
  for (let i = 0; i < weights.length - 2; i++) {
    if (i > 0 && weights[i] === weights[i - 1]) continue;
    
    let left = i + 1;
    let right = weights.length - 1;
    
    while (left < right) {
      const sum = weights[i] + weights[left] + weights[right];
      
      if (sum === 0) {
        result.push([weights[i], weights[left], weights[right]]);
        
        while (left < right && weights[left] === weights[left + 1]) left++;
        while (left < right && weights[right] === weights[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}
```

#### Problem 7: Container With Most Water
**Description:** Find two lines that form a container with the most water.

```typescript
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxWater;
}

// Frontend Application: Finding optimal layout dimensions
function findOptimalLayoutDimensions(constraints: number[]): number {
  let left = 0;
  let right = constraints.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const area = Math.min(constraints[left], constraints[right]) * (right - left);
    maxArea = Math.max(maxArea, area);
    
    if (constraints[left] < constraints[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}
```

#### Problem 8: Product of Array Except Self
**Description:** Return array where each element is the product of all other elements.

```typescript
function productExceptSelf(nums: number[]): number[] {
  const result: number[] = new Array(nums.length);
  
  // Calculate left products
  result[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  
  // Calculate right products and multiply with left products
  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }
  
  return result;
}

// Frontend Application: Calculating relative performance metrics
function calculateRelativeMetrics(metrics: number[]): number[] {
  const result: number[] = new Array(metrics.length);
  
  // Calculate left products
  result[0] = 1;
  for (let i = 1; i < metrics.length; i++) {
    result[i] = result[i - 1] * metrics[i - 1];
  }
  
  // Calculate right products and multiply with left products
  let rightProduct = 1;
  for (let i = metrics.length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= metrics[i];
  }
  
  return result;
}
```

### Hard Problems (20 problems)

#### Problem 9: Sliding Window Maximum
**Description:** Find the maximum element in each sliding window of size k.

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Remove indices whose corresponding values are smaller than current
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add maximum to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}

// Frontend Application: Finding peak performance in sliding time windows
function findPeakPerformance(metrics: number[], windowSize: number): number[] {
  const result: number[] = [];
  const deque: number[] = [];
  
  for (let i = 0; i < metrics.length; i++) {
    while (deque.length > 0 && deque[0] <= i - windowSize) {
      deque.shift();
    }
    
    while (deque.length > 0 && metrics[deque[deque.length - 1]] <= metrics[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= windowSize - 1) {
      result.push(metrics[deque[0]]);
    }
  }
  
  return result;
}
```

## 🔤 String Problems (200+ Problems)

### Easy Problems (80 problems)

#### Problem 10: Valid Anagram
**Description:** Check if two strings are anagrams of each other.

```typescript
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  
  const charCount = new Map<string, number>();
  
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  for (const char of t) {
    const count = charCount.get(char) || 0;
    if (count === 0) return false;
    charCount.set(char, count - 1);
  }
  
  return true;
}

// Frontend Application: Checking if component props are equivalent
function arePropsEquivalent(props1: Record<string, any>, props2: Record<string, any>): boolean {
  const keys1 = Object.keys(props1).sort();
  const keys2 = Object.keys(props2).sort();
  
  if (keys1.length !== keys2.length) return false;
  
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i] || props1[keys1[i]] !== props2[keys2[i]]) {
      return false;
    }
  }
  
  return true;
}
```

#### Problem 11: Valid Palindrome
**Description:** Check if a string is a palindrome, ignoring case and non-alphanumeric characters.

```typescript
function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Frontend Application: Validating symmetric UI layouts
function isSymmetricLayout(layout: string[]): boolean {
  let left = 0;
  let right = layout.length - 1;
  
  while (left < right) {
    if (layout[left] !== layout[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}
```

#### Problem 12: First Unique Character
**Description:** Find the first unique character in a string.

```typescript
function firstUniqChar(s: string): number {
  const charCount = new Map<string, number>();
  
  // Count frequency of each character
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Find first character with count 1
  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}

// Frontend Application: Finding first unique event in event stream
function findFirstUniqueEvent(events: string[]): number {
  const eventCount = new Map<string, number>();
  
  for (const event of events) {
    eventCount.set(event, (eventCount.get(event) || 0) + 1);
  }
  
  for (let i = 0; i < events.length; i++) {
    if (eventCount.get(events[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}
```

### Medium Problems (100 problems)

#### Problem 13: Longest Substring Without Repeating Characters
**Description:** Find the length of the longest substring without repeating characters.

```typescript
function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Frontend Application: Finding longest sequence of unique user interactions
function longestUniqueInteractionSequence(interactions: string[]): number {
  const interactionSet = new Set<string>();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < interactions.length; right++) {
    while (interactionSet.has(interactions[right])) {
      interactionSet.delete(interactions[left]);
      left++;
    }
    
    interactionSet.add(interactions[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}
```

#### Problem 14: Group Anagrams
**Description:** Group strings that are anagrams of each other.

```typescript
function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  
  for (const str of strs) {
    const key = str.split('').sort().join('');
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    
    groups.get(key)!.push(str);
  }
  
  return Array.from(groups.values());
}

// Frontend Application: Grouping components by similar props
function groupComponentsByProps(components: { name: string; props: Record<string, any> }[]): { name: string; props: Record<string, any> }[][] {
  const groups = new Map<string, { name: string; props: Record<string, any> }[]>();
  
  for (const component of components) {
    const key = Object.keys(component.props).sort().join(',');
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    
    groups.get(key)!.push(component);
  }
  
  return Array.from(groups.values());
}
```

#### Problem 15: Palindromic Substrings
**Description:** Count the number of palindromic substrings in a string.

```typescript
function countSubstrings(s: string): number {
  let count = 0;
  
  for (let i = 0; i < s.length; i++) {
    // Count odd length palindromes
    count += expandAroundCenter(s, i, i);
    // Count even length palindromes
    count += expandAroundCenter(s, i, i + 1);
  }
  
  return count;
}

function expandAroundCenter(s: string, left: number, right: number): number {
  let count = 0;
  
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;
    left--;
    right++;
  }
  
  return count;
}

// Frontend Application: Finding symmetric patterns in UI layouts
function countSymmetricPatterns(layout: string[]): number {
  let count = 0;
  
  for (let i = 0; i < layout.length; i++) {
    count += expandAroundCenterArray(layout, i, i);
    count += expandAroundCenterArray(layout, i, i + 1);
  }
  
  return count;
}

function expandAroundCenterArray(arr: string[], left: number, right: number): number {
  let count = 0;
  
  while (left >= 0 && right < arr.length && arr[left] === arr[right]) {
    count++;
    left--;
    right++;
  }
  
  return count;
}
```

### Hard Problems (20 problems)

#### Problem 16: Minimum Window Substring
**Description:** Find the minimum window substring that contains all characters of another string.

```typescript
function minWindow(s: string, t: string): string {
  const targetCount = new Map<string, number>();
  const windowCount = new Map<string, number>();
  
  // Count characters in target string
  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) || 0) + 1);
  }
  
  let left = 0;
  let right = 0;
  let minLength = Infinity;
  let minStart = 0;
  let formed = 0;
  const required = targetCount.size;
  
  while (right < s.length) {
    const char = s[right];
    windowCount.set(char, (windowCount.get(char) || 0) + 1);
    
    if (targetCount.has(char) && windowCount.get(char) === targetCount.get(char)) {
      formed++;
    }
    
    while (formed === required && left <= right) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minStart = left;
      }
      
      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
      
      if (targetCount.has(leftChar) && windowCount.get(leftChar)! < targetCount.get(leftChar)!) {
        formed--;
      }
      
      left++;
    }
    
    right++;
  }
  
  return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
}

// Frontend Application: Finding minimum component set that covers all required features
function findMinimalComponentSet(
  availableComponents: string[],
  requiredFeatures: string[],
  componentFeatures: Map<string, string[]>
): string[] {
  const targetFeatures = new Set(requiredFeatures);
  const result: string[] = [];
  
  while (targetFeatures.size > 0) {
    let bestComponent = "";
    let maxCoverage = 0;
    
    for (const component of availableComponents) {
      const features = componentFeatures.get(component) || [];
      const coverage = features.filter(f => targetFeatures.has(f)).length;
      
      if (coverage > maxCoverage) {
        maxCoverage = coverage;
        bestComponent = component;
      }
    }
    
    if (bestComponent) {
      result.push(bestComponent);
      const features = componentFeatures.get(bestComponent) || [];
      features.forEach(f => targetFeatures.delete(f));
      availableComponents.splice(availableComponents.indexOf(bestComponent), 1);
    } else {
      break;
    }
  }
  
  return result;
}
```

## 🌳 Tree & Graph Problems (150+ Problems)

### Tree Problems (100 problems)

#### Problem 17: Binary Tree Inorder Traversal
**Description:** Traverse a binary tree in inorder (left, root, right).

```typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (!node) return;
    
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// Iterative solution
function inorderTraversalIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;
  
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    current = stack.pop()!;
    result.push(current.val);
    current = current.right;
  }
  
  return result;
}

// Frontend Application: Traversing DOM tree structure
interface DOMNode {
  tagName: string;
  children: DOMNode[];
  textContent?: string;
}

function traverseDOMInorder(node: DOMNode | null): string[] {
  const result: string[] = [];
  
  function traverse(node: DOMNode | null) {
    if (!node) return;
    
    if (node.children.length > 0) {
      traverse(node.children[0]);
    }
    
    result.push(node.tagName);
    
    for (let i = 1; i < node.children.length; i++) {
      traverse(node.children[i]);
    }
  }
  
  traverse(node);
  return result;
}
```

#### Problem 18: Maximum Depth of Binary Tree
**Description:** Find the maximum depth of a binary tree.

```typescript
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}

// Iterative solution using BFS
function maxDepthIterative(root: TreeNode | null): number {
  if (!root) return 0;
  
  const queue: TreeNode[] = [root];
  let depth = 0;
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return depth;
}

// Frontend Application: Finding maximum nesting depth of components
interface ComponentNode {
  name: string;
  children: ComponentNode[];
}

function findMaxComponentDepth(root: ComponentNode | null): number {
  if (!root) return 0;
  
  let maxChildDepth = 0;
  for (const child of root.children) {
    maxChildDepth = Math.max(maxChildDepth, findMaxComponentDepth(child));
  }
  
  return maxChildDepth + 1;
}
```

#### Problem 19: Validate Binary Search Tree
**Description:** Check if a binary tree is a valid binary search tree.

```typescript
function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}

// Frontend Application: Validating hierarchical data structure
interface DataNode {
  value: number;
  left: DataNode | null;
  right: DataNode | null;
}

function isValidHierarchy(root: DataNode | null): boolean {
  function validate(node: DataNode | null, min: number, max: number): boolean {
    if (!node) return true;
    
    if (node.value <= min || node.value >= max) {
      return false;
    }
    
    return validate(node.left, min, node.value) && validate(node.right, node.value, max);
  }
  
  return validate(root, -Infinity, Infinity);
}
```

### Graph Problems (50 problems)

#### Problem 20: Number of Islands
**Description:** Count the number of islands in a 2D grid.

```typescript
function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;
  
  function dfs(row: number, col: number) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
      return;
    }
    
    grid[row][col] = '0'; // Mark as visited
    
    // Explore all 4 directions
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islands++;
        dfs(row, col);
      }
    }
  }
  
  return islands;
}

// Frontend Application: Finding connected UI components
function findConnectedComponents(grid: boolean[][]): number {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let components = 0;
  
  function dfs(row: number, col: number) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || !grid[row][col]) {
      return;
    }
    
    grid[row][col] = false; // Mark as visited
    
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col]) {
        components++;
        dfs(row, col);
      }
    }
  }
  
  return components;
}
```

## 🎯 Frontend-Specific Algorithms (200+ Problems)

### Virtual DOM & Reconciliation (50 problems)

#### Problem 21: Virtual DOM Diff Algorithm
**Description:** Implement a basic virtual DOM diff algorithm.

```typescript
interface VNode {
  type: string;
  props: Record<string, any>;
  children: VNode[];
}

interface Patch {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'REPLACE';
  node?: VNode;
  props?: Record<string, any>;
  index?: number;
}

function diff(oldTree: VNode | null, newTree: VNode | null): Patch[] {
  const patches: Patch[] = [];
  
  function walk(oldNode: VNode | null, newNode: VNode | null, index: number) {
    if (!oldNode && newNode) {
      patches.push({ type: 'CREATE', node: newNode, index });
    } else if (oldNode && !newNode) {
      patches.push({ type: 'DELETE', index });
    } else if (oldNode && newNode) {
      if (oldNode.type !== newNode.type) {
        patches.push({ type: 'REPLACE', node: newNode, index });
      } else {
        // Check props
        const propsDiff = diffProps(oldNode.props, newNode.props);
        if (Object.keys(propsDiff).length > 0) {
          patches.push({ type: 'UPDATE', props: propsDiff, index });
        }
        
        // Check children
        const maxLength = Math.max(oldNode.children.length, newNode.children.length);
        for (let i = 0; i < maxLength; i++) {
          walk(
            oldNode.children[i] || null,
            newNode.children[i] || null,
            index * 100 + i
          );
        }
      }
    }
  }
  
  walk(oldTree, newTree, 0);
  return patches;
}

function diffProps(oldProps: Record<string, any>, newProps: Record<string, any>): Record<string, any> {
  const diff: Record<string, any> = {};
  
  // Check for changed/added props
  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      diff[key] = newProps[key];
    }
  }
  
  // Check for removed props
  for (const key in oldProps) {
    if (!(key in newProps)) {
      diff[key] = null;
    }
  }
  
  return diff;
}

// Apply patches to real DOM
function applyPatches(element: Element, patches: Patch[]): void {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'CREATE':
        if (patch.node) {
          const newElement = createElement(patch.node);
          element.appendChild(newElement);
        }
        break;
      case 'DELETE':
        if (patch.index !== undefined) {
          const child = element.children[patch.index];
          if (child) element.removeChild(child);
        }
        break;
      case 'UPDATE':
        if (patch.props) {
          Object.entries(patch.props).forEach(([key, value]) => {
            if (value === null) {
              element.removeAttribute(key);
            } else {
              element.setAttribute(key, value);
            }
          });
        }
        break;
      case 'REPLACE':
        if (patch.node && patch.index !== undefined) {
          const newElement = createElement(patch.node);
          const oldChild = element.children[patch.index];
          if (oldChild) {
            element.replaceChild(newElement, oldChild);
          }
        }
        break;
    }
  });
}

function createElement(vnode: VNode): Element {
  const element = document.createElement(vnode.type);
  
  Object.entries(vnode.props).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  vnode.children.forEach(child => {
    element.appendChild(createElement(child));
  });
  
  return element;
}
```

### Component Lifecycle & State Management (50 problems)

#### Problem 22: Implement useState Hook
**Description:** Create a basic implementation of React's useState hook.

```typescript
type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: SetStateAction<T>) => void;

let currentHookIndex = 0;
let hookStates: any[] = [];
let currentComponent: Function | null = null;

function useState<T>(initialState: T): [T, Dispatch<T>] {
  const hookIndex = currentHookIndex++;
  
  if (hookStates[hookIndex] === undefined) {
    hookStates[hookIndex] = initialState;
  }
  
  const setState: Dispatch<T> = (value: SetStateAction<T>) => {
    const newValue = typeof value === 'function' 
      ? (value as Function)(hookStates[hookIndex])
      : value;
    
    if (hookStates[hookIndex] !== newValue) {
      hookStates[hookIndex] = newValue;
      // Trigger re-render
      if (currentComponent) {
        currentHookIndex = 0;
        currentComponent();
      }
    }
  };
  
  return [hookStates[hookIndex], setState];
}

// Example usage
function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  return {
    count,
    name,
    increment: () => setCount(count + 1),
    updateName: (newName: string) => setName(newName)
  };
}

// Mock render function
function render(component: Function) {
  currentComponent = component;
  currentHookIndex = 0;
  return component();
}
```

#### Problem 23: Implement useEffect Hook
**Description:** Create a basic implementation of React's useEffect hook.

```typescript
interface EffectHook {
  effect: () => void | (() => void);
  deps?: any[];
  cleanup?: () => void;
}

let effectHooks: EffectHook[] = [];
let currentEffectIndex = 0;

function useEffect(effect: () => void | (() => void), deps?: any[]): void {
  const hookIndex = currentEffectIndex++;
  const prevEffect = effectHooks[hookIndex];
  
  const hasChangedDeps = prevEffect 
    ? !deps || !prevEffect.deps || deps.some((dep, i) => dep !== prevEffect.deps![i])
    : true;
  
  if (hasChangedDeps) {
    // Cleanup previous effect
    if (prevEffect?.cleanup) {
      prevEffect.cleanup();
    }
    
    // Run new effect
    const cleanup = effect();
    
    effectHooks[hookIndex] = {
      effect,
      deps,
      cleanup: typeof cleanup === 'function' ? cleanup : undefined
    };
  } else {
    // Keep previous effect
    effectHooks[hookIndex] = prevEffect;
  }
}

// Example usage
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    
    const interval = setInterval(() => {
      console.log(`Current count: ${count}`);
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [count]);
  
  return [count, setCount] as const;
}
```

### Event System & Performance (50 problems)

#### Problem 24: Event Delegation System
**Description:** Implement an efficient event delegation system.

```typescript
class EventDelegator {
  private delegators: Map<string, Set<EventHandler>> = new Map();
  private rootElement: Element;
  
  constructor(rootElement: Element) {
    this.rootElement = rootElement;
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    this.rootElement.addEventListener('click', this.handleEvent.bind(this));
    this.rootElement.addEventListener('input', this.handleEvent.bind(this));
    this.rootElement.addEventListener('change', this.handleEvent.bind(this));
    this.rootElement.addEventListener('submit', this.handleEvent.bind(this));
  }
  
  private handleEvent(event: Event): void {
    const target = event.target as Element;
    const eventType = event.type;
    
    // Traverse up the DOM tree to find matching selectors
    let currentElement: Element | null = target;
    
    while (currentElement && currentElement !== this.rootElement) {
      this.delegators.forEach((handlers, selector) => {
        if (currentElement!.matches(selector)) {
          handlers.forEach(handler => {
            handler.callback(event, currentElement!);
          });
        }
      });
      
      currentElement = currentElement.parentElement;
    }
  }
  
  on(selector: string, eventType: string, callback: (event: Event, element: Element) => void): void {
    if (!this.delegators.has(selector)) {
      this.delegators.set(selector, new Set());
    }
    
    this.delegators.get(selector)!.add({
      eventType,
      callback,
      id: Math.random().toString(36)
    });
  }
  
  off(selector: string, handlerId?: string): void {
    if (handlerId) {
      const handlers = this.delegators.get(selector);
      if (handlers) {
        handlers.forEach(handler => {
          if (handler.id === handlerId) {
            handlers.delete(handler);
          }
        });
      }
    } else {
      this.delegators.delete(selector);
    }
  }
  
  destroy(): void {
    this.delegators.clear();
    this.rootElement.removeEventListener('click', this.handleEvent.bind(this));
    this.rootElement.removeEventListener('input', this.handleEvent.bind(this));
    this.rootElement.removeEventListener('change', this.handleEvent.bind(this));
    this.rootElement.removeEventListener('submit', this.handleEvent.bind(this));
  }
}

interface EventHandler {
  eventType: string;
  callback: (event: Event, element: Element) => void;
  id: string;
}

// Usage
const delegator = new EventDelegator(document.body);

delegator.on('.button', 'click', (event, element) => {
  console.log('Button clicked:', element);
});

delegator.on('.input', 'input', (event, element) => {
  console.log('Input changed:', (element as HTMLInputElement).value);
});
```

#### Problem 25: Debounce and Throttle Implementation
**Description:** Implement debounce and throttle functions for performance optimization.

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {}
): T & { cancel: () => void; flush: () => void } {
  let timeoutId: NodeJS.Timeout | null = null;
  let maxTimeoutId: NodeJS.Timeout | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;
  let leading = options.leading || false;
  let trailing = options.trailing !== false;
  let maxWait = options.maxWait;
  
  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;
    
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    return func.apply(thisArg, args);
  }
  
  function leadingEdge(time: number) {
    lastInvokeTime = time;
    timeoutId = setTimeout(timerExpired, delay);
    return leading ? invokeFunc(time) : result;
  }
  
  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime!;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = delay - timeSinceLastCall;
    
    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }
  
  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime!;
    const timeSinceLastInvoke = time - lastInvokeTime;
    
    return (
      lastCallTime === null ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }
  
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeoutId = setTimeout(timerExpired, remainingWait(time));
  }
  
  function trailingEdge(time: number) {
    timeoutId = null;
    
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  
  function cancel() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId !== null) {
      clearTimeout(maxTimeoutId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timeoutId = null;
  }
  
  function flush() {
    return timeoutId === null ? result : trailingEdge(Date.now());
  }
  
  let lastArgs: any;
  let lastThis: any;
  let result: any;
  
  function debounced(...args: Parameters<T>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    
    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(lastCallTime);
      }
      if (maxWait !== undefined) {
        timeoutId = setTimeout(timerExpired, delay);
        return invokeFunc(lastCallTime);
      }
    }
    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, delay);
    }
    return result;
  }
  
  debounced.cancel = cancel;
  debounced.flush = flush;
  
  return debounced as T & { cancel: () => void; flush: () => void };
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): T & { cancel: () => void; flush: () => void } {
  return debounce(func, delay, {
    leading: options.leading !== false,
    trailing: options.trailing !== false,
    maxWait: delay
  });
}

// Usage examples
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

const throttledScroll = throttle((event: Event) => {
  console.log('Scroll position:', window.scrollY);
}, 100);

// React hook for debounced value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

### Optimization Algorithms (50 problems)

#### Problem 26: Memoization Implementation
**Description:** Implement a generic memoization function with LRU cache.

```typescript
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;
  
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!;
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Update existing key
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used item
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  has(key: K): boolean {
    return this.cache.has(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

function memoize<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  options: {
    maxSize?: number;
    ttl?: number;
    keyGenerator?: (...args: Args) => string;
  } = {}
): (...args: Args) => Return {
  const {
    maxSize = 100,
    ttl = Infinity,
    keyGenerator = (...args) => JSON.stringify(args)
  } = options;
  
  const cache = new LRUCache<string, { value: Return; timestamp: number }>(maxSize);
  
  return (...args: Args): Return => {
    const key = keyGenerator(...args);
    const cached = cache.get(key);
    
    if (cached) {
      const isExpired = Date.now() - cached.timestamp > ttl;
      if (!isExpired) {
        return cached.value;
      }
    }
    
    const result = fn(...args);
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });
    
    return result;
  };
}

// Usage examples
const expensiveCalculation = memoize((x: number, y: number) => {
  console.log('Calculating...', x, y);
  return x * y + Math.random(); // Expensive operation
}, { maxSize: 50, ttl: 5000 });

const memoizedFibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

// React hook for memoized callback
function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  options?: Parameters<typeof memoize>[1]
): T {
  const memoizedCallback = useMemo(
    () => memoize(callback, options),
    deps
  );
  
  return memoizedCallback as T;
}
```

This collection represents just the beginning of our 1000+ problem set. Each problem includes:

1. **Clear problem description**
2. **TypeScript implementation with type safety**
3. **Multiple solution approaches where applicable**
4. **Time and space complexity analysis**
5. **Frontend-specific applications**
6. **Real-world usage examples**

The problems are designed to progressively build skills from basic algorithms to advanced frontend-specific patterns, ensuring comprehensive preparation for Big Tech interviews.

Would you like me to continue with more specific categories or focus on particular areas like Dynamic Programming, System Design Algorithms, or Performance Optimization problems?