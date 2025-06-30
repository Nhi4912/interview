# Math Problems - LeetCode Collection

**Bộ sưu tập bài tập Math từ LeetCode cho phỏng vấn Big Tech**

## 📋 Problem List / Danh sách bài tập

### Easy Level / Mức độ dễ

#### 1. Fizz Buzz

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/fizz-buzz/
- **Category**: Math, String
- **Companies**: Google, Amazon, Microsoft, Facebook
- **Key Concepts**: Modulo operation, string concatenation

#### 2. Count Primes

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/count-primes/
- **Category**: Math, Hash Table
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Sieve of Eratosthenes, prime number generation

#### 3. Power of Three

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/power-of-three/
- **Category**: Math
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Logarithm, mathematical properties

#### 4. Roman to Integer

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/roman-to-integer/
- **Category**: Math, String
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Roman numeral rules, mapping

### Medium Level / Mức độ trung bình

#### 5. Happy Number

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/happy-number/
- **Category**: Math, Hash Table
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Cycle detection, mathematical sequence

#### 6. Factorial Trailing Zeroes

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/factorial-trailing-zeroes/
- **Category**: Math
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Prime factorization, counting factors

#### 7. Excel Sheet Column Number

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/excel-sheet-column-number/
- **Category**: Math, String
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Base conversion, string to number

#### 8. Pow(x, n)

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/powx-n/
- **Category**: Math, Recursion
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Fast power algorithm, binary exponentiation

#### 9. Sqrt(x)

- **Difficulty**: Easy
- **LeetCode Link**: https://leetcode.com/problems/sqrtx/
- **Category**: Math, Binary Search
- **Companies**: Amazon, Google, Microsoft, Facebook
- **Key Concepts**: Binary search, integer square root

#### 10. Divide Two Integers

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/divide-two-integers/
- **Category**: Math, Bit Manipulation
- **Companies**: Amazon, Google, Microsoft
- **Key Concepts**: Bit shifting, long division

#### 11. Fraction to Recurring Decimal

- **Difficulty**: Medium
- **LeetCode Link**: https://leetcode.com/problems/fraction-to-recurring-decimal/
- **Category**: Math, Hash Table
- **Companies**: Google, Amazon, Microsoft
- **Key Concepts**: Long division, cycle detection

## 🎯 Study Tips / Mẹo học tập

### Common Patterns / Các mẫu thường gặp:

1. **Modulo Operations**: For divisibility and remainders
2. **Bit Manipulation**: For power operations and division
3. **Mathematical Properties**: Using number theory
4. **Binary Search**: For finding square roots and powers
5. **Cycle Detection**: For sequences and loops

### Mathematical Concepts / Khái niệm toán học:

1. **Prime Numbers**: Sieve algorithm, primality testing
2. **Number Systems**: Base conversion, Roman numerals
3. **Exponentiation**: Fast power, binary exponentiation
4. **Divisibility**: GCD, LCM, factors
5. **Sequences**: Mathematical patterns and cycles

### Common Mistakes / Lỗi thường gặp:

1. Not handling overflow cases
2. Forgetting negative numbers
3. Inefficient algorithms for large numbers
4. Missing edge cases (0, 1, negative)
5. Not considering mathematical properties

## 📊 Practice Strategy / Chiến lược luyện tập

### Week 1: Foundation

- Complete Easy problems (1-4)
- Focus on basic mathematical operations
- Practice modulo and bit manipulation

### Week 2: Intermediate

- Complete Medium problems (5-11)
- Practice advanced algorithms
- Work on optimization techniques

### Week 3: Advanced

- Revisit problems with different approaches
- Practice mathematical thinking
- Focus on edge case handling

## 🔗 Related Topics / Chủ đề liên quan

- [Bit Manipulation](./bit-manipulation.md)
- [Number Theory](./number-theory.md)
- [Mathematical Algorithms](./math-algorithms.md)
- [Optimization Techniques](./optimization.md)

## 💡 Key Algorithms / Thuật toán quan trọng

### 1. Sieve of Eratosthenes

- Used for prime number generation
- Time complexity: O(n log log n)
- Space complexity: O(n)

### 2. Fast Power Algorithm

- Used for exponentiation
- Time complexity: O(log n)
- Space complexity: O(1)

### 3. Binary Search for Square Root

- Used for finding integer square root
- Time complexity: O(log n)
- Space complexity: O(1)

## 🎯 Common Interview Questions / Câu hỏi phỏng vấn thường gặp

### Basic Math Problems:

1. How to check if a number is prime?
2. How to find the greatest common divisor?
3. How to convert between number systems?
4. How to handle overflow in calculations?

### Advanced Math Problems:

1. How to find the nth prime number?
2. How to solve Diophantine equations?
3. How to work with large numbers?
4. How to optimize mathematical algorithms?

## 📝 Code Templates / Mẫu code

### Prime Number Check:

```javascript
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
```

### Fast Power:

```javascript
function fastPower(x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;

  const half = fastPower(x, Math.floor(n / 2));
  if (n % 2 === 0) {
    return half * half;
  } else {
    return half * half * x;
  }
}
```

### GCD Calculation:

```javascript
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
```

## 🔍 Mathematical Properties / Tính chất toán học

### Divisibility Rules:

1. **2**: Last digit is even
2. **3**: Sum of digits is divisible by 3
3. **5**: Last digit is 0 or 5
4. **9**: Sum of digits is divisible by 9
5. **11**: Alternating sum is divisible by 11

### Number Properties:

1. **Prime Factorization**: Every number has unique prime factors
2. **Euler's Totient**: Count of numbers coprime to n
3. **Wilson's Theorem**: (p-1)! ≡ -1 (mod p) for prime p
4. **Fermat's Little Theorem**: a^(p-1) ≡ 1 (mod p) for prime p

### Optimization Techniques:

1. **Memoization**: Cache computed results
2. **Mathematical Identities**: Use known formulas
3. **Bit Manipulation**: Use bit operations for efficiency
4. **Approximation**: Use estimation for large numbers

---

**Next: [System Design Fundamentals](../system-design/fundamentals.md)**
