# State Management for Frontend Interviews

**Quản lý trạng thái cho phỏng vấn Frontend**

## 1. Why State Management?

- **Local state:** useState, useReducer, component state.
- **Global state:** Shared across app (user, theme, cart).
- **Server state:** Data from API, cache, sync.

## 2. Tools & Libraries

- **Redux:** Predictable, single source, middleware (thunk, saga), devtools.
- **Context API:** Lightweight, for small/medium apps, avoid prop drilling.
- **MobX:** Observable, reactive, less boilerplate.
- **Zustand:** Minimal, hooks-based, scalable.
- **Recoil:** Atom/selectors, async, React integration.
- **Jotai, XState, Akita:** Other options.

## 3. Patterns

- **Lifting state up:** Move state to common ancestor.
- **Derived state:** Compute from other state, avoid duplication.
- **Selector functions:** Memoize, reselect.
- **Normalized state:** Store by ID, avoid deep nesting.

## 4. Best Practices

- **Keep state minimal:** Only what you need.
- **Avoid prop drilling:** Use context or global store.
- **Immutable updates:** Spread/rest, immer.
- **Testing:** Mock store, test reducers/selectors.
- **Performance:** Avoid unnecessary re-renders, use memoization.

## 5. Interview Questions

- When to use Redux vs Context?
- How to handle async state (API calls)?
- How to avoid prop drilling?
- How to test state logic?

## 6. Resources

- [Redux Docs](https://redux.js.org/)
- [MobX Docs](https://mobx.js.org/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Recoil](https://recoiljs.org/)
