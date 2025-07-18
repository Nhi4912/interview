import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export interface ProcessedContent {
  source: any; // Serialized MDX content
  frontMatter: {
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    difficulty?: string;
    estimatedTime?: string;
    relatedTopics?: string[];
    [key: string]: any;
  };
  slug: string;
  filePath: string;
}

/**
 * Process MDX content with frontmatter
 */
export async function processMdxContent(
  content: string,
  filePath: string
): Promise<ProcessedContent> {
  // Extract frontmatter with gray-matter
  const { data: frontMatter, content: mdxContent } = matter(content);

  // Generate slug from file path
  const slug = path.basename(filePath, path.extname(filePath));

  // Process MDX content
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontMatter' }],
      ],
      rehypePlugins: [rehypeRaw, rehypeHighlight],
    },
    scope: frontMatter,
  });

  // Ensure title exists
  if (!frontMatter.title) {
    // Try to extract title from first heading
    const titleMatch = mdxContent.match(/^#\s+(.+)$/m);
    frontMatter.title = titleMatch ? titleMatch[1] : slug;
  }

  return {
    source: mdxSource,
    frontMatter: {
      title: frontMatter.title,
      description: frontMatter.description || '',
      category: frontMatter.category || 'Uncategorized',
      tags: frontMatter.tags || [],
      difficulty: frontMatter.difficulty || 'Intermediate',
      estimatedTime: frontMatter.estimatedTime || '',
      relatedTopics: frontMatter.relatedTopics || [],
      ...frontMatter,
    },
    slug,
    filePath,
  };
}

/**
 * Process a markdown file
 */
export async function processMdxFile(filePath: string): Promise<ProcessedContent | null> {
  try {
    const fullPath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return await processMdxContent(content, filePath);
  } catch (error) {
    console.error(`Error processing MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all MDX files from a directory recursively
 */
export async function getAllMdxFiles(dir: string): Promise<ProcessedContent[]> {
  const results: ProcessedContent[] = [];
  const fullDir = path.resolve(process.cwd(), dir);

  if (!fs.existsSync(fullDir)) {
    return results;
  }

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      const nestedResults = await getAllMdxFiles(fullPath);
      results.push(...nestedResults);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      // Process MDX files
      const relativePath = path.relative(process.cwd(), fullPath);
      const processed = await processMdxFile(relativePath);
      if (processed) {
        results.push(processed);
      }
    }
  }

  return results;
}

/**
 * Get MDX content by slug
 */
export async function getMdxBySlug(slug: string, dir: string): Promise<ProcessedContent | null> {
  const fullDir = path.resolve(process.cwd(), dir);

  if (!fs.existsSync(fullDir)) {
    return null;
  }

  // Try to find the file with the matching slug
  const findFile = (currentDir: string): string | null => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        const found = findFile(fullPath);
        if (found) return found;
      } else if (
        (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
        path.basename(entry.name, path.extname(entry.name)) === slug
      ) {
        return fullPath;
      }
    }

    return null;
  };

  const filePath = findFile(fullDir);
  if (!filePath) return null;

  const relativePath = path.relative(process.cwd(), filePath);
  return await processMdxFile(relativePath);
}

/**
 * Create a content index for search
 */
export async function createContentIndex(dirs: string[]): Promise<{
  bySlug: Record<string, ProcessedContent>;
  byCategory: Record<string, string[]>;
  byTag: Record<string, string[]>;
}> {
  const bySlug: Record<string, ProcessedContent> = {};
  const byCategory: Record<string, string[]> = {};
  const byTag: Record<string, string[]> = {};

  for (const dir of dirs) {
    const contents = await getAllMdxFiles(dir);

    for (const content of contents) {
      // Add to slug index
      bySlug[content.slug] = content;

      // Add to category index
      const category = content.frontMatter.category || 'Uncategorized';
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(content.slug);

      // Add to tag index
      const tags = content.frontMatter.tags || [];
      for (const tag of tags) {
        if (!byTag[tag]) {
          byTag[tag] = [];
        }
        byTag[tag].push(content.slug);
      }
    }
  }

  return { bySlug, byCategory, byTag };
}
