# CSS Interview Questions & Answers

## 🎯 CSS Box Model Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                         MARGIN                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    BORDER                           │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │                 PADDING                     │    │    │
│  │  │  ┌─────────────────────────────────────┐    │    │    │
│  │  │  │             CONTENT                 │    │    │    │
│  │  │  │                                     │    │    │    │
│  │  │  │   Width: 200px                     │    │    │    │
│  │  │  │   Height: 100px                    │    │    │    │
│  │  │  └─────────────────────────────────────┘    │    │    │
│  │  │  Padding: 20px                              │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │  Border: 5px                                         │    │
│  └─────────────────────────────────────────────────────┘    │
│  Margin: 10px                                                │
└─────────────────────────────────────────────────────────────┘

Total Width = Content(200) + Padding(40) + Border(10) + Margin(20) = 270px
Total Height = Content(100) + Padding(40) + Border(10) + Margin(20) = 170px
```

## 🎯 Progressive Interview Questions

### 🟢 BEGINNER LEVEL

#### Q1: What is the CSS Box Model?

**Answer:**
The CSS Box Model describes how elements are structured and how their dimensions are calculated.

**Components:**
1. **Content** - The actual content (text, images)
2. **Padding** - Space between content and border
3. **Border** - Line around the padding
4. **Margin** - Space outside the border

**Box-Sizing Property:**
```css
/* Content-box (default) */
.content-box {
    box-sizing: content-box;
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 200 + 40 + 10 = 250px */
}

/* Border-box (includes padding and border) */
.border-box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 200px (content adjusts to 150px) */
}

/* Universal box-sizing reset */
*, *::before, *::after {
    box-sizing: border-box;
}
```

#### Q2: Explain CSS specificity and how it works.

**Answer:**
CSS specificity determines which styles are applied when multiple rules target the same element.

**Specificity Hierarchy (highest to lowest):**

```
┌─────────────────────────────────────────────────────────────┐
│                    CSS SPECIFICITY                          │
│                                                             │
│  1. Inline Styles         │ style="color: red"    │ 1000   │
│  2. IDs                   │ #header               │ 100    │
│  3. Classes/Attributes    │ .nav, [type="text"]   │ 10     │
│  4. Elements              │ div, p, a             │ 1      │
│  5. Universal (*)         │ *                     │ 0      │
│                                                             │
│  !important overrides all (use sparingly)                  │
└─────────────────────────────────────────────────────────────┘
```

**Calculation Examples:**
```css
/* Specificity: 0001 */
p { color: blue; }

/* Specificity: 0010 */
.text { color: green; }

/* Specificity: 0100 */
#header { color: red; }

/* Specificity: 0111 */
#header .nav p { color: purple; }

/* Specificity: 1000 */
/* <p style="color: orange;">Text</p> */

/* Always wins (unless another !important is more specific) */
p { color: black !important; }
```

**Visual Example:**
```html
<div id="container" class="main">
    <p class="text highlight">Hello World</p>
</div>
```

```css
p { color: blue; }                    /* 0001 */
.text { color: green; }               /* 0010 */
.highlight { color: red; }            /* 0010 - later in CSS, wins over .text */
#container p { color: purple; }       /* 0101 - WINS */
.main .text { color: orange; }        /* 0020 */
```

#### Q3: What are CSS selectors and their types?

**Answer:**
CSS selectors are patterns used to select elements for styling.

**Basic Selectors:**
```css
/* Universal selector */
* { margin: 0; padding: 0; }

/* Type selector */
h1 { font-size: 2em; }

/* Class selector */
.container { width: 100%; }

/* ID selector */
#header { background: blue; }

/* Attribute selector */
input[type="text"] { border: 1px solid gray; }
input[type="email"] { border: 1px solid blue; }
a[href^="https"] { color: green; }     /* Starts with */
a[href$=".pdf"] { color: red; }       /* Ends with */
a[href*="example"] { color: purple; } /* Contains */
```

**Combinators:**
```css
/* Descendant combinator (space) */
.container p { color: blue; }         /* All p inside .container */

/* Child combinator (>) */
.container > p { color: red; }        /* Direct children only */

/* Adjacent sibling (+) */
h1 + p { margin-top: 0; }            /* First p after h1 */

