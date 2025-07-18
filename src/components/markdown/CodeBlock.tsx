'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { motion } from 'framer-motion';
import { Copy, Check, Download, Play, FileText } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  title?: string;
  executable?: boolean;
  collapsible?: boolean;
}

const languageIcons: { [key: string]: JSX.Element } = {
  javascript: <FileText size={14} />,
  typescript: <FileText size={14} />,
  jsx: <FileText size={14} />,
  tsx: <FileText size={14} />,
  html: <FileText size={14} />,
  css: <FileText size={14} />,
  python: <FileText size={14} />,
  java: <FileText size={14} />,
  cpp: <FileText size={14} />,
  c: <FileText size={14} />,
  bash: <FileText size={14} />,
  shell: <FileText size={14} />,
  json: <FileText size={14} />,
  yaml: <FileText size={14} />,
  xml: <FileText size={14} />,
  sql: <FileText size={14} />,
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  language,
  filename,
  showLineNumbers = true,
  title,
  executable = false,
  collapsible = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const { resolvedTheme } = useTheme();

  // Extract language from className if not provided directly
  const match = /language-(\w+)/.exec(className || '');
  const lang = language || (match ? match[1] : '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([children], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `code.${lang || 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExecute = async () => {
    // This would be implemented with a code execution service
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 2000);
  };

  const syntaxHighlighterStyle = resolvedTheme === 'dark' ? tomorrow : prism;

  return (
    <div className="my-6 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden bg-white dark:bg-secondary-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
        <div className="flex items-center space-x-3">
          {/* Language and Icon */}
          <div className="flex items-center space-x-2">
            {languageIcons[lang] || <FileText size={14} />}
            {lang && (
              <span className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 uppercase">
                {lang}
              </span>
            )}
          </div>
          
          {/* Title or Filename */}
          {(title || filename) && (
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-secondary-400 rounded-full"></div>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {title || filename}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-md transition-colors"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </button>
          )}
          
          {executable && (
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="p-1.5 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-md transition-colors disabled:opacity-50"
              title="Execute code"
            >
              {isExecuting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <Play size={16} />
              )}
            </button>
          )}
          
          <button
            onClick={handleDownload}
            className="p-1.5 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-md transition-colors"
            title="Download code"
          >
            <Download size={16} />
          </button>
          
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-md transition-colors ${
              copied
                ? 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <motion.div
        initial={false}
        animate={{ height: isCollapsed ? 0 : 'auto' }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="relative">
          <SyntaxHighlighter
            language={lang || 'text'}
            style={syntaxHighlighterStyle}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
              },
            }}
          >
            {children.trim()}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeBlock;
