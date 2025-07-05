# Frontend Performance Interview Questions & Answers

## 🎯 Web Performance Metrics Visualization

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CORE WEB VITALS                              │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │       LCP       │  │       FID       │  │       CLS       │     │
│  │ Largest Content │  │ First Input     │  │ Cumulative      │     │
│  │    Paintful     │  │     Delay       │  │ Layout Shift    │     │
│  │                 │  │                 │  │                 │     │
│  │ Good: ≤ 2.5s   │  │ Good: ≤ 100ms   │  │ Good: ≤ 0.1     │     │
│  │ Poor: > 4.0s   │  │ Poor: > 300ms   │  │ Poor: > 0.25    │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    LOADING TIMELINE                         │   │
│  │                                                             │   │
│  │ 0s        1s        2s        3s        4s        5s       │   │
│  │ │         │         │         │         │         │        │   │
│  │ TTFB     FCP       LCP      TTI                            │   │
│  │ │         │         │         │                            │   │
│  │ │         │         │         └─ Time to Interactive      │   │
│  │ │         │         └─ Largest Contentful Paint           │   │
│  │ │         └─ First Contentful Paint                       │   │
│  │ └─ Time to First Byte                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## 🎯 Progressive Interview Questions

### 🟢 BEGINNER LEVEL

#### Q1: What are the Core Web Vitals and why are they important?

**Answer:**
Core Web Vitals are Google's standardized metrics for measuring user experience on the web.

**The Three Core Web Vitals:**

**1. Largest Contentful Paint (LCP):**
- Measures loading performance
- Time when the largest content element becomes visible
- **Good:** ≤ 2.5 seconds
- **Needs Improvement:** 2.5-4.0 seconds  
- **Poor:** > 4.0 seconds

**2. First Input Delay (FID):**
- Measures interactivity
- Time from first user interaction to browser response
- **Good:** ≤ 100 milliseconds
- **Needs Improvement:** 100-300 milliseconds
- **Poor:** > 300 milliseconds

**3. Cumulative Layout Shift (CLS):**
- Measures visual stability
- Sum of all unexpected layout shifts
- **Good:** ≤ 0.1
- **Needs Improvement:** 0.1-0.25
- **Poor:** > 0.25

**Implementation Examples:**

```javascript
// Measure Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
    // Send to your analytics service
    gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
    });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Performance Observer API
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
        
        if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
        
        if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
                console.log('CLS:', entry.value);
            }
        }
    }
});

observer.observe({
    type: 'largest-contentful-paint',
    buffered: true
});

observer.observe({
    type: 'first-input',
    buffered: true
});

observer.observe({
    type: 'layout-shift',
    buffered: true
});
```

#### Q2: How do you optimize images for web performance?

**Answer:**
Image optimization is crucial since images often account for 60-70% of page weight.

**1. Choose the Right Format:**
```html
<!-- Modern formats with fallbacks -->
<picture>
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Format recommendations -->
<!-- AVIF: Best compression, limited support -->
<!-- WebP: Good compression, wide support -->
<!-- JPEG: Photos, good compression -->
<!-- PNG: Images with transparency -->
<!-- SVG: Icons, logos, simple graphics -->
```

**2. Responsive Images:**
```html
<!-- Responsive images with srcset -->
<img 
    src="image-400w.jpg"
    srcset="image-400w.jpg 400w,
            image-800w.jpg 800w,
            image-1200w.jpg 1200w"
    sizes="(max-width: 600px) 400px,
           (max-width: 1000px) 800px,
           1200px"
    alt="Responsive image"
    loading="lazy"
>

<!-- Art direction with picture -->
<picture>
    <source media="(max-width: 600px)" srcset="mobile-image.jpg">
    <source media="(max-width: 1000px)" srcset="tablet-image.jpg">
    <img src="desktop-image.jpg" alt="Art directed image">
</picture>
```

**3. Lazy Loading:**
```html
<!-- Native lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Intersection Observer for custom lazy loading -->
<img data-src="image.jpg" alt="Description" class="lazy">
```

```javascript
// Custom lazy loading implementation
const lazyImages = document.querySelectorAll('.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});
```

**4. Image Optimization Techniques:**
```javascript
// Service Worker for image optimization
self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        event.respondWith(
            fetch(event.request.url + '?w=800&q=80&format=webp')
                .catch(() => fetch(event.request))
        );
    }
});

// Progressive JPEG loading
function loadProgressiveImage(src, placeholder) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
        
        // Show placeholder immediately
        if (placeholder) {
            img.style.filter = 'blur(5px)';
            setTimeout(() => {
                img.style.filter = 'none';
                img.style.transition = 'filter 0.3s';
            }, 100);
        }
    });
}
```

#### Q3: What is lazy loading and how do you implement it?

**Answer:**
Lazy loading defers loading of non-critical resources until they're needed.

**Types of Lazy Loading:**

**1. Image Lazy Loading:**
```html
<!-- Native lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Progressive enhancement -->
<img 
    src="placeholder.jpg" 
    data-src="actual-image.jpg" 
    alt="Description"
    class="lazy"
>
```

```css
/* Placeholder styling */
.lazy {
    filter: blur(5px);
    transition: filter 0.3s;
}

.lazy.loaded {
    filter: none;
}

/* Skeleton loading */
.image-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
```

**2. Component Lazy Loading (React):**
```javascript
import React, { lazy, Suspense } from 'react';

// Lazy load components
const LazyDashboard = lazy(() => import('./Dashboard'));
const LazyProfile = lazy(() => import('./Profile'));
const LazySettings = lazy(() => import('./Settings'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<LazyDashboard />} />
                    <Route path="/profile" element={<LazyProfile />} />
                    <Route path="/settings" element={<LazySettings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

// Dynamic imports with conditions
async function loadModule(moduleName) {
    const module = await import(`./modules/${moduleName}`);
    return module.default;
}

// Preload on hover
function PreloadLink({ to, children }) {
    const [preloaded, setPreloaded] = useState(false);
    
    const handleMouseEnter = () => {
        if (!preloaded) {
            import(`./pages/${to}`);
            setPreloaded(true);
        }
    };
    
    return (
        <Link to={to} onMouseEnter={handleMouseEnter}>
            {children}
        </Link>
    );
}
```

