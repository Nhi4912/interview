import Link from 'next/link';
import { ContentNode } from '@/types';
import { getContentUrl } from '@/lib/content-router';

interface DirectoryViewProps {
  node: ContentNode;
}

export default function DirectoryView({ node }: DirectoryViewProps) {
  if (!node.children || node.children.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">{node.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">This directory is empty.</p>
      </div>
    );
  }

  // Separate directories and files
  const directories = node.children.filter(child => child.type === 'directory');
  const files = node.children.filter(child => child.type === 'file');

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">{node.title}</h1>

      {node.metadata?.description && <p className="text-lg mb-8">{node.metadata.description}</p>}

      {/* Render subdirectories */}
      {directories.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directories.map(dir => (
              <Link
                key={dir.id}
                href={getContentUrl(dir)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-medium">{dir.title}</h3>
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
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <div className="space-y-6">
            {files.map(file => (
              <div key={file.id} className="mb-4">
                <Link
                  href={getContentUrl(file)}
                  className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {file.title}
                </Link>
                {file.metadata?.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {file.metadata.description.substring(0, 120)}
                    {file.metadata.description.length > 120 ? '...' : ''}
                  </p>
                )}
                {file.metadata?.tags && file.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {file.metadata.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
