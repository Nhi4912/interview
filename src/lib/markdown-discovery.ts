import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownFile {
  path: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  frontmatter: Record<string, any>;
  lastModified: Date;
}

export interface DocumentationStructure {
  files: MarkdownFile[];
  categories: Record<string, MarkdownFile[]>;
  totalFiles: number;
}

function getAllMarkdownFiles(dir: string, baseDir: string = dir): MarkdownFile[] {
  const files: MarkdownFile[] = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip node_modules, .git, out, and other build directories
      if (entry.isDirectory() && 
          !['node_modules', '.git', 'out', '.next', 'dist', 'vendor'].includes(entry.name)) {
        files.push(...getAllMarkdownFiles(fullPath, baseDir));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relativePath = path.relative(baseDir, fullPath);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data: frontmatter, content: markdownContent } = matter(content);
        const stats = fs.statSync(fullPath);
        
        // Generate slug from file path
        const slug = relativePath
          .replace(/\.md$/, '')
          .replace(/\\/g, '/')
          .replace(/^\//, '');
        
        // Extract category from path
        const pathParts = relativePath.split(path.sep);
        const category = pathParts.length > 1 ? pathParts[0] : 'root';
        
        // Generate title from filename or use frontmatter title
        const title = frontmatter.title || 
          entry.name.replace(/\.md$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        files.push({
          path: relativePath,
          slug,
          title,
          category,
          content: markdownContent,
          frontmatter,
          lastModified: stats.mtime
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

export function discoverMarkdownFiles(rootDir: string = process.cwd()): DocumentationStructure {
  const files = getAllMarkdownFiles(rootDir);
  
  // Group files by category
  const categories: Record<string, MarkdownFile[]> = {};
  
  files.forEach(file => {
    if (!categories[file.category]) {
      categories[file.category] = [];
    }
    categories[file.category].push(file);
  });
  
  // Sort files within each category
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => {
      // Sort by title, but put README files first
      if (a.title.toLowerCase().includes('readme')) return -1;
      if (b.title.toLowerCase().includes('readme')) return 1;
      return a.title.localeCompare(b.title);
    });
  });
  
  return {
    files: files.sort((a, b) => a.slug.localeCompare(b.slug)),
    categories,
    totalFiles: files.length
  };
}

export function getMarkdownFileBySlug(slug: string): MarkdownFile | null {
  const documentation = discoverMarkdownFiles();
  return documentation.files.find(file => file.slug === slug) || null;
}

export function getCategoryFiles(category: string): MarkdownFile[] {
  const documentation = discoverMarkdownFiles();
  return documentation.categories[category] || [];
}

export function getMarkdownFileContent(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}