/* General sibling (~) */
h1 ~ p { color: gray; }              /* All p siblings after h1 */
```

**Pseudo-selectors:**
```css
/* Pseudo-classes */
a:hover { color: red; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(3n+1) { color: red; }
p:not(.special) { opacity: 0.8; }

/* Pseudo-elements */
p::before { content: "→ "; }
p::after { content: " ←"; }
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
::selection { background: yellow; }
```

#### Q4: Explain the difference between display: block, inline, and inline-block.

**Answer:**

| Property | Width/Height | Line Breaks | Margin/Padding | Use Cases |
|----------|--------------|-------------|----------------|-----------|
| block | Respected | Before & After | All sides | Divs, headings, paragraphs |
| inline | Ignored | None | Horizontal only | Spans, links, strong |
| inline-block | Respected | None | All sides | Buttons, inline layouts |

**Visual Representation:**
```
BLOCK ELEMENTS:
┌─────────────────────────────────┐
│ <div>Block Element 1</div>      │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ <div>Block Element 2</div>      │
└─────────────────────────────────┘

INLINE ELEMENTS:
<span>Inline</span><span>Elements</span><span>Flow</span>

INLINE-BLOCK ELEMENTS:
┌─────────┐ ┌─────────┐ ┌─────────┐
│Element 1│ │Element 2│ │Element 3│
└─────────┘ └─────────┘ └─────────┘
```

**Examples:**
```css
.block-element {
    display: block;
    width: 200px;
    height: 100px;
    margin: 10px;
    padding: 15px;
    background: lightblue;
}

.inline-element {
    display: inline;
    /* width and height ignored */
    margin: 10px 0; /* vertical margin ignored */
    padding: 5px;
    background: lightgreen;
}

.inline-block-element {
    display: inline-block;
    width: 150px;
    height: 80px;
    margin: 10px;
    padding: 10px;
    background: lightcoral;
    vertical-align: top; /* Control vertical alignment */
}
```

#### Q5: What is Flexbox and how does it work?

**Answer:**
Flexbox is a one-dimensional layout method for arranging items in rows or columns.

**Flexbox Container Properties:**
```css
.flex-container {
    display: flex;
    
    /* Direction */
    flex-direction: row | row-reverse | column | column-reverse;
    
    /* Wrapping */
    flex-wrap: nowrap | wrap | wrap-reverse;
    
    /* Shorthand */
    flex-flow: row wrap;
    
    /* Main axis alignment */
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
    
    /* Cross axis alignment */
    align-items: stretch | flex-start | flex-end | center | baseline;
    
    /* Multi-line cross axis */
    align-content: stretch | flex-start | flex-end | center | space-between | space-around;
    
    /* Gap between items */
    gap: 10px;
    row-gap: 10px;
    column-gap: 15px;
}
```

**Flexbox Visual Guide:**
```
MAIN AXIS (justify-content):
┌─────────────────────────────────────────────────────────┐
│ flex-start:  [1][2][3]                                  │
│ flex-end:                               [1][2][3]       │
│ center:                  [1][2][3]                      │
│ space-between: [1]        [2]        [3]               │
│ space-around:    [1]    [2]    [3]                     │
│ space-evenly:   [1]   [2]   [3]                        │
└─────────────────────────────────────────────────────────┘

CROSS AXIS (align-items):
┌─────────────────────────────────────────────────────────┐
│ flex-start:  [1][2][3]                                  │
│                                                         │
│ center:        [1][2][3]                                │
│                                                         │
│ flex-end:                                               │
│              [1][2][3]                                  │
└─────────────────────────────────────────────────────────┘
```

**Flex Item Properties:**
```css
.flex-item {
    /* Growing and shrinking */
    flex-grow: 1;    /* How much to grow */
    flex-shrink: 1;  /* How much to shrink */
    flex-basis: auto; /* Initial size */
    
    /* Shorthand */
    flex: 1 1 auto; /* grow shrink basis */
    flex: 1; /* Common shorthand for flex: 1 1 0 */
    
    /* Individual alignment */
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    
    /* Order */
    order: 0; /* Default, can be negative */
}
```

**Common Flexbox Patterns:**
```css
/* Equal width columns */
.equal-columns .item {
    flex: 1;
}

/* Sidebar layout */
.sidebar { flex: 0 0 250px; } /* Fixed width sidebar */
.main { flex: 1; }             /* Flexible main content */

/* Center content */
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Responsive navigation */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 20px;
}
```

### 🟡 INTERMEDIATE LEVEL

#### Q6: Explain CSS Grid and its differences from Flexbox.

**Answer:**
CSS Grid is a two-dimensional layout system, while Flexbox is one-dimensional.

**Grid vs Flexbox:**

| Feature | CSS Grid | Flexbox |
|---------|----------|---------|
| Dimensions | 2D (rows & columns) | 1D (row or column) |
| Layout approach | Layout-first | Content-first |
| Use cases | Page layouts | Component layouts |
| Browser support | IE 10+ (with prefixes) | IE 10+ |

**CSS Grid Basics:**
```css
.grid-container {
    display: grid;
    
    /* Define tracks */
    grid-template-columns: 200px 1fr 100px;
    grid-template-rows: auto 1fr auto;
    
    /* Shorthand */
    grid-template: 
        "header header header" auto
        "sidebar main aside" 1fr
        "footer footer footer" auto
        / 200px 1fr 100px;
    
    /* Gap */
    gap: 20px;
    grid-gap: 20px; /* Legacy */
}
```

**Grid Visual Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                    HEADER                               │
├─────────┬─────────────────────────────┬─────────────────┤
│         │                             │                 │
│ SIDEBAR │            MAIN             │      ASIDE      │
│         │                             │                 │
├─────────┴─────────────────────────────┴─────────────────┤
│                    FOOTER                               │
└─────────────────────────────────────────────────────────┘

Grid Areas:
grid-template-areas:
  "header header header"
  "sidebar main aside"  
  "footer footer footer";
```

