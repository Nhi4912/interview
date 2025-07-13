---
layout: page
title: "Frontend Architecture for Big Tech Interviews"
description: "Comprehensive guide to frontend architecture patterns and design principles for technical interviews"
category: System Design
tags: [Architecture, System Design, SPA, SSR, Performance]
---

# Frontend Architecture for Big Tech Interviews

**Kiến trúc Frontend cho phỏng vấn Big Tech**

## 1. Application Types

- **SPA (Single Page Application):** Client-side routing, fast navigation, e.g., React, Angular, Vue.
- **SSR (Server Side Rendering):** Initial HTML rendered on server, better SEO/performance, e.g., Next.js, Nuxt.js.
- **CSR (Client Side Rendering):** All rendering in browser, fast after initial load.
- **SSG (Static Site Generation):** Pre-rendered HTML at build time, fast, e.g., Gatsby, Next.js static export.

## 2. Micro-Frontends

- **Definition:** Breaking frontend into independently deployable apps.
- **Benefits:** Scalability, team autonomy, tech diversity.
- **Techniques:** iframe, Webpack Module Federation, custom events, single-spa.

## 3. Modularity & Code Organization

- **Component-based architecture:** Reusable, isolated, testable units.
- **Feature folders:** Group by feature, not type.
- **Shared libraries:** Common UI, utilities, hooks.

## 4. Scalability

- **Code splitting:** Dynamic imports, lazy loading.
- **Performance:** Bundle analysis, tree shaking, caching.
- **State management:** Redux, Context, MobX, Zustand.
- **API layer:** Service abstraction, error handling, retries.

## 5. Best Practices

- **Separation of concerns:** UI, logic, data.
- **Testing:** Unit, integration, E2E.
- **Accessibility:** ARIA, keyboard navigation.
- **Internationalization:** i18n, l10n.
- **Security:** XSS, CSRF, CSP, input validation.

## 6. Interview Questions

- SPA vs SSR vs SSG: tradeoffs?
- How to design a scalable frontend for millions of users?
- How to split a monolith into micro-frontends?
- How to optimize bundle size?

## 7. Resources

- [Micro-Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [Next.js Docs](https://nextjs.org/docs)
- [SPA vs SSR vs SSG](https://web.dev/rendering-on-the-web/)
