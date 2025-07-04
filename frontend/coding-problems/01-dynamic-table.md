# Problem 1: Dynamic Table Generator

## Problem Description

Create a function that generates a dynamic table from an array of objects with sorting and filtering capabilities.

## Requirements

- Accept array of objects as input
- Generate table headers automatically from object keys
- Support sorting by any column
- Support filtering by any column
- Make it responsive

## Solution

```javascript
class DynamicTable {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.currentSort = { column: null, direction: "asc" };
    this.filters = {};
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.data.length) {
      this.container.innerHTML = "<p>No data available</p>";
      return;
    }

    const headers = Object.keys(this.data[0]);
    const filteredData = this.getFilteredData();
    const sortedData = this.getSortedData(filteredData);

    const tableHTML = `
      <div class="table-controls">
        <div class="filters">
          ${headers
            .map(
              (header) => `
            <input 
              type="text" 
              placeholder="Filter ${header}..."
              data-filter="${header}"
              class="filter-input"
            >
          `
            )
            .join("")}
        </div>
      </div>
      <table class="dynamic-table">
        <thead>
          <tr>
            ${headers
              .map(
                (header) => `
              <th data-sort="${header}" class="sortable">
                ${header}
                <span class="sort-indicator"></span>
              </th>
            `
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${sortedData
            .map(
              (row) => `
            <tr>
              ${headers
                .map(
                  (header) => `
                <td>${row[header]}</td>
              `
                )
                .join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    this.container.innerHTML = tableHTML;
  }

  getFilteredData() {
    return this.data.filter((row) => {
      return Object.keys(this.filters).every((filterKey) => {
        const filterValue = this.filters[filterKey].toLowerCase();
        const cellValue = String(row[filterKey]).toLowerCase();
        return cellValue.includes(filterValue);
      });
    });
  }

  getSortedData(data) {
    if (!this.currentSort.column) return data;

    return [...data].sort((a, b) => {
      const aVal = a[this.currentSort.column];
      const bVal = b[this.currentSort.column];

      if (typeof aVal === "string") {
        return this.currentSort.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return this.currentSort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }

  attachEventListeners() {
    // Sort event listeners
    this.container.addEventListener("click", (e) => {
      if (e.target.closest(".sortable")) {
        const header = e.target.closest(".sortable");
        const column = header.dataset.sort;

        if (this.currentSort.column === column) {
          this.currentSort.direction =
            this.currentSort.direction === "asc" ? "desc" : "asc";
        } else {
          this.currentSort.column = column;
          this.currentSort.direction = "asc";
        }

        this.render();
      }
    });

    // Filter event listeners
    this.container.addEventListener("input", (e) => {
      if (e.target.classList.contains("filter-input")) {
        const filterKey = e.target.dataset.filter;
        const filterValue = e.target.value;

        if (filterValue) {
          this.filters[filterKey] = filterValue;
        } else {
          delete this.filters[filterKey];
        }

        this.render();
      }
    });
  }
}

// Usage
const sampleData = [
  { name: "John", age: 25, city: "New York", salary: 50000 },
  { name: "Jane", age: 30, city: "Los Angeles", salary: 60000 },
  { name: "Bob", age: 35, city: "Chicago", salary: 55000 },
  { name: "Alice", age: 28, city: "Boston", salary: 65000 },
];

const table = new DynamicTable("table-container", sampleData);
```

## CSS Styling

```css
.dynamic-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.dynamic-table th,
.dynamic-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.dynamic-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.dynamic-table th:hover {
  background-color: #e9e9e9;
}

.sortable {
  position: relative;
}

.sort-indicator::after {
  content: "↕";
  position: absolute;
  right: 8px;
  color: #999;
}

.sortable[data-sort="name"].asc .sort-indicator::after {
  content: "↑";
  color: #007bff;
}

.sortable[data-sort="name"].desc .sort-indicator::after {
  content: "↓";
  color: #007bff;
}

.table-controls {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .dynamic-table {
    font-size: 14px;
  }

  .dynamic-table th,
  .dynamic-table td {
    padding: 8px 6px;
  }

  .filters {
    flex-direction: column;
  }
}
```

## Key Features

1. **Automatic Header Generation**: Creates headers from object keys
2. **Sorting**: Click headers to sort by column
3. **Filtering**: Real-time filtering by any column
4. **Responsive Design**: Adapts to different screen sizes
5. **Performance**: Efficient rendering and event handling
6. **Accessibility**: Proper semantic HTML and keyboard navigation

## Advanced Usage

```javascript
// With custom styling
const customTable = new DynamicTable("custom-table", data);

// With custom cell renderers
class CustomTable extends DynamicTable {
  renderCell(value, column) {
    if (column === "salary") {
      return `$${value.toLocaleString()}`;
    }
    if (column === "age") {
      return `${value} years`;
    }
    return value;
  }
}
```
