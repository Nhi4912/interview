# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a comprehensive frontend interview preparation repository specifically designed for Big Tech companies (Google, Meta, Amazon, Microsoft, Apple, Netflix, etc.). The repository contains structured learning materials, coding problems, and solutions for frontend engineers with 2-5 years of experience.

## Architecture and Structure

### Core Components

1. **Frontend Interview Materials** (`frontend/`):
   - `javascript/fundamentals.md` - Core JavaScript concepts and patterns
   - `react/core.md` - React fundamentals and advanced patterns
   - `html-css/` - Semantic HTML and modern CSS techniques
   - `system-design/` - Frontend architecture and scalability patterns
   - `performance/` - Optimization strategies and Core Web Vitals
   - `testing/` - Unit, integration, and E2E testing approaches
   - `security/` - XSS prevention, CSRF protection, and security best practices
   - `accessibility/` - WCAG compliance and inclusive design
   - `internationalization/` - i18n implementation and cultural adaptation

2. **Coding Problems** (`frontend/coding-problems/`):
   - 15+ practical coding challenges with solutions
   - DOM manipulation, React components, algorithms, and performance optimization
   - Each problem includes requirements, complete solutions, and CSS styling

3. **Algorithm Practice** (`leetcode/`):
   - 100+ categorized LeetCode problems in TypeScript
   - Organized by topic: Array, String, Tree/Graph, Dynamic Programming, etc.
   - Complete solutions with explanations
   - Main export file: `leetcode/index.ts`

4. **Interview Preparation**:
   - `interview-checklist.md` - 6-week preparation roadmap
   - `progress-tracker.md` - Skills assessment and progress tracking
   - Company-specific preparation guidelines

## Development Commands

**Note**: This repository contains educational materials and does not have build commands or package.json files. All code examples are provided as standalone solutions or documentation.

### Working with TypeScript Problems

The LeetCode problems are written in TypeScript and can be executed with:
```bash
# Navigate to the leetcode directory
cd leetcode

# Run with ts-node (if available)
npx ts-node index.ts

# Or compile and run
tsc index.ts && node index.js
```

### Testing Code Examples

Most code examples in the repository are self-contained and can be:
1. Copied into a local development environment
2. Tested in browser developer tools
3. Integrated into existing projects for practice

## Key Learning Paths

### For Algorithm Practice
- Start with `leetcode/array/` for fundamental data structure problems
- Progress through topics based on difficulty and interview frequency
- Use `leetcode/index.ts` to understand the problem organization

### For Frontend Skills
- Begin with `frontend/javascript/fundamentals.md` for core concepts
- Practice with `frontend/coding-problems/` for hands-on implementation
- Study `frontend/system-design/` for architectural understanding
- Focus on `frontend/performance/` for optimization techniques

### For Interview Preparation
- Follow the structured plan in `interview-checklist.md`
- Use `progress-tracker.md` to assess skill levels
- Practice with company-specific challenges in `frontend/projects/`

## Code Patterns and Conventions

### TypeScript/JavaScript
- Modern ES6+ syntax with destructuring, async/await, and arrow functions
- Type safety with TypeScript interfaces and generics
- Functional programming patterns where appropriate
- Performance-optimized algorithms with clear complexity analysis

### React Patterns
- Functional components with hooks
- Custom hooks for reusable logic
- Error boundaries and performance optimization
- Proper state management and component composition

### CSS/Styling
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Modern CSS features (custom properties, logical properties)
- Performance-conscious styling practices

## Common Tasks

### Adding New Problems
1. Create problem files in appropriate category directories
2. Include problem statement, requirements, and complete solution
3. Add CSS styling and usage examples
4. Update the main index files if needed

### Reviewing Solutions
1. Check algorithm time/space complexity
2. Verify edge case handling
3. Ensure code readability and maintainability
4. Validate performance optimization techniques

### Testing Code Examples
1. Copy code into a development environment
2. Test with various input scenarios
3. Verify cross-browser compatibility for frontend code
4. Check accessibility compliance for UI components

## Interview Focus Areas

### Technical Skills
- Data structures and algorithms proficiency
- Frontend framework expertise (React, Vue, Angular)
- Performance optimization and web vitals
- Security best practices and accessibility
- Modern development tools and practices

### Problem-Solving Approach
- Breaking down complex problems into manageable parts
- Considering multiple solutions and trade-offs
- Explaining technical concepts clearly
- Demonstrating scalability and maintainability thinking

### Communication Skills
- Articulating technical decisions and reasoning
- Collaborative problem-solving approaches
- Asking clarifying questions
- Providing constructive feedback

## Success Metrics

The repository tracks preparation progress through:
- **Technical Competency**: Algorithm problem-solving ability
- **Implementation Skills**: Practical coding challenge completion
- **System Thinking**: Architecture and design pattern understanding
- **Communication**: Ability to explain solutions and trade-offs

## Important Notes

- All code examples are designed for educational purposes
- Solutions prioritize clarity and learning over brevity
- Each problem includes multiple approaches when applicable
- Focus on understanding concepts rather than memorizing solutions
- Practice explaining solutions out loud to prepare for interviews

This repository serves as a comprehensive resource for frontend engineers preparing for Big Tech interviews, with emphasis on practical skills, algorithmic thinking, and industry best practices.