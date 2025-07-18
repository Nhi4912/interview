import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentNode } from '../types';

// Content directories to scan
const CONTENT_DIRS = [
  'src/content/frontend',
  'frontend',
  'src/content/leetcode',
  'leetcode',
  'theory-and-visuals',
  'templates',
];

// Cache for content structure
let contentStructureCache: ContentNode | null = null;
let contentNodeCache: Map<string, ContentNode> = new Map();

/**
 * Slugify a string for use in URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Extract metadata from markdown content
 */
export function extractMetadata(filePath: string): {
  title: string;
  description: string;
  metadata: ContentNode['metadata'];
  content: string;
} {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Extract title from frontmatter or first heading
    let title = data.title || '';
    if (!title) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1] : path.basename(filePath, '.md');
    }

    // Extract description from frontmatter or first paragraph
    let description = data.description || '';
    if (!description) {
      const paragraphMatch = content.match(/(?:^|\n\n)([^#\n].*?)(?:\n\n|$)/);
      description = paragraphMatch ? paragraphMatch[1].substring(0, 200) + '...' : '';
    }

    // Extract tags
    const tags = data.tags || [];

    // Extract category
    const category = data.category || getDefaultCategory(filePath);

    // Extract difficulty
    const difficulty = data.difficulty?.toLowerCase() || 'intermediate';

    // Extract estimated time
    const estimatedMinutes = parseEstimatedTime(data.estimatedTime || '');

    return {
      title,
      description,
      metadata: {
        description,
        tags,
        category,
        difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
        estimatedMinutes,
      },
      content,
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error);
    return {
      title: path.basename(filePath, '.md'),
      description: '',
      metadata: {
        description: '',
        tags: [],
        category: 'Uncategorized',
        difficulty: 'intermediate',
        estimatedMinutes: 30,
      },
      content: '',
    };
  }
}

/**
 * Parse estimated time string to minutes
 */
function parseEstimatedTime(timeStr: string): number {
  if (!timeStr) return 30; // Default to 30 minutes

  // Handle formats like "2-3 hours" or "30 minutes"
  const hourMatch = timeStr.match(/(\d+)(?:-(\d+))?\s*hours?/i);
  if (hourMatch) {
    const minHours = parseInt(hourMatch[1], 10);
    const maxHours = hourMatch[2] ? parseInt(hourMatch[2], 10) : minHours;
    // Use average if range is provided
    return Math.round((minHours + maxHours) / 2) * 60;
  }

  const minuteMatch = timeStr.match(/(\d+)(?:-(\d+))?\s*min(?:utes?)?/i);
  if (minuteMatch) {
    const minMinutes = parseInt(minuteMatch[1], 10);
    const maxMinutes = minuteMatch[2] ? parseInt(minuteMatch[2], 10) : minMinutes;
    // Use average if range is provided
    return Math.round((minMinutes + maxMinutes) / 2);
  }

  return 30; // Default to 30 minutes
}

/**
 * Get default category based on file path
 */
function getDefaultCategory(filePath: string): string {
  const normalizedPath = filePath.replace(/\\/g, '/');

  if (normalizedPath.includes('frontend/')) {
    return 'Frontend';
  } else if (normalizedPath.includes('leetcode/')) {
    return 'Algorithms';
  } else if (normalizedPath.includes('theory-and-visuals/')) {
    return 'Theory';
  } else if (normalizedPath.includes('templates/')) {
    return 'Templates';
  } else {
    return 'General';
  }
}

/**
 * Build content node from file or directory
 */
function buildContentNode(
  entryPath: string,
  basePath: string,
  parentPath: string = ''
): ContentNode | null {
  try {
    const relativePath = path.relative(basePath, entryPath);
    const stats = fs.statSync(entryPath);

    if (stats.isDirectory()) {
      // Skip node_modules, .git, etc.
      const dirName = path.basename(entryPath);
      if (['node_modules', '.git', '.next', 'out', 'dist'].includes(dirName)) {
        return null;
      }

      // Create directory node
      const children: ContentNode[] = [];
      const entries = fs.readdirSync(entryPath, { withFileTypes: true });

      // Process README.md first if it exists
      const readmeEntry = entries.find(e => e.name.toLowerCase() === 'readme.md');
      let nodeMetadata = undefined;

      if (readmeEntry) {
        const readmePath = path.join(entryPath, readmeEntry.name);
        const { metadata } = extractMetadata(readmePath);
        nodeMetadata = metadata;
      }

      // Process other entries
      for (const entry of entries) {
        if (entry.name.toLowerCase() === 'readme.md') continue; // Skip README, already processed

        const childPath = path.join(entryPath, entry.name);
        const childNode = buildContentNode(childPath, basePath, relativePath);

        if (childNode) {
          children.push(childNode);
        }
      }

      const nodePath = parentPath ? `${parentPath}/${dirName}` : dirName;
      const nodeId = slugify(nodePath);

      const node: ContentNode = {
        id: nodeId,
        title: dirName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        path: nodePath,
        type: 'directory',
        children: children.length > 0 ? children : undefined,
        metadata: nodeMetadata,
      };

      // Add to cache
      contentNodeCache.set(nodeId, node);

      return node;
    } else if (stats.isFile() && entryPath.endsWith('.md')) {
      // Skip non-markdown files
      const fileName = path.basename(entryPath);

      // Skip README files as standalone entries (they're processed with directories)
      if (fileName.toLowerCase() === 'readme.md') {
        return null;
      }

      // Extract metadata
      const { title, metadata } = extractMetadata(entryPath);

      const nodePath = parentPath
        ? `${parentPath}/${path.basename(fileName, '.md')}`
        : path.basename(fileName, '.md');

      const nodeId = slugify(nodePath);

      const node: ContentNode = {
        id: nodeId,
        title,
        path: nodePath,
        type: 'file',
        metadata,
      };

      // Add to cache
      contentNodeCache.set(nodeId, node);

      return node;
    }

    return null;
  } catch (error) {
    console.error(`Error building content node for ${entryPath}:`, error);
    return null;
  }
}

/**
 * Build hierarchical content structure from content directories
 */
export function buildContentStructure(): ContentNode {
  // Return cached structure if available
  if (contentStructureCache) {
    return contentStructureCache;
  }

  // Clear node cache
  contentNodeCache = new Map();

  // Create root node
  const rootNode: ContentNode = {
    id: 'root',
    title: 'Content',
    path: '',
    type: 'directory',
    children: [],
  };

  // Add to cache
  contentNodeCache.set('root', rootNode);

  // Process each content directory
  for (const dir of CONTENT_DIRS) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    const node = buildContentNode(dir, process.cwd());
    if (node) {
      rootNode.children = rootNode.children || [];
      rootNode.children.push(node);
    }
  }

  // Cache the structure
  contentStructureCache = rootNode;

  return rootNode;
}

