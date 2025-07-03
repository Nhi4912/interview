# Accessibility Interview Preparation

## Core Concepts

### Accessibility Fundamentals

- **WCAG 2.1 Guidelines**: Web Content Accessibility Guidelines
- **ARIA (Accessible Rich Internet Applications)**: Attributes for screen readers
- **Semantic HTML**: Meaningful HTML structure for assistive technologies
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Text-to-speech compatibility

### WCAG Principles

- **Perceivable**: Information must be presentable to users in ways they can perceive
- **Operable**: User interface components and navigation must be operable
- **Understandable**: Information and operation of user interface must be understandable
- **Robust**: Content must be robust enough to be interpreted by assistive technologies

## Advanced Topics

### Modern Accessibility Features

- **Focus Management**: Programmatic focus control
- **Live Regions**: Dynamic content announcements
- **Skip Links**: Keyboard navigation shortcuts
- **High Contrast Mode**: Visual accessibility support
- **Reduced Motion**: Respect user motion preferences

### Accessibility Testing

- **Automated Testing**: Tools for accessibility validation
- **Manual Testing**: Human verification of accessibility
- **Screen Reader Testing**: Testing with assistive technologies
- **Keyboard Testing**: Full keyboard navigation verification
- **Color Contrast Testing**: Visual accessibility validation

## Common Interview Questions & Answers

### Accessibility Questions

**Q: What are the main WCAG 2.1 guidelines and how do you implement them?**
A: WCAG 2.1 has three levels: A, AA, and AAA. Key guidelines include:

**Level A (Basic):**

- Non-text content has text alternatives
- Keyboard accessible
- No keyboard traps
- Color is not the only way to convey information

**Level AA (Standard):**

- Sufficient color contrast (4.5:1 for normal text)
- Resizable text up to 200%
- Focus visible
- Multiple ways to navigate

**Implementation Examples:**

```javascript
// 1. Semantic HTML structure
function AccessibleNavigation() {
  return (
    <nav aria-label="Main navigation">
      <ul role="menubar">
        <li role="none">
          <a href="/home" role="menuitem" aria-current="page">
            Home
          </a>
        </li>
        <li role="none">
          <a href="/about" role="menuitem">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}

// 2. Proper form labeling
function AccessibleForm() {
  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        aria-describedby="username-help"
        aria-required="true"
      />
      <div id="username-help">Enter your username</div>

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        aria-describedby="password-requirements"
        aria-required="true"
      />
      <div id="password-requirements">
        Password must be at least 8 characters
      </div>
    </form>
  );
}

// 3. ARIA live regions for dynamic content
function LiveRegion() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <button onClick={() => setMessage("Action completed!")}>
        Perform Action
      </button>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
    </div>
  );
}
```

**Q: How do you implement keyboard navigation for custom components?**
A: Comprehensive keyboard navigation implementation:

```javascript
class KeyboardNavigation {
  constructor(container) {
    this.container = container;
    this.focusableElements = [];
    this.currentIndex = 0;
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    // Find all focusable elements
    this.focusableElements = Array.from(
      this.container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    // Add keyboard event listeners
    this.container.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Add focus management
    this.container.addEventListener("focusin", this.handleFocusIn.bind(this));
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        this.moveFocus(1);
        break;

      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        this.moveFocus(-1);
        break;

      case "Home":
        event.preventDefault();
        this.moveToFirst();
        break;

      case "End":
        event.preventDefault();
        this.moveToLast();
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        this.activateCurrent();
        break;

      case "Escape":
        this.handleEscape();
        break;
    }
  }

  moveFocus(direction) {
    const newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.focusableElements.length) {
      this.currentIndex = newIndex;
      this.focusableElements[this.currentIndex].focus();
    }
  }

  moveToFirst() {
    this.currentIndex = 0;
    this.focusableElements[0].focus();
  }

  moveToLast() {
    this.currentIndex = this.focusableElements.length - 1;
    this.focusableElements[this.currentIndex].focus();
  }

  activateCurrent() {
    const currentElement = this.focusableElements[this.currentIndex];

    if (currentElement.tagName === "BUTTON") {
      currentElement.click();
    } else if (currentElement.tagName === "A") {
      currentElement.click();
    }
  }

  handleFocusIn(event) {
    const index = this.focusableElements.indexOf(event.target);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }

  handleEscape() {
    // Close modal, dropdown, etc.
    this.container.dispatchEvent(new CustomEvent("escape"));
  }
}

// Custom dropdown with keyboard navigation
class AccessibleDropdown {
  constructor(trigger, menu) {
    this.trigger = trigger;
    this.menu = menu;
    this.isOpen = false;
    this.menuItems = [];
    this.currentIndex = -1;

    this.setupDropdown();
  }

  setupDropdown() {
    // Set ARIA attributes
    this.trigger.setAttribute("aria-haspopup", "true");
    this.trigger.setAttribute("aria-expanded", "false");
    this.menu.setAttribute("role", "menu");
    this.menu.setAttribute("aria-hidden", "true");

    // Get menu items
    this.menuItems = Array.from(
      this.menu.querySelectorAll('[role="menuitem"]')
    );

    // Add event listeners
    this.trigger.addEventListener("click", this.toggle.bind(this));
    this.trigger.addEventListener(
      "keydown",
      this.handleTriggerKeyDown.bind(this)
    );
    this.menu.addEventListener("keydown", this.handleMenuKeyDown.bind(this));

    // Close on outside click
    document.addEventListener("click", this.handleOutsideClick.bind(this));
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.trigger.setAttribute("aria-expanded", "true");
    this.menu.setAttribute("aria-hidden", "false");
    this.menu.style.display = "block";

    // Focus first menu item
    if (this.menuItems.length > 0) {
      this.currentIndex = 0;
      this.menuItems[0].focus();
    }
  }

  close() {
    this.isOpen = false;
    this.trigger.setAttribute("aria-expanded", "false");
    this.menu.setAttribute("aria-hidden", "true");
    this.menu.style.display = "none";
    this.currentIndex = -1;

    // Return focus to trigger
    this.trigger.focus();
  }

  handleTriggerKeyDown(event) {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        this.toggle();
        break;

      case "ArrowDown":
        event.preventDefault();
        this.open();
        break;
    }
  }

  handleMenuKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.moveFocus(1);
        break;

      case "ArrowUp":
        event.preventDefault();
        this.moveFocus(-1);
        break;

      case "Home":
        event.preventDefault();
        this.moveToFirst();
        break;

      case "End":
        event.preventDefault();
        this.moveToLast();
        break;

      case "Escape":
        event.preventDefault();
        this.close();
        break;

      case "Enter":
        event.preventDefault();
        this.activateCurrent();
        break;
    }
  }

  moveFocus(direction) {
    const newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.menuItems.length) {
      this.currentIndex = newIndex;
      this.menuItems[this.currentIndex].focus();
    }
  }

  moveToFirst() {
    this.currentIndex = 0;
    this.menuItems[0].focus();
  }

  moveToLast() {
    this.currentIndex = this.menuItems.length - 1;
    this.menuItems[this.currentIndex].focus();
  }

  activateCurrent() {
    if (this.currentIndex >= 0) {
      this.menuItems[this.currentIndex].click();
      this.close();
    }
  }

  handleOutsideClick(event) {
    if (
      !this.trigger.contains(event.target) &&
      !this.menu.contains(event.target)
    ) {
      this.close();
    }
  }
}
```

## Advanced Interview Questions

**Q: How would you implement a fully accessible modal dialog?**
A: Complete accessible modal implementation:

