# Problem: Accessible Modal Dialog

## Description

Create a modal dialog component that is fully accessible.

## Requirements

- Trap focus within the modal
- Close on Escape or backdrop click
- Announce open/close to screen readers
- ARIA roles and attributes

## Solution Outline

- Use `role="dialog"`, `aria-modal`, and focus management
- Restore focus to trigger on close

## Sample Implementation (React)

```jsx
// ...modal component with focus trap and ARIA...
```

## Follow-up

- How would you support nested modals?
- How would you animate modal open/close?
