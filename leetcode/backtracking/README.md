# Backtracking Problems - LeetCode Collection

**Bộ sưu tập bài tập Backtracking từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Letter Combinations of a Phone Number

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
- **Category**: Backtracking, String
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Recursive backtracking, string combinations

### Medium Level / Mức độ trung bình

#### 2. Subsets

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/subsets/
- **Category**: Backtracking, Array
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Power set generation, recursive backtracking

#### 3. Permutations

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/permutations/
- **Category**: Backtracking, Array
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Permutation generation, recursive backtracking

#### 4. Combination Sum

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/combination-sum/
- **Category**: Backtracking, Array
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Sum combinations, recursive backtracking

#### 5. Generate Parentheses

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/generate-parentheses/
- **Category**: Backtracking, String
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Valid parentheses generation, recursive backtracking

#### 6. Word Search

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/word-search/
- **Category**: Backtracking, Matrix
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Matrix traversal, recursive backtracking

#### 7. N-Queens

- **Difficulty**: Hard
- **LeetCode Link**: https://leetcode.com/problems/n-queens/
- **Category**: Backtracking, Matrix
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Constraint satisfaction, recursive backtracking

#### 8. Sudoku Solver

- **Difficulty**: Hard
- **LeetCode Link**: https://leetcode.com/problems/sudoku-solver/
- **Category**: Backtracking, Matrix
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Constraint satisfaction, recursive backtracking

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Recursive Backtracking**: Build solution incrementally, backtrack when constraints violated
2. **State Management**: Track current state, visited positions, constraints
3. **Pruning**: Early termination when solution is impossible
4. **Choice Exploration**: Try all possible choices at each step
5. **Constraint Checking**: Validate constraints before proceeding

### Time Complexity Targets / Mục tiêu độ phức tạp:

- **Easy**: O(n!) or O(2^n) time, O(n) space
- **Medium**: O(n!) or O(2^n) time, O(n) space
- **Hard**: O(n!) or O(9^n) time, O(n) space

### Common Mistakes / Lỗi thường gặp:

1. Not resetting state after backtracking
2. Forgetting to check constraints before proceeding
3. Not handling edge cases (empty input, single element)
4. Inefficient pruning strategies
5. Memory leaks in recursive calls

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete Easy problems (1)
- Focus on understanding recursive backtracking
- Practice state management

### Week 2: Intermediate

- Complete Medium problems (2-6)
- Practice constraint checking
- Work on pruning strategies

### Week 3: Advanced

- Complete Hard problems (7-8)
- Practice optimization techniques
- Focus on complex constraints

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)
- [String Problems](../string/README.md)
- [Matrix Problems](../matrix/README.md)
- [Recursion Patterns](./recursion-patterns.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Recursive Backtracking Template

```javascript
function backtrack(choices, state, result) {
  // Base case: solution found
  if (isSolution(state)) {
    result.push([...state]);
    return;
  }

  // Try all possible choices
  for (let choice of choices) {
    // Check if choice is valid
    if (isValid(choice, state)) {
      // Make choice
      state.push(choice);

      // Recurse
      backtrack(choices, state, result);

      // Undo choice (backtrack)
      state.pop();
    }
  }
}
```

### 2. State Management

- **Visited Array**: Track visited positions
- **Current State**: Track current solution being built
- **Constraints**: Track remaining choices and constraints

### 3. Pruning Strategies

- **Early Termination**: Stop when solution is impossible
- **Constraint Propagation**: Use constraints to reduce choices
- **Symmetry Breaking**: Avoid exploring symmetric solutions

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Operations:

1. How to implement recursive backtracking?
2. How to manage state during backtracking?
3. How to implement pruning strategies?
4. How to handle constraints in backtracking?

### Advanced Operations:

1. How to optimize backtracking algorithms?
2. How to handle large search spaces?
3. How to implement memoization in backtracking?
4. How to parallelize backtracking algorithms?

## 📝 Code Templates / Mẫu code

### Basic Backtracking Template:

```javascript
function backtrackTemplate(choices, state, result) {
  // Base case
  if (isComplete(state)) {
    result.push([...state]);
    return;
  }

  // Try all choices
  for (let choice of choices) {
    if (isValid(choice, state)) {
      // Make choice
      state.push(choice);

      // Recurse
      backtrackTemplate(choices, state, result);

      // Undo choice
      state.pop();
    }
  }
}
```

### Constraint Checking Template:

```javascript
function isValid(choice, state) {
  // Check if choice violates any constraints
  for (let constraint of constraints) {
    if (violatesConstraint(choice, state, constraint)) {
      return false;
    }
  }
  return true;
}
```

---

**Next: [Dynamic Programming Problems](../dp/README.md)**