**3. Content Lazy Loading:**
```javascript
// Intersection Observer for content sections
const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            loadContent(element);
            contentObserver.unobserve(element);
        }
    });
}, {
    rootMargin: '50px' // Load 50px before entering viewport
});

async function loadContent(element) {
    const contentId = element.dataset.contentId;
    
    try {
        const response = await fetch(`/api/content/${contentId}`);
        const content = await response.text();
        element.innerHTML = content;
        element.classList.add('loaded');
    } catch (error) {
        element.innerHTML = 'Failed to load content';
    }
}

// Lazy loading for large lists
function VirtualList({ items, itemHeight, containerHeight }) {
    const [scrollTop, setScrollTop] = useState(0);
    
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
        visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
        items.length
    );
    
    const visibleItems = items.slice(visibleStart, visibleEnd);
    
    return (
        <div 
            style={{ height: containerHeight, overflow: 'auto' }}
            onScroll={(e) => setScrollTop(e.target.scrollTop)}
        >
            <div style={{ height: items.length * itemHeight, position: 'relative' }}>
                {visibleItems.map((item, index) => (
                    <div
                        key={visibleStart + index}
                        style={{
                            position: 'absolute',
                            top: (visibleStart + index) * itemHeight,
                            height: itemHeight,
                            width: '100%'
                        }}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
```

#### Q4: How do you minimize and optimize JavaScript and CSS?

**Answer:**
Minification and optimization reduce file sizes and improve loading times.

**JavaScript Optimization:**

**1. Minification and Compression:**
```javascript
// Webpack configuration
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.log
                        drop_debugger: true,
                        unused: true
                    },
                    mangle: {
                        safari10: true
                    }
                }
            })
        ]
    }
};

// Rollup configuration with plugins
import { terser } from 'rollup-plugin-terser';
import { gzipSize } from 'rollup-plugin-gzip-size';

export default {
    plugins: [
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        }),
        gzipSize()
    ]
};
```

**2. Tree Shaking:**
```javascript
// Use ES modules for tree shaking
import { debounce } from 'lodash-es'; // Only imports debounce
// vs
import _ from 'lodash'; // Imports entire library

// Mark side-effect-free packages
// package.json
{
    "sideEffects": false
}

// Or specify files with side effects
{
    "sideEffects": ["./src/polyfills.js", "*.css"]
}

// Dynamic imports for code splitting
async function loadChart() {
    const { Chart } = await import('chart.js');
    return Chart;
}

// Conditional loading
if (window.innerWidth > 1024) {
    import('./desktop-features.js');
}
```

**CSS Optimization:**

**1. Minification and Purging:**
```javascript
// PostCSS configuration
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.html', './src/**/*.js'],
            safelist: [
                'button',
                'active',
                /^modal-/,
                {
                    pattern: /hljs-/,
                    children: true
                }
            ]
        }),
        require('cssnano')({
            preset: ['default', {
                discardComments: { removeAll: true },
                normalizeWhitespace: false
            }]
        })
    ]
};

// Critical CSS extraction
const critical = require('critical');

critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    dest: 'index-critical.html',
    width: 1300,
    height: 900,
    minify: true
});
```

**2. Advanced Optimization Techniques:**
```javascript
// Service Worker for caching optimized assets
const CACHE_NAME = 'optimized-assets-v1';

self.addEventListener('fetch', event => {
    if (event.request.destination === 'script' || 
        event.request.destination === 'style') {
        
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    }
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        '/css/critical.css',
        '/js/app.js',
        '/fonts/main.woff2'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        if (resource.endsWith('.css')) {
            link.as = 'style';
        } else if (resource.endsWith('.js')) {
            link.as = 'script';
        } else if (resource.includes('font')) {
            link.as = 'font';
            link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
    });
}
```

#### Q5: What are the different loading strategies for JavaScript?

**Answer:**
JavaScript loading strategies affect when scripts are downloaded and executed.

**Script Loading Strategies:**

```html
<!-- 1. Normal loading (blocking) -->
<script src="script.js"></script>
<!-- Blocks HTML parsing until script loads and executes -->

<!-- 2. Async loading -->
<script src="script.js" async></script>
<!-- Downloads in parallel, executes immediately when ready -->

<!-- 3. Defer loading -->
<script src="script.js" defer></script>
<!-- Downloads in parallel, waits for HTML parsing to complete -->

<!-- 4. Module loading -->
<script type="module" src="module.js"></script>
<!-- Deferred by default, supports import/export -->
```

**Visual Timeline:**
```
┌─────────────────────────────────────────────────────────────┐
│                    SCRIPT LOADING                           │
│                                                             │
│ Normal:  HTML│████████████████████████████████████████████ │
│         Script │████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                │    Download    Execute                     │
│                                                             │
│ Async:   HTML │████████████████████████████████████████████ │
│         Script │████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                │ Download Execute                           │
│                                                             │
│ Defer:   HTML │████████████████████████████████████████████ │
│         Script │████████████████████████████████████░░░░░░░ │
│                │      Download                Execute      │
│                                                             │
│ Module:  HTML │████████████████████████████████████████████ │
│         Script │████████████████████████████████████░░░░░░░ │
│                │      Download                Execute      │
└─────────────────────────────────────────────────────────────┘

Legend: ████ = Processing Time   ░░░░ = Blocked/Waiting
```

