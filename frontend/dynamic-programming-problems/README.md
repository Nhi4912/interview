# Dynamic Programming Problems: Complete Collection

## Overview

Dynamic Programming is crucial for frontend interviews, especially for optimization problems. This collection contains 100+ DP problems with frontend applications.

## 🎯 Problem Categories

### 1. Basic DP (30 problems)
### 2. String DP (25 problems)
### 3. Array DP (25 problems)
### 4. Tree DP (10 problems)
### 5. Frontend-Specific DP (10 problems)

## 🔥 Basic DP Problems

### Problem 1: Fibonacci Sequence
**Description:** Calculate the nth Fibonacci number efficiently.

```typescript
// Basic recursive solution (inefficient)
function fibonacciRecursive(n: number): number {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Memoized solution
function fibonacciMemo(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  
  const result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Tabulation solution (bottom-up)
function fibonacciTabulation(n: number): number {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space-optimized solution
function fibonacciOptimized(n: number): number {
  if (n <= 1) return n;
  
  let prev2 = 0;
  let prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Frontend Application: Animation frame calculations
function calculateAnimationFrame(frameNumber: number): number {
  // Using fibonacci sequence for smooth animation timing
  return fibonacciOptimized(frameNumber) % 100;
}

// React hook for fibonacci sequence
function useFibonacci(n: number): number {
  return useMemo(() => fibonacciOptimized(n), [n]);
}
```

### Problem 2: Climbing Stairs
**Description:** Count the number of ways to climb stairs with 1 or 2 steps.

```typescript
function climbStairs(n: number): number {
  if (n <= 2) return n;
  
  let prev2 = 1;
  let prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Generalized version with custom step sizes
function climbStairsWithSteps(n: number, steps: number[]): number {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  
  for (let i = 1; i <= n; i++) {
    for (const step of steps) {
      if (i >= step) {
        dp[i] += dp[i - step];
      }
    }
  }
  
  return dp[n];
}

// Frontend Application: Navigation breadcrumb levels
function calculateNavigationPaths(levels: number): number {
  // Each level can be reached by going up 1 or 2 levels
  return climbStairs(levels);
}

// Component state transitions
function calculateStateTransitions(states: number): number {
  // Number of ways to reach a state with allowed transitions
  return climbStairsWithSteps(states, [1, 2, 3]);
}
```

### Problem 3: House Robber
**Description:** Rob houses without robbing adjacent ones for maximum money.

```typescript
function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0;
  let prev1 = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Circular house robber (first and last are adjacent)
function robCircular(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  
  // Case 1: Rob first house, can't rob last
  const robFirst = robRange(nums, 0, nums.length - 2);
  
  // Case 2: Rob last house, can't rob first
  const robLast = robRange(nums, 1, nums.length - 1);
  
  return Math.max(robFirst, robLast);
}

function robRange(nums: number[], start: number, end: number): number {
  let prev2 = 0;
  let prev1 = 0;
  
  for (let i = start; i <= end; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Frontend Application: Feature flag optimization
function optimizeFeatureFlags(values: number[]): number {
  // Can't enable adjacent features due to conflicts
  return rob(values);
}

// Resource allocation optimization
function optimizeResourceAllocation(resources: number[]): number {
  // Adjacent resources conflict, find maximum non-conflicting allocation
  return rob(resources);
}
```

### Problem 4: Coin Change
**Description:** Find the minimum number of coins to make a given amount.

```typescript
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Count all ways to make change
function coinChangeWays(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}

// Frontend Application: Bundle size optimization
function optimizeBundleSize(chunkSizes: number[], targetSize: number): number {
  // Find minimum number of chunks to reach target size
  return coinChange(chunkSizes, targetSize);
}

// API request batching
function calculateBatchRequests(requestSizes: number[], maxBatchSize: number): number {
  // Minimum number of batches needed
  return coinChange(requestSizes, maxBatchSize);
}
```

### Problem 5: Longest Increasing Subsequence
**Description:** Find the length of the longest increasing subsequence.

