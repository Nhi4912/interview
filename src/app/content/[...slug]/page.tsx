import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { resolveContentPath } from '@/lib/content-router';
import { processMdxFile } from '@/lib/mdx-processing';
import MarkdownViewer from '@/components/MarkdownViewer';
import ContentLayout from '@/components/ContentLayout';
import DirectoryView from './directory';

interface ContentPageProps {
  params: {
    slug: string[];
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { node } = resolveContentPath(params.slug);

  if (!node) {
    return {
      title: 'Content Not Found',
    };
  }

  return {
    title: node.title,
    description: node.metadata?.description || '',
    keywords: node.metadata?.tags?.join(', ') || '',
  };
}

// Generate static paths at build time
export async function generateStaticParams() {
  // This will be implemented in the content-indexer.ts
  // Import and use the function here
  const { generateContentStaticPaths } = await import('@/lib/content-indexer');
  return generateContentStaticPaths();
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = params;
  const { node, filePath } = resolveContentPath(slug);

  // If content not found, return 404
  if (!node) {
    notFound();
  }

  // Handle directory view
  if (node.type === 'directory') {
    return (
      <ContentLayout
        title={node.title}
        description={node.metadata?.description || ''}
        category={node.metadata?.category || 'Uncategorized'}
        tags={node.metadata?.tags || []}
        contentPath={node.path}
      >
        <DirectoryView node={node} />
      </ContentLayout>
    );
  }

  // Handle file view
  if (!filePath) {
    notFound();
  }

  // Process the MDX content
  const mdxContent = await processMdxFile(filePath);

  if (!mdxContent) {
    notFound();
  }

  return (
    <ContentLayout
      title={node.title}
      description={node.metadata?.description || ''}
      category={node.metadata?.category || 'Uncategorized'}
      tags={node.metadata?.tags || []}
      contentPath={node.path}
    >
      <MarkdownViewer source={mdxContent.source} />
    </ContentLayout>
  );
}
