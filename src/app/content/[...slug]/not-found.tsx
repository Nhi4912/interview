import Link from 'next/link';

export default function ContentNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
      <p className="text-xl mb-8">
        The content you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/content"
          className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Browse All Content
        </Link>
      </div>
    </div>
  );
}