**Grid Item Properties:**
```css
.grid-item {
    /* Position by line numbers */
    grid-column: 1 / 3;      /* Start line 1, end line 3 */
    grid-row: 2 / 4;
    
    /* Shorthand */
    grid-area: 2 / 1 / 4 / 3; /* row-start/col-start/row-end/col-end */
    
    /* Named areas */
    grid-area: header;
    
    /* Span */
    grid-column: span 2;     /* Span 2 columns */
    grid-row: span 3;        /* Span 3 rows */
    
    /* Alignment */
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
    place-self: center; /* Shorthand for both */
}
```

**Advanced Grid Features:**
```css
.advanced-grid {
    display: grid;
    
    /* Repeat function */
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    /* Fractional units */
    grid-template-columns: 1fr 2fr 1fr; /* 25% 50% 25% */
    
    /* Min/max sizing */
    grid-template-columns: minmax(200px, 1fr) 300px;
    grid-template-rows: min-content max-content;
    
    /* Auto sizing */
    grid-auto-columns: 100px;
    grid-auto-rows: minmax(100px, auto);
    grid-auto-flow: row | column | row dense | column dense;
}
```

**Grid Layout Examples:**
```css
/* Responsive card grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

/* Holy grail layout */
.holy-grail {
    display: grid;
    grid-template: 
        "header header header" auto
        "nav main aside" 1fr
        "footer footer footer" auto
        / 200px 1fr 150px;
    min-height: 100vh;
    gap: 10px;
}

/* Magazine-style layout */
.magazine {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 100px);
    gap: 10px;
}

.featured { grid-area: 1 / 1 / 3 / 4; }
.article-1 { grid-area: 1 / 4 / 2 / 7; }
.article-2 { grid-area: 2 / 4 / 3 / 6; }
.sidebar { grid-area: 2 / 6 / 4 / 7; }
```

#### Q7: What are CSS preprocessors and their benefits?

**Answer:**
CSS preprocessors extend CSS with features like variables, nesting, mixins, and functions.

**Popular Preprocessors:**
- **Sass/SCSS** - Most popular
- **Less** - JavaScript-based
- **Stylus** - Python-inspired syntax

**Sass/SCSS Features:**

**1. Variables:**
```scss
// SCSS Variables
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: 'Helvetica Neue', Helvetica, Arial, sans-serif;
$base-font-size: 16px;

// Maps (like objects)
$colors: (
    primary: #3498db,
    secondary: #2ecc71,
    danger: #e74c3c,
    warning: #f39c12
);

// Usage
.button {
    background-color: $primary-color;
    font-family: $font-stack;
    color: map-get($colors, primary);
}
```

