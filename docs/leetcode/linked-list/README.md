# Linked List Problems - LeetCode Collection

**Bộ sưu tập bài tập Linked List từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Delete Node in a Linked List

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/delete-node-in-a-linked-list/
- **Category**: Linked List
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Node deletion without head reference

#### 2. Remove Nth Node From End of List

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
- **Category**: Linked List, Two Pointers
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Two pointers, fast and slow pointer

#### 3. Reverse Linked List

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/reverse-linked-list/
- **Category**: Linked List
- **Companies**: Google, Amazon, Microsoft, Facebook
- **Key Concepts**: Iterative and recursive reversal

#### 4. Merge Two Sorted Lists

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/merge-two-sorted-lists/
- **Category**: Linked List
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Merge algorithm, dummy node

#### 5. Palindrome Linked List

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/palindrome-linked-list/
- **Category**: Linked List, Two Pointers
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Reverse half, two pointers

#### 6. Linked List Cycle

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/linked-list-cycle/
- **Category**: Linked List, Two Pointers
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Floyd's cycle detection algorithm

### Medium Level / Mức độ trung bình

#### 7. Add Two Numbers

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/add-two-numbers/
- **Category**: Linked List, Math
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Digit by digit addition, carry handling

#### 8. Odd Even Linked List

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/odd-even-linked-list/
- **Category**: Linked List
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Separating odd and even nodes

#### 9. Intersection of Two Linked Lists

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/intersection-of-two-linked-lists/
- **Category**: Linked List, Two Pointers
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Finding intersection point

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Two Pointers**: Fast and slow pointer technique
2. **Dummy Node**: Creating a sentinel node for easier manipulation
3. **Reverse**: Reversing part or entire linked list
4. **Merge**: Combining two sorted linked lists
5. **Cycle Detection**: Using Floyd's algorithm

### Time Complexity Targets / Mục tiêu độ phức tạp:

- **Easy**: O(n) time, O(1) space
- **Medium**: O(n) time, O(1) space

### Common Mistakes / Lỗi thường gặp:

1. Not handling null pointers
2. Forgetting to update pointers correctly
3. Not considering edge cases (empty list, single node)
4. Memory leaks in complex manipulations
5. Infinite loops in cycle detection

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete all Easy problems (1-6)
- Focus on basic linked list operations
- Practice pointer manipulation

### Week 2: Intermediate

- Complete Medium problems (7-9)
- Practice two pointer techniques
- Work on complex manipulations

### Week 3: Advanced

- Revisit problems with different approaches
- Practice optimization techniques
- Focus on edge case handling

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Floyd's Cycle Detection Algorithm

- Used to detect cycles in linked lists
- Time complexity: O(n)
- Space complexity: O(1)

### 2. Two Pointer Technique

- Used for finding middle, detecting cycles
- Time complexity: O(n)
- Space complexity: O(1)

### 3. Reverse Linked List

- Used in many linked list problems
- Time complexity: O(n)
- Space complexity: O(1) iterative, O(n) recursive

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Operations:

1. How to reverse a linked list?
2. How to detect a cycle in a linked list?
3. How to find the middle node?
4. How to remove duplicates?

### Advanced Operations:

1. How to merge k sorted linked lists?
2. How to sort a linked list?
3. How to reorder a linked list?
4. How to copy a linked list with random pointers?

## 📝 Code Templates / Mẫu code

### Basic Linked List Node:

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

### Two Pointer Template:

```javascript
function twoPointerTemplate(head) {
  if (!head || !head.next) return head;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

---

**Next: [Tree & Graph Problems](../tree-graph/README.md)**
