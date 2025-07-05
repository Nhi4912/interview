# Performance Optimization: Complete Interview Guide

## Table of Contents

- [🟢 Beginner Level](#-beginner-level)
  - [Core Web Vitals](#core-web-vitals)
  - [Basic Optimization Techniques](#basic-optimization-techniques)
  - [Image Optimization](#image-optimization)
- [🟡 Intermediate Level](#-intermediate-level)
  - [Critical Rendering Path](#critical-rendering-path)
  - [Code Splitting & Lazy Loading](#code-splitting--lazy-loading)
  - [Caching Strategies](#caching-strategies)
- [🔴 Advanced Level](#-advanced-level)
  - [Performance Monitoring](#performance-monitoring)
  - [Advanced Optimization Techniques](#advanced-optimization-techniques)
  - [Web Workers & Service Workers](#web-workers--service-workers)
- [🎯 Common Interview Traps](#-common-interview-traps)
- [🚀 Follow-up Questions](#-follow-up-questions)
- [💡 Quick Reference](#-quick-reference)
- [🛠️ Practice Problems](#️-practice-problems)

## 🟢 Beginner Level

### Core Web Vitals

#### Q1: What are Core Web Vitals and why are they important?

**Answer:**

Core Web Vitals are Google's set of metrics that measure real-world user experience on web pages.

**Visual Core Web Vitals Timeline:**
```
Page Load Timeline:

0s     1s     2s     3s     4s     5s
|------|------|------|------|------|------|
|                                        |
│                                        │
│ 🟢 FCP                                 │
│ First Contentful Paint                 │
│ Target: < 1.8s                        │
│                                        │
│    🟡 LCP                            │
│    Largest Contentful Paint            │
│    Target: < 2.5s                     │
│                                        │
│ 🔴 FID (throughout page life)         │
│ First Input Delay                      │
│ Target: < 100ms                       │
│                                        │
│ 🟣 CLS (throughout page life)        │
│ Cumulative Layout Shift               │
│ Target: < 0.1                         │
└────────────────────────────────────────┘
```

**The Three Core Web Vitals:**

**1. Largest Contentful Paint (LCP)** - Loading Performance
- **What it measures:** Time until the largest content element is visible
- **Good:** < 2.5 seconds
- **Poor:** > 4.0 seconds
- **Common elements:** Hero images, text blocks, videos

**2. First Input Delay (FID)** - Interactivity
- **What it measures:** Time from first user interaction to browser response
- **Good:** < 100 milliseconds
- **Poor:** > 300 milliseconds
- **Common causes:** Heavy JavaScript execution, large bundles

**3. Cumulative Layout Shift (CLS)** - Visual Stability
- **What it measures:** Unexpected layout shifts during page load
- **Good:** < 0.1
- **Poor:** > 0.25
- **Common causes:** Images without dimensions, dynamic content insertion

**Optimization Strategies:**

```html
<!-- LCP Optimization -->
<link rel="preload" href="hero-image.jpg" as="image">
<img src="hero-image.jpg" alt="Hero" loading="eager">

<!-- CLS Prevention -->
<img src="image.jpg" width="800" height="600" alt="Image">
<div style="aspect-ratio: 16/9;"> <!-- Reserve space -->
  <!-- Dynamic content goes here -->
</div>

<!-- FID Improvement -->
<script defer src="non-critical.js"></script>
```

**Measuring Core Web Vitals:**
```javascript
// Using web-vitals library
import { getCLS, getFID, getFCP, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);

// Manual measurement
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
  }
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });
```

### Basic Optimization Techniques

#### Q2: What are the fundamental techniques for web performance optimization?

**Answer:**

Basic optimization focuses on reducing load times and improving user experience through simple but effective techniques.

**1. Minification and Compression:**
```javascript
// Before minification (readable but larger)
function calculateTotalPrice(items, taxRate) {
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }
  const tax = subtotal * taxRate;
  return subtotal + tax;
}

// After minification (smaller but unreadable)
function calculateTotalPrice(t,a){let e=0;for(let l=0;l<t.length;l++)e+=t[l].price*t[l].quantity;const c=e*a;return e+c}

// Gzip compression reduces size by ~70%
```

**2. Resource Optimization:**
```html
<!-- CSS optimization -->
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="critical.css">
<link rel="stylesheet" href="non-critical.css" media="print" 
      onload="this.media='all'">

<!-- JavaScript optimization -->
<script defer src="app.js"></script>
<script async src="analytics.js"></script>

<!-- Resource hints -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="https://api.example.com">
<link rel="prefetch" href="next-page.html">
```

**3. Critical Rendering Path Optimization:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Critical CSS inlined -->
  <style>
    /* Above-the-fold styles only */
    .header { background: #fff; height: 60px; }
    .hero { height: 400px; background: #f0f0f0; }
  </style>
  
  <!-- Non-critical CSS loaded asynchronously -->
  <link rel="preload" href="styles.css" as="style" 
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
<body>
  <!-- Content here -->
  
  <!-- JavaScript at the end -->
  <script defer src="app.js"></script>
</body>
</html>
```

**4. Bundle Optimization:**
```javascript
// Webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  
  // Tree shaking
  mode: 'production',
  
  // Code compression
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
  ],
};
```

### Image Optimization

#### Q3: How do you optimize images for web performance?

**Answer:**

Image optimization is crucial since images often account for 60-70% of a page's total size.

**1. Format Selection:**
```html
<!-- Modern format with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Format guidelines -->
<!-- AVIF: Best compression, limited support -->
<!-- WebP: Good compression, wider support -->
<!-- JPEG: Photos with many colors -->
<!-- PNG: Images with transparency -->
<!-- SVG: Icons and simple graphics -->
```

**2. Responsive Images:**
```html
<!-- Different images for different screen sizes -->
<picture>
  <source media="(min-width: 800px)" srcset="hero-desktop.jpg">
  <source media="(min-width: 400px)" srcset="hero-tablet.jpg">
  <img src="hero-mobile.jpg" alt="Hero image">
</picture>

<!-- Same image, different resolutions -->
<img srcset="
  image-320w.jpg 320w,
  image-640w.jpg 640w,
  image-960w.jpg 960w,
  image-1280w.jpg 1280w
" 
sizes="
  (max-width: 320px) 280px,
  (max-width: 640px) 600px,
  (max-width: 960px) 900px,
  1200px
"
src="image-640w.jpg" 
alt="Responsive image">
```

**3. Lazy Loading Implementation:**
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Progressive enhancement -->
<img data-src="image.jpg" 
     src="placeholder.jpg" 
     loading="lazy" 
     alt="Description" 
     class="lazy">
```

```javascript
// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

**4. Progressive Image Loading:**
```css
.progressive-image {
  position: relative;
  overflow: hidden;
}

.progressive-image .placeholder {
  filter: blur(10px);
  transform: scale(1.1);
  transition: all 0.3s ease;
}

.progressive-image .full-image {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.progressive-image.loaded .placeholder {
  opacity: 0;
}

.progressive-image.loaded .full-image {
  opacity: 1;
}
```

```javascript
// Progressive image loading
class ProgressiveImage {
  constructor(element) {
    this.element = element;
    this.placeholder = element.querySelector('.placeholder');
    this.fullImage = element.querySelector('.full-image');
    this.load();
  }
  
  load() {
    const img = new Image();
    img.onload = () => {
      this.element.classList.add('loaded');
    };
    img.src = this.fullImage.dataset.src;
  }
}

// Initialize progressive images
document.querySelectorAll('.progressive-image').forEach(el => {
  new ProgressiveImage(el);
});
```

## 🟡 Intermediate Level

### Critical Rendering Path

#### Q4: Explain the critical rendering path and how to optimize it

**Answer:**

The critical rendering path is the sequence of steps the browser takes to render a page.

**Visual Rendering Pipeline:**
```
Critical Rendering Path:

1. Parse HTML → DOM Tree
   ┌──────────────────────────┐
   │  <html>                     │
   │    <head>                   │
   │      <title>...</title>     │
   │    </head>                  │
   │    <body>                   │
   │      <div>...</div>         │
   │    </body>                  │
   │  </html>                    │
   └──────────────────────────┘
   │
   ▼
2. Parse CSS → CSSOM Tree
   ┌──────────────────────────┐
   │  body {                     │
   │    font-size: 16px;         │
   │  }                          │
   │  div {                      │
   │    color: blue;             │
   │  }                          │
   └──────────────────────────┘
   │
   ▼
3. Combine → Render Tree
   ┌──────────────────────────┐
   │  body (font-size: 16px)     │
   │    div (color: blue)        │
   └──────────────────────────┘
   │
   ▼
4. Layout (Reflow)
   ┌──────────────────────────┐
   │  Calculate positions,       │
   │  sizes, and geometry        │
   └──────────────────────────┘
   │
   ▼
5. Paint (Repaint)
   ┌──────────────────────────┐
   │  Fill in pixels             │
   └──────────────────────────┘
   │
   ▼
6. Composite
   ┌──────────────────────────┐
   │  Layer composition          │
   └──────────────────────────┘
```

**Optimization Strategies:**

**1. Minimize Critical Resources:**
```html
<!-- Inline critical CSS -->
<style>
  /* Only above-the-fold styles */
  .header { height: 60px; background: #fff; }
  .hero { height: 400px; }
</style>

<!-- Async load non-critical CSS -->
<link rel="preload" href="styles.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">
```

**2. Eliminate Render-Blocking Resources:**
```html
<!-- ❌ Render-blocking -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

<!-- ✅ Non-blocking -->
<style>/* Critical CSS here */</style>
<script async src="analytics.js"></script>
<script defer src="app.js"></script>
```

**3. Optimize CSS Delivery:**
```javascript
// Critical CSS extraction
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  dimensions: [
    { width: 320, height: 480 },
    { width: 768, height: 1024 },
    { width: 1200, height: 900 }
  ]
});
```

**4. Reduce Layout Thrashing:**
```javascript
// ❌ Causes multiple reflows
for (let i = 0; i < elements.length; i++) {
  elements[i].style.left = (i * 10) + 'px';
  elements[i].style.top = (i * 10) + 'px';
}

// ✅ Batch DOM writes
requestAnimationFrame(() => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.transform = `translate(${i * 10}px, ${i * 10}px)`;
  }
});

// ✅ Use CSS transforms (composited)
.element {
  will-change: transform;
  transform: translateX(100px);
}
```

### Code Splitting & Lazy Loading

#### Q5: How do you implement code splitting and lazy loading?

**Answer:**

Code splitting reduces initial bundle size by loading code on-demand.

**1. Route-Based Code Splitting:**
```javascript
// React with React.lazy
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**2. Component-Based Code Splitting:**
```javascript
// Dynamic import with loading states
const DynamicComponent = ({ shouldLoad }) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (shouldLoad && !Component) {
      setLoading(true);
      import('./HeavyComponent')
        .then((module) => {
          setComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [shouldLoad, Component]);
  
  if (loading) return <div>Loading component...</div>;
  if (error) return <div>Error loading component</div>;
  if (!Component) return null;
  
  return <Component />;
};
```

**3. Advanced Lazy Loading Patterns:**
```javascript
// Preload on interaction
class LazyLoader {
  constructor() {
    this.cache = new Map();
  }
  
  async load(importFn, preload = false) {
    const key = importFn.toString();
    
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const promise = importFn().then(module => module.default);
    this.cache.set(key, promise);
    
    return promise;
  }
  
  preload(importFn) {
    return this.load(importFn, true);
  }
}

const loader = new LazyLoader();

// Usage
const Button = ({ onClick }) => {
  const handleMouseEnter = () => {
    // Preload on hover
    loader.preload(() => import('./Modal'));
  };
  
  const handleClick = async () => {
    const Modal = await loader.load(() => import('./Modal'));
    // Use Modal component
  };
  
  return (
    <button 
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      Open Modal
    </button>
  );
};
```

**4. Webpack Code Splitting Configuration:**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  
  // Magic comments for chunk naming
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  }
};

// Dynamic imports with chunk names
const HomePage = () => import(
  /* webpackChunkName: "home-page" */ 
  './HomePage'
);

const AboutPage = () => import(
  /* webpackChunkName: "about-page" */ 
  './AboutPage'
);
```

### Caching Strategies

#### Q6: What are different caching strategies and when to use them?

**Answer:**

Caching reduces load times by storing frequently accessed resources.

**Caching Hierarchy:**
```
Caching Layers (Closest to User):

1. Browser Cache
   ┌────────────────────────────────────────┐
   │ - Memory cache (fastest)               │
   │ - Disk cache                           │
   │ - Service Worker cache                 │
   └────────────────────────────────────────┘
   │
   ▼
2. CDN Cache
   ┌────────────────────────────────────────┐
   │ - Edge servers worldwide              │
   │ - Geographically distributed          │
   └────────────────────────────────────────┘
   │
   ▼
3. Server Cache
   ┌────────────────────────────────────────┐
   │ - Reverse proxy cache (Nginx)         │
   │ - Application cache (Redis/Memcached) │
   │ - Database query cache                │
   └────────────────────────────────────────┘
```

**1. HTTP Caching Headers:**
```javascript
// Express.js server
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache for 1 year
  etag: true,
  lastModified: true,
}));

// Specific cache headers
app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300', // 5 minutes
    'ETag': '"123456"',
    'Last-Modified': new Date().toUTCString()
  });
  res.json(data);
});

// No cache for dynamic content
app.get('/api/user', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.json(userData);
});
```

**2. Service Worker Caching:**
```javascript
// service-worker.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/images/logo.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Advanced caching strategies
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    // Cache first strategy for images
    event.respondWith(
      caches.match(event.request)
        .then(response => response || 
          fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
              return response;
            })
        )
    );
  } else if (event.request.url.includes('/api/')) {
    // Network first strategy for API calls
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
```

**3. Memory-Based Caching:**
```javascript
class MemoryCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) { // 5 minutes
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  
  set(key, value) {
    const now = Date.now();
    
    // Remove expired entries
    this.cleanup();
    
    // Remove oldest entry if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      timestamp: now,
      expiry: now + this.ttl
    });
  }
  
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }
  
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Usage
const apiCache = new MemoryCache(50, 10 * 60 * 1000); // 10 minutes