**Dynamic Script Loading:**
```javascript
// Dynamic script loading
function loadScript(src, options = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = options.async !== false;
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        
        if (options.defer) {
            script.defer = true;
        }
        
        if (options.type) {
            script.type = options.type;
        }
        
        document.head.appendChild(script);
    });
}

// Usage examples
loadScript('/js/analytics.js', { async: true });
loadScript('/js/chart.js', { defer: true });
loadScript('/js/module.js', { type: 'module' });

// Conditional loading
if ('IntersectionObserver' in window) {
    loadScript('/js/modern-features.js');
} else {
    loadScript('/js/polyfills.js').then(() => {
        loadScript('/js/modern-features.js');
    });
}

// Load scripts based on user interaction
document.addEventListener('click', () => {
    loadScript('/js/interaction-features.js');
}, { once: true });

// Preload scripts for faster execution
function preloadScript(src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
}

// Priority-based loading
const scriptPriorities = {
    critical: ['/js/critical.js'],
    high: ['/js/analytics.js', '/js/error-tracking.js'],
    low: ['/js/chat-widget.js', '/js/social-media.js']
};

async function loadScriptsByPriority() {
    // Load critical scripts first
    await Promise.all(
        scriptPriorities.critical.map(src => loadScript(src))
    );
    
    // Load high priority scripts
    await Promise.all(
        scriptPriorities.high.map(src => loadScript(src, { async: true }))
    );
    
    // Load low priority scripts when idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            scriptPriorities.low.forEach(src => 
                loadScript(src, { async: true })
            );
        });
    } else {
        setTimeout(() => {
            scriptPriorities.low.forEach(src => 
                loadScript(src, { async: true })
            );
        }, 0);
    }
}
```

### 🟡 INTERMEDIATE LEVEL

#### Q6: How do you measure and monitor performance in production?

**Answer:**
Performance monitoring helps identify real-world performance issues and track improvements.

**Real User Monitoring (RUM):**
```javascript
// Web Vitals measurement
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class PerformanceMonitor {
    constructor(config) {
        this.config = {
            endpoint: '/api/metrics',
            sampleRate: 0.1, // Sample 10% of users
            ...config
        };
        
        this.metrics = new Map();
        this.initializeMonitoring();
    }
    
    initializeMonitoring() {
        // Core Web Vitals
        getCLS((metric) => this.reportMetric('CLS', metric));
        getFID((metric) => this.reportMetric('FID', metric));
        getFCP((metric) => this.reportMetric('FCP', metric));
        getLCP((metric) => this.reportMetric('LCP', metric));
        getTTFB((metric) => this.reportMetric('TTFB', metric));
        
        // Custom metrics
        this.measureCustomMetrics();
        
        // Network information
        this.captureNetworkInfo();
        
        // Error monitoring
        this.setupErrorTracking();
        
        // Page visibility changes
        this.trackPageVisibility();
    }
    
    reportMetric(name, metric) {
        // Sample traffic to reduce load
        if (Math.random() > this.config.sampleRate) return;
        
        const data = {
            name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            connection: this.getConnectionInfo(),
            sessionId: this.getSessionId()
        };
        
        this.sendMetric(data);
    }
    
    measureCustomMetrics() {
        // Time to Interactive
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.measureTTI(entry.startTime);
                }
            }
        });
        observer.observe({ type: 'paint', buffered: true });
        
        // API response times
        this.measureApiPerformance();
        
        // Resource loading times
        this.measureResourcePerformance();
        
        // User interactions
        this.measureUserInteractions();
    }
    
    measureTTI(fcpTime) {
        const ttiPromise = import('tti-polyfill').then(ttiPolyfill => {
            return ttiPolyfill.getFirstConsistentlyInteractive();
        });
        
        ttiPromise.then(tti => {
            if (tti) {
                this.reportMetric('TTI', {
                    name: 'TTI',
                    value: tti,
                    id: 'custom-tti'
                });
            }
        });
    }
    
    measureApiPerformance() {
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            const startTime = performance.now();
            const url = args[0];
            
            try {
                const response = await originalFetch(...args);
                const endTime = performance.now();
                
                this.reportMetric('API_RESPONSE_TIME', {
                    name: 'API_RESPONSE_TIME',
                    value: endTime - startTime,
                    id: `api-${url}`,
                    url,
                    status: response.status
                });
                
                return response;
            } catch (error) {
                const endTime = performance.now();
                
                this.reportMetric('API_ERROR', {
                    name: 'API_ERROR',
                    value: endTime - startTime,
                    id: `api-error-${url}`,
                    url,
                    error: error.message
                });
                
                throw error;
            }
        };
    }
    
    measureResourcePerformance() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.initiatorType === 'img' && entry.duration > 1000) {
                    this.reportMetric('SLOW_IMAGE', {
                        name: 'SLOW_IMAGE',
                        value: entry.duration,
                        id: entry.name,
                        size: entry.transferSize
                    });
                }
                
                if (entry.initiatorType === 'script' && entry.duration > 500) {
                    this.reportMetric('SLOW_SCRIPT', {
                        name: 'SLOW_SCRIPT',
                        value: entry.duration,
                        id: entry.name,
                        size: entry.transferSize
                    });
                }
            }
        });
        
        observer.observe({ type: 'resource', buffered: true });
    }
    
    measureUserInteractions() {
        ['click', 'keydown', 'touchstart'].forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                const startTime = performance.now();
                
                requestAnimationFrame(() => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    
                    if (duration > 16) { // More than one frame
                        this.reportMetric('SLOW_INTERACTION', {
                            name: 'SLOW_INTERACTION',
                            value: duration,
                            id: `${eventType}-${event.target.tagName}`,
                            eventType,
                            target: event.target.tagName
                        });
                    }
                });
            });
        });
    }
    
    getConnectionInfo() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            };
        }
        return null;
    }
    
    sendMetric(data) {
        // Use sendBeacon for reliability
        if ('sendBeacon' in navigator) {
            navigator.sendBeacon(
                this.config.endpoint,
                JSON.stringify(data)
            );
        } else {
            // Fallback to fetch
            fetch(this.config.endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                keepalive: true
            }).catch(() => {
                // Store in localStorage for retry
                const stored = JSON.parse(
                    localStorage.getItem('pending-metrics') || '[]'
                );
                stored.push(data);
                localStorage.setItem('pending-metrics', JSON.stringify(stored));
            });
        }
    }
}

// Initialize monitoring
const monitor = new PerformanceMonitor({
    endpoint: '/api/performance-metrics',
    sampleRate: 0.1
});
```

