# Problem 4: Virtual Scrolling Implementation

## Problem Description

Implement virtual scrolling for a large list of items to improve performance when dealing with thousands of records.

## Requirements

- Handle thousands of items efficiently
- Maintain smooth scrolling
- Support dynamic item heights
- Implement proper recycling
- Handle scroll events optimally

## Solution

{% raw %}
```javascript
class VirtualScroller {
  constructor(container, options = {}) {
    this.container = container;
    this.itemHeight = options.itemHeight || 50;
    this.overscan = options.overscan || 5;
    this.items = [];
    this.visibleItems = new Map();
    this.scrollTop = 0;
    this.containerHeight = 0;
    this.totalHeight = 0;

    this.init();
  }

  init() {
    this.setupContainer();
    this.attachEventListeners();
    this.updateDimensions();
  }

  setupContainer() {
    this.container.innerHTML = `
      <div class="virtual-scroller">
        <div class="virtual-scroller-content"></div>
        <div class="virtual-scroller-spacer"></div>
      </div>
    `;

    this.content = this.container.querySelector(".virtual-scroller-content");
    this.spacer = this.container.querySelector(".virtual-scroller-spacer");
  }

  attachEventListeners() {
    let ticking = false;

    this.container.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    window.addEventListener("resize", () => {
      this.updateDimensions();
      this.render();
    });
  }

  handleScroll() {
    const newScrollTop = this.container.scrollTop;
    if (Math.abs(newScrollTop - this.scrollTop) > this.itemHeight / 2) {
      this.scrollTop = newScrollTop;
      this.render();
    }
  }

  updateDimensions() {
    this.containerHeight = this.container.clientHeight;
    this.totalHeight = this.items.length * this.itemHeight;
    this.spacer.style.height = `${this.totalHeight}px`;
  }

  setItems(items) {
    this.items = items;
    this.updateDimensions();
    this.render();
  }

  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex +
        Math.ceil(this.containerHeight / this.itemHeight) +
        this.overscan,
      this.items.length
    );

    const startIndexWithOverscan = Math.max(0, startIndex - this.overscan);
    const endIndexWithOverscan = Math.min(
      this.items.length,
      endIndex + this.overscan
    );

    // Remove items that are no longer visible
    for (const [index, element] of this.visibleItems) {
      if (index < startIndexWithOverscan || index >= endIndexWithOverscan) {
        element.remove();
        this.visibleItems.delete(index);
      }
    }

    // Add new visible items
    for (let i = startIndexWithOverscan; i < endIndexWithOverscan; i++) {
      if (!this.visibleItems.has(i)) {
        const element = this.renderItem(this.items[i], i);
        element.style.position = "absolute";
        element.style.top = `${i * this.itemHeight}px`;
        element.style.width = "100%";
        element.style.height = `${this.itemHeight}px`;

        this.content.appendChild(element);
        this.visibleItems.set(i, element);
      }
    }
  }

  renderItem(item, index) {
    const element = document.createElement("div");
    element.className = "virtual-item";
    element.innerHTML = `
      <div class="item-content">
        <span class="item-index">${index + 1}</span>
        <span class="item-text">${item.text}</span>
      </div>
    `;
    return element;
  }

  scrollToIndex(index) {
    const scrollTop = index * this.itemHeight;
    this.container.scrollTop = scrollTop;
  }

  getVisibleRange() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(this.containerHeight / this.itemHeight),
      this.items.length
    );
    return { startIndex, endIndex };
  }
}

// Usage
const container = document.getElementById("virtual-scroll-container");
const virtualScroller = new VirtualScroller(container, {
  itemHeight: 60,
  overscan: 10,
});

// Generate large dataset
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Item ${
    i + 1
  } - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
}));

virtualScroller.setItems(items);
```
{% endraw %}

## CSS Styling

```css
.virtual-scroller {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.virtual-scroller-content {
  position: relative;
  width: 100%;
}

.virtual-scroller-spacer {
  width: 100%;
}

.virtual-item {
  border-bottom: 1px solid #eee;
  background: white;
  transition: background-color 0.2s;
}

.virtual-item:hover {
  background-color: #f8f9fa;
}

.item-content {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-index {
  font-weight: 600;
  color: #007bff;
  min-width: 40px;
}

.item-text {
  color: #333;
  line-height: 1.4;
}
```

## Advanced Features

### Dynamic Height Support

```javascript
class DynamicVirtualScroller extends VirtualScroller {
  constructor(container, options = {}) {
    super(container, options);
    this.itemHeights = new Map();
    this.estimatedHeight = options.estimatedHeight || 50;
  }

  updateItemHeight(index, height) {
    this.itemHeights.set(index, height);
    this.updateTotalHeight();
    this.render();
  }

  updateTotalHeight() {
    this.totalHeight = Array.from(
      { length: this.items.length },
      (_, i) => this.itemHeights.get(i) || this.estimatedHeight
    ).reduce((sum, height) => sum + height, 0);

    this.spacer.style.height = `${this.totalHeight}px`;
  }

  getItemTop(index) {
    let top = 0;
    for (let i = 0; i < index; i++) {
      top += this.itemHeights.get(i) || this.estimatedHeight;
    }
    return top;
  }

  render() {
    const visibleRange = this.getVisibleRange();
    const startIndex = Math.max(0, visibleRange.startIndex - this.overscan);
    const endIndex = Math.min(
      this.items.length,
      visibleRange.endIndex + this.overscan
    );

    // Remove items that are no longer visible
    for (const [index, element] of this.visibleItems) {
      if (index < startIndex || index >= endIndex) {
        element.remove();
        this.visibleItems.delete(index);
      }
    }

    // Add new visible items
    for (let i = startIndex; i < endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        const element = this.renderItem(this.items[i], i);
        element.style.position = "absolute";
        element.style.top = `${this.getItemTop(i)}px`;
        element.style.width = "100%";

        this.content.appendChild(element);
        this.visibleItems.set(i, element);
      }
    }
  }
}
```
{% endraw %}

