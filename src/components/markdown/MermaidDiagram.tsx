'use client';

import React from 'react';
import DiagramRenderer from './DiagramRenderer';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  className?: string;
  showControls?: boolean;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ 
  chart, 
  caption, 
  className,
  showControls = true 
}) => {
  return (
    <DiagramRenderer 
      chart={chart} 
      type="mermaid" 
      caption={caption}
      className={className}
      showControls={showControls}
    />
  );
};

export default MermaidDiagram;
