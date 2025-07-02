# HTML/CSS Interview Preparation Guide

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

### CSS Fundamentals

#### 1. Box Model

**Definition**: Every HTML element is treated as a box with content, padding, border, and margin.

**Components**:

- Content: The actual content of the element
- Padding: Space between content and border
- Border: The border around the element
- Margin: Space outside the border

#### 2. CSS Selectors

**Definition**: Patterns used to select and style HTML elements.

**Types**:

- Element selectors: `div`, `p`, `h1`
- Class selectors: `.class-name`
- ID selectors: `#id-name`
- Attribute selectors: `[attribute=value]`
- Pseudo-classes: `:hover`, `:focus`, `:nth-child()`
- Pseudo-elements: `::before`, `::after`

#### 3. CSS Layout Systems

**Definition**: Methods for controlling how elements are positioned and arranged.

**Types**:

- Normal flow
- Flexbox
- Grid
- Float
- Position (relative, absolute, fixed, sticky)

## Common Interview Questions

### HTML Questions

#### Q1: What is the difference between `<div>` and `<span>`?

**Answer**:

- `<div>` is a block-level element that starts on a new line and takes full width
- `<span>` is an inline element that doesn't start on a new line and only takes necessary width
- `<div>` is used for larger content blocks, `<span>` for smaller text portions

**Example**:

```html
<div>This is a block element</div>
<span>This is an inline element</span>
```

#### Q2: Explain the difference between GET and POST methods

**Answer**:

- **GET**: Used to retrieve data, parameters in URL, limited data size, cacheable, bookmarkable
- **POST**: Used to submit data, parameters in request body, unlimited data size, not cacheable, not bookmarkable

#### Q3: What are data attributes and how do you use them?

**Answer**:
Data attributes (`data-*`) allow storing custom data on HTML elements.

```html
<div data-user-id="123" data-role="admin">User Info</div>
```

```javascript
const element = document.querySelector("div");
const userId = element.dataset.userId; // "123"
```

### CSS Questions

#### Q1: Explain CSS specificity

**Answer**:
CSS specificity determines which styles are applied when multiple rules target the same element.

**Specificity Hierarchy** (highest to lowest):

1. Inline styles (`style="..."`)
2. ID selectors (`#id`)
3. Class selectors (`.class`), attributes (`[attr]`), pseudo-classes (`:hover`)
4. Element selectors (`div`, `p`)

**Calculation**:

- Inline: 1000 points
- ID: 100 points
- Class/Attribute/Pseudo-class: 10 points
- Element: 1 point

#### Q2: What is the difference between `display: none` and `visibility: hidden`?

**Answer**:

- `display: none`: Removes element from layout completely, no space taken
- `visibility: hidden`: Hides element but preserves space in layout

#### Q3: Explain CSS Grid vs Flexbox

**Answer**:
**Flexbox**:

- One-dimensional layout (row or column)
- Content-based sizing
- Better for component layouts

**Grid**:

- Two-dimensional layout (rows and columns)
- Container-based sizing
- Better for page layouts

#### Q4: What is the CSS cascade?

**Answer**:
The cascade determines how conflicting CSS rules are resolved based on:

1. Origin (user agent, user, author)
2. Specificity
3. Source order (later rules override earlier ones)

### Advanced Questions

#### Q1: How would you create a responsive design?

**Answer**:

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

#### Q2: Explain CSS preprocessors (Sass, Less)

**Answer**:
CSS preprocessors extend CSS with features like:

- Variables
- Nesting
- Mixins
- Functions
- Mathematical operations

**Sass Example**:

```scss
$primary-color: #007bff;

.button {
  background-color: $primary-color;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &--large {
    padding: 20px;
  }
}
```

#### Q3: How do you optimize CSS performance?

**Answer**:

1. **Minify CSS**: Remove whitespace and comments
2. **Use efficient selectors**: Avoid deep nesting
3. **Reduce specificity conflicts**: Use BEM methodology
4. **Critical CSS**: Inline above-the-fold styles
5. **CSS-in-JS**: Only load styles for rendered components
6. **Purge unused CSS**: Remove dead code

## Advanced Topics

### CSS Architecture

#### 1. BEM Methodology

**Definition**: Block Element Modifier methodology for naming CSS classes.

**Structure**:

- Block: `.block`
- Element: `.block__element`
- Modifier: `.block--modifier` or `.block__element--modifier`

**Example**:

```css
.card {
}
.card__title {
}
.card__content {
}
.card--featured {
}
.card__title--large {
}
```

#### 2. CSS Custom Properties

**Definition**: CSS variables that can be reused throughout stylesheets.

```css
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}
```

### Modern CSS Features

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
