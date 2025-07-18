'use client';

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';

// Import custom components
import CodeBlock from '../components/markdown/CodeBlock';
import ResponsiveImage from '../components/markdown/ResponsiveImage';
import Callout from '../components/markdown/Callout';
import Tabs, { Tab } from '../components/markdown/Tabs';
import DiagramRenderer from '../components/markdown/DiagramRenderer';

// Custom components for MDX
const components = {
  // Headings with anchor links
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = String(children).toLowerCase().replace(/\s+/g, '-');
    return (
      <h1 id={id} {...props}>
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = String(children).toLowerCase().replace(/\s+/g, '-');
    return (
      <h2 id={id} {...props}>
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = String(children).toLowerCase().replace(/\s+/g, '-');
    return (
      <h3 id={id} {...props}>
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h3>
    );
  },
  h4: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = String(children).toLowerCase().replace(/\s+/g, '-');
    return (
      <h4 id={id} {...props}>
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h4>
    );
  },

  // Enhanced code blocks with syntax highlighting and diagram support
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    if (!language) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // Handle Mermaid diagrams
    if (language === 'mermaid') {
      return <DiagramRenderer chart={String(children)} type="mermaid" />;
    }

    // Extract filename if present in format ```js:filename.js
    let filename;
    if (language.includes(':')) {
      const parts = language.split(':');
      filename = parts[1];
    }

    return (
      <CodeBlock
        language={language.split(':')[0]}
        filename={filename}
        className={className}
        {...props}
      >
        {String(children)}
      </CodeBlock>
    );
  },

  // Enhanced links
  a: ({ href, children, ...props }: React.HTMLProps<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href || '#'} {...props}>
        {children}
      </Link>
    );
  },

  // Enhanced images with responsive handling
  img: ({ src, alt, width, height, caption, ...props }: any) => {
    if (!src) return null;

    return (
      <ResponsiveImage
        src={src}
        alt={alt || ''}
        width={Number(width) || 800}
        height={Number(height) || 600}
        caption={caption}
        {...props}
      />
    );
  },

  // Enhanced tables
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="table-container">
      <table {...props}>{children}</table>
    </div>
  ),

  // Custom components
  Callout,
  Tabs,
  Tab,
  MermaidDiagram: ({ chart, caption }: { chart: string; caption?: string }) => (
    <DiagramRenderer chart={chart} type="mermaid" />
  ),
};

interface MDXComponentsProviderProps {
  children: React.ReactNode;
}

export function MDXComponentsProvider({ children }: MDXComponentsProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default components;
