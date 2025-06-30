# Design Problems - LeetCode Collection

**Bộ sưu tập bài tập Design từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Shuffle an Array

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/shuffle-an-array/
- **Category**: Design, Array
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Fisher-Yates shuffle, random number generation

#### 2. Min Stack

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/min-stack/
- **Category**: Design, Stack
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Auxiliary stack, O(1) operations

### Medium Level / Mức độ trung bình

#### 3. Flatten 2D Vector

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/flatten-2d-vector/
- **Category**: Design, Array
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Iterator design, 2D array traversal

#### 4. Serialize and Deserialize Binary Tree

- **Difficulty**: Hard
- **LeetCode Link**: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
- **Category**: Design, Tree
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Tree serialization, string manipulation

#### 5. Insert Delete GetRandom O(1)

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/insert-delete-getrandom-o1/
- **Category**: Design, Hash Table, Array
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Hash map + array combination

#### 6. Design Tic-Tac-Toe

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/design-tic-tac-toe/
- **Category**: Design, Array
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Win condition checking, efficient design

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Data Structure Combination**: Using multiple DS together
2. **Trade-offs**: Space vs Time complexity
3. **Iterator Pattern**: For sequential access
4. **Factory Pattern**: For object creation
5. **Singleton Pattern**: For single instance

### Design Principles / Nguyên tắc thiết kế:

1. **Single Responsibility**: Each class has one reason to change
2. **Open/Closed**: Open for extension, closed for modification
3. **Interface Segregation**: Many specific interfaces
4. **Dependency Inversion**: Depend on abstractions

### Common Mistakes / Lỗi thường gặp:

1. Not considering edge cases
2. Inefficient data structure choices
3. Not handling concurrent access
4. Missing error handling
5. Poor API design

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete Easy problems (1-2)
- Focus on basic design patterns
- Practice API design

### Week 2: Intermediate

- Complete Medium problems (3-6)
- Practice complex data structures
- Work on optimization

### Week 3: Advanced

- Revisit problems with different approaches
- Practice system design thinking
- Focus on scalability

## 🔗 Related Topics / Chủ đề liên quan

- [System Design Fundamentals](../system-design/fundamentals.md)
- [Data Structures](./data-structures.md)
- [Design Patterns](./design-patterns.md)
- [API Design](./api-design.md)

## 💡 Key Design Patterns / Mẫu thiết kế quan trọng

### 1. Iterator Pattern

- Used for sequential access to collections
- Hides internal structure
- Provides uniform interface

### 2. Factory Pattern

- Used for object creation
- Encapsulates instantiation logic
- Provides flexibility

### 3. Singleton Pattern

- Ensures single instance
- Provides global access point
- Controls object creation

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Design Questions:

1. How to design a data structure with O(1) operations?
2. What are the trade-offs between different approaches?
3. How to handle edge cases in design?
4. How to make the design extensible?

### Advanced Design Questions:

1. How to design for scalability?
2. How to handle concurrent access?
3. How to optimize for specific use cases?
4. How to design for maintainability?

## 📝 Code Templates / Mẫu code

### Basic Class Template:

```javascript
class MyClass {
  constructor() {
    this.data = new Map();
  }

  // Public methods
  add(key, value) {
    this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }

  remove(key) {
    return this.data.delete(key);
  }
}
```

### Iterator Template:

```javascript
class Iterator {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.data.length;
  }

  next() {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
    throw new Error("No more elements");
  }
}
```

### Singleton Template:

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```

## 🔍 Design Considerations / Cân nhắc thiết kế

### Performance:

1. **Time Complexity**: O(1) for common operations
2. **Space Complexity**: Minimize memory usage
3. **Cache Efficiency**: Optimize for locality
4. **Concurrency**: Handle multiple threads

### Scalability:

1. **Horizontal Scaling**: Distribute across machines
2. **Vertical Scaling**: Optimize single machine
3. **Load Balancing**: Distribute load evenly
4. **Caching**: Reduce redundant computations

### Maintainability:

1. **Code Organization**: Clear structure
2. **Documentation**: Well-documented APIs
3. **Testing**: Comprehensive test coverage
4. **Error Handling**: Robust error management

---

**Next: [Math Problems](../math/README.md)**
