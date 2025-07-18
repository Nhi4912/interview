'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContainer = styled.div`
  margin: 1.5rem 0;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const TabList = styled.div`
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f8fafc;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  background: none;
  font-size: 0.9rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? '#3b82f6' : '#64748b')};
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid ${props => (props.active ? '#3b82f6' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    color: ${props => (props.active ? '#3b82f6' : '#475569')};
    background: ${props => (props.active ? 'transparent' : '#f1f5f9')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const TabContent = styled.div`
  padding: 1.25rem;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  // Filter out non-Tab children
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && (child.type as any).name === 'Tab'
  ) as React.ReactElement<TabProps>[];

  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <TabsContainer className={className}>
      <TabList>
        {tabs.map((tab, index) => (
          <TabButton key={index} active={index === activeTab} onClick={() => setActiveTab(index)}>
            {tab.props.label}
          </TabButton>
        ))}
      </TabList>
      <TabContent>{tabs[activeTab]?.props.children}</TabContent>
    </TabsContainer>
  );
};

export default Tabs;
