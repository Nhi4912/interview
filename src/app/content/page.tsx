import { Metadata } from 'next';
import Link from 'next/link';
import { getContentStructure } from '@/lib/content';
import { getContentUrl } from '@/lib/content-router';
import { ContentNode } from '@/types';

export const metadata: Metadata = {
  title: 'Content Library | Frontend Interview Prep',
  description: 'Browse all content in our frontend interview preparation library',
};

function ContentNodeItem({ node }: { node: ContentNode }) {
  const url = getContentUrl(node);

  return (
    <div className="mb-4">
      <Link
        href={url}
        className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {node.title}
      </Link>
      {node.metadata?.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {node.metadata.description.substring(0, 120)}
          {node.metadata.description.length > 120 ? '...' : ''}
        </p>
      )}
      {node.metadata?.tags && node.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {node.metadata.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentDirectory({ node }: { node: ContentNode }) {
  if (!node.children || node.children.length === 0) {
    return null;
  }

  // Separate directories and files
  const directories = node.children.filter(child => child.type === 'directory');
  const files = node.children.filter(child => child.type === 'file');

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{node.title}</h2>

      {/* Render subdirectories */}
      {directories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directories.map(dir => (
              <Link
                key={dir.id}
                href={getContentUrl(dir)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h4 className="text-lg font-medium">{dir.title}</h4>
                {dir.metadata?.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {dir.metadata.description.substring(0, 100)}
                    {dir.metadata.description.length > 100 ? '...' : ''}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Render files */}
      {files.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Content</h3>
          <div className="space-y-6">
            {files.map(file => (
              <ContentNodeItem key={file.id} node={file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentIndexPage() {
  // Get content structure
  const contentStructure = getContentStructure();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content Library</h1>

      <div className="mb-8">
        <p className="text-lg">
          Browse our comprehensive collection of frontend interview preparation materials, including
          algorithms, data structures, JavaScript fundamentals, React, and more.
        </p>
      </div>

      {contentStructure.children?.map(node => (
        <ContentDirectory key={node.id} node={node} />
      ))}
    </div>
  );
}