```javascript
class AccessibleModal {
  constructor(modal, trigger) {
    this.modal = modal;
    this.trigger = trigger;
    this.previousFocus = null;
    this.focusableElements = [];

    this.setupModal();
  }

  setupModal() {
    // Set ARIA attributes
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-modal", "true");
    this.modal.setAttribute("aria-hidden", "true");

    // Add close button if not present
    if (!this.modal.querySelector("[data-modal-close]")) {
      this.addCloseButton();
    }

    // Get focusable elements
    this.focusableElements = Array.from(
      this.modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    // Add event listeners
    this.trigger.addEventListener("click", this.open.bind(this));
    this.modal.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Close button events
    const closeButtons = this.modal.querySelectorAll("[data-modal-close]");
    closeButtons.forEach((button) => {
      button.addEventListener("click", this.close.bind(this));
    });

    // Backdrop click
    this.modal.addEventListener("click", this.handleBackdropClick.bind(this));
  }

  open() {
    // Store current focus
    this.previousFocus = document.activeElement;

    // Show modal
    this.modal.style.display = "block";
    this.modal.setAttribute("aria-hidden", "false");

    // Focus management
    this.trapFocus();

    // Announce to screen readers
    this.announce("Modal opened");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  close() {
    // Hide modal
    this.modal.style.display = "none";
    this.modal.setAttribute("aria-hidden", "true");

    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }

    // Announce to screen readers
    this.announce("Modal closed");

    // Restore body scroll
    document.body.style.overflow = "";
  }

  trapFocus() {
    // Focus first focusable element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        this.close();
        break;

      case "Tab":
        this.handleTabKey(event);
        break;
    }
  }

  handleTabKey(event) {
    const firstElement = this.focusableElements[0];
    const lastElement =
      this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  handleBackdropClick(event) {
    if (event.target === this.modal) {
      this.close();
    }
  }

  addCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.setAttribute("data-modal-close", "");
    closeButton.setAttribute("aria-label", "Close modal");
    closeButton.innerHTML = "&times;";
    closeButton.className = "modal-close";

    this.modal.appendChild(closeButton);
  }

  announce(message) {
    // Create live region for announcements
    let liveRegion = document.getElementById("aria-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "aria-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
  }
}

// Usage
const modal = document.getElementById("my-modal");
const trigger = document.getElementById("modal-trigger");
const accessibleModal = new AccessibleModal(modal, trigger);
```

**Q: How do you implement accessible data tables?**
A: Accessible table implementation with sorting and filtering:

