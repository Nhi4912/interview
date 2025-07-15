import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-size: ${props => props.theme.typography.fontSize.base};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: ${props => props.theme.typography.fontSize['5xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize['4xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSize['3xl']};
    }
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
    }
  }

  h4 {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSize.xl};
    }
  }

  h5 {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }

  h6 {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }

  p {
    margin-bottom: 1rem;
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.animation.transition.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
    
    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  blockquote {
    margin: 1rem 0;
    padding: 1rem;
    border-left: 4px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.surfaceLight};
    font-style: italic;
  }

  code {
    font-family: ${props => props.theme.typography.fontFamily.code};
    font-size: 0.9em;
    background-color: ${props => props.theme.colors.surfaceLight};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
  }

  pre {
    background-color: ${props => props.theme.colors.surfaceLight};
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: 1rem;
    
    code {
      background: none;
      padding: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  th {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    background-color: ${props => props.theme.colors.surfaceLight};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${props => props.theme.colors.primary};
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 100;
    
    &:focus {
      top: 6px;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surfaceLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.textMuted};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textSecondary};
  }

  /* Selection styling */
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  /* Focus styles for better accessibility */
  .focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Animation classes */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }

  .slide-up {
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.3s ease forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    
    a, a:visited {
      text-decoration: underline;
    }
    
    h1, h2, h3, h4, h5, h6 {
      break-after: avoid;
    }
    
    pre, blockquote {
      border: 1px solid #999;
      break-inside: avoid;
    }
    
    img {
      max-width: 100% !important;
    }
    
    @page {
      margin: 0.5in;
    }
  }
`;

export default GlobalStyles;