**Performance Budgets:**
```javascript
// Performance budget configuration
const performanceBudgets = {
    metrics: {
        LCP: 2500, // 2.5 seconds
        FID: 100,  // 100 milliseconds
        CLS: 0.1,  // 0.1 score
        FCP: 1800, // 1.8 seconds
        TTI: 3800  // 3.8 seconds
    },
    resources: {
        javascript: 300 * 1024, // 300KB
        css: 50 * 1024,         // 50KB
        images: 1000 * 1024,    // 1MB
        fonts: 100 * 1024,      // 100KB
        total: 2000 * 1024      // 2MB
    }
};

class PerformanceBudgetMonitor {
    constructor(budgets) {
        this.budgets = budgets;
        this.violations = [];
        
        this.checkResourceBudgets();
        this.checkMetricBudgets();
    }
    
    checkResourceBudgets() {
        const observer = new PerformanceObserver((list) => {
            const resources = list.getEntries();
            const sizes = this.calculateResourceSizes(resources);
            
            Object.entries(this.budgets.resources).forEach(([type, budget]) => {
                if (sizes[type] > budget) {
                    this.violations.push({
                        type: 'resource-budget',
                        resource: type,
                        actual: sizes[type],
                        budget,
                        violation: sizes[type] - budget
                    });
                }
            });
            
            this.reportViolations();
        });
        
        observer.observe({ type: 'resource', buffered: true });
    }
    
    checkMetricBudgets() {
        getCLS((metric) => this.checkMetric('CLS', metric.value));
        getFID((metric) => this.checkMetric('FID', metric.value));
        getLCP((metric) => this.checkMetric('LCP', metric.value));
        getFCP((metric) => this.checkMetric('FCP', metric.value));
    }
    
    checkMetric(name, value) {
        const budget = this.budgets.metrics[name];
        if (budget && value > budget) {
            this.violations.push({
                type: 'metric-budget',
                metric: name,
                actual: value,
                budget,
                violation: value - budget
            });
            
            this.reportViolations();
        }
    }
    
    calculateResourceSizes(resources) {
        return resources.reduce((sizes, resource) => {
            const size = resource.transferSize || 0;
            
            if (resource.initiatorType === 'script') {
                sizes.javascript += size;
            } else if (resource.initiatorType === 'css') {
                sizes.css += size;
            } else if (resource.initiatorType === 'img') {
                sizes.images += size;
            } else if (resource.name.includes('font')) {
                sizes.fonts += size;
            }
            
            sizes.total += size;
            return sizes;
        }, {
            javascript: 0,
            css: 0,
            images: 0,
            fonts: 0,
            total: 0
        });
    }
    
    reportViolations() {
        if (this.violations.length > 0) {
            console.warn('Performance budget violations:', this.violations);
            
            // Send to monitoring service
            fetch('/api/performance-violations', {
                method: 'POST',
                body: JSON.stringify({
                    violations: this.violations,
                    url: window.location.href,
                    timestamp: Date.now()
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}
```

#### Q7: What are Service Workers and how do they improve performance?

**Answer:**
Service Workers are scripts that run in the background, separate from web pages, enabling features like caching, background sync, and push notifications.

**Service Worker Performance Benefits:**

**1. Advanced Caching Strategies:**
```javascript
// sw.js - Service Worker file
const CACHE_NAME = 'app-cache-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Cache strategies
const cacheStrategies = {
    // Cache first - for static assets
    cacheFirst: async (request) => {
        const cached = await caches.match(request);
        return cached || fetch(request);
    },
    
    // Network first - for API calls
    networkFirst: async (request) => {
        try {
            const response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(DYNAMIC_CACHE);
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            return caches.match(request);
        }
    },
    
    // Stale while revalidate - for frequently updated content
    staleWhileRevalidate: async (request) => {
        const cached = await caches.match(request);
        const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(c => c.put(request, response.clone()));
            }
            return response;
        });
        
        return cached || fetchPromise;
    }
};

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(cache => {
            return cache.addAll([
                '/',
                '/css/app.css',
                '/js/app.js',
                '/fonts/main.woff2',
                '/images/logo.svg',
                '/manifest.json'
            ]);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Static assets - cache first
    if (request.destination === 'style' || 
        request.destination === 'script' ||
        request.destination === 'font') {
        event.respondWith(cacheStrategies.cacheFirst(request));
        return;
    }
    
    // API requests - network first
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(cacheStrategies.networkFirst(request));
        return;
    }
    
    // Images - stale while revalidate
    if (request.destination === 'image') {
        event.respondWith(cacheStrategies.staleWhileRevalidate(request));
        return;
    }
    
    // Default - network first with fallback
    event.respondWith(
        fetch(request).catch(() => {
            return caches.match('/offline.html');
        })
    );
});
```

**2. Background Sync:**
```javascript
// Background sync for reliable data submission
self.addEventListener('sync', event => {
    if (event.tag === 'form-submission') {
        event.waitUntil(submitPendingForms());
    }
    
    if (event.tag === 'analytics-data') {
        event.waitUntil(syncAnalyticsData());
    }
});

async function submitPendingForms() {
    const db = await openDB();
    const pendingForms = await db.getAll('pending-forms');
    
    for (const form of pendingForms) {
        try {
            await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify(form.data),
                headers: { 'Content-Type': 'application/json' }
            });
            
            await db.delete('pending-forms', form.id);
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    }
}

// Client-side registration
if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        // Queue form submission for background sync
        function queueFormSubmission(formData) {
            return new Promise((resolve, reject) => {
                // Store in IndexedDB
                storeFormData(formData).then(() => {
                    // Request background sync
                    return registration.sync.register('form-submission');
                }).then(resolve).catch(reject);
            });
        }
        
        // Use background sync when online/offline
        document.addEventListener('submit', event => {
            if (event.target.matches('.sync-form')) {
                event.preventDefault();
                const formData = new FormData(event.target);
                
                if (navigator.onLine) {
                    submitForm(formData);
                } else {
                    queueFormSubmission(Object.fromEntries(formData));
                }
            }
        });
    });
}
```

