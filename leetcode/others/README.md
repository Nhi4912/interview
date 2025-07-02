# Other Problems - LeetCode Collection

**Bộ sưu tập bài tập khác từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Valid Parentheses

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/valid-parentheses/
- **Category**: Stack, String
- **Companies**: Google, Amazon, Microsoft, Facebook
- **Key Concepts**: Stack operations, bracket matching

#### 2. Implement Queue using Stacks

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/implement-queue-using-stacks/
- **Category**: Stack, Queue, Design
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Stack operations, queue simulation

#### 3. Implement Stack using Queues

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/implement-stack-using-queues/
- **Category**: Stack, Queue, Design
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Queue operations, stack simulation

#### 4. Min Stack

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/min-stack/
- **Category**: Stack, Design
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Auxiliary stack, O(1) operations

#### 5. Valid Anagram

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/valid-anagram/
- **Category**: String, Hash Table, Sorting
- **Companies**: Google, Amazon, Microsoft, Facebook
- **Key Concepts**: Character frequency, sorting

### Medium Level / Mức độ trung bình

#### 6. LRU Cache

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/lru-cache/
- **Category**: Hash Table, Linked List, Design
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Cache eviction, doubly linked list

#### 7. Design Circular Queue

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/design-circular-queue/
- **Category**: Array, Queue, Design
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Circular buffer, modulo operations

#### 8. Design Circular Deque

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/design-circular-deque/
- **Category**: Array, Queue, Design
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Double-ended queue, circular buffer

#### 9. Design Hit Counter

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/design-hit-counter/
- **Category**: Design, Queue
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Time-based operations, sliding window

#### 10. Design Browser History

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/design-browser-history/
- **Category**: Array, Stack, Design
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Navigation history, undo/redo

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Stack Operations**: LIFO (Last In, First Out) operations
2. **Queue Operations**: FIFO (First In, First Out) operations
3. **Design Patterns**: Factory, Singleton, Iterator patterns
4. **Data Structure Combinations**: Using multiple DS together
5. **State Management**: Tracking current state and history

### Design Principles / Nguyên tắc thiết kế:

1. **Single Responsibility**: Each class has one reason to change
2. **Open/Closed**: Open for extension, closed for modification
3. **Interface Segregation**: Many specific interfaces
4. **Dependency Inversion**: Depend on abstractions

### Common Mistakes / Lỗi thường gặp:

1. Not considering edge cases in design
2. Inefficient data structure choices
3. Not handling concurrent access
4. Missing error handling
5. Poor API design

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete Easy problems (1-5)
- Focus on basic data structure operations
- Practice stack and queue implementations

### Week 2: Intermediate

- Complete Medium problems (6-10)
- Practice complex data structures
- Work on design patterns

### Week 3: Advanced

- Revisit problems with different approaches
- Practice system design thinking
- Focus on scalability

## 🔗 Related Topics / Chủ đề liên quan

- [Design Problems](../design/README.md)
- [Stack Operations](./stack-operations.md)
- [Queue Operations](./queue-operations.md)
- [Design Patterns](./design-patterns.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Stack-based Algorithms

- Used for bracket matching, expression evaluation
- Time complexity: O(n)
- Space complexity: O(n)

### 2. Queue-based Algorithms

- Used for BFS, sliding window problems
- Time complexity: O(n)
- Space complexity: O(n)

### 3. LRU Cache Implementation

- Used for caching with eviction policy
- Time complexity: O(1) for get and put
- Space complexity: O(capacity)

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Design Questions:

1. How to implement a stack using queues?
2. How to implement a queue using stacks?
3. How to design an LRU cache?
4. How to handle circular buffer operations?

### Advanced Design Questions:

1. How to design for scalability?
2. How to handle concurrent access?
3. How to optimize for specific use cases?
4. How to design for maintainability?

## 📝 Code Templates / Mẫu code

### Stack Implementation:

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

### Queue Implementation:

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

### LRU Cache Template:

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

## 🎯 Problem Categories / Phân loại bài tập

### Data Structure Implementation:

- Stack using Queues
- Queue using Stacks
- Min Stack
- LRU Cache
- Circular Queue/Deque

### String Processing:

- Valid Parentheses
- Valid Anagram

### Design Problems:

- Hit Counter
- Browser History
- Cache Design

## 📈 Difficulty Progression / Tiến độ độ khó

### Beginner Level:

1. Valid Parentheses - Basic stack usage
2. Valid Anagram - String manipulation
3. Min Stack - Simple design

### Intermediate Level:

4. Stack using Queues - Data structure conversion
5. Queue using Stacks - Data structure conversion
6. Circular Queue - Array manipulation

### Advanced Level:

7. LRU Cache - Complex data structure
8. Hit Counter - Time-based operations
9. Browser History - State management

---

**Next: [Design Problems](../design/README.md)**
