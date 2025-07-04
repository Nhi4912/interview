# Sorting & Searching Problems - LeetCode Collection

**Bộ sưu tập bài tập Sorting & Searching từ LeetCode cho phỏng vấn companies**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Merge Sorted Array

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/merge-sorted-array/
- **Category**: Array, Two Pointers
- **Companies**: Various companies
- **Key Concepts**: Merge algorithm, in-place modification

#### 2. First Bad Version

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/first-bad-version/
- **Category**: Binary Search
- **Companies**: Various companies
- **Key Concepts**: Binary search, version control

### Medium Level / Mức độ trung bình

#### 3. Sort Colors

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/sort-colors/
- **Category**: Array, Two Pointers, Sorting
- **Companies**: Various companies
- **Key Concepts**: Dutch national flag algorithm, three-way partitioning

#### 4. Top K Frequent Elements

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/top-k-frequent-elements/
- **Category**: Hash Table, Heap, Sorting
- **Companies**: Various companies
- **Key Concepts**: Frequency counting, heap operations

#### 5. Kth Largest Element in an Array

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/kth-largest-element-in-an-array/
- **Category**: Array, Divide and Conquer, Sorting
- **Companies**: Various companies
- **Key Concepts**: Quickselect algorithm, partition

#### 6. Find Peak Element

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/find-peak-element/
- **Category**: Array, Binary Search
- **Companies**: Various companies
- **Key Concepts**: Binary search, peak finding

#### 7. Search for a Range

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/search-for-a-range/
- **Category**: Array, Binary Search
- **Companies**: Various companies
- **Key Concepts**: Binary search variations, range finding

#### 8. Merge Intervals

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/merge-intervals/
- **Category**: Array, Sorting
- **Companies**: Various companies
- **Key Concepts**: Interval merging, sorting

#### 9. Search in Rotated Sorted Array

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/
- **Category**: Array, Binary Search
- **Companies**: Various companies
- **Key Concepts**: Binary search in rotated array

#### 10. Meeting Rooms II

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/meeting-rooms-ii/
- **Category**: Heap, Greedy, Sorting
- **Companies**: Various companies
- **Key Concepts**: Interval scheduling, heap usage

#### 11. Search a 2D Matrix II

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/search-a-2d-matrix-ii/
- **Category**: Array, Binary Search, Divide and Conquer
- **Companies**: Various companies
- **Key Concepts**: 2D binary search, matrix traversal

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Binary Search**: For sorted arrays and ranges
2. **Two Pointers**: For merging and partitioning
3. **Heap Operations**: For top-k problems
4. **Quickselect**: For finding kth element
5. **Interval Problems**: For scheduling and merging

### Sorting Algorithms / Thuật toán sắp xếp:

1. **Quick Sort**: O(n log n) average, O(n²) worst
2. **Merge Sort**: O(n log n) guaranteed
3. **Heap Sort**: O(n log n) guaranteed
4. **Counting Sort**: O(n + k) for small range
5. **Radix Sort**: O(d(n + k)) for integers

### Common Mistakes / Lỗi thường gặp:

1. Not handling edge cases in binary search
2. Infinite loops in sorting algorithms
3. Not considering space complexity
4. Missing duplicate handling
5. Incorrect boundary conditions

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete Easy problems (1-2)
- Focus on basic binary search
- Practice merge algorithms

### Week 2: Intermediate

- Complete Medium problems (3-11)
- Practice advanced sorting
- Work on optimization techniques

### Week 3: Advanced

- Revisit problems with different approaches
- Practice algorithm variations
- Focus on edge case handling

## 🔗 Related Topics / Chủ đề liên quan

- [Array Problems](../array/README.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Binary Search

- Used for searching in sorted arrays
- Time complexity: O(log n)
- Space complexity: O(1)

### 2. Quickselect

- Used for finding kth element
- Time complexity: O(n) average
- Space complexity: O(1)

### 3. Dutch National Flag

- Used for three-way partitioning
- Time complexity: O(n)
- Space complexity: O(1)

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Search Problems:

1. How to implement binary search?
2. What are the variations of binary search?
3. How to handle duplicates in search?
4. How to search in rotated arrays?

### Advanced Search Problems:

1. How to search in 2D matrices?
2. How to find peaks in arrays?
3. How to handle multiple search criteria?
4. How to optimize search for large datasets?

## 📝 Code Templates / Mẫu code

### Binary Search Template:

```javascript
function binarySearch(arr, target) {
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
}
```

### Quickselect Template:

```javascript
function quickselect(arr, k) {
  const partition = (left, right) => {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  };

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const pivotIndex = partition(left, right);

    if (pivotIndex === k) {
      return arr[k];
    } else if (pivotIndex < k) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return arr[k];
}
```

### Merge Sort Template:

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}
```

## 🔍 Search Variations / Các biến thể tìm kiếm

### Binary Search Variations:

1. **First Occurrence**: Find first index of target
2. **Last Occurrence**: Find last index of target
3. **Insert Position**: Find where to insert target
4. **Peak Finding**: Find local maximum
5. **Rotated Array**: Search in rotated sorted array

### Sorting Variations:

1. **In-place Sorting**: Modify array without extra space
2. **Stable Sorting**: Preserve relative order of equal elements
3. **Adaptive Sorting**: Faster for partially sorted arrays
4. **External Sorting**: Handle data larger than memory
5. **Parallel Sorting**: Use multiple processors

---

**Next: [Backtracking Problems](../backtracking/README)**