/**
 * Get content node by ID
 */
export function getContentNodeById(id: string): ContentNode | undefined {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  return contentNodeCache.get(id);
}

/**
 * Get content node by path
 */
export function getContentNodeByPath(nodePath: string): ContentNode | undefined {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  const id = slugify(nodePath);
  return contentNodeCache.get(id);
}

/**
 * Get all content nodes
 */
export function getAllContentNodes(): ContentNode[] {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  return Array.from(contentNodeCache.values());
}

/**
 * Get content nodes by category
 */
export function getContentNodesByCategory(): Record<string, ContentNode[]> {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  const categories: Record<string, ContentNode[]> = {};

  for (const node of contentNodeCache.values()) {
    if (node.metadata?.category) {
      const category = node.metadata.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(node);
    }
  }

  return categories;
}

/**
 * Get content nodes by tag
 */
export function getContentNodesByTag(): Record<string, ContentNode[]> {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  const tags: Record<string, ContentNode[]> = {};

  for (const node of contentNodeCache.values()) {
    if (node.metadata?.tags && node.metadata.tags.length > 0) {
      for (const tag of node.metadata.tags) {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(node);
      }
    }
  }

  return tags;
}

/**
 * Search content nodes
 */
export function searchContentNodes(query: string): ContentNode[] {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  const results: ContentNode[] = [];
  const lowerQuery = query.toLowerCase();

  for (const node of contentNodeCache.values()) {
    // Skip directories in search results
    if (node.type === 'directory') {
      continue;
    }

    // Search in title
    if (node.title.toLowerCase().includes(lowerQuery)) {
      results.push(node);
      continue;
    }

    // Search in description
    if (node.metadata?.description?.toLowerCase().includes(lowerQuery)) {
      results.push(node);
      continue;
    }

    // Search in tags
    if (node.metadata?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      results.push(node);
      continue;
    }

    // Search in category
    if (node.metadata?.category?.toLowerCase().includes(lowerQuery)) {
      results.push(node);
      continue;
    }
  }

  return results;
}

