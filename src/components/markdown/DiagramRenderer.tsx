'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';
import { Copy, Download, Maximize2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface DiagramRendererProps {
  chart: string;
  type?: 'mermaid' | 'plantuml' | 'graphviz';
  className?: string;
  showControls?: boolean;
  caption?: string;
}

const mermaidThemes = {
  light: 'default',
  dark: 'dark',
};

const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  chart,
  type = 'mermaid',
  className,
  showControls = true,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [diagramId] = useState<string>(`diagram-${Math.random().toString(36).substring(2, 11)}`);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart || !containerRef.current) return;

      setLoading(true);
      setError(null);

      try {
        if (type === 'mermaid') {
          // Initialize mermaid with theme support
          mermaid.initialize({
            startOnLoad: true,
            theme: mermaidThemes[resolvedTheme] || 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 14,
            flowchart: {
              htmlLabels: true,
              curve: 'basis',
            },
            sequence: {
              diagramMarginX: 50,
              diagramMarginY: 10,
              actorMargin: 50,
              width: 150,
              height: 65,
              boxMargin: 10,
              boxTextMargin: 5,
              noteMargin: 10,
              messageMargin: 35,
            },
            gantt: {
              titleTopMargin: 25,
              barHeight: 20,
              barGap: 4,
              topPadding: 50,
              leftPadding: 75,
              gridLineStartPadding: 35,
              fontSize: 11,
              sectionFontSize: 11,
              numberSectionStyles: 4,
            },
          });

          // Clean up the chart string (remove indentation, etc.)
          const cleanChart = chart.trim();

          // Render the Mermaid diagram
          const { svg } = await mermaid.render(diagramId, cleanChart);
          setSvg(svg);
        } else {
          // For future support of other diagram types
          setError(`Diagram type '${type}' is not supported yet.`);
        }
      } catch (err) {
        console.error('Error rendering diagram:', err);
        setError(`Failed to render diagram: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chart, type, diagramId, resolvedTheme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy chart:', err);
    }
  };

  const handleDownload = () => {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagram-${diagramId}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <figure className={`my-8 w-full ${className || ''}`}>
        <div className="flex justify-center items-center py-8 text-secondary-600 dark:text-secondary-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3">Rendering diagram...</span>
        </div>
      </figure>
    );
  }

  if (error) {
    return (
      <figure className={`my-8 w-full ${className || ''}`}>
        <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
          <div className="text-error-600 dark:text-error-400 text-sm">
            <strong>Error rendering diagram:</strong> {error}
          </div>
          <pre className="mt-2 text-xs text-secondary-600 dark:text-secondary-400 whitespace-pre-wrap bg-secondary-50 dark:bg-secondary-800 p-2 rounded">
            {chart}
          </pre>
        </div>
      </figure>
    );
  }

  return (
    <>
      <figure className={`my-8 w-full ${className || ''}`}>
        <div className="relative group">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-4 border border-secondary-200 dark:border-secondary-700 shadow-sm overflow-x-auto">
            <div 
              ref={containerRef} 
              className="flex justify-center"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
          
          {showControls && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                title="Copy source code"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                title="Download SVG"
              >
                <Download size={16} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                title="View fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          )}
        </div>
        
        {caption && (
          <figcaption className="text-center mt-3 text-sm text-secondary-600 dark:text-secondary-400 italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-secondary-800 rounded-lg p-6 max-w-full max-h-full overflow-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                Diagram Viewer
              </h3>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-md transition-colors"
              >
                <Maximize2 size={20} />
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DiagramRenderer;
