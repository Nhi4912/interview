'use client';

import React from 'react';
import styled from 'styled-components';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface CalloutStyleProps {
  type: CalloutType;
}

const CalloutContainer = styled.div<CalloutStyleProps>`
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid;
  background: ${props => {
    switch (props.type) {
      case 'info':
        return '#f0f9ff';
      case 'warning':
        return '#fffbeb';
      case 'success':
        return '#f0fdf4';
      case 'error':
        return '#fef2f2';
      case 'tip':
        return '#f5f3ff';
      default:
        return '#f0f9ff';
    }
  }};
  border-left-color: ${props => {
    switch (props.type) {
      case 'info':
        return '#3b82f6';
      case 'warning':
        return '#f59e0b';
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'tip':
        return '#8b5cf6';
      default:
        return '#3b82f6';
    }
  }};
`;

const CalloutTitle = styled.div<CalloutStyleProps>`
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  color: ${props => {
    switch (props.type) {
      case 'info':
        return '#1e40af';
      case 'warning':
        return '#b45309';
      case 'success':
        return '#047857';
      case 'error':
        return '#b91c1c';
      case 'tip':
        return '#6d28d9';
      default:
        return '#1e40af';
    }
  }};

  svg {
    margin-right: 0.5rem;
  }
`;

const CalloutContent = styled.div`
  color: #4b5563;

  p:last-child {
    margin-bottom: 0;
  }
`;

const getIcon = (type: CalloutType) => {
  switch (type) {
    case 'info':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      );
    case 'warning':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    case 'success':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      );
    case 'error':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      );
    case 'tip':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    default:
      return null;
  }
};

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children, className }) => {
  const icon = getIcon(type);
  const defaultTitles: Record<CalloutType, string> = {
    info: 'Information',
    warning: 'Warning',
    success: 'Success',
    error: 'Error',
    tip: 'Tip',
  };

  const displayTitle = title || defaultTitles[type];

  return (
    <CalloutContainer type={type} className={className}>
      <CalloutTitle type={type}>
        {icon}
        {displayTitle}
      </CalloutTitle>
      <CalloutContent>{children}</CalloutContent>
    </CalloutContainer>
  );
};

export default Callout;
