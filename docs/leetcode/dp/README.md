# Dynamic Programming Problems - LeetCode Collection

**Bộ sưu tập bài tập Dynamic Programming từ LeetCode cho phỏng vấn companies**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Climbing Stairs

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/climbing-stairs/
- **Category**: Dynamic Programming
- **Companies**: Various companies
- **Key Concepts**: Fibonacci sequence, memoization

#### 2. Best Time to Buy and Sell Stock

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
- **Category**: Dynamic Programming, Array
- **Companies**: Various companies
- **Key Concepts**: Kadane's algorithm, one pass

#### 3. Maximum Subarray

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/maximum-subarray/
- **Category**: Dynamic Programming, Array
- **Companies**: Various companies
- **Key Concepts**: Kadane's algorithm, local vs global max

#### 4. House Robber

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/house-robber/
- **Category**: Dynamic Programming
- **Companies**: Various companies
- **Key Concepts**: State machine, rob vs not rob

### Medium Level / Mức độ trung bình

#### 5. Jump Game

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/jump-game/
- **Category**: Dynamic Programming, Greedy
- **Companies**: Various companies
- **Key Concepts**: Greedy approach, reachable position

#### 6. Unique Paths

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/unique-paths/
- **Category**: Dynamic Programming, Math
- **Companies**: Various companies
- **Key Concepts**: Grid DP, combination formula

#### 7. Coin Change

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/coin-change/
- **Category**: Dynamic Programming
- **Companies**: Various companies
- **Key Concepts**: Unbounded knapsack, minimum coins

#### 8. Longest Increasing Subsequence

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/longest-increasing-subsequence/
- **Category**: Dynamic Programming, Binary Search
- **Companies**: Various companies
- **Key Concepts**: Patience sorting, binary search optimization

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **1D DP**: Single array for state
2. **2D DP**: Matrix for two variables
3. **Memoization**: Top-down approach
4. **Tabulation**: Bottom-up approach
5. **State Compression**: Optimizing space

### Time Complexity Targets / Mục tiêu độ phức tạp:

- **Easy**: O(n) time, O(1) or O(n) space
- **Medium**: O(n²) or O(n log n) time, O(n) space

### Common Mistakes / Lỗi thường gặp:

1. Not identifying optimal substructure
2. Forgetting base cases
3. Not considering space optimization
4. Missing edge cases
5. Incorrect state definition

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete all Easy problems (1-4)
- Focus on basic DP patterns
- Practice state definition

### Week 2: Intermediate

- Complete Medium problems (5-8)
- Practice optimization techniques
- Work on complex state transitions

### Week 3: Advanced

- Revisit problems with different approaches
- Practice space optimization
- Focus on problem identification

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Kadane's Algorithm

- Used for maximum subarray problems
- Time complexity: O(n)
- Space complexity: O(1)

### 2. Fibonacci DP

- Classic DP problem
- Time complexity: O(n)
- Space complexity: O(1) optimized

### 3. Longest Increasing Subsequence

- Patience sorting approach
- Time complexity: O(n log n)
- Space complexity: O(n)

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic DP Problems:

1. How to identify if a problem is DP?
2. What's the difference between memoization and tabulation?
3. How to optimize space in DP?
4. When to use greedy vs DP?

### Advanced DP Problems:

1. How to solve unbounded knapsack?
2. How to handle multiple constraints?
3. How to reconstruct the solution?
4. How to optimize for large inputs?

## 📝 Code Templates / Mẫu code

### 1D DP Template:

```javascript
function dp1D(n) {
  const dp = new Array(n + 1).fill(0);

  // Base cases
  dp[0] = 0;
  dp[1] = 1;

  // Fill DP table
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

### 2D DP Template:

```javascript
function dp2D(m, n) {
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));

  // Base cases
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let j = 0; j < n; j++) dp[0][j] = 1;

  // Fill DP table
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}
```

### Memoization Template:

```javascript
function memoization(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = memoization(n - 1, memo) + memoization(n - 2, memo);
  return memo[n];
}
```

## 🔍 Problem Identification / Nhận diện bài toán DP

### When to use DP:

1. **Optimal Substructure**: Solution to subproblems helps solve main problem
2. **Overlapping Subproblems**: Same subproblems solved multiple times
3. **Choice Problems**: Multiple choices at each step
4. **Optimization Problems**: Finding minimum/maximum value

### Common DP Categories:

1. **1D DP**: Single variable state
2. **2D DP**: Two variable state
3. **Tree DP**: State depends on tree structure
4. **Digit DP**: State depends on digit position
5. **Probability DP**: State represents probability

---

**Next: [Design Problems](../design/README.md)**