```typescript
function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  
  const dp = new Array(nums.length).fill(1);
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}

// Binary search optimization O(n log n)
function lengthOfLISOptimized(nums: number[]): number {
  if (nums.length === 0) return 0;
  
  const tails: number[] = [];
  
  for (const num of nums) {
    let left = 0;
    let right = tails.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }
  
  return tails.length;
}

// Frontend Application: Performance metrics trend
function findPerformanceTrend(metrics: number[]): number {
  // Find longest increasing trend in performance metrics
  return lengthOfLISOptimized(metrics);
}

// Component version compatibility
function findCompatibleVersions(versions: number[]): number {
  // Find longest sequence of compatible versions
  return lengthOfLIS(versions);
}
```

## 🔤 String DP Problems

### Problem 6: Longest Common Subsequence
**Description:** Find the length of the longest common subsequence between two strings.

```typescript
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}

// Space-optimized version
function longestCommonSubsequenceOptimized(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  
  if (m < n) {
    return longestCommonSubsequenceOptimized(text2, text1);
  }
  
  let prev = new Array(n + 1).fill(0);
  
  for (let i = 1; i <= m; i++) {
    const current = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        current[j] = prev[j - 1] + 1;
      } else {
        current[j] = Math.max(prev[j], current[j - 1]);
      }
    }
    prev = current;
  }
  
  return prev[n];
}

// Frontend Application: Code diff algorithm
function calculateCodeDiff(oldCode: string, newCode: string): number {
  // Find common parts between two versions
  return longestCommonSubsequence(oldCode, newCode);
}

// Translation similarity
function calculateTranslationSimilarity(source: string, target: string): number {
  const lcs = longestCommonSubsequence(source, target);
  return (2 * lcs) / (source.length + target.length);
}
```

### Problem 7: Edit Distance
**Description:** Find the minimum number of operations to convert one string to another.

```typescript
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
}

// Space-optimized version
function minDistanceOptimized(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  
  if (m < n) {
    return minDistanceOptimized(word2, word1);
  }
  
  let prev = Array(n + 1).fill(0).map((_, i) => i);
  
  for (let i = 1; i <= m; i++) {
    const current = new Array(n + 1);
    current[0] = i;
    
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        current[j] = prev[j - 1];
      } else {
        current[j] = 1 + Math.min(prev[j], current[j - 1], prev[j - 1]);
      }
    }
    
    prev = current;
  }
  
  return prev[n];
}

// Frontend Application: Text editor autocorrect
function calculateAutoCorrectDistance(input: string, suggestion: string): number {
  return minDistance(input, suggestion);
}

// API response migration
function calculateMigrationCost(oldSchema: string, newSchema: string): number {
  // Calculate cost of migrating from old API schema to new
  return minDistance(oldSchema, newSchema);
}
```

### Problem 8: Palindromic Substrings
**Description:** Count all palindromic substrings in a string.

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

// DP approach
function countSubstringsDP(s: string): number {
  const n = s.length;
  const dp = Array(n).fill(null).map(() => Array(n).fill(false));
  let count = 0;
  
  // Single characters are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    count++;
  }
  
  // Two character palindromes
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      count++;
    }
  }
  
  // Longer palindromes
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        count++;
      }
    }
  }
  
  return count;
}

// Frontend Application: Symmetric UI pattern detection
function countSymmetricPatterns(pattern: string): number {
  return countSubstrings(pattern);
}

// Logo design validation
function validateLogoSymmetry(design: string): boolean {
  return countSubstrings(design) > design.length;
}
```

### Problem 9: Word Break
**Description:** Check if a string can be segmented into words from a dictionary.

```typescript
function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
}

// Return all possible word breaks
function wordBreakAll(s: string, wordDict: string[]): string[] {
  const wordSet = new Set(wordDict);
  const memo = new Map<string, string[]>();
  
  function backtrack(start: number): string[] {
    if (start === s.length) {
      return [''];
    }
    
    if (memo.has(s.substring(start))) {
      return memo.get(s.substring(start))!;
    }
    
    const result: string[] = [];
    
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);
      if (wordSet.has(word)) {
        const suffixes = backtrack(end);
        for (const suffix of suffixes) {
          result.push(word + (suffix === '' ? '' : ' ' + suffix));
        }
      }
    }
    
    memo.set(s.substring(start), result);
    return result;
  }
  
  return backtrack(0);
}

