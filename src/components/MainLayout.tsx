'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  showBreadcrumbs?: boolean;
  contentClassName?: string;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main<{ fullWidth?: boolean }>`
  flex: 1;
  width: 100%;
  padding-top: 70px; /* Height of the navigation bar */
`;

const ContentContainer = styled.div<{ fullWidth?: boolean }>`
  max-width: ${props => (props.fullWidth ? '100%' : '1200px')};
  margin: 0 auto;
  padding: ${props => (props.fullWidth ? '0' : '2rem')};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => (props.fullWidth ? '0' : '1.5rem')};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => (props.fullWidth ? '0' : '1rem')};
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 8px;
  z-index: 100;

  &:focus {
    top: 0;
  }
`;

/**
 * MainLayout component that provides a consistent layout structure for all pages
 *
 * @param children - The content to be rendered within the layout
 * @param fullWidth - Whether the content should take up the full width of the screen
 * @param showBreadcrumbs - Whether to show breadcrumbs navigation
 * @param contentClassName - Additional CSS class name for the content container
 */
const MainLayout = ({
  children,
  fullWidth = false,
  showBreadcrumbs = false,
  contentClassName = '',
}: MainLayoutProps) => {
  return (
    <LayoutContainer>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent id="main-content">
        <ContentContainer fullWidth={fullWidth} className={contentClassName}>
          {children}
        </ContentContainer>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default MainLayout;
