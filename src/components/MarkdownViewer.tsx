'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';
import components from '../lib/mdx-components';

const MarkdownContainer = styled.div`
  color: #1e293b;
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #1e293b;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.3rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 1rem;
    color: #64748b;
  }

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: #64748b;
    }
  }

  blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #64748b;
    background: #f1f5f9;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  code {
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9em;
    color: #f59e0b;
  }

  pre {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
      color: #1e293b;
      font-size: 0.9rem;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th,
    td {
      border: 1px solid #e2e8f0;
      padding: 0.5rem;
      text-align: left;
    }

    th {
      background: #ffffff;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f1f5f9;
    }
  }

  hr {
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 2rem 0;
  }

  .highlight {
    background: #3b82f620;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }

  /* Syntax highlighting styles */
  .hljs {
    background: #ffffff;
    color: #1e293b;
  }

  .hljs-keyword {
    color: #3b82f6;
    font-weight: 600;
  }

  .hljs-string {
    color: #10b981;
  }

  .hljs-function {
    color: #f59e0b;
  }

  .hljs-comment {
    color: #94a3b8;
    font-style: italic;
  }

  .hljs-number {
    color: #f59e0b;
  }

  .hljs-variable {
    color: #1e293b;
  }

  .hljs-title {
    color: #f59e0b;
    font-weight: 600;
  }

  /* Code block wrapper styles */
  .code-block-wrapper {
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }

  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .code-language {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
  }

  .copy-button {
    background: #e2e8f0;
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #cbd5e1;
    }
  }

  /* Image container styles */
  .image-container {
    margin: 1.5rem 0;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
  }

  /* Table container styles */
  .table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  /* Anchor link styles */
  .anchor-link {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: none;

      &::after {
        content: '#';
        margin-left: 0.5rem;
        color: #3b82f6;
        font-size: 0.8em;
      }
    }
  }
`;

interface MarkdownViewerProps {
  content: string | any; // Can be a string or serialized MDX content
  className?: string;
  frontMatter?: Record<string, any>;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className,
  frontMatter = {},
}) => {
  // Check if content is already serialized MDX content
  const isSerializedMDX = typeof content === 'object' && content !== null;

  if (isSerializedMDX) {
    return (
      <MarkdownContainer className={className}>
        <MDXRemote {...content} components={components} />
      </MarkdownContainer>
    );
  }

  // For backward compatibility with string content
  return (
    <MarkdownContainer className={className}>
      {/* We'll use the existing MDXRemote with serialized content in the future */}
      {/* For now, just render the content as is */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MarkdownContainer>
  );
};

export default MarkdownViewer;
