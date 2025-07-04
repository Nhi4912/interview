# HTML & CSS Interview Preparation

## Table of Contents

- [Core Concepts](#core-concepts)
- [Advanced CSS Features](#advanced-css-features)
- [CSS Layout Systems](#css-layout-systems)
- [Responsive Design](#responsive-design)
- [CSS Architecture](#css-architecture)
- [Performance & Optimization](#performance--optimization)
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

## Advanced CSS Features

### 1. CSS Custom Properties (CSS Variables)

CSS Custom Properties allow you to define reusable values that can be updated dynamically.

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 16px;
  --spacing-unit: 8px;
  --border-radius: 4px;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

/* Dynamic theming */
[data-theme="dark"] {
  --primary-color: #0d6efd;
  --text-color: #ffffff;
  --background-color: #121212;
}
```

**Benefits:**
- Dynamic theming
- Easier maintenance
- JavaScript integration
- Scope-based customization

### 2. CSS Grid Advanced Patterns

```css
/* Complex Grid Layouts */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
  
  /* Named grid lines */
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

/* Subgrid (where supported) */
.grid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

/* Advanced Grid Functions */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  gap: clamp(1rem, 2vw, 2rem);
}
```

### 3. Container Queries

```css
/* Container-based responsive design */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

### 4. Modern CSS Functions

```css
/* Clamp for responsive typography */
.responsive-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
  line-height: clamp(1.2, 1.5vw, 1.6);
}

/* Min/Max for flexible sizing */
.flexible-width {
  width: min(90%, 1200px);
  margin: 0 auto;
}

/* Calc for dynamic calculations */
.dynamic-spacing {
  padding: calc(1rem + 2vw);
  margin-bottom: calc(100vh - 60px);
}

/* CSS Math Functions */
.trigonometry {
  transform: rotate(calc(sin(45deg) * 1rad));
  width: max(200px, 20vw);
}
```

### 5. CSS Logical Properties

```css
/* Traditional physical properties */
.old-way {
  margin-left: 20px;
  margin-right: 20px;
  border-left: 1px solid #ccc;
}

/* Modern logical properties */
.modern-way {
  margin-inline: 20px;
  border-inline-start: 1px solid #ccc;
  padding-block: 1rem;
  inset-inline-start: 10px;
}

/* Benefits for internationalization */
[dir="rtl"] .modern-way {
  /* Automatically adjusts for right-to-left languages */
}
```

### 6. CSS Cascade Layers

```css
/* Define cascade layers */
@layer reset, base, components, utilities;

/* Reset layer */
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

/* Base layer */
@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
}

/* Components layer */
@layer components {
  .button {
    background: blue;
    color: white;
    padding: 0.5rem 1rem;
  }
}

/* Utilities layer */
@layer utilities {
  .text-center {
    text-align: center;
  }
}
```

## CSS Layout Systems

### 1. CSS Grid Mastery

```css
/* Advanced Grid Techniques */
.grid-advanced {
  display: grid;
  
  /* Fractional units and sizing */
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  
  /* Implicit grid handling */
  grid-auto-columns: minmax(200px, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row dense;
  
  /* Alignment */
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  align-content: space-around;
  
  /* Gaps */
  gap: 20px 30px; /* row-gap column-gap */
}

/* Grid item positioning */
.grid-item {
  /* Spanning multiple cells */
  grid-column: span 2;
  grid-row: 1 / 3;
  
  /* Named line positioning */
  grid-column: header-start / main-end;
  
  /* Area assignment */
  grid-area: sidebar;
}

/* Responsive grid without media queries */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### 2. Flexbox Advanced Patterns

```css
/* Advanced Flexbox Techniques */
.flex-advanced {
  display: flex;
  
  /* Direction and wrapping */
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap; /* shorthand */
  
  /* Alignment */
  justify-content: space-between;
  align-items: center;
  align-content: space-around;
  
  /* Gaps (modern browsers) */
  gap: 1rem;
}

/* Flex item control */
.flex-item {
  /* Grow, shrink, basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  flex: 1 0 200px; /* shorthand */
  
  /* Individual alignment */
  align-self: flex-end;
  
  /* Order */
  order: 2;
}

/* Common flexbox patterns */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### 3. Multi-Column Layout

```css
/* CSS Multi-Column Layout */
.multi-column {
  columns: 3;
  column-gap: 2rem;
  column-rule: 1px solid #ccc;
  
  /* Break control */
  break-inside: avoid;
  break-after: column;
  break-before: avoid;
  
  /* Spanning elements */
  .heading {
    column-span: all;
  }
}

/* Responsive columns */
.responsive-columns {
  column-width: 250px;
  column-gap: 1rem;
  column-fill: balance;
}
```

## Responsive Design

### 1. Advanced Media Queries

```css
/* Modern media query techniques */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet styles */
}

@media (orientation: landscape) {
  /* Landscape orientation */
}

@media (hover: hover) and (pointer: fine) {
  /* Devices with hover capability */
  .button:hover {
    background-color: #0056b3;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Respect user's motion preferences */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  /* Dark mode support */
  :root {
    --bg-color: #121212;
    --text-color: #ffffff;
  }
}

/* Container queries */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### 2. Fluid Typography and Spacing

```css
/* Fluid typography */
.fluid-text {
  font-size: clamp(1rem, 4vw, 2.5rem);
  line-height: clamp(1.2, 1.5vw, 1.6);
}

/* Fluid spacing */
.fluid-spacing {
  padding: clamp(1rem, 5vw, 3rem);
  margin-bottom: clamp(2rem, 8vw, 6rem);
}

/* Responsive units */
.responsive-units {
  width: min(90%, 1200px);
  height: max(400px, 50vh);
  padding: calc(1rem + 2vw);
}
```

### 3. Advanced Responsive Images

```html
<!-- Responsive images with art direction -->
<picture>
  <source media="(min-width: 800px)" srcset="hero-desktop.jpg">
  <source media="(min-width: 400px)" srcset="hero-tablet.jpg">
  <img src="hero-mobile.jpg" alt="Hero image">
</picture>

<!-- Responsive images with density -->
<img srcset="
  image-320w.jpg 320w,
  image-640w.jpg 640w,
  image-960w.jpg 960w,
  image-1280w.jpg 1280w
" sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         (max-width: 960px) 900px,
         1200px"
     src="image-960w.jpg" alt="Responsive image">
```

```css
/* CSS responsive images */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16/9;
}

/* Modern image techniques */
.modern-image {
  background-image: 
    image-set(
      url('image.webp') 1x,
      url('image@2x.webp') 2x
    );
  background-size: cover;
  background-position: center;
}
```

## CSS Architecture

### 1. BEM (Block Element Modifier) Methodology

```css
/* BEM naming convention */
.card { /* Block */
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card__header { /* Element */
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.card__body { /* Element */
  line-height: 1.6;
}

.card__footer { /* Element */
  margin-top: 1rem;
  text-align: right;
}

.card--featured { /* Modifier */
  border-color: #007bff;
  background-color: #f8f9fa;
}

.card--large { /* Modifier */
  padding: 2rem;
}

.card__header--centered { /* Element with modifier */
  text-align: center;
}
```

### 2. CUBE CSS Methodology

```css
/* CUBE CSS: Composition, Utilities, Blocks, Exceptions */

/* Composition */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space, 1rem);
}

.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 1rem);
  justify-content: flex-start;
  align-items: center;
}

/* Utilities */
.text-center { text-align: center; }
.text-large { font-size: 1.25rem; }
.visually-hidden { 
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Blocks */
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Exceptions */
.card[data-variant="featured"] {
  border-color: #007bff;
  background-color: #f8f9fa;
}
```

### 3. CSS-in-JS Patterns

```css
/* CSS-in-JS considerations */
.component {
  /* Avoid deep nesting */
  & .child {
    color: blue;
  }
  
  /* Use CSS custom properties for theming */
  background-color: var(--component-bg, #fff);
  color: var(--component-text, #000);
}

/* Styled-components patterns */
.styled-button {
  /* Dynamic styles based on props */
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.5rem 1rem'};
  
  /* Responsive styles */
  @media (min-width: 768px) {
    padding: ${props => props.size === 'large' ? '1.5rem 3rem' : '0.75rem 1.5rem'};
  }
}
```

## Performance & Optimization

### 1. Critical CSS

```css
/* Critical CSS - Above the fold styles */
.critical {
  /* Header styles */
  .header {
    background: #fff;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  /* Navigation styles */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  
  /* Hero section styles */
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
  }
}
```

### 2. CSS Optimization Techniques

```css
/* Efficient selectors */
/* ✅ Good - specific and efficient */
.navigation-item {
  color: blue;
}

/* ❌ Bad - overly specific */
body > div > ul > li > a {
  color: blue;
}

/* ✅ Good - use classes instead of complex selectors */
.nav-link {
  color: blue;
}

/* CSS containment for performance */
.widget {
  contain: layout style paint;
}

.isolated-component {
  contain: strict;
}

/* Optimized animations */
.animated-element {
  /* Use transform and opacity for smooth animations */
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.animated-element.hidden {
  transform: translateX(-100%);
  opacity: 0;
}

/* GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0); /* Force GPU layer */
  will-change: transform; /* Hint to browser */
}
```

### 3. Loading Strategies

```html
<!-- Critical CSS inline -->
<style>
  /* Critical styles here */
  .header { /* ... */ }
  .hero { /* ... */ }
</style>

<!-- Non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- CSS modules -->
<link rel="stylesheet" href="components.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
```

### 4. CSS Metrics and Monitoring

```css
/* Performance-friendly CSS */
.performance-optimized {
  /* Avoid expensive properties */
  /* box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
  
  /* Use outline instead of box-shadow for focus */
  outline: 2px solid #007bff;
  outline-offset: 2px;
  
  /* Efficient transforms */
  transform: translate3d(0, 0, 0);
  
  /* Reduce paint complexity */
  border-radius: 4px; /* Simple radius */
  background: #fff; /* Solid colors */
}

/* Layout thrashing prevention */
.layout-stable {
  /* Avoid changing layout properties */
  /* width, height, margin, padding, border */
  
  /* Use transform instead */
  transform: scale(1.1);
  
  /* Use opacity instead of visibility */
  opacity: 0;
}
```

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