```javascript
class AccessibleDataTable {
  constructor(table) {
    this.table = table;
    this.data = [];
    this.currentSort = { column: null, direction: "asc" };
    this.currentFilter = "";

    this.setupTable();
  }

  setupTable() {
    // Set table attributes
    this.table.setAttribute("role", "table");
    this.table.setAttribute("aria-label", "Data table");

    // Add sorting and filtering controls
    this.addControls();

    // Setup headers
    this.setupHeaders();

    // Add keyboard navigation
    this.setupKeyboardNavigation();
  }

  addControls() {
    const controls = document.createElement("div");
    controls.className = "table-controls";
    controls.setAttribute("role", "toolbar");
    controls.setAttribute("aria-label", "Table controls");

    // Search input
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.setAttribute("aria-label", "Filter table data");
    searchInput.placeholder = "Search...";
    searchInput.addEventListener("input", (e) => {
      this.filterData(e.target.value);
    });

    controls.appendChild(searchInput);
    this.table.parentNode.insertBefore(controls, this.table);
  }

  setupHeaders() {
    const headers = this.table.querySelectorAll("th");

    headers.forEach((header, index) => {
      // Set header attributes
      header.setAttribute("scope", "col");
      header.setAttribute("role", "columnheader");

      // Add sorting functionality
      if (header.dataset.sortable !== "false") {
        header.setAttribute("tabindex", "0");
        header.setAttribute("aria-sort", "none");

        header.addEventListener("click", () => {
          this.sortByColumn(index);
        });

        header.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.sortByColumn(index);
          }
        });
      }
    });
  }

  setupKeyboardNavigation() {
    const rows = this.table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      row.setAttribute("role", "row");
      row.setAttribute("tabindex", "0");

      const cells = row.querySelectorAll("td");
      cells.forEach((cell) => {
        cell.setAttribute("role", "cell");
      });

      // Add keyboard navigation
      row.addEventListener("keydown", (e) => {
        this.handleRowKeyDown(e, row);
      });
    });
  }

  handleRowKeyDown(event, row) {
    const rows = Array.from(this.table.querySelectorAll("tbody tr"));
    const currentIndex = rows.indexOf(row);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (currentIndex < rows.length - 1) {
          rows[currentIndex + 1].focus();
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (currentIndex > 0) {
          rows[currentIndex - 1].focus();
        }
        break;

      case "Enter":
        event.preventDefault();
        this.handleRowActivation(row);
        break;
    }
  }

  sortByColumn(columnIndex) {
    const headers = this.table.querySelectorAll("th");
    const header = headers[columnIndex];

    // Update sort direction
    if (this.currentSort.column === columnIndex) {
      this.currentSort.direction =
        this.currentSort.direction === "asc" ? "desc" : "asc";
    } else {
      this.currentSort.column = columnIndex;
      this.currentSort.direction = "asc";
    }

    // Update header attributes
    headers.forEach((h, i) => {
      if (i === columnIndex) {
        h.setAttribute("aria-sort", this.currentSort.direction);
      } else {
        h.setAttribute("aria-sort", "none");
      }
    });

    // Sort data
    this.sortData();

    // Announce sort change
    const columnName = header.textContent;
    this.announce(
      `Table sorted by ${columnName}, ${this.currentSort.direction}ending`
    );
  }

  sortData() {
    const tbody = this.table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const aValue = a.cells[this.currentSort.column].textContent;
      const bValue = b.cells[this.currentSort.column].textContent;

      if (this.currentSort.direction === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    // Reorder DOM
    rows.forEach((row) => tbody.appendChild(row));
  }

  filterData(query) {
    this.currentFilter = query.toLowerCase();
    const rows = this.table.querySelectorAll("tbody tr");
    let visibleCount = 0;

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const isVisible = text.includes(this.currentFilter);

      row.style.display = isVisible ? "" : "none";
      row.setAttribute("aria-hidden", !isVisible);

      if (isVisible) visibleCount++;
    });

    // Update table summary
    this.updateTableSummary(visibleCount, rows.length);
  }

  updateTableSummary(visible, total) {
    let summary = this.table.querySelector("[data-table-summary]");
    if (!summary) {
      summary = document.createElement("div");
      summary.setAttribute("data-table-summary", "");
      summary.setAttribute("aria-live", "polite");
      this.table.parentNode.insertBefore(summary, this.table);
    }

    summary.textContent = `Showing ${visible} of ${total} rows`;
  }

  handleRowActivation(row) {
    // Handle row click/activation
    const event = new CustomEvent("rowActivate", {
      detail: { row, data: this.getRowData(row) },
    });
    this.table.dispatchEvent(event);
  }

  getRowData(row) {
    const cells = row.querySelectorAll("td");
    return Array.from(cells).map((cell) => cell.textContent);
  }

  announce(message) {
    // Create or use existing live region
    let liveRegion = document.getElementById("table-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "table-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
  }
}
```

## Practical Problems & Solutions

### Problem 1: Implement Accessible Form Validation

**Challenge**: Create accessible form validation with proper error announcements and focus management.