**3. Cache API for Dynamic Content:**
```javascript
// Advanced caching with cache expiration
class CacheManager {
    constructor() {
        this.cacheName = 'dynamic-cache-v1';
        this.maxAge = 24 * 60 * 60 * 1000; // 24 hours
    }
    
    async get(request) {
        const cache = await caches.open(this.cacheName);
        const response = await cache.match(request);
        
        if (!response) return null;
        
        const cachedDate = response.headers.get('sw-cache-date');
        if (cachedDate && Date.now() - new Date(cachedDate) > this.maxAge) {
            await cache.delete(request);
            return null;
        }
        
        return response;
    }
    
    async put(request, response) {
        const cache = await caches.open(this.cacheName);
        const responseToCache = response.clone();
        
        // Add cache timestamp
        responseToCache.headers.set('sw-cache-date', new Date().toISOString());
        
        await cache.put(request, responseToCache);
    }
    
    async invalidate(pattern) {
        const cache = await caches.open(this.cacheName);
        const keys = await cache.keys();
        
        const deletePromises = keys
            .filter(request => request.url.match(pattern))
            .map(request => cache.delete(request));
        
        await Promise.all(deletePromises);
    }
}

// Usage in Service Worker
const cacheManager = new CacheManager();

self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/posts')) {
        event.respondWith(
            handleApiRequest(event.request)
        );
    }
});

async function handleApiRequest(request) {
    // Try cache first
    const cached = await cacheManager.get(request);
    if (cached) {
        // Return cached response and update in background
        fetchAndCache(request);
        return cached;
    }
    
    // Fetch from network
    return fetchAndCache(request);
}

async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            await cacheManager.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Return fallback response
        return new Response(
            JSON.stringify({ error: 'Network unavailable' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
}
```

#### Q8: How do you implement effective caching strategies?

**Answer:**
Effective caching reduces server load and improves user experience through strategic resource storage.

**Browser Caching (HTTP Headers):**
```javascript
// Express.js server configuration
app.use((req, res, next) => {
    // Static assets - long-term caching
    if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
        
        // ETags for validation
        res.setHeader('ETag', generateETag(req.url));
    }
    
    // HTML files - shorter caching with validation
    else if (req.url.match(/\.html$/)) {
        res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate'); // 5 minutes
    }
    
    // API responses - no cache by default
    else if (req.url.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    
    next();
});

// Conditional requests with ETags
app.get('/api/data', (req, res) => {
    const data = getCurrentData();
    const etag = generateETag(JSON.stringify(data));
    
    res.setHeader('ETag', etag);
    res.setHeader('Cache-Control', 'private, max-age=60'); // 1 minute
    
    // Check if client has current version
    if (req.headers['if-none-match'] === etag) {
        res.status(304).end(); // Not Modified
        return;
    }
    
    res.json(data);
});
```

**Application-Level Caching:**
```javascript
// Memory cache with LRU eviction
class LRUCache {
    constructor(maxSize = 100) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            // Move to end (most recently used)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return null;
    }
    
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.maxSize) {
            // Remove least recently used
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
    
    clear() {
        this.cache.clear();
    }
    
    size() {
        return this.cache.size;
    }
}

// Timed cache with automatic expiration
class TimedCache {
    constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutes
        this.cache = new Map();
        this.timers = new Map();
        this.defaultTTL = defaultTTL;
    }
    
    set(key, value, ttl = this.defaultTTL) {
        // Clear existing timer
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        }
        
        this.cache.set(key, value);
        
        // Set expiration timer
        const timer = setTimeout(() => {
            this.delete(key);
        }, ttl);
        
        this.timers.set(key, timer);
    }
    
    get(key) {
        return this.cache.get(key);
    }
    
    delete(key) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }
        return this.cache.delete(key);
    }
    
    clear() {
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers.clear();
        this.cache.clear();
    }
}

// Application cache manager
class AppCacheManager {
    constructor() {
        this.memoryCache = new LRUCache(200);
        this.apiCache = new TimedCache(2 * 60 * 1000); // 2 minutes
        this.componentCache = new Map();
        
        this.setupPerformanceMonitoring();
    }
    
    // API response caching
    async fetchWithCache(url, options = {}) {
        const cacheKey = `${url}:${JSON.stringify(options)}`;
        
        // Check memory cache first
        const cached = this.apiCache.get(cacheKey);
        if (cached) {
            console.log('Cache hit:', url);
            return cached;
        }
        
        console.log('Cache miss:', url);
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            // Cache successful responses
            if (response.ok) {
                this.apiCache.set(cacheKey, data);
            }
            
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
    
    // Component result caching
    memoizeComponent(fn, keyGenerator = (...args) => JSON.stringify(args)) {
        return (...args) => {
            const key = keyGenerator(...args);
            
            if (this.componentCache.has(key)) {
                return this.componentCache.get(key);
            }
            
            const result = fn(...args);
            this.componentCache.set(key, result);
            
            return result;
        };
    }
    
    // Computed value caching
    memoize(fn, maxSize = 50) {
        const cache = new LRUCache(maxSize);
        
        return (...args) => {
            const key = JSON.stringify(args);
            const cached = cache.get(key);
            
            if (cached !== null) {
                return cached;
            }
            
            const result = fn(...args);
            cache.set(key, result);
            
            return result;
        };
    }
    
    setupPerformanceMonitoring() {
        // Monitor cache hit rates
        setInterval(() => {
            console.log('Cache stats:', {
                memoryCache: this.memoryCache.size(),
                apiCache: this.apiCache.cache.size,
                componentCache: this.componentCache.size
            });
        }, 30000); // Every 30 seconds
    }
    
    // Cache invalidation
    invalidatePattern(pattern) {
        // Invalidate API cache
        for (const key of this.apiCache.cache.keys()) {
            if (key.match(pattern)) {
                this.apiCache.delete(key);
            }
        }
        
        // Invalidate component cache
        for (const key of this.componentCache.keys()) {
            if (key.match(pattern)) {
                this.componentCache.delete(key);
            }
        }
    }
    
    // Preload critical data
    async preloadCriticalData() {
        const criticalEndpoints = [
            '/api/user/current',
            '/api/navigation',
            '/api/config'
        ];
        
        await Promise.allSettled(
            criticalEndpoints.map(url => this.fetchWithCache(url))
        );
    }
}

// Usage
const cacheManager = new AppCacheManager();

// Memoized expensive calculation
const expensiveCalculation = cacheManager.memoize((data) => {
    // Complex calculation
    return data.reduce((sum, item) => sum + item.value * item.weight, 0);
});

// React integration
function useApiData(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        cacheManager.fetchWithCache(url, options)
            .then(setData)
            .finally(() => setLoading(false));
    }, [url, JSON.stringify(options)]);
    
    return { data, loading };
}
```

#### Q9: What is Critical Rendering Path optimization?

**Answer:**
The Critical Rendering Path is the sequence of steps browsers take to convert HTML, CSS, and JavaScript into pixels on screen.

**Critical Rendering Path Steps:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CRITICAL RENDERING PATH                           │
│                                                                     │
│  1. HTML → DOM Construction                                         │
│     │                                                               │
│  2. CSS → CSSOM Construction                                        │
│     │                                                               │
│  3. DOM + CSSOM → Render Tree                                       │
│     │                                                               │
│  4. Layout (Reflow) → Calculate positions and sizes                │
│     │                                                               │
│  5. Paint → Fill in pixels                                          │
│     │                                                               │
│  6. Composite → Layer composition                                   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    OPTIMIZATION POINTS                       │   │
│  │                                                             │   │
│  │  • Minimize Critical Resources                              │   │
│  │  • Minimize Critical Bytes                                  │   │
│  │  • Minimize Critical Path Length                            │   │
│  │  • Prioritize Above-the-fold Content                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Optimization Techniques:**

**1. Critical Resource Identification:**
```html
<!-- Critical CSS - inline above-the-fold styles -->
<style>
/* Critical styles for header, hero section, and layout */
body { margin: 0; font-family: system-ui; }
.header { background: white; padding: 1rem; position: sticky; top: 0; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 1rem; text-align: center; }
.hero h1 { font-size: clamp(2rem, 5vw, 4rem); margin: 0 0 1rem; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
</style>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/app.css" as="style">
<link rel="preload" href="/js/app.js" as="script">

<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//api.example.com">

<!-- Preconnect for critical third-party resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**2. Asynchronous Resource Loading:**
```html
<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>

<!-- JavaScript loading strategies -->
<script src="/js/critical.js"></script>
<script src="/js/app.js" defer></script>
<script src="/js/analytics.js" async></script>

<!-- Module loading -->
<script type="module" src="/js/modern.js"></script>
<script nomodule src="/js/legacy.js"></script>
```

**3. Resource Prioritization:**
```javascript
// Critical resource loading
class CriticalResourceLoader {
    constructor() {
        this.criticalResources = [
            { url: '/css/critical.css', type: 'style', priority: 'high' },
            { url: '/js/critical.js', type: 'script', priority: 'high' },
            { url: '/fonts/main.woff2', type: 'font', priority: 'high' }
        ];
        
        this.nonCriticalResources = [
            { url: '/css/features.css', type: 'style', priority: 'low' },
            { url: '/js/features.js', type: 'script', priority: 'low' },
            { url: '/images/hero.jpg', type: 'image', priority: 'low' }
        ];
        
        this.loadCriticalResources();
    }
    
    async loadCriticalResources() {
        // Load critical resources immediately
        const criticalPromises = this.criticalResources.map(resource => 
            this.loadResource(resource)
        );
        
        await Promise.all(criticalPromises);
        
        // Load non-critical resources after critical ones
        this.loadNonCriticalResources();
    }
    
    loadResource(resource) {
        return new Promise((resolve, reject) => {
            let element;
            
            switch (resource.type) {
                case 'style':
                    element = document.createElement('link');
                    element.rel = 'stylesheet';
                    element.href = resource.url;
                    break;
                    
                case 'script':
                    element = document.createElement('script');
                    element.src = resource.url;
                    break;
                    
                case 'font':
                    element = document.createElement('link');
                    element.rel = 'preload';
                    element.as = 'font';
                    element.href = resource.url;
                    element.crossOrigin = 'anonymous';
                    break;
                    
                case 'image':
                    element = new Image();
                    element.src = resource.url;
                    break;
            }
            
            element.onload = resolve;
            element.onerror = reject;
            
            if (resource.type !== 'image') {
                document.head.appendChild(element);
            }
        });
    }
    
    loadNonCriticalResources() {
        // Load when the main thread is idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.nonCriticalResources.forEach(resource => 
                    this.loadResource(resource)
                );
            });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
                this.nonCriticalResources.forEach(resource => 
                    this.loadResource(resource)
                );
            }, 0);
        }
    }
}

// Initialize critical resource loading
new CriticalResourceLoader();
```

**4. Progressive Enhancement:**
```javascript
// Progressive enhancement strategy
class ProgressiveEnhancer {
    constructor() {
        this.features = new Map();
        this.supportTests = new Map();
        
        this.registerFeatures();
        this.enhanceBasedOnSupport();
    }
    
    registerFeatures() {
        // Register feature enhancements
        this.features.set('intersection-observer', {
            test: () => 'IntersectionObserver' in window,
            enhance: () => import('./features/lazy-loading.js'),
            fallback: () => import('./features/eager-loading.js')
        });
        
        this.features.set('service-worker', {
            test: () => 'serviceWorker' in navigator,
            enhance: () => import('./features/offline-support.js'),
            fallback: () => console.log('Offline support not available')
        });
        
        this.features.set('web-components', {
            test: () => 'customElements' in window,
            enhance: () => import('./features/web-components.js'),
            fallback: () => import('./features/vanilla-components.js')
        });
        
        this.features.set('css-grid', {
            test: () => CSS.supports('display', 'grid'),
            enhance: () => this.loadCSS('/css/grid-layout.css'),
            fallback: () => this.loadCSS('/css/flexbox-layout.css')
        });
    }
    
    async enhanceBasedOnSupport() {
        for (const [name, feature] of this.features) {
            try {
                if (feature.test()) {
                    console.log(`Enhancing with ${name}`);
                    await feature.enhance();
                } else {
                    console.log(`Using fallback for ${name}`);
                    await feature.fallback();
                }
            } catch (error) {
                console.error(`Failed to enhance ${name}:`, error);
                await feature.fallback();
            }
        }
    }
    
    loadCSS(href) {
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            document.head.appendChild(link);
        });
    }
}

