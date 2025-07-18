import { processMdxContent } from './mdx-processing';

// This file is for testing the MDX processing pipeline
// You can run it with: node -r ts-node/register src/lib/mdx-test.ts

async function testMdxProcessing() {
  const testContent = `---
title: Test MDX Content
description: This is a test of the MDX processing pipeline
category: Testing
tags: ["mdx", "test", "processing"]
---

# Test MDX Content

This is a paragraph with **bold** and *italic* text.

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## List Example

- Item 1
- Item 2
- Item 3

## Table Example

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Diagram Example

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Keep trying]
    C --> E[Finish]
    D --> B
\`\`\`
`;

  try {
    const result = await processMdxContent(testContent, 'test.md');
    console.log('MDX Processing Result:');
    console.log('Front Matter:', result.frontMatter);
    console.log('Slug:', result.slug);
    console.log('Source:', result.source ? 'Successfully serialized' : 'Failed to serialize');
  } catch (error) {
    console.error('Error processing MDX content:', error);
  }
}

// Run the test
testMdxProcessing();