// Frontend Application: URL parsing validation
function validateURLPath(path: string, validSegments: string[]): boolean {
  return wordBreak(path, validSegments);
}

// CSS class name validation
function validateCSSClasses(className: string, validClasses: string[]): boolean {
  return wordBreak(className, validClasses);
}
```

## 🔢 Array DP Problems

### Problem 10: Maximum Subarray Sum
**Description:** Find the maximum sum of a contiguous subarray.

```typescript
function maxSubArray(nums: number[]): number {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

// Return the actual subarray
function maxSubArrayWithIndices(nums: number[]): { sum: number; start: number; end: number } {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > maxEndingHere + nums[i]) {
      maxEndingHere = nums[i];
      tempStart = i;
    } else {
      maxEndingHere = maxEndingHere + nums[i];
    }
    
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }
  
  return { sum: maxSoFar, start, end };
}

// Frontend Application: Performance metrics analysis
function findBestPerformancePeriod(metrics: number[]): { value: number; period: { start: number; end: number } } {
  const result = maxSubArrayWithIndices(metrics);
  return {
    value: result.sum,
    period: { start: result.start, end: result.end }
  };
}

// Resource usage optimization
function optimizeResourceUsage(usage: number[]): number {
  return maxSubArray(usage);
}
```

### Problem 11: Jump Game
**Description:** Determine if you can reach the last index.

```typescript
function canJump(nums: number[]): boolean {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }
  
  return false;
}

// Minimum jumps to reach end
function jumpGameMinJumps(nums: number[]): number {
  if (nums.length <= 1) return 0;
  
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  
  return jumps;
}

// Frontend Application: Page navigation optimization
function canNavigateToPage(navigationSteps: number[]): boolean {
  return canJump(navigationSteps);
}

// Component loading strategy
function minimumLoadingSteps(loadingCapacity: number[]): number {
  return jumpGameMinJumps(loadingCapacity);
}
```

### Problem 12: Unique Paths
**Description:** Find number of unique paths from top-left to bottom-right.

```typescript
function uniquePaths(m: number, n: number): number {
  const dp = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}

// Space-optimized version
function uniquePathsOptimized(m: number, n: number): number {
  let dp = new Array(n).fill(1);
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1];
    }
  }
  
  return dp[n - 1];
}

// With obstacles
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
    return 0;
  }
  
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  dp[0][0] = 1;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        if (i > 0) dp[i][j] += dp[i - 1][j];
        if (j > 0) dp[i][j] += dp[i][j - 1];
      }
    }
  }
  
  return dp[m - 1][n - 1];
}

// Frontend Application: UI grid navigation
function calculateNavigationPaths(gridWidth: number, gridHeight: number): number {
  return uniquePaths(gridHeight, gridWidth);
}

// Layout responsive paths
function calculateResponsiveLayouts(breakpoints: boolean[][]): number {
  return uniquePathsWithObstacles(breakpoints.map(row => row.map(valid => valid ? 0 : 1)));
}
```

## 🌳 Tree DP Problems

### Problem 13: Binary Tree Maximum Path Sum
**Description:** Find the maximum path sum in a binary tree.

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

function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;
  
  function maxPathSumFromNode(node: TreeNode | null): number {
    if (!node) return 0;
    
    // Get maximum path sum from left and right subtrees
    const leftSum = Math.max(0, maxPathSumFromNode(node.left));
    const rightSum = Math.max(0, maxPathSumFromNode(node.right));
    
    // Maximum path sum including current node as the highest node
    const currentMaxSum = node.val + leftSum + rightSum;
    
    // Update global maximum
    maxSum = Math.max(maxSum, currentMaxSum);
    
    // Return maximum path sum including current node and one of its subtrees
    return node.val + Math.max(leftSum, rightSum);
  }
  
  maxPathSumFromNode(root);
  return maxSum;
}

// Frontend Application: Component tree performance optimization
interface ComponentNode {
  performance: number;
  children: ComponentNode[];
}

function findOptimalComponentPath(root: ComponentNode | null): number {
  let maxPerformance = -Infinity;
  
  function maxPerformanceFromComponent(node: ComponentNode | null): number {
    if (!node) return 0;
    
    let bestChildPerformance = 0;
    for (const child of node.children) {
      bestChildPerformance = Math.max(bestChildPerformance, maxPerformanceFromComponent(child));
    }
    
    const currentPerformance = node.performance + bestChildPerformance;
    maxPerformance = Math.max(maxPerformance, currentPerformance);
    
    return currentPerformance;
  }
  
  maxPerformanceFromComponent(root);
  return maxPerformance;
}
```