async function fetchWithCache(url) {
  const cached = apiCache.get(url);
  if (cached) return cached;
  
  const response = await fetch(url);
  const data = await response.json();
  
  apiCache.set(url, data);
  return data;
}
```

## 🔴 Advanced Level

### Performance Monitoring

#### Q7: How do you monitor and measure web performance?

**Answer:**

Performance monitoring combines Real User Monitoring (RUM) and synthetic testing.

**1. Real User Monitoring (RUM):**
```javascript
// Custom performance monitoring
class PerformanceMonitor {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.metrics = {};
    this.init();
  }
  
  init() {
    // Core Web Vitals
    this.measureCoreWebVitals();
    
    // Custom metrics
    this.measureCustomMetrics();
    
    // Error tracking
    this.trackErrors();
    
    // Send data periodically
    this.setupReporting();
  }
  
  measureCoreWebVitals() {
    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // FID
    new PerformanceObserver((list) => {
      const firstInput = list.getEntries()[0];
      this.metrics.fid = firstInput.processingStart - firstInput.startTime;
    }).observe({ entryTypes: ['first-input'] });
    
    // CLS
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  measureCustomMetrics() {
    // Time to Interactive
    performance.mark('app-start');
    
    // Mark when app becomes interactive
    window.addEventListener('load', () => {
      performance.mark('app-interactive');
      performance.measure('tti', 'app-start', 'app-interactive');
      
      const measure = performance.getEntriesByName('tti')[0];
      this.metrics.tti = measure.duration;
    });
    
    // Resource loading metrics
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('.js')) {
          this.metrics.jsLoadTime = entry.duration;
        } else if (entry.name.includes('.css')) {
          this.metrics.cssLoadTime = entry.duration;
        }
      }
    }).observe({ entryTypes: ['resource'] });
  }
  
  trackErrors() {
    window.addEventListener('error', (event) => {
      this.reportError({
        type: 'javascript',
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        stack: event.error.stack
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        type: 'promise',
        message: event.reason.message || event.reason,
        stack: event.reason.stack
      });
    });
  }
  
  setupReporting() {
    // Send metrics on page unload
    window.addEventListener('beforeunload', () => {
      this.sendMetrics();
    });
    
    // Send metrics every 30 seconds for long sessions
    setInterval(() => {
      this.sendMetrics();
    }, 30000);
  }
  
  sendMetrics() {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        this.apiEndpoint,
        JSON.stringify({
          ...this.metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      );
    }
  }
  
  reportError(error) {
    fetch(`${this.apiEndpoint}/errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...error,
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(() => {}); // Fail silently
  }
}

// Initialize monitoring
const monitor = new PerformanceMonitor('/api/performance');
```

**2. Performance Budget Monitoring:**
```javascript
// Performance budget configuration
const PERFORMANCE_BUDGET = {
  lcp: 2500,      // ms
  fid: 100,       // ms
  cls: 0.1,       // score
  tti: 3800,      // ms
  totalSize: 500, // KB
  jsSize: 200,    // KB
  cssSize: 50,    // KB
  imageSize: 300  // KB
};

class BudgetMonitor {
  constructor(budget) {
    this.budget = budget;
    this.violations = [];
  }
  
  checkBudget(metrics) {
    const violations = [];
    
    Object.entries(this.budget).forEach(([metric, limit]) => {
      const value = metrics[metric];
      if (value && value > limit) {
        violations.push({
          metric,
          value,
          limit,
          severity: this.getSeverity(value, limit)
        });
      }
    });
    
    this.violations = violations;
    return violations;
  }
  
  getSeverity(value, limit) {
    const ratio = value / limit;
    if (ratio > 2) return 'critical';
    if (ratio > 1.5) return 'warning';
    return 'info';
  }
  
  generateReport() {
    return {
      passed: this.violations.length === 0,
      violations: this.violations,
      summary: this.violations.reduce((acc, v) => {
        acc[v.severity] = (acc[v.severity] || 0) + 1;
        return acc;
      }, {})
    };
  }
}
```

**3. Automated Performance Testing:**
```javascript
// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};

// GitHub Actions workflow
// .github/workflows/performance.yml
/*
name: Performance Testing
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Build app
        run: npm run build
      - name: Start server
        run: npm start &
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
*/
```

## 🎯 Common Interview Traps

### Trap 1: Premature Optimization
```javascript
// ❌ Don't optimize without measuring
function microOptimization() {
  // Spending time on micro-optimizations
  // instead of addressing real bottlenecks
  for (let i = 0, len = array.length; i < len; i++) {
    // Caching array.length doesn't matter in modern browsers
  }
}

// ✅ Measure first, then optimize
function measureAndOptimize() {
  performance.mark('start');
  
  // Your code here
  heavyOperation();
  
  performance.mark('end');
  performance.measure('heavy-operation', 'start', 'end');
  
  const measure = performance.getEntriesByName('heavy-operation')[0];
  console.log(`Operation took: ${measure.duration}ms`);
}
```

### Trap 2: Ignoring Network Conditions
```javascript
// ❌ Assuming fast connections
function loadAllImages() {
  images.forEach(img => {
    img.src = img.dataset.highRes; // Always load high-res
  });
}

// ✅ Consider network conditions
function adaptiveImageLoading() {
  const connection = navigator.connection;
  
  if (connection) {
    const isSlowConnection = 
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.saveData;
      
    images.forEach(img => {
      img.src = isSlowConnection ? 
        img.dataset.lowRes : 
        img.dataset.highRes;
    });
  }
}
```

### Trap 3: Memory Leaks
```javascript
// ❌ Memory leak - event listeners not cleaned up
function createComponent() {
  const element = document.createElement('div');
  const handler = () => console.log('clicked');
  
  element.addEventListener('click', handler);
  
  return element; // handler never removed
}

// ✅ Proper cleanup
function createComponentWithCleanup() {
  const element = document.createElement('div');
  const handler = () => console.log('clicked');
  
  element.addEventListener('click', handler);
  
  // Return cleanup function
  return {
    element,
    destroy() {
      element.removeEventListener('click', handler);
    }
  };
}
```

## 🚀 Follow-up Questions

### After Core Web Vitals Questions:
- How do you optimize LCP for dynamic content?
- What causes layout shifts and how do you prevent them?
- How do you measure performance on different devices?

### After Optimization Questions:
- How do you balance performance and functionality?
- What's your approach to performance regression testing?
- How do you handle performance in large, complex applications?

### After Monitoring Questions:
- How do you set up alerts for performance degradation?
- What metrics matter most for your specific application?
- How do you correlate performance with business metrics?

## 💡 Quick Reference

### Core Web Vitals Targets:
- **LCP**: < 2.5s (loading)
- **FID**: < 100ms (interactivity)
- **CLS**: < 0.1 (visual stability)

### Optimization Priorities:
1. **Critical Rendering Path**: Inline critical CSS, defer JavaScript
2. **Images**: Optimize formats, sizes, lazy loading
3. **Code Splitting**: Route-based and component-based
4. **Caching**: HTTP headers, Service Workers, CDN
5. **Monitoring**: RUM, synthetic testing, performance budgets

### Performance Tools:
- **Lighthouse**: Automated auditing
- **WebPageTest**: Detailed analysis
- **Chrome DevTools**: Debugging and profiling
- **Web Vitals**: Real user monitoring
- **Bundle Analyzer**: Code analysis

## 🛠️ Practice Problems

### 1. Implement Progressive Image Loading
- Create a component that loads low-quality placeholder first
- Implement intersection observer for lazy loading
- Add WebP/AVIF format support with fallbacks
- Include loading states and error handling

### 2. Build a Performance Monitoring Dashboard
- Collect Core Web Vitals data
- Implement performance budgets
- Create alerts for performance degradation
- Visualize trends over time

### 3. Optimize Bundle Size
- Analyze bundle composition
- Implement code splitting strategies
- Set up tree shaking
- Create performance budgets for CI/CD

### 4. Create Service Worker Caching Strategy
- Implement different caching strategies for different resource types
- Add cache versioning and updates
- Handle offline functionality
- Include cache cleanup mechanisms

### 5. Build Virtual Scrolling Component
- Render only visible items for large lists
- Implement smooth scrolling
- Add search and filtering
- Optimize for mobile devices

---

_This comprehensive performance guide covers essential optimization techniques, monitoring strategies, and practical implementations needed for frontend performance interviews._


## Optimization Techniques

### Loading Optimization

#### 1. Resource Hints

**Definition**: HTML attributes that provide hints to the browser about resource loading.

**Types**:

```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style" />
<link rel="preload" href="critical.js" as="script" />

<!-- Prefetch non-critical resources -->
<link rel="prefetch" href="next-page.js" />

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//cdn.example.com" />

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

#### 2. Code Splitting

**Definition**: Technique to split code into smaller chunks loaded on demand.

**React Example**:

```javascript
// Route-based splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Component-based splitting
const HeavyComponent = lazy(() => import("./components/HeavyComponent"));
```

#### 3. Tree Shaking

**Definition**: Dead code elimination to reduce bundle size.

**Webpack Configuration**:

```javascript
module.exports = {
  mode: "production",
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
};
```

### Rendering Optimization

#### 1. Virtual Scrolling

**Definition**: Technique to render only visible items in large lists.

**Implementation**:

```javascript
function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = items.slice(
    Math.floor(scrollTop / itemHeight),
    Math.floor(scrollTop / itemHeight) + Math.ceil(containerHeight / itemHeight)
  );

  return (
    <div onScroll={(e) => setScrollTop(e.target.scrollTop)}>
      {visibleItems.map((item) => (
        <div key={item.id} style={{ height: itemHeight }}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

#### 2. Memoization

**Definition**: Caching expensive computations to avoid recalculation.

**React Example**:

```javascript
// Memoize components
const ExpensiveComponent = memo(({ data }) => {
  return <div>{expensiveCalculation(data)}</div>;
});

// Memoize values
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

#### 3. Lazy Loading

**Definition**: Loading resources only when needed.

**Image Lazy Loading**:

```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" />
```

**JavaScript Implementation**:

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});
```

## Common Interview Questions

### Q1: How would you optimize a slow-loading website?

**Answer**:

1. **Analyze Performance**: Use Lighthouse, WebPageTest, or Chrome DevTools
2. **Optimize Images**: Compress, use WebP format, implement lazy loading
3. **Minimize HTTP Requests**: Combine files, use sprites, enable compression
4. **Optimize JavaScript**: Code splitting, tree shaking, remove unused code
5. **Use CDN**: Distribute content globally
6. **Implement Caching**: Browser cache, CDN cache, application cache
7. **Optimize Critical Path**: Inline critical CSS, defer non-critical JavaScript
8. **Use Resource Hints**: Preload, prefetch, preconnect

### Q2: Explain the difference between debouncing and throttling

**Answer**:
**Debouncing**: Delays function execution until after a specified delay since the last call.

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const debouncedSearch = debounce(searchAPI, 300);
```

**Throttling**: Limits function execution to once per specified time period.

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage
const throttledScroll = throttle(handleScroll, 100);
```

### Q3: How do you measure and improve Core Web Vitals?

**Answer**:
**Measurement**:

- Chrome DevTools Performance tab
- Lighthouse
- Web Vitals JavaScript library
- Real User Monitoring (RUM)

**Improvement Strategies**:

- **LCP**: Optimize images, use CDN, implement lazy loading
- **FID**: Reduce JavaScript execution, code splitting, web workers
- **CLS**: Set explicit dimensions, reserve space, avoid layout shifts

### Q4: What is the difference between client-side and server-side rendering?

**Answer**:
**Client-Side Rendering (CSR)**:

- JavaScript renders content in browser
- Faster subsequent page loads
- Better for interactive applications
- Slower initial load
- SEO challenges

**Server-Side Rendering (SSR)**:

- Server renders HTML
- Faster initial load
- Better SEO
- Slower subsequent interactions
- More server resources

**Static Site Generation (SSG)**:

- Pre-builds pages at build time
- Fastest loading
- Best SEO
- Limited dynamic content
- Requires rebuild for content changes

### Q5: How would you implement infinite scrolling?

**Answer**:

```javascript
function InfiniteScroll({ fetchData, renderItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const newItems = await fetchData(page);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [page, loading, fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.querySelector("#sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      {items.map(renderItem)}
      <div id="sentinel">{loading && <div>Loading...</div>}</div>
    </div>
  );
}
```

## Advanced Topics

### Modern Performance Features

#### 1. Web Workers

**Definition**: Background threads for CPU-intensive tasks.

```javascript
// Main thread
const worker = new Worker("worker.js");
worker.postMessage({ data: largeDataset });
worker.onmessage = (e) => {
  console.log("Result:", e.data);
};

// Worker thread (worker.js)
self.onmessage = (e) => {
  const result = expensiveCalculation(e.data.data);
  self.postMessage(result);
};
```

#### 2. Service Workers

**Definition**: Scripts that run in the background for offline functionality and caching.

```javascript
// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// Service worker implementation
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

#### 3. WebAssembly

**Definition**: High-performance code execution.

### Performance Monitoring

#### 1. Real User Monitoring (RUM)

**Definition**: Collecting performance data from actual users.

**Metrics to Track**:

- Page load times
- Core Web Vitals
- Error rates
- User interactions
- Geographic performance

#### 2. Synthetic Monitoring

**Definition**: Lab-based testing.

#### 3. Performance APIs

**Definition**: Navigation Timing, Resource Timing.

#### 4. Error Tracking

**Definition**: Performance-related errors.

#### 5. A/B Testing

**Definition**: Performance impact measurement.

## Tools and Monitoring

### Performance Tools

#### 1. Chrome DevTools

- Performance tab for profiling
- Network tab for request analysis
- Lighthouse for audits
- Coverage tab for unused code

#### 2. External Tools

- WebPageTest
- GTmetrix
- PageSpeed Insights
- Pingdom

#### 3. Monitoring Services

- Google Analytics
- New Relic
- DataDog
- Sentry

## Practice Problems

### Problem 1: Optimize Image Loading

Implement progressive image loading with placeholders and lazy loading.

### Problem 2: Build a Performance Monitor

Create a JavaScript library to measure and report Core Web Vitals.

### Problem 3: Implement Virtual Scrolling

Build a virtual scrolling component for a large dataset.

### Problem 4: Create a Caching Strategy

Design and implement a multi-level caching system.

### Problem 5: Optimize Bundle Size

Analyze and optimize a large JavaScript bundle using code splitting and tree shaking.

### Problem 6: Build a Service Worker

Implement a service worker for offline functionality and caching.

### Problem 7: Performance Budget Implementation

Set up automated performance budgets and monitoring.

### Problem 8: Optimize Critical Rendering Path

Identify and optimize the critical rendering path for a web application.

---

_This guide covers essential performance optimization concepts for frontend interviews at Big Tech companies. Focus on understanding Core Web Vitals, optimization techniques, and practical implementation strategies._