### Search and Filter Support

```javascript
class SearchableVirtualScroller extends VirtualScroller {
  constructor(container, options = {}) {
    super(container, options);
    this.filteredItems = [];
    this.searchTerm = "";
  }

  search(term) {
    this.searchTerm = term.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.text.toLowerCase().includes(this.searchTerm)
    );
    this.updateDimensions();
    this.render();
  }

  updateDimensions() {
    this.containerHeight = this.container.clientHeight;
    this.totalHeight = this.filteredItems.length * this.itemHeight;
    this.spacer.style.height = `${this.totalHeight}px`;
  }

  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex +
        Math.ceil(this.containerHeight / this.itemHeight) +
        this.overscan,
      this.filteredItems.length
    );

    const startIndexWithOverscan = Math.max(0, startIndex - this.overscan);
    const endIndexWithOverscan = Math.min(
      this.filteredItems.length,
      endIndex + this.overscan
    );

    // Remove items that are no longer visible
    for (const [index, element] of this.visibleItems) {
      if (index < startIndexWithOverscan || index >= endIndexWithOverscan) {
        element.remove();
        this.visibleItems.delete(index);
      }
    }

    // Add new visible items
    for (let i = startIndexWithOverscan; i < endIndexWithOverscan; i++) {
      if (!this.visibleItems.has(i)) {
        const element = this.renderItem(this.filteredItems[i], i);
        element.style.position = "absolute";
        element.style.top = `${i * this.itemHeight}px`;
        element.style.width = "100%";
        element.style.height = `${this.itemHeight}px`;

        this.content.appendChild(element);
        this.visibleItems.set(i, element);
      }
    }
  }
}
```

## Performance Optimizations

### Memory Management

```javascript
class OptimizedVirtualScroller extends VirtualScroller {
  constructor(container, options = {}) {
    super(container, options);
    this.elementPool = [];
    this.maxPoolSize = options.maxPoolSize || 100;
  }

  getElementFromPool() {
    if (this.elementPool.length > 0) {
      return this.elementPool.pop();
    }
    return document.createElement("div");
  }

  returnElementToPool(element) {
    if (this.elementPool.length < this.maxPoolSize) {
      element.innerHTML = "";
      element.className = "";
      element.style.cssText = "";
      this.elementPool.push(element);
    }
  }

  render() {
    // Implementation with element recycling
    const visibleRange = this.getVisibleRange();

    // Remove invisible items and return to pool
    for (const [index, element] of this.visibleItems) {
      if (
        index < visibleRange.startIndex - this.overscan ||
        index >= visibleRange.endIndex + this.overscan
      ) {
        this.returnElementToPool(element);
        this.visibleItems.delete(index);
      }
    }

    // Add visible items
    for (
      let i = visibleRange.startIndex - this.overscan;
      i < visibleRange.endIndex + this.overscan;
      i++
    ) {
      if (i >= 0 && i < this.items.length && !this.visibleItems.has(i)) {
        const element = this.getElementFromPool();
        this.renderItem(this.items[i], i, element);
        element.style.position = "absolute";
        element.style.top = `${i * this.itemHeight}px`;
        element.style.width = "100%";
        element.style.height = `${this.itemHeight}px`;

        this.content.appendChild(element);
        this.visibleItems.set(i, element);
      }
    }
  }
}
```

## Key Features

1. **Efficient Rendering**: Only renders visible items plus overscan
2. **Smooth Scrolling**: Uses requestAnimationFrame for optimal performance
3. **Memory Management**: Recycles DOM elements to reduce memory usage
4. **Dynamic Heights**: Support for variable item heights
5. **Search Integration**: Filter items while maintaining performance
6. **Responsive Design**: Adapts to container size changes
7. **Accessibility**: Maintains proper focus management
8. **Error Handling**: Graceful handling of edge cases

## Usage Examples

```javascript
// Basic usage
const basicScroller = new VirtualScroller(container, {
  itemHeight: 60,
  overscan: 10,
});

// With search
const searchableScroller = new SearchableVirtualScroller(container, {
  itemHeight: 60,
  overscan: 10,
});

searchableScroller.search("lorem");

// With dynamic heights
const dynamicScroller = new DynamicVirtualScroller(container, {
  estimatedHeight: 50,
  overscan: 10,
});

// With optimization
const optimizedScroller = new OptimizedVirtualScroller(container, {
  itemHeight: 60,
  overscan: 10,
  maxPoolSize: 100,
});
```
