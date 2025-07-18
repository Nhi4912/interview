'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  color: #1e293b;
  line-height: 1.6;
  
  h1, h2, h3, h4, h5, h6 {
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
  
  ul, ol {
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
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
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
    
    th, td {
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
`;

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className }) => {
  return (
    <MarkdownContainer className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <pre>
                <code className={`hljs ${className}`} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          h1: ({ children, ...props }) => (
            <h1 id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
              {children}
            </h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownViewer;