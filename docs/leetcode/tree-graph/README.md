# Tree & Graph Problems - LeetCode Collection

**Bộ sưu tập bài tập Tree & Graph từ LeetCode cho phỏng vấn companies**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Maximum Depth of Binary Tree

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/maximum-depth-of-binary-tree/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Recursive DFS, tree traversal

#### 2. Validate Binary Search Tree

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/validate-binary-search-tree/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: BST properties, inorder traversal

#### 3. Symmetric Tree

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/symmetric-tree/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Mirror comparison, recursive approach

#### 4. Binary Tree Level Order Traversal

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/binary-tree-level-order-traversal/
- **Category**: Tree, BFS
- **Companies**: Various companies
- **Key Concepts**: Level-order traversal, queue

#### 5. Convert Sorted Array to Binary Search Tree

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Balanced BST construction, divide and conquer

### Medium Level / Mức độ trung bình

#### 6. Binary Tree Inorder Traversal

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/binary-tree-inorder-traversal/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Inorder traversal, iterative approach

#### 7. Binary Tree Zigzag Level Order Traversal

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
- **Category**: Tree, BFS
- **Companies**: Various companies
- **Key Concepts**: Level-order with direction change

#### 8. Construct Binary Tree from Preorder and Inorder Traversal

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Tree reconstruction, hash map

#### 9. Populating Next Right Pointers in Each Node

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
- **Category**: Tree, BFS
- **Companies**: Various companies
- **Key Concepts**: Level-order traversal, pointer manipulation

#### 10. Kth Smallest Element in a BST

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: Inorder traversal, kth element

#### 11. Inorder Successor in BST

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/inorder-successor-in-bst/
- **Category**: Tree, DFS
- **Companies**: Various companies
- **Key Concepts**: BST properties, successor finding

#### 12. Number of Islands

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/number-of-islands/
- **Category**: Graph, DFS/BFS
- **Companies**: Various companies
- **Key Concepts**: Connected components, flood fill

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **DFS (Depth-First Search)**: Preorder, inorder, postorder traversals
2. **BFS (Breadth-First Search)**: Level-order traversal
3. **Recursive Approach**: Natural for tree problems
4. **Iterative Approach**: Using stack/queue
5. **BST Properties**: Left < Root < Right

### Time Complexity Targets / Mục tiêu độ phức tạp:

- **Easy**: O(n) time, O(h) space (h = height)
- **Medium**: O(n) time, O(n) space

### Common Mistakes / Lỗi thường gặp:

1. Not handling null nodes
2. Forgetting BST properties
3. Infinite recursion
4. Not considering space complexity
5. Missing edge cases (empty tree, single node)

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete all Easy problems (1-5)
- Focus on basic tree traversals
- Practice recursive thinking

### Week 2: Intermediate

- Complete Medium problems (6-12)
- Practice iterative approaches
- Work on BST problems

### Week 3: Advanced

- Revisit problems with different approaches
- Practice optimization techniques
- Focus on graph problems

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Tree Traversals

- **Preorder**: Root → Left → Right
- **Inorder**: Left → Root → Right
- **Postorder**: Left → Right → Root
- **Level-order**: BFS approach

### 2. DFS Implementation

```javascript
function dfs(root) {
  if (!root) return;

  // Process current node
  console.log(root.val);

  // Recursive calls
  dfs(root.left);
  dfs(root.right);
}
```

### 3. BFS Implementation

```javascript
function bfs(root) {
  if (!root) return;

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Tree Operations:

1. How to traverse a binary tree?
2. How to find the height of a tree?
3. How to check if a tree is balanced?
4. How to find the lowest common ancestor?

### BST Operations:

1. How to validate a BST?
2. How to find kth smallest element?
3. How to insert/delete in BST?
4. How to convert sorted array to BST?

### Graph Operations:

1. How to find connected components?
2. How to detect cycles in a graph?
3. How to find shortest path?
4. How to implement topological sort?

## 📝 Code Templates / Mẫu code

### Binary Tree Node:

```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### DFS Template:

```javascript
function dfsTemplate(root) {
  if (!root) return;

  // Process current node
  processNode(root);

  // Recursive calls
  dfsTemplate(root.left);
  dfsTemplate(root.right);
}
```

### BFS Template:

```javascript
function bfsTemplate(root) {
  if (!root) return;

  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      processNode(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}
```

---

**Next: [Dynamic Programming Problems](../dp/README.md)**
