'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from './MainLayout';
import { ChevronLeft, ChevronRight, Home, Tag } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
// Import types only to avoid bundling server-side modules
import type { ContentNode } from '@/types';

interface ContentLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  contentPath: string;
  showTableOfContents?: boolean;
  tableOfContents?: Array<{ id: string; text: string; level: number }>;
}

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(0, 800px) 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContentArea = styled.div`
  grid-column: 2;
  min-width: 0;
`;

const Sidebar = styled.aside`
  grid-column: 1;
  position: sticky;
  top: 90px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  padding-right: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const RelatedContentSidebar = styled.aside`
  grid-column: 3;
  position: sticky;
  top: 90px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  padding-left: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ContentTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const ContentDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: all ${props => props.theme.animation.transition.fast};

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const PreviousButton = styled(NavButton)`
  padding-left: 0.75rem;
`;

const NextButton = styled(NavButton)`
  padding-right: 0.75rem;
`;

const NavButtonText = styled.span`
  display: flex;
  flex-direction: column;
`;

const NavButtonLabel = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const NavButtonTitle = styled.span`
  font-weight: 500;
`;

const TableOfContents = styled.div`
  margin-bottom: 2rem;
`;

const TOCTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li<{ level: number }>`
  margin-bottom: 0.5rem;
  padding-left: ${props => (props.level - 1) * 1}rem;

  a {
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    font-size: 0.9rem;
    display: block;
    padding: 0.25rem 0;
    border-left: 2px solid transparent;
    padding-left: 0.75rem;
    transition: all ${props => props.theme.animation.transition.fast};

    &:hover,
    &.active {
      color: ${props => props.theme.colors.primary};
      border-left-color: ${props => props.theme.colors.primary};
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TagItem = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.surfaceLight};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

/**
 * ContentLayout component for displaying content pages with navigation and table of contents
 */
const ContentLayout = ({
  children,
  title,
  description,
  category,
  tags,
  contentPath,
  showTableOfContents = true,
  tableOfContents = [],
}: ContentLayoutProps) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState<ContentNode[]>([]);
  const [navigation, setNavigation] = useState<{
    prev: ContentNode | null;
    next: ContentNode | null;
  }>({ prev: null, next: null });

  // Load breadcrumbs and navigation on client side
  useEffect(() => {
    // For now, disable these server-side functions during build
    // This will be implemented with proper API routes later
    if (typeof window !== 'undefined') {
      // Client-side only logic will go here
      // setBreadcrumbItems([]);
      // setNavigation({ prev: null, next: null });
    }
  }, [contentPath]);

  return (
    <MainLayout>
      <ContentContainer>
        {showTableOfContents && tableOfContents && tableOfContents.length > 0 && (
          <Sidebar>
            <TableOfContents>
              <TOCTitle>On this page</TOCTitle>
              <TOCList>
                {tableOfContents.map(item => (
                  <TOCItem key={item.id} level={item.level}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </TOCItem>
                ))}
              </TOCList>
            </TableOfContents>
          </Sidebar>
        )}

        <MainContentArea>
          <Breadcrumbs items={breadcrumbItems} />

          {category && <CategoryBadge>{category}</CategoryBadge>}

          {title && <ContentTitle>{title}</ContentTitle>}

          {description && <ContentDescription>{description}</ContentDescription>}

          {tags && tags.length > 0 && (
            <TagsContainer>
              {tags.map(tag => (
                <TagItem key={tag}>
                  <Tag size={12} style={{ marginRight: '0.25rem' }} />
                  {tag}
                </TagItem>
              ))}
            </TagsContainer>
          )}

          {children}

          <NavigationButtons>
            {navigation.prev ? (
              <PreviousButton href={`/content/${navigation.prev.path}`}>
                <ChevronLeft size={20} style={{ marginRight: '0.5rem' }} />
                <NavButtonText>
                  <NavButtonLabel>Previous</NavButtonLabel>
                  <NavButtonTitle>{navigation.prev.title}</NavButtonTitle>
                </NavButtonText>
              </PreviousButton>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <NextButton href={`/content/${navigation.next.path}`}>
                <NavButtonText>
                  <NavButtonLabel>Next</NavButtonLabel>
                  <NavButtonTitle>{navigation.next.title}</NavButtonTitle>
                </NavButtonText>
                <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
              </NextButton>
            ) : (
              <div />
            )}
          </NavigationButtons>
        </MainContentArea>

        <RelatedContentSidebar>
          {/* This area can be used for related content, tags, etc. */}
        </RelatedContentSidebar>
      </ContentContainer>
    </MainLayout>
  );
};

export default ContentLayout;
