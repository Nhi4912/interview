# Frontend Performance for Interviews

**Tối ưu hiệu suất Frontend cho phỏng vấn**

## 1. Code Splitting & Lazy Loading

- **Dynamic imports:** React.lazy, import(), suspense.
- **Route-based splitting:** Load only needed code.
- **Component-level splitting:** Split heavy components.

## 2. Memoization

- **React.memo:** Prevent unnecessary re-renders.
- **useMemo, useCallback:** Memoize values/functions.
- **Selector memoization:** Reselect, useSelector.

## 3. Virtualization

- **Large lists:** react-window, react-virtualized.
- **Windowing:** Only render visible items.

## 4. Bundle Optimization

- **Tree shaking:** Remove unused code.
- **Bundle analysis:** webpack-bundle-analyzer.
- **Minification, compression:** Terser, gzip, brotli.
- **Caching:** Service workers, HTTP cache.

## 5. Runtime Performance

- **Avoid expensive operations in render.**
- **Debounce/throttle:** User input, scroll, resize.
- **Web Workers:** Offload heavy computation.

## 6. Core Web Vitals

- **LCP (Largest Contentful Paint):** Loading speed.
- **FID (First Input Delay):** Interactivity.
- **CLS (Cumulative Layout Shift):** Visual stability.

## 7. Best Practices

- **Optimize images:** Lazy load, compress, use modern formats.
- **Reduce reflows/repaints:** Batch DOM updates.
- **Minimize third-party scripts.**
- **Monitor performance:** Lighthouse, WebPageTest, Sentry.

## 8. Interview Questions

- How to optimize a slow React app?
- How to reduce bundle size?
- What are Core Web Vitals?
- How to handle large lists efficiently?

## 9. Resources

- [React Performance](https://react.dev/learn/optimizing-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analysis](https://webpack.js.org/guides/code-splitting/)