**2. Nesting:**
```scss
.navbar {
    background: $primary-color;
    padding: 1rem;
    
    ul {
        list-style: none;
        margin: 0;
        
        li {
            display: inline-block;
            margin-right: 1rem;
            
            a {
                color: white;
                text-decoration: none;
                
                &:hover {
                    text-decoration: underline;
                }
                
                &.active {
                    font-weight: bold;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        padding: 0.5rem;
        
        ul li {
            display: block;
        }
    }
}
```

**3. Mixins:**
```scss
// Mixin definition
@mixin button-style($bg-color, $text-color: white) {
    background-color: $bg-color;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: darken($bg-color, 10%);
    }
}

// Mixin with content
@mixin respond-to($breakpoint) {
    @if $breakpoint == small {
        @media (max-width: 600px) { @content; }
    }
    @if $breakpoint == medium {
        @media (max-width: 900px) { @content; }
    }
    @if $breakpoint == large {
        @media (min-width: 901px) { @content; }
    }
}

// Usage
.primary-button {
    @include button-style($primary-color);
}

.secondary-button {
    @include button-style($secondary-color, black);
}

.responsive-text {
    font-size: 18px;
    
    @include respond-to(small) {
        font-size: 14px;
    }
    
    @include respond-to(medium) {
        font-size: 16px;
    }
}
```

**4. Functions:**
```scss
// Built-in functions
.element {
    background: lighten($primary-color, 20%);
    border: 1px solid darken($primary-color, 15%);
    color: complement($primary-color);
    opacity: alpha(rgba(255, 255, 255, 0.8));
}

// Custom functions
@function calculate-rem($size) {
    @return #{$size / $base-font-size}rem;
}

@function get-color($key) {
    @return map-get($colors, $key);
}

// Usage
.heading {
    font-size: calculate-rem(24px);
    color: get-color(primary);
}
```

**5. Inheritance:**
```scss
// Placeholder selectors
%button-base {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

%flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

// Usage
.primary-button {
    @extend %button-base;
    background: $primary-color;
    color: white;
    
    &:hover {
        background: darken($primary-color, 10%);
    }
}

.modal {
    @extend %flex-center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
}
```

#### Q8: Explain CSS animations and transitions.

**Answer:**

**CSS Transitions:**
Smooth changes between property values over time.

```css
/* Basic transition */
.element {
    background-color: blue;
    transition: background-color 0.3s ease;
}

.element:hover {
    background-color: red;
}

/* Multiple properties */
.button {
    background: #3498db;
    transform: scale(1);
    opacity: 1;
    
    transition: 
        background 0.3s ease,
        transform 0.2s ease-out,
        opacity 0.3s ease-in;
    
    /* Shorthand */
    transition: all 0.3s ease;
}

.button:hover {
    background: #2980b9;
    transform: scale(1.05);
    opacity: 0.9;
}

/* Transition timing functions */
.timing-examples {
    transition-timing-function: 
        ease |           /* Default, slow-fast-slow */
        linear |         /* Constant speed */
        ease-in |        /* Slow start */
        ease-out |       /* Slow end */
        ease-in-out |    /* Slow start and end */
        cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Custom curve */
}
```

**CSS Animations:**
More complex, keyframe-based animations.

```css
/* Define keyframes */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Alternative percentage syntax */
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-20px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

/* Apply animations */
.slide-in {
    animation: slideIn 0.5s ease-out;
}

.bounce-element {
    animation: 
        bounce 1s ease-in-out infinite,
        fadeIn 0.5s ease-out;
}

/* Animation properties */
.complex-animation {
    animation-name: slideIn;
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
    
    /* Shorthand */
    animation: slideIn 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s infinite alternate both running;
}
```

**Advanced Animation Examples:**
```css
/* Loading spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Typewriter effect */
@keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink {
    50% { border-color: transparent; }
}

.typewriter {
    font-family: monospace;
    border-right: 2px solid;
    white-space: nowrap;
    overflow: hidden;
    animation: 
        typewriter 3s steps(30) 1s both,
        blink 1s step-end infinite;
}

/* Parallax scroll animation */
.parallax {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    animation: parallaxMove 10s ease-in-out infinite alternate;
}

@keyframes parallaxMove {
    0% { background-position: center top; }
    100% { background-position: center bottom; }
}

/* CSS-only hamburger menu animation */
.hamburger {
    cursor: pointer;
}

.hamburger span {
    display: block;
    width: 25px;
    height: 3px;
    background: black;
    margin: 5px 0;
    transition: 0.3s;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}
```

