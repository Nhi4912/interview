'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  h1 {
    font-size: 2rem;
    border-bottom: 2px solid ${props => props.theme.colors.border};
    padding-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
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
    color: ${props => props.theme.colors.textSecondary};
  }
  
  a {
    color: ${props => props.theme.colors.primary};
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
      color: ${props => props.theme.colors.textSecondary};
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.textSecondary};
    background: ${props => props.theme.colors.surfaceLight};
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius.md};
  }
  
  code {
    background: ${props => props.theme.colors.surfaceLight};
    padding: 0.2rem 0.4rem;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-family: ${props => props.theme.typography.fontFamily.code};
    font-size: 0.9em;
    color: ${props => props.theme.colors.accent};
  }
  
  pre {
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
    
    code {
      background: none;
      padding: 0;
      color: ${props => props.theme.colors.text};
      font-size: 0.9rem;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    
    th, td {
      border: 1px solid ${props => props.theme.colors.border};
      padding: 0.5rem;
      text-align: left;
    }
    
    th {
      background: ${props => props.theme.colors.surface};
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background: ${props => props.theme.colors.surfaceLight};
    }
  }
  
  hr {
    border: none;
    height: 1px;
    background: ${props => props.theme.colors.border};
    margin: 2rem 0;
  }
  
  .highlight {
    background: ${props => props.theme.colors.primary}20;
    padding: 0.2rem 0.4rem;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-weight: 600;
  }
  
  /* Syntax highlighting styles */
  .hljs {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
  
  .hljs-keyword {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
  
  .hljs-string {
    color: ${props => props.theme.colors.secondary};
  }
  
  .hljs-function {
    color: ${props => props.theme.colors.accent};
  }
  
  .hljs-comment {
    color: ${props => props.theme.colors.textMuted};
    font-style: italic;
  }
  
  .hljs-number {
    color: ${props => props.theme.colors.warning};
  }
  
  .hljs-variable {
    color: ${props => props.theme.colors.text};
  }
  
  .hljs-title {
    color: ${props => props.theme.colors.accent};
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