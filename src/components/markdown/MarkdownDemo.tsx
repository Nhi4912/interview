'use client';

import React from 'react';
import MarkdownViewer from '../MarkdownViewer';
import styled from 'styled-components';

const DemoContainer = styled.div`
  padding: 2rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin: 2rem 0;
`;

const DemoTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #1e293b;
`;

const MarkdownDemo: React.FC = () => {
  // Sample markdown content to demonstrate all features
  const sampleMarkdown = `
# Markdown Rendering Demo

This component demonstrates the markdown rendering capabilities of our application.

## Text Formatting

You can use **bold text**, *italic text*, or ***bold and italic text***.

You can also use ~~strikethrough~~ text.

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 1
   2. Nested item 2
3. Third item

## Code Blocks

Inline code: \`const greeting = "Hello, world!";\`

Code block with syntax highlighting:

\`\`\`javascript
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log(result); // 120
\`\`\`

## Tables

| Name     | Type    | Description                 |
|----------|---------|----------------------------|
| id       | string  | Unique identifier          |
| title    | string  | Title of the item          |
| isActive | boolean | Whether the item is active |
| count    | number  | Number of items            |

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.
>
> > And it can be nested.

## Links

[Visit our GitHub repository](https://github.com/example/repo)

## Images

![Sample Image](https://via.placeholder.com/800x400)

## Horizontal Rule

---

## Custom Components

### Callouts

<Callout type="info">
  This is an information callout.
</Callout>

<Callout type="warning" title="Important Warning">
  This is a warning callout with a custom title.
</Callout>

<Callout type="success">
  This is a success callout.
</Callout>

<Callout type="error">
  This is an error callout.
</Callout>

<Callout type="tip">
  This is a tip callout.
</Callout>

### Tabs

<Tabs>
  <Tab label="JavaScript">
    \`\`\`javascript
    function greet(name) {
      return \`Hello, \${name}!\`;
    }
    \`\`\`
  </Tab>
  <Tab label="TypeScript">
    \`\`\`typescript
    function greet(name: string): string {
      return \`Hello, \${name}!\`;
    }
    \`\`\`
  </Tab>
  <Tab label="Python">
    \`\`\`python
    def greet(name):
        return f"Hello, {name}!"
    \`\`\`
  </Tab>
</Tabs>
`;

  return (
    <DemoContainer>
      <DemoTitle>Markdown Rendering Demo</DemoTitle>
      <MarkdownViewer content={sampleMarkdown} />
    </DemoContainer>
  );
};

export default MarkdownDemo;
