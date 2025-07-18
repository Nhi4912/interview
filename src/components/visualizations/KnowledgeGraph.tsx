'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Download } from 'lucide-react';

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  importance: number;
  progress?: number;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface KnowledgeLink {
  source: string;
  target: string;
  strength: number;
  type: 'prerequisite' | 'related' | 'builds-on';
}

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  onNodeClick?: (node: KnowledgeNode) => void;
  onNodeHover?: (node: KnowledgeNode | null) => void;
  width?: number;
  height?: number;
  className?: string;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  links,
  onNodeClick,
  onNodeHover,
  width = 800,
  height = 600,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const simulationRef = useRef<d3.Simulation<KnowledgeNode, KnowledgeLink> | null>(null);
  const transformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': '#3b82f6',
      'React': '#10b981',
      'JavaScript': '#f59e0b',
      'CSS': '#ef4444',
      'HTML': '#8b5cf6',
      'Algorithms': '#06b6d4',
      'Performance': '#84cc16',
      'Testing': '#ec4899',
      'Tools': '#6b7280',
      'System Design': '#f97316'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  const getLevelSize = (level: string) => {
    switch (level) {
      case 'beginner': return 20;
      case 'intermediate': return 25;
      case 'advanced': return 30;
      default: return 20;
    }
  };

  const getNodeOpacity = (node: KnowledgeNode) => {
    if (!hoveredNode) return 1;
    if (node.id === hoveredNode.id) return 1;
    
    // Check if node is connected to hovered node
    const connected = links.some(link => 
      (link.source === node.id && link.target === hoveredNode.id) ||
      (link.target === node.id && link.source === hoveredNode.id)
    );
    
    return connected ? 0.8 : 0.3;
  };

  const getLinkOpacity = (link: KnowledgeLink) => {
    if (!hoveredNode) return 0.6;
    return (link.source === hoveredNode.id || link.target === hoveredNode.id) ? 1 : 0.2;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const container = svg.append('g');
    
    // Create zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        transformRef.current = event.transform;
        setZoom(event.transform.k);
        container.attr('transform', event.transform);
      });

    svg.call(zoomBehavior);

    // Create force simulation
    const simulation = d3.forceSimulation<KnowledgeNode>(nodes)
      .force('link', d3.forceLink<KnowledgeNode, KnowledgeLink>(links)
        .id(d => d.id)
        .distance(80)
        .strength(0.5)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(35));

    simulationRef.current = simulation;

    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', d => d.strength * 2)
      .attr('stroke-opacity', d => getLinkOpacity(d))
      .attr('stroke-dasharray', d => d.type === 'prerequisite' ? '5,5' : 'none');

    // Create node groups
    const node = container.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, KnowledgeNode>()
        .on('start', (event, d) => {
          setIsDragging(true);
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          setIsDragging(false);
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => getLevelSize(d.level))
      .attr('fill', d => getCategoryColor(d.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', d => getNodeOpacity(d));

    // Add progress rings
    node.append('circle')
      .attr('r', d => getLevelSize(d.level) + 3)
      .attr('fill', 'none')
      .attr('stroke', d => getCategoryColor(d.category))
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', d => {
        const circumference = 2 * Math.PI * (getLevelSize(d.level) + 3);
        const progress = d.progress || 0;
        return `${circumference * progress / 100} ${circumference}`;
      })
      .attr('opacity', d => d.progress ? 1 : 0)
      .attr('transform', 'rotate(-90)');

    // Add labels
    node.append('text')
      .attr('dy', d => getLevelSize(d.level) + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text(d => d.title.length > 12 ? d.title.substring(0, 12) + '...' : d.title);

    // Add importance indicators
    node.append('circle')
      .attr('r', 4)
      .attr('cx', d => getLevelSize(d.level) - 5)
      .attr('cy', d => -getLevelSize(d.level) + 5)
      .attr('fill', '#fbbf24')
      .attr('opacity', d => d.importance > 8 ? 1 : 0);

    // Event handlers
    node
      .on('click', (event, d) => {
        if (!isDragging) {
          setSelectedNode(d);
          onNodeClick?.(d);
        }
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        onNodeHover?.(d);
        
        // Update node and link opacities
        node.select('circle').attr('opacity', n => getNodeOpacity(n));
        link.attr('stroke-opacity', l => getLinkOpacity(l));
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        onNodeHover?.(null);
        
        // Reset opacities
        node.select('circle').attr('opacity', 1);
        link.attr('stroke-opacity', 0.6);
      });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as KnowledgeNode).x!)
        .attr('y1', d => (d.source as KnowledgeNode).y!)
        .attr('x2', d => (d.target as KnowledgeNode).x!)
        .attr('y2', d => (d.target as KnowledgeNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, width, height, hoveredNode, onNodeClick, onNodeHover, isDragging]);

  const handleZoomIn = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(300).call(
        d3.zoom<SVGSVGElement, unknown>().scaleBy,
        1.5
      );
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(300).call(
        d3.zoom<SVGSVGElement, unknown>().scaleBy,
        0.75
      );
    }
  };

  const handleReset = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(500).call(
        d3.zoom<SVGSVGElement, unknown>().transform,
        d3.zoomIdentity
      );
      
      // Restart simulation
      if (simulationRef.current) {
        simulationRef.current.alpha(1).restart();
      }
    }
  };

  const handleDownload = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'knowledge-graph.svg';
      downloadLink.click();
      
      URL.revokeObjectURL(svgUrl);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          className="p-2 bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          className="p-2 bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="p-2 bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw size={16} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDownload}
          className="p-2 bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
          title="Download"
        >
          <Download size={16} />
        </motion.button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700 text-sm text-secondary-600 dark:text-secondary-400">
        Zoom: {Math.round(zoom * 100)}%
      </div>

      {/* Node info tooltip */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 z-10 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 p-4 max-w-xs"
        >
          <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            {hoveredNode.title}
          </h4>
          <div className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
            <p><strong>Category:</strong> {hoveredNode.category}</p>
            <p><strong>Level:</strong> {hoveredNode.level}</p>
            <p><strong>Importance:</strong> {hoveredNode.importance}/10</p>
            {hoveredNode.progress && (
              <p><strong>Progress:</strong> {hoveredNode.progress}%</p>
            )}
          </div>
        </motion.div>
      )}

      {/* SVG Container */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-full"
        />
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
          Legend
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">React</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">JavaScript</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-1 bg-gray-400" style={{ strokeDasharray: '5,5' }} />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Prerequisite</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">High Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;