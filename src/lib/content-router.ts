import path from 'path';
import fs from 'fs';
import { getContentNodeByPath, getContentNodeById, slugify, getAllContentNodes } from './content-indexer';
import { ContentNode } from '../types';

/**
 * Map a URL slug array to a content node
 */
export function mapSlugToContentNode(slug: string[]): ContentNode | undefined {
  if (!slug || slug.length === 0) {
    return undefined;
  }

  // Join slug parts to create a path
  const nodePath = slug.join('/');

  // Try to get the node by path
  return getContentNodeByPath(nodePath);
}

/**
 * Get the file path for a content node
 */
export function getContentFilePath(node: ContentNode): string | null {
  if (node.type !== 'file') {
    return null;
  }

  // Split the path into parts
  const pathParts = node.path.split('/');

  // Try different content directories
  const contentDirs = [
    'src/content/frontend',
    'frontend',
    'src/content/leetcode',
    'leetcode',
    'theory-and-visuals',
    'templates',
  ];

  for (const dir of contentDirs) {
    // Check if the first part of the path matches this directory
    if (pathParts[0] === path.basename(dir)) {
      // Build the file path
      const filePath = path.join(dir, ...pathParts.slice(1)) + '.md';

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }

    // Also try with the full path
    const filePath = path.join(dir, ...pathParts) + '.md';
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

/**
 * Resolve a content path from a URL slug
 */
export function resolveContentPath(slug: string[]): {
  node: ContentNode | undefined;
  filePath: string | null;
} {
  const node = mapSlugToContentNode(slug);

  if (!node) {
    return { node: undefined, filePath: null };
  }

  const filePath = getContentFilePath(node);

  return { node, filePath };
}

/**
 * Get next and previous content nodes for navigation
 */
export function getContentNavigation(nodeId: string): {
  prev: ContentNode | null;
  next: ContentNode | null;
} {
  const node = getContentNodeById(nodeId);

  if (!node) {
    return { prev: null, next: null };
  }

  // Get parent path
  const pathParts = node.path.split('/');
  const parentPath = pathParts.slice(0, -1).join('/');
  const parentNode = parentPath ? getContentNodeByPath(parentPath) : getContentNodeById('root');

  if (!parentNode || !parentNode.children) {
    return { prev: null, next: null };
  }

  // Find the current node's index in the parent's children
  const fileChildren = parentNode.children.filter(child => child.type === 'file');
  const currentIndex = fileChildren.findIndex(child => child.id === node.id);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Get previous and next nodes
  const prev = currentIndex > 0 ? fileChildren[currentIndex - 1] : null;
  const next = currentIndex < fileChildren.length - 1 ? fileChildren[currentIndex + 1] : null;

  return { prev, next };
}

/**
 * Generate URL for a content node
 */
export function getContentUrl(node: ContentNode): string {
  if (!node) {
    return '/';
  }

  if (node.type === 'directory') {
    return `/content/${node.path}`;
  } else {
    return `/content/${node.path}`;
  }
}

/**
 * Parse content path from URL
 */
export function parseContentPath(url: string): string[] {
  // Remove leading and trailing slashes
  const cleanUrl = url.replace(/^\/+|\/+$/g, '');

  // Split by slashes
  const parts = cleanUrl.split('/');

  // Remove 'content' prefix if present
  if (parts[0] === 'content') {
    return parts.slice(1);
  }

  return parts;
}

/**
 * Get all possible content paths for static generation
 */
export function getAllContentPaths(): string[] {
  const paths: string[] = [];
  const allNodes = getAllContentNodes();
  
  for (const node of allNodes) {
    if (node.type === 'file' && node.path) {
      paths.push(node.path);
    }
  }
  
  return paths;
}

/**
 * Get content breadcrumbs for a node
 */
export function getContentBreadcrumbs(node: ContentNode): Array<{ title: string; path: string; url: string }> {
  const breadcrumbs: Array<{ title: string; path: string; url: string }> = [];
  
  if (!node.path) {
    return breadcrumbs;
  }
  
  const pathParts = node.path.split('/');
  let currentPath = '';
  
  for (let i = 0; i < pathParts.length; i++) {
    currentPath = currentPath ? `${currentPath}/${pathParts[i]}` : pathParts[i];
    
    // Don't include the current node in breadcrumbs
    if (i === pathParts.length - 1) {
      break;
    }
    
    const breadcrumbNode = getContentNodeByPath(currentPath);
    if (breadcrumbNode) {
      breadcrumbs.push({
        title: breadcrumbNode.title,
        path: currentPath,
        url: getContentUrl(breadcrumbNode),
      });
    }
  }
  
  return breadcrumbs;
}

/**
 * Get content metadata without full file read
 */
export function getContentMetadata(contentPath: string): { [key: string]: any } {
  const node = getContentNodeByPath(contentPath);
  if (!node) {
    return {};
  }
  
  const filePath = getContentFilePath(node);
  if (!filePath) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      return {};
    }
    
    const frontmatter = frontmatterMatch[1];
    const metadata: { [key: string]: any } = {};
    
    // Simple YAML parsing
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          metadata[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        } else {
          metadata[key] = value.replace(/['"]/g, '');
        }
      }
    }
    
    return metadata;
  } catch (error) {
    console.error(`Error reading metadata for ${contentPath}:`, error);
    return {};
  }
}

/**
 * Get sitemap entries for SEO
 */
export function getSitemapEntries(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  priority: number;
}> {
  const entries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: 'daily' | 'weekly' | 'monthly';
    priority: number;
  }> = [];
  
  const contentPaths = getAllContentPaths();
  
  for (const contentPath of contentPaths) {
    const node = getContentNodeByPath(contentPath);
    if (!node) continue;
    
    const filePath = getContentFilePath(node);
    let lastModified = new Date();
    
    if (filePath) {
      try {
        const stats = fs.statSync(filePath);
        lastModified = stats.mtime;
      } catch (error) {
        console.warn(`Could not get stats for ${filePath}`);
      }
    }
    
    entries.push({
      url: `/docs/${contentPath}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }
  
  return entries;
}

/**
 * Get table of contents from markdown content
 */
export function getTableOfContents(content: string): Array<{
  id: string;
  title: string;
  level: number;
}> {
  const toc: Array<{ id: string; title: string; level: number }> = [];
  
  // Match headings
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = slugify(title);
    
    toc.push({ id, title, level });
  }
  
  return toc;
}