// Initialize progressive enhancement
new ProgressiveEnhancer();
```

**5. Critical Path Measurement:**
```javascript
// Measure Critical Rendering Path metrics
class CRPMonitor {
    constructor() {
        this.metrics = {};
        this.measureCRP();
    }
    
    measureCRP() {
        // Time to First Byte
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        this.metrics.ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
        
        // DOM Content Loaded
        this.metrics.domContentLoaded = navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart;
        
        // Load event
        this.metrics.loadComplete = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
        
        // First Paint and First Contentful Paint
        const paintTimings = performance.getEntriesByType('paint');
        paintTimings.forEach(timing => {
            if (timing.name === 'first-paint') {
                this.metrics.firstPaint = timing.startTime;
            } else if (timing.name === 'first-contentful-paint') {
                this.metrics.firstContentfulPaint = timing.startTime;
            }
        });
        
        // Largest Contentful Paint
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.largestContentfulPaint = lastEntry.startTime;
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Resource timing
        this.measureResourceTiming();
        
        // Report metrics
        this.reportMetrics();
    }
    
    measureResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        
        this.metrics.resources = {
            css: [],
            js: [],
            images: [],
            fonts: []
        };
        
        resources.forEach(resource => {
            const timing = {
                name: resource.name,
                duration: resource.duration,
                size: resource.transferSize,
                cached: resource.transferSize === 0
            };
            
            if (resource.initiatorType === 'css') {
                this.metrics.resources.css.push(timing);
            } else if (resource.initiatorType === 'script') {
                this.metrics.resources.js.push(timing);
            } else if (resource.initiatorType === 'img') {
                this.metrics.resources.images.push(timing);
            } else if (resource.name.includes('font')) {
                this.metrics.resources.fonts.push(timing);
            }
        });
    }
    
    reportMetrics() {
        console.log('Critical Rendering Path Metrics:', this.metrics);
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'critical_rendering_path',
                value: this.metrics.domContentLoaded
            });
        }
        
        // Performance recommendations
        this.generateRecommendations();
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        if (this.metrics.ttfb > 200) {
            recommendations.push('Optimize server response time (TTFB > 200ms)');
        }
        
        if (this.metrics.firstContentfulPaint > 1500) {
            recommendations.push('Optimize critical resources (FCP > 1.5s)');
        }
        
        const totalCSSSize = this.metrics.resources.css.reduce((sum, css) => sum + css.size, 0);
        if (totalCSSSize > 50 * 1024) {
            recommendations.push('Reduce CSS bundle size (> 50KB)');
        }
        
        const totalJSSize = this.metrics.resources.js.reduce((sum, js) => sum + js.size, 0);
        if (totalJSSize > 150 * 1024) {
            recommendations.push('Consider code splitting (JS > 150KB)');
        }
        
        if (recommendations.length > 0) {
            console.warn('Performance Recommendations:', recommendations);
        }
    }
}

// Initialize CRP monitoring
new CRPMonitor();
```

### 🔴 ADVANCED LEVEL

#### Q10: How do you optimize for different network conditions and devices?

**Answer:**
Adaptive performance optimization adjusts content delivery based on user's network and device capabilities.

**Network-Aware Loading:**
```javascript
// Network Information API integration
class AdaptiveLoader {
    constructor() {
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.networkTier = this.getNetworkTier();
        this.deviceCapabilities = this.getDeviceCapabilities();
        
        this.adaptContent();
        this.setupNetworkMonitoring();
    }
    
    getNetworkTier() {
        if (!this.connection) return 'unknown';
        
        const { effectiveType, downlink, rtt, saveData } = this.connection;
        
        if (saveData) return 'save-data';
        
        if (effectiveType === '4g' && downlink > 1.5 && rtt < 150) {
            return 'fast';
        } else if (effectiveType === '3g' || (effectiveType === '4g' && downlink <= 1.5)) {
            return 'moderate';
        } else {
            return 'slow';
        }
    }
    
    getDeviceCapabilities() {
        const capabilities = {
            memory: navigator.deviceMemory || 4, // GB
            cores: navigator.hardwareConcurrency || 4,
            screen: {
                width: screen.width,
                height: screen.height,
                density: window.devicePixelRatio || 1
            }
        };
        
        // Classify device tier
        if (capabilities.memory >= 8 && capabilities.cores >= 8) {
            capabilities.tier = 'high';
        } else if (capabilities.memory >= 4 && capabilities.cores >= 4) {
            capabilities.tier = 'medium';
        } else {
            capabilities.tier = 'low';
        }
        
        return capabilities;
    }
    
    adaptContent() {
        // Adapt images based on network and device
        this.adaptImages();
        
        // Adapt JavaScript loading
        this.adaptScripts();
        
        // Adapt animations and effects
        this.adaptAnimations();
        
        // Adapt video quality
        this.adaptVideo();
    }
    
    adaptImages() {
        const images = document.querySelectorAll('img[data-adaptive]');
        
        images.forEach(img => {
            const baseUrl = img.dataset.src;
            let quality = 80;
            let width = parseInt(img.dataset.width) || 800;
            
            // Adjust based on network tier
            switch (this.networkTier) {
                case 'save-data':
                case 'slow':
                    quality = 50;
                    width = Math.min(width, 400);
                    break;
                case 'moderate':
                    quality = 65;
                    width = Math.min(width, 600);
                    break;
                case 'fast':
                    quality = 80;
                    // Use full width
                    break;
            }
            
            // Adjust for device pixel ratio
            if (this.deviceCapabilities.screen.density > 1 && this.networkTier === 'fast') {
                width *= this.deviceCapabilities.screen.density;
            }
            
            // Construct optimized URL
            const optimizedUrl = `${baseUrl}?w=${width}&q=${quality}&format=webp`;
            img.src = optimizedUrl;
        });
    }
    
    adaptScripts() {
        const scripts = document.querySelectorAll('script[data-adaptive]');
        
        scripts.forEach(script => {
            const priority = script.dataset.priority || 'normal';
            
            // Skip non-essential scripts on slow networks or low-end devices
            if ((this.networkTier === 'slow' || this.deviceCapabilities.tier === 'low') && 
                priority === 'low') {
                script.remove();
                return;
            }
            
            // Defer loading on moderate networks
            if (this.networkTier === 'moderate' && priority === 'normal') {
                script.defer = true;
            }
        });
        
        // Load polyfills only when needed
        this.loadPolyfillsConditionally();
    }
    