/**
 * Get related content nodes
 */
export function getRelatedContentNodes(nodeId: string, limit: number = 5): ContentNode[] {
  const node = getContentNodeById(nodeId);
  if (!node || !node.metadata) {
    return [];
  }

  const results: ContentNode[] = [];
  const nodeTags = node.metadata.tags || [];
  const nodeCategory = node.metadata.category;

  // First, find nodes with matching tags
  if (nodeTags.length > 0) {
    for (const otherNode of contentNodeCache.values()) {
      if (otherNode.id === nodeId || otherNode.type === 'directory') {
        continue;
      }

      const otherTags = otherNode.metadata?.tags || [];
      const commonTags = nodeTags.filter(tag => otherTags.includes(tag));

      if (commonTags.length > 0) {
        results.push({
          ...otherNode,
          _relevance: commonTags.length, // Add relevance score
        } as ContentNode & { _relevance: number });
      }
    }
  }

  // If we don't have enough results, add nodes from the same category
  if (results.length < limit && nodeCategory) {
    for (const otherNode of contentNodeCache.values()) {
      if (
        otherNode.id === nodeId ||
        otherNode.type === 'directory' ||
        results.some(r => r.id === otherNode.id)
      ) {
        continue;
      }

      if (otherNode.metadata?.category === nodeCategory) {
        results.push({
          ...otherNode,
          _relevance: 0.5, // Lower relevance for category matches
        } as ContentNode & { _relevance: number });
      }
    }
  }

  // Sort by relevance and limit results
  return results.sort((a, b) => (b as any)._relevance - (a as any)._relevance).slice(0, limit);
}

/**
 * Get breadcrumb path for a node
 */
export function getNodeBreadcrumbs(nodeId: string): ContentNode[] {
  const node = getContentNodeById(nodeId);
  if (!node) {
    return [];
  }

  const breadcrumbs: ContentNode[] = [node];

  // If it's a root-level node, just return it
  if (!node.path.includes('/')) {
    return breadcrumbs;
  }

  // Build path parts
  const pathParts = node.path.split('/');
  let currentPath = '';

  for (let i = 0; i < pathParts.length - 1; i++) {
    currentPath = currentPath ? `${currentPath}/${pathParts[i]}` : pathParts[i];
    const parentNode = getContentNodeByPath(currentPath);

    if (parentNode) {
      breadcrumbs.unshift(parentNode);
    }
  }

  // Add root node
  const rootNode = getContentNodeById('root');
  if (rootNode && breadcrumbs[0].id !== 'root') {
    breadcrumbs.unshift(rootNode);
  }

  return breadcrumbs;
}

/**
 * Clear content cache
 */
export function clearContentCache(): void {
  contentStructureCache = null;
  contentNodeCache = new Map();
}

/**
 * Generate static paths for all content nodes
 */
export function generateContentStaticPaths() {
  // Build structure if not already built
  if (!contentStructureCache) {
    buildContentStructure();
  }

  const paths: { params: { slug: string[] } }[] = [];

  for (const node of contentNodeCache.values()) {
    if (node.type === 'file' && node.path) {
      const slug = node.path.split('/');
      paths.push({ params: { slug } });
    }
  }

  return paths;
}
