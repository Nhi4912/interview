import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import MarkdownViewer from '@/components/MarkdownViewer';
import Navigation from '@/components/Navigation';
import { ChevronLeft, ChevronRight, Clock, Tag, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { 
  mapSlugToContentNode, 
  resolveContentPath, 
  getContentNavigation, 
  getContentBreadcrumbs,
  getAllContentPaths,
  getTableOfContents 
} from '@/lib/content-router';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const contentPaths = getAllContentPaths();
  
  return contentPaths.map(path => ({
    slug: path.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { node, filePath } = resolveContentPath(params.slug);
  
  if (!node || !filePath) {
    return {
      title: 'Documentation Not Found',
      description: 'The requested documentation page could not be found.',
    };
  }

  const title = node.title || 'Documentation';
  const description = node.metadata?.description || 'Frontend Interview Documentation';

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
  const { node, filePath } = resolveContentPath(params.slug);
  
  if (!node || !filePath) {
    notFound();
  }

  // Read the markdown content
  let markdownData;
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    markdownData = { content, frontmatter: data, filePath };
  } catch (error) {
    console.error('Error reading markdown file:', error);
    notFound();
  }

  // Get navigation
  const { prev, next } = getContentNavigation(node.id);
  
  // Get breadcrumbs
  const breadcrumbs = getContentBreadcrumbs(node);
  
  // Get table of contents
  const toc = getTableOfContents(markdownData.content);
  
  const estimatedReadTime = Math.ceil(markdownData.content.split(' ').length / 200); // ~200 words per minute

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Table of Contents Sidebar */}
            {toc.length > 0 && (
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <div className="sticky top-20 py-6">
                  <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                          item.level > 2 ? 'ml-4' : ''
                        } ${item.level > 3 ? 'ml-8' : ''}`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={`${toc.length > 0 ? 'lg:col-span-9 xl:col-span-10' : 'lg:col-span-12'} py-6`}>
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="mb-6 flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                  <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                  {breadcrumbs.map((breadcrumb) => (
                    <React.Fragment key={breadcrumb.path}>
                      <ChevronRight size={16} className="text-secondary-400" />
                      <Link 
                        href={breadcrumb.url}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {breadcrumb.title}
                      </Link>
                    </React.Fragment>
                  ))}
                  <ChevronRight size={16} className="text-secondary-400" />
                  <span className="text-secondary-900 dark:text-secondary-100 font-medium">
                    {node.title}
                  </span>
                </nav>
              )}

              {/* Article Header */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  {node.title}
                </h1>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
                  {node.metadata?.category && (
                    <div className="flex items-center gap-1">
                      <Tag size={16} />
                      <span>{node.metadata.category}</span>
                    </div>
                  )}
                  
                  {node.metadata?.difficulty && (
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        node.metadata.difficulty === 'beginner' ? 'bg-success-500' :
                        node.metadata.difficulty === 'intermediate' ? 'bg-warning-500' :
                        'bg-error-500'
                      }`} />
                      <span className="capitalize">{node.metadata.difficulty}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{estimatedReadTime} min read</span>
                  </div>
                  
                  {markdownData.frontmatter.author && (
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{markdownData.frontmatter.author}</span>
                    </div>
                  )}
                  
                  {markdownData.frontmatter.date && (
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(markdownData.frontmatter.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                {/* Tags */}
                {node.metadata?.tags && node.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {node.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MarkdownViewer content={markdownData.content} />
              </div>

              {/* Navigation */}
              {(prev || next) && (
                <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex justify-between items-center">
                    {prev ? (
                      <Link
                        href={`/docs/${prev.path}`}
                        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <ChevronLeft size={20} />
                        <div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">Previous</div>
                          <div className="font-medium">{prev.title}</div>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                    
                    {next ? (
                      <Link
                        href={`/docs/${next.path}`}
                        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-right"
                      >
                        <div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">Next</div>
                          <div className="font-medium">{next.title}</div>
                        </div>
                        <ChevronRight size={20} />
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}