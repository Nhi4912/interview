2:I[5907,["918","static/chunks/918-3273b83890f10546.js","930","static/chunks/930-3262a6c9c5acace4.js","687","static/chunks/app/docs/%5B...slug%5D/page-036ada1d0a865043.js"],"default"]
4:I[4707,[],""]
6:I[6423,[],""]
7:I[2,["918","static/chunks/918-3273b83890f10546.js","710","static/chunks/710-dfaa11b4dff08f8e.js","972","static/chunks/972-011bba60ed155615.js","233","static/chunks/233-3e0c1d820a17eca9.js","185","static/chunks/app/layout-333f4adcd11f8f39.js"],"default",1]
3:T3109,# Performance Optimization Interview Preparation Guide

## Table of Contents

- [Core Concepts](#core-concepts)
- [Performance Metrics](#performance-metrics)
- [Optimization Techniques](#optimization-techniques)
- [Common Interview Questions](#common-interview-questions)
- [Advanced Topics](#advanced-topics)
- [Tools and Monitoring](#tools-and-monitoring)
- [Practice Problems](#practice-problems)

## Core Concepts

### Web Performance Fundamentals

#### 1. Critical Rendering Path

**Definition**: The sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the screen.

**Steps**:

1. **Parse HTML** → DOM Tree
2. **Parse CSS** → CSSOM Tree
3. **Combine DOM + CSSOM** → Render Tree
4. **Layout** → Calculate positions and sizes
5. **Paint** → Draw pixels to screen

#### 2. Performance Budgets

**Definition**: Set limits for performance metrics to ensure good user experience.

**Common Budgets**:

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Total Bundle Size: < 250KB

#### 3. Performance Optimization Principles

**Definition**: Core principles for improving web performance.

**Key Principles**:

- Minimize critical resources
- Reduce critical bytes
- Optimize critical rendering path
- Eliminate render-blocking resources
- Minimize main thread work

### Performance Optimization Techniques

- **Code Splitting**: Dynamic imports, route-based splitting
- **Lazy Loading**: Images, components, routes
- **Caching Strategies**: Browser, CDN, application caching
- **Minification**: JavaScript, CSS, HTML compression
- **Image Optimization**: Formats, compression, responsive images

## Performance Metrics

### Core Web Vitals

#### 1. Largest Contentful Paint (LCP)

**Definition**: Time from page load until the largest content element is visible.

**Target**: < 2.5 seconds

**Optimization**:

- Optimize images
- Use CDN
- Implement lazy loading
- Optimize server response time
- Use resource hints

#### 2. First Input Delay (FID)

**Definition**: Time from user interaction to browser response.

**Target**: < 100 milliseconds

**Optimization**:

- Reduce JavaScript execution time
- Code splitting
- Remove unused JavaScript
- Optimize event handlers
- Use web workers

#### 3. Cumulative Layout Shift (CLS)

**Definition**: Measure of visual stability during page load.

**Target**: < 0.1

**Optimization**:

- Set explicit dimensions for images
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use transform animations instead of layout changes

### Additional Metrics

#### 1. First Contentful Paint (FCP)

**Definition**: Time until first content is painted on screen.

**Target**: < 1.5 seconds

#### 2. Time to Interactive (TTI)

**Definition**: Time until page becomes interactive.

**Target**: < 3.8 seconds

#### 3. Total Blocking Time (TBT)

**Definition**: Total time when main thread was blocked.

**Target**: < 200 milliseconds

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

{% raw %}
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
{% endraw %}

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
5:["slug","frontend/performance/README","c"]
0:["fjDGwqtt1UnBZeA2uH4xO",[[["",{"children":["docs",{"children":[["slug","frontend/performance/README","c"],{"children":["__PAGE__?{\"slug\":[\"frontend\",\"performance\",\"README\"]}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["docs",{"children":[["slug","frontend/performance/README","c"],{"children":["__PAGE__",{},[["$L1",["$","div",null,{"style":{"maxWidth":"1200px","margin":"0 auto","padding":"2rem","paddingTop":"6rem"},"children":[["$","div",null,{"style":{"marginBottom":"2rem"},"children":[["$","nav",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"1rem"},"children":[["$","a",null,{"href":"/interview","style":{"color":"#3b82f6","textDecoration":"none"},"children":"Home"}]," > ",["$","span",null,{"children":"frontend > performance > README"}]]}],["$","h1",null,{"style":{"fontSize":"2.5rem","fontWeight":"800","marginBottom":"0.5rem","color":"#1e293b"},"children":"README"}],["$","div",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"2rem"},"children":[["$","span",null,{"children":["📁 ","frontend/performance/README.md"]}],"$undefined","$undefined"]}]]}],["$","$L2",null,{"content":"$3"}]]}],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children","$5","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/interview/_next/static/css/387024c6a2216908.css","precedence":"next","crossOrigin":"$undefined"}]],["$","$L7",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],"params":{}}]],null],null],["$L8",null]]]]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"README - Frontend Interview Docs"}],["$","meta","3",{"name":"description","content":"# Performance Optimization Interview Preparation Guide  ## Table of Contents  - [Core Concepts](#core-concepts) - [Performance Metrics](#performance-metrics) - "}],["$","meta","4",{"property":"og:title","content":"README - Frontend Interview Docs"}],["$","meta","5",{"property":"og:description","content":"# Performance Optimization Interview Preparation Guide  ## Table of Contents  - [Core Concepts](#core-concepts) - [Performance Metrics](#performance-metrics) - "}],["$","meta","6",{"property":"og:type","content":"article"}],["$","meta","7",{"name":"twitter:card","content":"summary"}],["$","meta","8",{"name":"twitter:title","content":"README - Frontend Interview Docs"}],["$","meta","9",{"name":"twitter:description","content":"# Performance Optimization Interview Preparation Guide  ## Table of Contents  - [Core Concepts](#core-concepts) - [Performance Metrics](#performance-metrics) - "}],["$","meta","10",{"name":"next-size-adjust"}]]
1:null