#### Q9: What are CSS custom properties (variables) and how do you use them?

**Answer:**
CSS custom properties allow you to store and reuse values throughout your stylesheet.

**Basic Syntax:**
```css
/* Definition (usually in :root for global scope) */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-large: 24px;
    --spacing-unit: 16px;
    --border-radius: 4px;
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Usage */
.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-large);
    padding: var(--spacing-unit);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

/* Fallback values */
.element {
    color: var(--text-color, #333); /* #333 if --text-color not defined */
    background: var(--bg-color, var(--primary-color, blue)); /* Nested fallbacks */
}
```

**Scope and Inheritance:**
```css
/* Global scope */
:root {
    --global-color: blue;
}

/* Component scope */
.card {
    --card-padding: 20px;
    --card-background: white;
    
    padding: var(--card-padding);
    background: var(--card-background);
}

.card.dark {
    --card-background: #333;
    --text-color: white;
}

/* Child elements inherit custom properties */
.card p {
    color: var(--text-color, black);
}
```

**Dynamic Theming:**
```css
/* Light theme (default) */
:root {
    --bg-color: white;
    --text-color: #333;
    --border-color: #ddd;
    --accent-color: #3498db;
}

/* Dark theme */
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --border-color: #444;
    --accent-color: #5dade2;
}

/* Components use the variables */
body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}

.button {
    background: var(--accent-color);
    border: 1px solid var(--border-color);
    color: var(--bg-color);
}
```

**JavaScript Integration:**
```javascript
// Get custom property value
const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color');

// Set custom property value
document.documentElement.style.setProperty('--primary-color', '#e74c3c');

// Theme switcher
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

// Dynamic color generation
function generateColorScheme(baseColor) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', baseColor);
    root.style.setProperty('--primary-light', lighten(baseColor, 20));
    root.style.setProperty('--primary-dark', darken(baseColor, 20));
}
```

**Advanced Patterns:**
```css
/* Responsive variables */
:root {
    --container-padding: 16px;
    --font-size-base: 14px;
}

@media (min-width: 768px) {
    :root {
        --container-padding: 24px;
        --font-size-base: 16px;
    }
}

@media (min-width: 1024px) {
    :root {
        --container-padding: 32px;
        --font-size-base: 18px;
    }
}

/* Calculated values */
:root {
    --base-size: 16px;
    --scale-ratio: 1.25;
    
    --size-sm: calc(var(--base-size) / var(--scale-ratio));
    --size-lg: calc(var(--base-size) * var(--scale-ratio));
    --size-xl: calc(var(--base-size) * var(--scale-ratio) * var(--scale-ratio));
}

/* Component state variations */
.button {
    --button-bg: var(--primary-color);
    --button-text: white;
    
    background: var(--button-bg);
    color: var(--button-text);
    transition: background-color 0.2s;
}

.button:hover {
    --button-bg: var(--primary-dark);
}

.button:disabled {
    --button-bg: var(--gray-400);
    --button-text: var(--gray-600);
}

.button.secondary {
    --button-bg: transparent;
    --button-text: var(--primary-color);
    border: 1px solid var(--primary-color);
}
```

#### Q10: How do you create responsive layouts in CSS?

**Answer:**
Responsive design ensures websites work well across different devices and screen sizes.

**1. Viewport Meta Tag:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**2. Media Queries:**
```css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
        padding: 24px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
        padding: 32px;
    }
}

/* Large desktop */
@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

/* Desktop-first approach (less common) */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
}

@media (max-width: 1023px) {
    .container {
        max-width: 960px;
        padding: 24px;
    }
}

@media (max-width: 767px) {
    .container {
        width: 100%;
        padding: 16px;
    }
}
```