    loadPolyfillsConditionally() {
        const polyfills = [];
        
        // Check for required features
        if (!('IntersectionObserver' in window)) {
            polyfills.push('intersection-observer');
        }
        
        if (!('ResizeObserver' in window)) {
            polyfills.push('resize-observer');
        }
        
        if (!CSS.supports('display', 'grid')) {
            polyfills.push('css-grid');
        }
        
        // Load polyfills based on network conditions
        if (polyfills.length > 0 && this.networkTier !== 'slow') {
            const polyfillUrl = `https://polyfill.io/v3/polyfill.min.js?features=${polyfills.join(',')}`;
            
            const script = document.createElement('script');
            script.src = polyfillUrl;
            script.async = true;
            document.head.appendChild(script);
        }
    }
    
    adaptAnimations() {
        // Disable animations on low-end devices or slow networks
        if (this.deviceCapabilities.tier === 'low' || this.networkTier === 'slow') {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            document.documentElement.style.setProperty('--transition-duration', '0s');
        }
        
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduce-motion');
        }
    }
    
    adaptVideo() {
        const videos = document.querySelectorAll('video[data-adaptive]');
        
        videos.forEach(video => {
            let quality = 'hd';
            
            switch (this.networkTier) {
                case 'save-data':
                case 'slow':
                    quality = 'low';
                    video.preload = 'none';
                    break;
                case 'moderate':
                    quality = 'medium';
                    video.preload = 'metadata';
                    break;
                case 'fast':
                    quality = 'hd';
                    video.preload = 'auto';
                    break;
            }
            
            // Update video source
            const source = video.querySelector('source');
            if (source) {
                const baseUrl = source.dataset.src;
                source.src = `${baseUrl}?quality=${quality}`;
            }
        });
    }
    
    setupNetworkMonitoring() {
        if (this.connection) {
            this.connection.addEventListener('change', () => {
                const newTier = this.getNetworkTier();
                if (newTier !== this.networkTier) {
                    this.networkTier = newTier;
                    this.adaptContent();
                    this.notifyNetworkChange();
                }
            });
        }
        
        // Monitor for data saver mode changes
        if ('connection' in navigator && 'saveData' in navigator.connection) {
            window.addEventListener('online', () => {
                if (navigator.connection.saveData !== this.connection.saveData) {
                    this.adaptContent();
                }
            });
        }
    }
    
    notifyNetworkChange() {
        // Dispatch custom event for app components
        window.dispatchEvent(new CustomEvent('networkchange', {
            detail: {
                tier: this.networkTier,
                connection: this.connection
            }
        }));
    }
}

// React hook for adaptive loading
function useAdaptiveLoading() {
    const [networkTier, setNetworkTier] = useState('unknown');
    const [deviceTier, setDeviceTier] = useState('medium');
    
    useEffect(() => {
        const loader = new AdaptiveLoader();
        setNetworkTier(loader.networkTier);
        setDeviceTier(loader.deviceCapabilities.tier);
        
        function handleNetworkChange(event) {
            setNetworkTier(event.detail.tier);
        }
        
        window.addEventListener('networkchange', handleNetworkChange);
        
        return () => {
            window.removeEventListener('networkchange', handleNetworkChange);
        };
    }, []);
    
    return {
        networkTier,
        deviceTier,
        shouldLoadImages: networkTier !== 'slow',
        shouldEnableAnimations: deviceTier !== 'low' && networkTier !== 'slow',
        shouldPreloadContent: networkTier === 'fast' && deviceTier === 'high'
    };
}

// Usage in React component
function AdaptiveImage({ src, alt, ...props }) {
    const { networkTier, shouldLoadImages } = useAdaptiveLoading();
    const [imageSrc, setImageSrc] = useState(null);
    
    useEffect(() => {
        if (!shouldLoadImages) {
            setImageSrc('/placeholder.svg');
            return;
        }
        
        let quality = 80;
        let width = props.width || 800;
        
        switch (networkTier) {
            case 'slow':
                quality = 50;
                width = Math.min(width, 400);
                break;
            case 'moderate':
                quality = 65;
                width = Math.min(width, 600);
                break;
        }
        
        setImageSrc(`${src}?w=${width}&q=${quality}&format=webp`);
    }, [src, networkTier, shouldLoadImages]);
    
    return <img src={imageSrc} alt={alt} {...props} loading="lazy" />;
}
```

## 🎯 Common Performance Interview Traps & Tips

### ❌ Trap 1: Over-optimization
```javascript
// Wrong - premature optimization
function expensiveFunction(data) {
    // Micro-optimizations that hurt readability
    const cache = Object.create(null);
    for (let i = 0, len = data.length; i < len; ++i) {
        // Complex caching logic for simple operations
    }
}

// Right - profile first, optimize bottlenecks
function expensiveFunction(data) {
    // Clear, readable code first
    return data.filter(item => item.active)
               .map(item => processItem(item));
}
```

### ❌ Trap 2: Ignoring User Experience
```javascript
// Wrong - focusing only on metrics
loadScript('/huge-analytics.js'); // Blocks main thread

// Right - prioritize user-facing features
requestIdleCallback(() => {
    loadScript('/analytics.js');
});
```

### ❌ Trap 3: One-size-fits-all Solutions
```javascript
// Wrong - same experience for everyone
<img src="4k-image.jpg" alt="Hero" />

// Right - adaptive based on capabilities
<picture>
    <source media="(min-width: 1200px)" srcset="large.webp">
    <source media="(min-width: 768px)" srcset="medium.webp">
    <img src="small.webp" alt="Hero" loading="lazy">
</picture>
```

### ✅ Pro Tips:
1. Measure before optimizing - use real user data
2. Focus on user-perceived performance, not just metrics
3. Implement progressive enhancement
4. Consider network and device capabilities
5. Use performance budgets to prevent regression
6. Monitor performance in production continuously