# String Problems - LeetCode Collection

**Bộ sưu tập bài tập String từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Reverse String

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/reverse-string/
- **Category**: String, Two Pointers
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: In-place reversal, two pointers

#### 2. Reverse Integer

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/reverse-integer/
- **Category**: Math, String
- **Companies**: Google, Amazon, Microsoft, Apple
- **Key Concepts**: Integer overflow, digit manipulation

#### 3. First Unique Character in a String

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/first-unique-character-in-a-string/
- **Category**: String, Hash Table
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Frequency counting, hash map

#### 4. Valid Anagram

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/valid-anagram/
- **Category**: String, Hash Table, Sorting
- **Companies**: Google, Amazon, Microsoft, Facebook
- **Key Concepts**: Character frequency, sorting

#### 5. Valid Palindrome

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/valid-palindrome/
- **Category**: String, Two Pointers
- **Companies**: Facebook, Amazon, Google
- **Key Concepts**: Two pointers, character validation

#### 6. String to Integer (atoi)

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/string-to-integer-atoi/
- **Category**: String, Math
- **Companies**: Amazon, Microsoft, Google
- **Key Concepts**: Edge cases, overflow handling

#### 7. Implement strStr()

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/implement-strstr/
- **Category**: String, Two Pointers
- **Companies**: Facebook, Amazon, Google
- **Key Concepts**: String matching, KMP algorithm

#### 8. Longest Common Prefix

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/longest-common-prefix/
- **Category**: String
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Prefix matching, vertical scanning

### Medium Level / Mức độ trung bình

#### 9. Group Anagrams

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/group-anagrams/
- **Category**: String, Hash Table
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Anagram grouping, hash map

#### 10. Longest Substring Without Repeating Characters

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/longest-substring-without-repeating-characters/
- **Category**: String, Hash Table, Two Pointers
- **Companies**: Google, Amazon, Facebook, Microsoft
- **Key Concepts**: Sliding window, hash set

#### 11. Longest Palindromic Substring

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/longest-palindromic-substring/
- **Category**: String, Dynamic Programming
- **Companies**: Amazon, Google, Facebook, Microsoft
- **Key Concepts**: Expand around center, DP approach

#### 12. Increasing Triplet Subsequence

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/increasing-triplet-subsequence/
- **Category**: Array, Greedy
- **Companies**: Facebook, Amazon, Google
- **Key Concepts**: Greedy algorithm, maintaining two minimums

#### 13. Missing Ranges

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/missing-ranges/
- **Category**: Array
- **Companies**: Google, Facebook
- **Key Concepts**: Range handling, edge cases

#### 14. Count and Say

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/count-and-say/
- **Category**: String, Array
- **Companies**: Facebook, Amazon
- **Key Concepts**: String generation, pattern recognition

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Two Pointers**: For palindrome, reverse, substring problems
2. **Hash Table**: For frequency counting, anagram detection
3. **Sliding Window**: For substring problems with constraints
4. **String Manipulation**: Character by character processing
5. **Regular Expressions**: For complex string matching

### Time Complexity Targets / Mục tiêu độ phức tạp:

- **Easy**: O(n) time, O(1) or O(n) space
- **Medium**: O(n) or O(n²) time, O(1) or O(n) space

### Common Mistakes / Lỗi thường gặp:

1. Not handling edge cases (empty string, single character)
2. Forgetting case sensitivity
3. Not considering Unicode characters
4. Missing overflow handling in integer conversion
5. Inefficient string concatenation

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete all Easy problems (1-8)
- Focus on string manipulation basics
- Practice character frequency counting

### Week 2: Intermediate

- Complete Medium problems (9-14)
- Practice sliding window technique
- Work on palindrome problems

### Week 3: Advanced

- Revisit problems with different approaches
- Practice optimization techniques
- Focus on edge case handling

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. KMP Algorithm

- Used in string matching problems
- Time complexity: O(n + m)
- Space complexity: O(m)

### 2. Rabin-Karp Algorithm

- Used for pattern matching
- Time complexity: O(n + m) average case
- Space complexity: O(1)

### 3. Manacher's Algorithm

- Used for finding longest palindromic substring
- Time complexity: O(n)
- Space complexity: O(n)

---

**Next: [Linked List Problems](../linked-list/README.md)**
