'use client';

import React from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import ContentLayout from '@/components/ContentLayout';
import MarkdownDemo from '@/components/markdown/MarkdownDemo';
import { processMdxContent } from '@/lib/mdx-processing';
import { MDXRemote } from 'next-mdx-remote';
import components from '@/lib/mdx-components';

const DemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DemoSection = styled.section`
  margin-bottom: 3rem;
`;

const DemoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const DemoDescription = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export default function MarkdownDemoPage() {
  return (
    <MainLayout>
      <ContentLayout
        title="Markdown Rendering Demo"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Markdown Demo', path: '/markdown-demo' },
        ]}
      >
        <DemoContainer>
          <DemoSection>
            <DemoTitle>Markdown Rendering Components</DemoTitle>
            <DemoDescription>
              This page demonstrates the markdown rendering capabilities of our application. We've
              implemented a comprehensive markdown processing pipeline with support for syntax
              highlighting, custom React components, and responsive images.
            </DemoDescription>

            <MarkdownDemo />
          </DemoSection>
        </DemoContainer>
      </ContentLayout>
    </MainLayout>
  );
}