**3. Responsive Typography:**
```css
/* Fluid typography */
.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /* Min: 24px, Preferred: 4% of viewport width, Max: 48px */
}

/* Media query approach */
h1 {
    font-size: 24px;
}

@media (min-width: 768px) {
    h1 { font-size: 32px; }
}

@media (min-width: 1024px) {
    h1 { font-size: 40px; }
}

/* Viewport units */
.hero-title {
    font-size: 5vw; /* 5% of viewport width */
}

.subtitle {
    font-size: 3vh; /* 3% of viewport height */
}
```

**4. Responsive Grid Systems:**
```css
/* CSS Grid responsive layout */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

/* Responsive columns with breakpoints */
.responsive-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: 768px) {
    .responsive-grid {
        grid-template-columns: 1fr 1fr; /* Tablet: 2 columns */
    }
}

@media (min-width: 1024px) {
    .responsive-grid {
        grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
    }
}

/* Flexbox responsive layout */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.flex-item {
    flex: 1 1 300px; /* Grow, shrink, min-width */
    min-width: 0; /* Allow shrinking below content size */
}
```

**5. Responsive Images:**
```css
/* Basic responsive image */
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* Picture element with different sources */
/* HTML: */
/*
<picture>
    <source media="(min-width: 1024px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
*/

/* CSS for art direction */
.hero-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
}

@media (min-width: 768px) {
    .hero-image {
        height: 400px;
    }
}

/* Responsive background images */
.hero-section {
    background-image: url('mobile-bg.jpg');
    background-size: cover;
    background-position: center;
    height: 300px;
}

@media (min-width: 768px) {
    .hero-section {
        background-image: url('tablet-bg.jpg');
        height: 500px;
    }
}

@media (min-width: 1024px) {
    .hero-section {
        background-image: url('desktop-bg.jpg');
        height: 600px;
    }
}
```

**6. Container Queries (Modern):**
```css
/* Container query - responds to container size, not viewport */
.card-container {
    container-type: inline-size;
}

.card {
    padding: 16px;
}

@container (min-width: 300px) {
    .card {
        display: flex;
        gap: 16px;
    }
}

@container (min-width: 500px) {
    .card {
        padding: 24px;
    }
    
    .card-title {
        font-size: 1.5rem;
    }
}
```

### 🔴 ADVANCED LEVEL

#### Q11: Explain CSS architecture methodologies (BEM, OOCSS, SMACSS).

**Answer:**

**BEM (Block Element Modifier):**
A naming convention for CSS classes that makes code more maintainable.

```css
/* Block: Standalone entity */
.button { }
.menu { }
.card { }

/* Element: Part of a block */
.button__text { }
.menu__item { }
.card__title { }
.card__content { }

/* Modifier: Different states or variations */
.button--primary { }
.button--large { }
.menu__item--active { }
.card--featured { }

/* Real example */
.search-form { /* Block */
    display: flex;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-form__input { /* Element */
    flex: 1;
    padding: 10px;
    border: none;
    outline: none;
}

.search-form__button { /* Element */
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.search-form__button--disabled { /* Modifier */
    background: #ccc;
    cursor: not-allowed;
}

.search-form--compact { /* Modifier */
    border-radius: 20px;
}

.search-form--compact .search-form__input {
    padding: 8px;
}
```

**OOCSS (Object-Oriented CSS):**
Separates structure from skin and container from content.

```css
/* Structure (layout) */
.media {
    display: flex;
    align-items: flex-start;
}

.media__object {
    flex: none;
    margin-right: 1rem;
}

.media__body {
    flex: 1;
}

/* Skin (appearance) */
.theme-primary {
    background-color: #007bff;
    color: white;
}

.theme-secondary {
    background-color: #6c757d;
    color: white;
}

.theme-success {
    background-color: #28a745;
    color: white;
}

/* Combining structure and skin */
.button {
    /* Structure */
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    text-decoration: none;
    cursor: pointer;
    
    /* No skin properties here */
}

/* Apply skin separately */
.button.theme-primary { /* Structure + Skin */ }
.card.theme-secondary { /* Different structure + Same skin */ }

/* Content independence */
.heading-1 { font-size: 2rem; font-weight: bold; }
.heading-2 { font-size: 1.5rem; font-weight: bold; }
.heading-3 { font-size: 1.25rem; font-weight: bold; }

/* Use in any container */
.sidebar .heading-1 { /* No location-specific styles */ }
.main-content .heading-1 { /* Same styles everywhere */ }
```

