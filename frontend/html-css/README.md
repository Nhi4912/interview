# HTML & CSS Interview Preparation

## Table of Contents

- [Core Concepts](#core-concepts)
- [Common Interview Questions](#common-interview-questions)
- [Advanced Topics](#advanced-topics)
- [Best Practices](#best-practices)
- [Practice Problems](#practice-problems)

## Core Concepts

### HTML Fundamentals

#### 1. Semantic HTML

**Definition**: Semantic HTML uses meaningful tags that clearly describe their purpose to both browsers and developers.

**Key Elements**:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- `<h1>` to `<h6>` for headings
- `<p>` for paragraphs
- `<ul>`, `<ol>`, `<li>` for lists
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>` for tables

**Benefits**:

- Better SEO
- Improved accessibility
- Cleaner code structure
- Better screen reader support

#### 2. HTML5 Features

**Definition**: Modern HTML standard with new semantic elements, APIs, and multimedia support.

**Key Features**:

- Semantic elements
- Canvas and SVG
- Audio and video elements
- Form enhancements
- Local storage
- Web workers
- Geolocation API

#### 3. Accessibility (a11y)

**Definition**: Making web content usable by people with disabilities.

**Key Concepts**:

- ARIA attributes
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Alt text for images

#### 4. Document Structure

**Definition**: DOCTYPE, html, head, body elements

#### 5. Meta Tags

**Definition**: SEO, viewport, charset, social media tags

#### 6. Forms

**Definition**: Input types, validation, accessibility

### CSS Fundamentals

#### 1. Box Model

**Definition**: Every HTML element is treated as a box with content, padding, border, and margin.

**Components**:

- Content: The actual content of the element
- Padding: Space between content and border
- Border: The border around the element
- Margin: Space outside the border

#### 2. Positioning

**Definition**: Methods for controlling the position of elements.

**Types**:

- Static: Default position
- Relative: Positioned relative to its normal position
- Absolute: Positioned relative to the nearest positioned ancestor
- Fixed: Positioned relative to the viewport
- Sticky: Positioned based on scroll position

#### 3. Display Properties

**Definition**: Methods for displaying elements.

**Types**:

- Block: Takes up full width of parent
- Inline: Does not start on a new line
- Inline-block: Like inline but can set dimensions
- Flex: One-dimensional layout
- Grid: Two-dimensional layout

#### 4. Selectors

**Definition**: Patterns used to select and style HTML elements.

**Types**:

- Element selectors: `div`, `p`, `h1`
- Class selectors: `.class-name`
- ID selectors: `#id-name`
- Attribute selectors: `[attribute=value]`
- Pseudo-classes: `:hover`, `:focus`, `:nth-child()`
- Pseudo-elements: `::before`, `::after`

#### 5. Specificity

**Definition**: How CSS rules are prioritized.

#### 6. Cascade

**Definition**: How styles are inherited and overridden.

### CSS Layout Systems

#### 1. Flexbox

**Definition**: One-dimensional layout method for arranging items in rows or columns.

#### 2. CSS Grid

**Definition**: Two-dimensional layout system for creating complex web layouts.

### CSS Custom Properties

**Definition**: CSS variables that can be reused throughout stylesheets.

## Common Interview Questions

### HTML Questions

#### Q1: What is semantic HTML and why is it important?

**Answer**:
Semantic HTML uses meaningful tags that describe their content and purpose. Benefits include:

- Better accessibility for screen readers
- Improved SEO and search engine understanding
- Cleaner, more maintainable code
- Better developer experience

**Example**:

```html
<!-- Non-semantic -->
<div class="header">...</div>
<div class="nav">...</div>

<!-- Semantic -->
<header>...</header>
<nav>...</nav>
```

#### Q2: Explain the difference between GET and POST methods in forms.

**Answer**:

- **GET**: Data is sent in URL parameters, visible in browser history, limited data size, idempotent
- **POST**: Data is sent in request body, not visible in URL, unlimited data size, not idempotent

#### Q3: What are ARIA attributes and when should you use them?

**Answer**:
ARIA (Accessible Rich Internet Applications) attributes provide additional information to assistive technologies:

- `aria-label`: Provides accessible name
- `aria-describedby`: Links to descriptive text
- `aria-hidden`: Hides elements from screen readers
- `aria-expanded`: Indicates expandable content state

### CSS Questions

#### Q1: Explain the CSS box model.

**Answer**:
The box model consists of:

- **Content**: The actual content area
- **Padding**: Space between content and border
- **Border**: The border around the element
- **Margin**: Space outside the border

**Example**:

```css
/* Box model visualization */
.element {
  width: 200px; /* Content width */
  padding: 20px; /* Inner spacing */
  border: 2px solid; /* Border */
  margin: 10px; /* Outer spacing */
  box-sizing: border-box; /* Include padding/border in width */
}
```

#### Q2: What's the difference between display: none and visibility: hidden?

**Answer**:

- `display: none`: Removes element from layout completely, no space taken
- `visibility: hidden`: Hides element but preserves space in layout

#### Q3: Explain CSS specificity and how it works.

**Answer**:
Specificity determines which CSS rules apply when there are conflicts:

1. Inline styles (1000)
2. ID selectors (100)
3. Class selectors, attributes, pseudo-classes (10)
4. Element selectors, pseudo-elements (1)

**Example**:

```css
#header .nav a {
} /* Specificity: 111 */
.nav a {
} /* Specificity: 11 */
a {
} /* Specificity: 1 */
```

## Advanced Topics

### CSS Layout Systems

#### 1. CSS Grid

**Definition**: Two-dimensional layout system for creating complex web layouts.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

#### 2. CSS Flexbox

**Definition**: One-dimensional layout method for arranging items in rows or columns.

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
```

### Responsive Design

#### 1. Media Queries

**Definition**: Breakpoints and responsive strategies.

```css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}
```

#### 2. Mobile-First Design

**Definition**: Progressive enhancement approach.

#### 3. Fluid Typography

**Definition**: Scalable text sizing.

#### 4. Responsive Images

**Definition**: Picture element, srcset, sizes.

### Performance & Optimization

#### 1. Critical CSS

**Definition**: Above-the-fold styles.

#### 2. CSS Optimization

**Definition**: Minification, purging, tree-shaking.

#### 3. CSS Loading Strategies

**Definition**: Critical, async, preload.

#### 4. CSS Architecture

**Definition**: BEM, SMACSS, ITCSS.

## Best Practices

### 1. Semantic HTML

- Use appropriate semantic elements
- Provide meaningful alt text for images
- Use proper heading hierarchy
- Include ARIA labels when needed

### 2. CSS Organization

- Follow a consistent naming convention (BEM)
- Group related styles together
- Use comments to document complex rules
- Keep specificity low when possible

### 3. Performance

- Minimize CSS file size
- Use efficient selectors
- Avoid expensive properties (box-shadow, border-radius)
- Leverage CSS containment

### 4. Accessibility

- Ensure sufficient color contrast
- Provide focus indicators
- Use semantic HTML
- Test with screen readers

## Practice Problems

### Problem 1: Create a Responsive Card Layout

Create a responsive grid of cards that adapts to different screen sizes.

### Problem 2: Build a Navigation Menu

Create a horizontal navigation menu that becomes a hamburger menu on mobile.

### Problem 3: Implement a Modal

Build a modal dialog with backdrop and close functionality.

### Problem 4: Create a CSS-only Accordion

Build an accordion component using only CSS (no JavaScript).

### Problem 5: Design a Pricing Table

Create a responsive pricing table with hover effects and feature lists.

---

_This guide covers the essential HTML/CSS concepts needed for frontend interviews at Big Tech companies. Focus on understanding the fundamentals, practicing common patterns, and being able to explain your design decisions._
