import Link from 'next/link';
import { ContentNode } from '@/types';

// Simple client-side URL generation to avoid server imports
const getContentUrl = (item: ContentNode): string => {
  return `/content/${item.path}`;
};

interface BreadcrumbsProps {
  items: ContentNode[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            <span className="mx-2">/</span>
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-gray-200">{item.title}</span>
            ) : (
              <Link
                href={getContentUrl(item)}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