```javascript
class AccessibleFormValidator {
  constructor(form) {
    this.form = form;
    this.errors = new Map();
    this.liveRegion = null;

    this.setupForm();
  }

  setupForm() {
    // Create live region for announcements
    this.createLiveRegion();

    // Add form validation
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    // Add real-time validation
    const inputs = this.form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", this.validateField.bind(this, input));
      input.addEventListener("input", this.clearFieldError.bind(this, input));
    });
  }

  createLiveRegion() {
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "sr-only";
    document.body.appendChild(this.liveRegion);
  }

  validateField(field) {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    const errors = [];

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      errors.push(`${this.getFieldLabel(field)} is required`);
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push("Please enter a valid email address");
      }
    }

    // Password validation
    if (field.type === "password" && value) {
      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("Password must contain at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        errors.push("Password must contain at least one lowercase letter");
      }
      if (!/\d/.test(value)) {
        errors.push("Password must contain at least one number");
      }
    }

    // Custom validation
    const customValidation = field.dataset.validation;
    if (customValidation) {
      const validationResult = this.runCustomValidation(
        value,
        customValidation
      );
      if (validationResult) {
        errors.push(validationResult);
      }
    }

    // Update field error state
    this.updateFieldError(field, errors);

    return errors.length === 0;
  }

  updateFieldError(field, errors) {
    const fieldName = field.name || field.id;

    if (errors.length > 0) {
      // Store errors
      this.errors.set(fieldName, errors);

      // Add error attributes
      field.setAttribute("aria-invalid", "true");
      field.setAttribute(
        "aria-describedby",
        this.createErrorElement(field, errors)
      );

      // Announce error
      this.announceError(field, errors);
    } else {
      // Clear errors
      this.errors.delete(fieldName);
      field.removeAttribute("aria-invalid");
      this.removeErrorElement(field);
    }
  }

  createErrorElement(field, errors) {
    // Remove existing error element
    this.removeErrorElement(field);

    // Create new error element
    const errorId = `${field.id || field.name}-error`;
    const errorElement = document.createElement("div");
    errorElement.id = errorId;
    errorElement.className = "field-error";
    errorElement.setAttribute("role", "alert");
    errorElement.textContent = errors.join(". ");

    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);

    return errorId;
  }

  removeErrorElement(field) {
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  announceError(field, errors) {
    const fieldLabel = this.getFieldLabel(field);
    const errorMessage = errors.join(". ");
    this.liveRegion.textContent = `${fieldLabel}: ${errorMessage}`;
  }

  getFieldLabel(field) {
    // Try to get label from associated label element
    const label = document.querySelector(`label[for="${field.id}"]`);
    if (label) {
      return label.textContent;
    }

    // Try to get label from aria-label
    if (field.getAttribute("aria-label")) {
      return field.getAttribute("aria-label");
    }

    // Try to get label from placeholder
    if (field.placeholder) {
      return field.placeholder;
    }

    // Fallback to field name
    return field.name || field.id || "Field";
  }

  runCustomValidation(value, validationType) {
    switch (validationType) {
      case "phone":
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          return "Please enter a valid phone number";
        }
        break;

      case "zipcode":
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value)) {
          return "Please enter a valid ZIP code";
        }
        break;

      case "url":
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL";
        }
        break;
    }

    return null;
  }

  clearFieldError(field) {
    // Clear error on input if field is valid
    if (this.validateField(field)) {
      this.updateFieldError(field, []);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Submit form
      this.form.submit();
    } else {
      // Focus first error field
      const firstErrorField = this.form.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.focus();
      }

      // Announce form errors
      const totalErrors = Array.from(this.errors.values()).flat().length;
      this.liveRegion.textContent = `Form has ${totalErrors} error${
        totalErrors !== 1 ? "s" : ""
      }. Please review and correct.`;
    }
  }

  getFormErrors() {
    return this.errors;
  }

  clearAllErrors() {
    this.errors.clear();
    const inputs = this.form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.removeAttribute("aria-invalid");
      this.removeErrorElement(input);
    });
  }
}
```

## Accessibility Best Practices

### Semantic HTML Structure

```html
<!-- Good semantic structure -->
<main>
  <h1>Page Title</h1>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/home" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Title</h2>
    <p>Content here...</p>
  </section>
</main>

<!-- Accessible form -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label for="name">Name:</label>
    <input id="name" type="text" required aria-describedby="name-help" />
    <div id="name-help">Enter your full name</div>
  </fieldset>
</form>
```

### ARIA Best Practices

```javascript
// Proper ARIA usage
const accessibleComponent = {
  // Live regions for dynamic content
  announceChange: (message) => {
    const liveRegion = document.getElementById("live-region");
    liveRegion.textContent = message;
  },

  // Progress indicators
  updateProgress: (value) => {
    const progress = document.getElementById("progress");
    progress.setAttribute("aria-valuenow", value);
    progress.setAttribute("aria-valuetext", `${value}% complete`);
  },

  // Expandable content
  setupExpandable: (trigger, content) => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", content.id);
    content.setAttribute("aria-hidden", "true");
  },
};
```

## Resources

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools

- [axe DevTools](https://www.deque.com/axe/) - Accessibility testing
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Accessibility auditing
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Practice Platforms

- [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/)
- [Accessibility Testing](https://www.w3.org/WAI/ER/tools/)
- [A11y Project](https://www.a11yproject.com/) - Accessibility resources

---

_This guide covers essential accessibility concepts for frontend interviews, including practical problems and advanced techniques commonly asked at Big Tech companies._