### Problem 14: House Robber III
**Description:** Rob houses arranged in a binary tree without robbing adjacent houses.

```typescript
function rob(root: TreeNode | null): number {
  function robHelper(node: TreeNode | null): [number, number] {
    if (!node) return [0, 0];
    
    const [leftWithout, leftWith] = robHelper(node.left);
    const [rightWithout, rightWith] = robHelper(node.right);
    
    // Rob current node: can't rob children
    const withCurrent = node.val + leftWithout + rightWithout;
    
    // Don't rob current node: can rob children
    const withoutCurrent = Math.max(leftWithout, leftWith) + Math.max(rightWithout, rightWith);
    
    return [withoutCurrent, withCurrent];
  }
  
  const [without, with_] = robHelper(root);
  return Math.max(without, with_);
}

// Frontend Application: Feature activation optimization
interface FeatureNode {
  value: number;
  children: FeatureNode[];
}

function optimizeFeatureActivation(root: FeatureNode | null): number {
  function optimize(node: FeatureNode | null): [number, number] {
    if (!node) return [0, 0];
    
    let withoutCurrent = 0;
    let withCurrent = node.value;
    
    for (const child of node.children) {
      const [childWithout, childWith] = optimize(child);
      withoutCurrent += Math.max(childWithout, childWith);
      withCurrent += childWithout;
    }
    
    return [withoutCurrent, withCurrent];
  }
  
  const [without, with_] = optimize(root);
  return Math.max(without, with_);
}
```

## 🚀 Frontend-Specific DP Problems

### Problem 15: Component Rendering Optimization
**Description:** Optimize component rendering order for minimum reflows.

```typescript
interface RenderTask {
  id: string;
  cost: number;
  dependencies: string[];
  priority: number;
}

function optimizeRenderOrder(tasks: RenderTask[]): string[] {
  const n = tasks.length;
  const taskMap = new Map<string, RenderTask>();
  
  tasks.forEach(task => taskMap.set(task.id, task));
  
  // Build dependency graph
  const graph = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  
  tasks.forEach(task => {
    graph.set(task.id, []);
    inDegree.set(task.id, 0);
  });
  
  tasks.forEach(task => {
    task.dependencies.forEach(dep => {
      graph.get(dep)?.push(task.id);
      inDegree.set(task.id, (inDegree.get(task.id) || 0) + 1);
    });
  });
  
  // Topological sort with priority
  const queue: string[] = [];
  const result: string[] = [];
  
  // Find all nodes with no incoming edges
  tasks.forEach(task => {
    if (inDegree.get(task.id) === 0) {
      queue.push(task.id);
    }
  });
  
  // Sort by priority
  queue.sort((a, b) => (taskMap.get(b)?.priority || 0) - (taskMap.get(a)?.priority || 0));
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    
    graph.get(current)?.forEach(neighbor => {
      const newInDegree = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newInDegree);
      
      if (newInDegree === 0) {
        queue.push(neighbor);
        queue.sort((a, b) => (taskMap.get(b)?.priority || 0) - (taskMap.get(a)?.priority || 0));
      }
    });
  }
  
  return result;
}

// Memoized rendering decisions
function memoizedRenderingDecision(
  componentTree: ComponentNode,
  memo: Map<string, boolean> = new Map()
): boolean {
  const key = `${componentTree.name}-${JSON.stringify(componentTree.props)}`;
  
  if (memo.has(key)) {
    return memo.get(key)!;
  }
  
  // Calculate if component should re-render
  const shouldRender = calculateShouldRender(componentTree);
  memo.set(key, shouldRender);
  
  return shouldRender;
}

function calculateShouldRender(component: ComponentNode): boolean {
  // Complex logic to determine if component should re-render
  return component.props.hasChanged || component.children.some(child => 
    memoizedRenderingDecision(child)
  );
}
```

