import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownViewer from '@/components/MarkdownViewer';

interface PageProps {
  params: {
    slug: string[];
  };
}

// Function to get all markdown files for generateStaticParams
function getAllMarkdownFiles(dir: string = process.cwd(), baseDir: string = dir): string[] {
  const files: string[] = [];
  
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
        const slug = relativePath
          .replace(/\.md$/, '')
          .replace(/\\/g, '/')
          .replace(/^\//, '');
        files.push(slug);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

// Function to get markdown file content
function getMarkdownContent(slug: string) {
  try {
    // Try to find the markdown file
    const possiblePaths = [
      `${slug}.md`,
      `${slug}/README.md`,
      `${slug}/index.md`,
    ];
    
    for (const possiblePath of possiblePaths) {
      const fullPath = path.join(process.cwd(), possiblePath);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          content,
          frontmatter: data,
          filePath: possiblePath,
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const files = getAllMarkdownFiles();
  
  return files.map(file => ({
    slug: file.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/');
  const markdownData = getMarkdownContent(slug);
  
  if (!markdownData) {
    return {
      title: 'Documentation Not Found',
      description: 'The requested documentation page could not be found.',
    };
  }

  const title = markdownData.frontmatter.title || 
    slug.split('/').pop()?.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 
    'Documentation';
  
  const description = markdownData.frontmatter.description || 
    markdownData.content.substring(0, 160).replace(/\n/g, ' ') || 
    'Frontend Interview Documentation';

  return {
    title: `${title} - Frontend Interview Docs`,
    description,
    openGraph: {
      title: `${title} - Frontend Interview Docs`,
      description,
      type: 'article',
    },
  };
}

export default function DocumentationPage({ params }: PageProps) {
  const slug = params.slug.join('/');
  const markdownData = getMarkdownContent(slug);
  
  if (!markdownData) {
    notFound();
  }

  const title = markdownData.frontmatter.title || 
    slug.split('/').pop()?.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 
    'Documentation';

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      paddingTop: '6rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <nav style={{ 
          color: '#64748b', 
          fontSize: '0.9rem',
          marginBottom: '1rem'
        }}>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Home
          </a>
          {' > '}
          <span>{slug.replace(/\//g, ' > ')}</span>
        </nav>
        
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '0.5rem',
          color: '#1e293b'
        }}>
          {title}
        </h1>
        
        <div style={{ 
          color: '#64748b',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          <span>📁 {markdownData.filePath}</span>
          {markdownData.frontmatter.author && (
            <span> • 👤 {markdownData.frontmatter.author}</span>
          )}
          {markdownData.frontmatter.date && (
            <span> • 📅 {new Date(markdownData.frontmatter.date).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      <MarkdownViewer content={markdownData.content} />
    </div>
  );
}