**SMACSS (Scalable and Modular Architecture for CSS):**
Organizes CSS into categories.

```css
/* 1. Base Rules - Element defaults */
body, form, input, button, table, td, th {
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

a {
    color: #007bff;
    text-decoration: none;
}

/* 2. Layout Rules - Major page sections */
.l-header {
    grid-area: header;
    background: white;
    border-bottom: 1px solid #eee;
}

.l-sidebar {
    grid-area: sidebar;
    width: 250px;
    background: #f8f9fa;
}

.l-main {
    grid-area: main;
    padding: 2rem;
}

.l-footer {
    grid-area: footer;
    background: #333;
    color: white;
}

/* 3. Module Rules - Reusable components */
.card {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
    padding: 0.75rem 1.25rem;
    background: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid #dee2e6;
}

.card-body {
    padding: 1.25rem;
}

.button {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 0.25rem;
    cursor: pointer;
}

/* 4. State Rules - How modules look in different states */
.is-hidden { display: none; }
.is-visible { display: block; }
.is-active { font-weight: bold; }
.is-disabled { opacity: 0.5; pointer-events: none; }
.is-loading { cursor: wait; }

/* State-specific to modules */
.button.is-pressed {
    background: #0056b3;
    border-color: #004085;
}

.nav-item.is-current {
    background: #e9ecef;
    font-weight: bold;
}

/* 5. Theme Rules - Colors, typography for different themes */
.theme-dark {
    background: #1a1a1a;
    color: #f0f0f0;
}

.theme-dark .card {
    background: #2d2d2d;
    border-color: #404040;
    color: #f0f0f0;
}

.theme-dark .button {
    background: #375a7f;
    border-color: #375a7f;
}
```

**Modern CSS Architecture:**
```css
/* Utility-First (like Tailwind CSS) */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.p-4 { padding: 1rem; }
.m-2 { margin: 0.5rem; }
.text-lg { font-size: 1.125rem; }
.text-white { color: white; }
.bg-blue-500 { background-color: #3b82f6; }
.rounded { border-radius: 0.25rem; }

/* Component composition */
.button-primary {
    @apply inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

/* CSS-in-JS approach */
const Button = styled.button`
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: ${props => props.primary ? '#3b82f6' : '#6b7280'};
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    
    &:hover {
        background: ${props => props.primary ? '#2563eb' : '#4b5563'};
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${props => props.primary ? '#3b82f6' : '#6b7280'};
    }
`;
```

#### Q12: How do you optimize CSS performance?

**Answer:**

**1. Minimize and Optimize CSS:**
```css
/* Before optimization */
.navigation-menu {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 16px 24px;
}

.navigation-menu .menu-item {
    display: inline-block;
    margin-right: 24px;
    padding: 8px 16px;
    color: #333333;
    text-decoration: none;
    font-weight: 500;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

/* After optimization (minified in production) */
.nav{background:rgba(255,255,255,.95);box-shadow:0 2px 4px 0 rgba(0,0,0,.1);position:fixed;top:0;left:0;right:0;z-index:1000;padding:16px 24px}.nav-item{display:inline-block;margin-right:24px;padding:8px 16px;color:#333;text-decoration:none;font-weight:500;border-radius:4px;transition:background-color .2s ease}
```

**2. Efficient Selectors:**
```css
/* Slow selectors (avoid) */
* { } /* Universal selector */
.nav ul li a { } /* Deep nesting */
.nav > ul > li > a { } /* Multiple child selectors */
[data-attribute="value"] { } /* Complex attribute selectors */

/* Fast selectors (prefer) */
.nav-link { } /* Single class */
#header { } /* ID selector */
.nav .link { } /* Shallow nesting */

/* Selector performance ranking (fast to slow) */
/* 1. ID: #header */
/* 2. Class: .navigation */
/* 3. Type: div */
/* 4. Attribute: [type="text"] */
/* 5. Pseudo-class: :hover */
/* 6. Universal: * */
```

**3. Critical CSS and Code Splitting:**
```html
<!-- Inline critical CSS -->
<style>
/* Above-the-fold styles */
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; }
.header { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 1rem; text-align: center; }
.hero h1 { font-size: 3rem; margin: 0; }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Load fonts efficiently -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

**4. CSS Architecture for Performance:**
```css
/* Use efficient methodologies */
/* BEM - flat selector hierarchy */
.card { } /* 0,0,1,0 specificity */
.card__title { } /* 0,0,1,0 specificity */
.card__content { } /* 0,0,1,0 specificity */

