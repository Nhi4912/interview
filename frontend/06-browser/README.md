# Browser Internals - Hiểu Cách Browser Hoạt Động

> Hiểu browser internals giúp bạn optimize performance và debug issues hiệu quả hơn.

---

## Tổng Quan

Browser là môi trường runtime cho frontend code. Hiểu cách browser hoạt động là essential cho:
- Performance optimization
- Debugging
- Security awareness
- Senior-level interviews

---

## Cấu Trúc Module

| File | Chủ Đề | Độ Quan Trọng |
|------|--------|---------------|
| [01-browser-architecture.md](./01-browser-architecture.md) | Multi-process Architecture | ⭐⭐⭐⭐ |
| [02-rendering-pipeline.md](./02-rendering-pipeline.md) | DOM, CSSOM, Layout, Paint | ⭐⭐⭐⭐⭐ |
| [03-javascript-engine.md](./03-javascript-engine.md) | V8, JIT Compilation | ⭐⭐⭐⭐ |
| [04-browser-storage.md](./04-browser-storage.md) | localStorage, IndexedDB, Cookies | ⭐⭐⭐⭐ |
| [05-browser-apis.md](./05-browser-apis.md) | Web APIs Deep Dive | ⭐⭐⭐ |
| [06-devtools-mastery.md](./06-devtools-mastery.md) | Chrome DevTools | ⭐⭐⭐⭐ |
| [mindmap-browser.md](./mindmap-browser.md) | Sơ Đồ Tổng Hợp | Review |

---

## Browser Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER PROCESS                              │
├─────────────────────────────────────────────────────────────────────┤
│  UI │ Network │ Storage │ GPU │ Device │ Plugin                      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Renderer    │  │   Renderer    │  │   Renderer    │
│   Process     │  │   Process     │  │   Process     │
│   (Tab 1)     │  │   (Tab 2)     │  │   (Tab 3)     │
├───────────────┤  ├───────────────┤  ├───────────────┤
│ • Main Thread │  │ • Main Thread │  │ • Main Thread │
│ • Compositor  │  │ • Compositor  │  │ • Compositor  │
│ • Raster      │  │ • Raster      │  │ • Raster      │
│ • Worker      │  │ • Worker      │  │ • Worker      │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

## Critical Rendering Path

```
HTML ──► DOM ──┐
               ├──► Render Tree ──► Layout ──► Paint ──► Composite
CSS ──► CSSOM ─┘
```

### Các Bước Chi Tiết

1. **Parse HTML → DOM Tree**
   - Byte → Characters → Tokens → Nodes → DOM

2. **Parse CSS → CSSOM**
   - CSS rules được parse thành tree structure

3. **Combine → Render Tree**
   - DOM + CSSOM = Render Tree
   - Chỉ visible elements

4. **Layout (Reflow)**
   - Tính toán size và position của mỗi element
   - Expensive operation!

5. **Paint**
   - Vẽ pixels lên layers

6. **Composite**
   - Gom layers thành final image

---

## Performance Implications

### Reflow Triggers (Expensive)
```javascript
// ❌ Forces reflow
element.offsetHeight;
element.getBoundingClientRect();
window.getComputedStyle();

// ❌ Multiple reflows
for (let i = 0; i < 100; i++) {
    element.style.left = i + 'px';
    console.log(element.offsetLeft); // Reflow!
}

// ✅ Batch reads/writes
const height = element.offsetHeight; // Read
element.style.height = height + 10 + 'px'; // Write
```

### Paint Triggers
- color, background-color
- visibility, outline
- box-shadow, border-radius

### Composite Only (Cheap)
- transform
- opacity
- Use for animations!

---

## Browser Storage

| Storage | Size | Persistence | Access |
|---------|------|-------------|--------|
| localStorage | ~5-10MB | Permanent | Sync |
| sessionStorage | ~5-10MB | Tab lifetime | Sync |
| IndexedDB | Large | Permanent | Async |
| Cookies | ~4KB | Configurable | Auto-sent |
| Cache API | Large | Until cleared | Async |

```javascript
// localStorage
localStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(localStorage.getItem('user'));

// IndexedDB (async)
const request = indexedDB.open('myDB', 1);
request.onsuccess = (e) => {
    const db = e.target.result;
    // Use db...
};
```

---

## Top Interview Questions

| Question | Difficulty |
|----------|------------|
| Explain Critical Rendering Path | 🔴 |
| Reflow vs Repaint | 🟡 |
| How V8 compiles JavaScript? | 🔴 |
| localStorage vs sessionStorage vs cookies | 🟢 |
| How to optimize rendering performance? | 🟡 |

---

## Resources

- [How Browsers Work](https://web.dev/howbrowserswork/)
- [Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1/)
- [Rendering Performance](https://web.dev/rendering-performance/)

---

> **Thời gian ước tính:** 1 tuần