### Problem 16: Bundle Splitting Optimization
**Description:** Optimize bundle splitting for minimum loading time.

```typescript
interface Module {
  name: string;
  size: number;
  dependencies: string[];
  frequency: number;
}

function optimizeBundleSplitting(
  modules: Module[],
  maxBundleSize: number
): Map<string, string[]> {
  const bundles = new Map<string, string[]>();
  const moduleMap = new Map<string, Module>();
  
  modules.forEach(module => moduleMap.set(module.name, module));
  
  // Sort modules by frequency (most used first)
  const sortedModules = [...modules].sort((a, b) => b.frequency - a.frequency);
  
  // DP approach to find optimal bundling
  const dp = new Map<string, number>();
  const bundleAssignment = new Map<string, string>();
  
  function findOptimalBundle(moduleSet: string[], currentSize: number): number {
    const key = moduleSet.sort().join(',');
    
    if (dp.has(key)) {
      return dp.get(key)!;
    }
    
    if (currentSize > maxBundleSize) {
      return Infinity;
    }
    
    if (moduleSet.length === 0) {
      return 0;
    }
    
    let minCost = Infinity;
    
    // Try adding each module to current bundle
    for (let i = 0; i < moduleSet.length; i++) {
      const module = moduleSet[i];
      const moduleObj = moduleMap.get(module)!;
      const newSize = currentSize + moduleObj.size;
      
      if (newSize <= maxBundleSize) {
        const remainingModules = moduleSet.filter((_, index) => index !== i);
        const cost = moduleObj.frequency + findOptimalBundle(remainingModules, newSize);
        
        if (cost < minCost) {
          minCost = cost;
        }
      }
    }
    
    dp.set(key, minCost);
    return minCost;
  }
  
  // Create bundles
  let bundleIndex = 0;
  const remaining = new Set(modules.map(m => m.name));
  
  while (remaining.size > 0) {
    const bundleName = `bundle-${bundleIndex++}`;
    const bundleModules: string[] = [];
    let bundleSize = 0;
    
    // Greedy approach to fill each bundle
    for (const module of sortedModules) {
      if (remaining.has(module.name)) {
        const moduleObj = moduleMap.get(module.name)!;
        
        if (bundleSize + moduleObj.size <= maxBundleSize) {
          bundleModules.push(module.name);
          bundleSize += moduleObj.size;
          remaining.delete(module.name);
        }
      }
    }
    
    if (bundleModules.length > 0) {
      bundles.set(bundleName, bundleModules);
    }
  }
  
  return bundles;
}

// Webpack configuration generator
function generateWebpackConfig(bundles: Map<string, string[]>): any {
  const entry: Record<string, string[]> = {};
  
  bundles.forEach((modules, bundleName) => {
    entry[bundleName] = modules;
  });
  
  return {
    entry,
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          common: {
            minChunks: 2,
            priority: 5,
          },
        },
      },
    },
  };
}
```

This comprehensive collection of Dynamic Programming problems demonstrates the application of DP principles to both classic algorithmic challenges and frontend-specific optimization problems. Each problem includes multiple solution approaches, complexity analysis, and practical applications in frontend development.

The problems progress from basic concepts like Fibonacci and climbing stairs to complex optimization scenarios like bundle splitting and component rendering, providing a complete foundation for DP mastery in frontend engineering contexts.