/* Avoid deep nesting */
/* Bad */
.nav ul li a span.icon { } /* 0,0,1,4 - slow and high specificity */

/* Good */
.nav-icon { } /* 0,0,1,0 - fast and low specificity */

/* Use CSS custom properties for theming */
:root {
    --primary-color: #007bff;
    --text-color: #333;
    --border-radius: 4px;
}

.button {
    background: var(--primary-color);
    color: var(--text-color);
    border-radius: var(--border-radius);
}

/* Change theme by updating custom properties */
[data-theme="dark"] {
    --primary-color: #0056b3;
    --text-color: #f0f0f0;
}
```

**5. Optimize Animations and Transforms:**
```css
/* Use transform and opacity for smooth animations */
.smooth-animation {
    /* These properties are optimized by GPU */
    transform: translateX(0);
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
    
    /* Promote to GPU layer */
    will-change: transform, opacity;
}

.smooth-animation:hover {
    transform: translateX(10px);
    opacity: 0.8;
}

/* Avoid animating expensive properties */
/* Bad - triggers layout and paint */
.expensive-animation {
    transition: width 0.3s, height 0.3s, left 0.3s, top 0.3s;
}

/* Good - only triggers composite */
.efficient-animation {
    transition: transform 0.3s, opacity 0.3s;
}

/* Use contain property for performance */
.animation-container {
    contain: layout style paint;
}

/* Remove will-change after animation */
.element {
    will-change: transform;
    animation: slideIn 0.5s ease-out;
}

.element.animation-done {
    will-change: auto;
}
```

**6. Reduce CSS Bundle Size:**
```javascript
// Use CSS purging tools (PurgeCSS, UnCSS)
// PostCSS configuration
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.html', './src/**/*.js'],
            safelist: [
                'btn-primary',
                'active',
                /^modal-/
            ]
        }),
        require('cssnano')({
            preset: 'default'
        })
    ]
};

// Tree-shake unused CSS modules
import styles from './component.module.css';
// Only imported classes are included in bundle

// Use CSS-in-JS for component-scoped styles
const Button = styled.button`
    /* Only styles for components that are actually used */
    background: ${props => props.primary ? 'blue' : 'gray'};
    padding: 0.5rem 1rem;
`;
```

**7. Performance Monitoring:**
```javascript
// Measure CSS performance
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.name.includes('.css')) {
            console.log(`CSS loaded: ${entry.name} - ${entry.duration}ms`);
        }
    }
});
observer.observe({ entryTypes: ['navigation', 'resource'] });

// Monitor layout thrashing
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Layout stable after resize');
    }, 100);
});

// Use Lighthouse CLI for automated performance auditing
// lighthouse https://example.com --only-categories=performance --output=json
```

## 🎯 Common CSS Interview Traps & Tips

### ❌ Trap 1: Specificity Wars
```css
/* Problem: Escalating specificity */
.nav ul li a { color: blue; }
.nav ul li a.active { color: red; } /* Won't work */
.nav ul li a.active.current { color: red; } /* Specificity arms race */

/* Solution: Flat, BEM-style classes */
.nav-link { color: blue; }
.nav-link--active { color: red; }
```

### ❌ Trap 2: Float vs Flexbox/Grid
```css
/* Old way - floats and clearfix */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

.column {
    float: left;
    width: 33.33%;
}

/* Modern way */
.container {
    display: flex;
    gap: 20px;
}

.column {
    flex: 1;
}
```

### ❌ Trap 3: Vertical Centering
```css
/* Wrong - doesn't work */
.center {
    text-align: center; /* Only horizontal */
    vertical-align: middle; /* Only for table cells */
}

/* Right - multiple solutions */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-center {
    display: grid;
    place-items: center;
}

.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### ✅ Pro Tips:
1. Use logical properties for internationalization
2. Prefer rem/em over px for scalability
3. Use CSS Grid for layouts, Flexbox for components
4. Always include fallbacks for newer CSS features
5. Test on real devices, not just DevTools
6. Use CSS custom properties for maintainable themes