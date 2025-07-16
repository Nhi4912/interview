'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ScopeChainDiagramProps {
  data: {
    nodes: Array<{
      id: string;
      label: string;
      level: number;
    }>;
    connections: Array<{
      from: string;
      to: string;
      label: string;
    }>;
  };
}

const DiagramContainer = styled.div`
  width: 100%;
  height: 400px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  position: relative;
  overflow: hidden;
`;

const DiagramSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const ScopeLevel = styled(motion.div)<{ level: number }>`
  position: absolute;
  left: 50%;
  top: ${props => 50 + props.level * 80}px;
  transform: translateX(-50%);
  width: ${props => 300 - props.level * 50}px;
  height: 60px;
  background: ${props => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    return colors[props.level] || '#64748b';
  }}20;
  border: 2px solid ${props => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    return colors[props.level] || '#64748b';
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ConnectionLine = styled(motion.path)`
  stroke: ${props => props.theme.colors.primary};
  stroke-width: 2;
  fill: none;
  marker-end: url(#arrowhead);
`;

const ConnectionLabel = styled(motion.text)`
  font-size: 12px;
  fill: ${props => props.theme.colors.textSecondary};
  text-anchor: middle;
`;

const InfoPanel = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 200px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const ControlPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.surfaceLight};
  }
`;

const explanations = {
  'global': 'Global scope contains variables accessible throughout the entire program',
  'outer': 'Outer function scope contains variables accessible within the function and its nested functions',
  'inner': 'Inner function (closure) has access to its own scope, outer function scope, and global scope'
};

export default function ScopeChainDiagram({ data }: ScopeChainDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationSteps = [
    { step: 0, description: 'Click on any scope level to explore' },
    { step: 1, description: 'Global scope is created when the program starts' },
    { step: 2, description: 'Outer function scope is created when function is called' },
    { step: 3, description: 'Inner function (closure) is created with access to all outer scopes' },
    { step: 4, description: 'Even after outer function returns, closure maintains access' }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= animationSteps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
    setSelectedNode(null);
  };

  const getConnectionPath = (from: string, to: string) => {
    const fromNode = data.nodes.find(n => n.id === from);
    const toNode = data.nodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return '';
    
    const fromY = 50 + fromNode.level * 80 + 30;
    const toY = 50 + toNode.level * 80 + 30;
    const fromX = 300;
    const toX = 300;
    
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  };

  return (
    <DiagramContainer>
      <DiagramSVG>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#3b82f6"
            />
          </marker>
        </defs>
        
        {data.connections.map((conn, index) => (
          <g key={index}>
            <ConnectionLine
              d={getConnectionPath(conn.from, conn.to)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isAnimating && animationStep >= index + 2 ? 1 : selectedNode ? 1 : 0,
                opacity: isAnimating && animationStep >= index + 2 ? 1 : selectedNode ? 1 : 0
              }}
              transition={{ duration: 0.8 }}
            />
            <ConnectionLabel
              x={300}
              y={50 + index * 80 + 50}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isAnimating && animationStep >= index + 2 ? 1 : selectedNode ? 1 : 0
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {conn.label}
            </ConnectionLabel>
          </g>
        ))}
      </DiagramSVG>
      
      {data.nodes.map((node) => (
        <ScopeLevel
          key={node.id}
          level={node.level}
          onClick={() => setSelectedNode(node.id)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isAnimating && animationStep >= node.level + 1 ? 1 : 1,
            scale: isAnimating && animationStep >= node.level + 1 ? 1 : selectedNode === node.id ? 1.05 : 1,
            boxShadow: selectedNode === node.id ? '0 0 20px rgba(59, 130, 246, 0.3)' : '0 0 0px rgba(59, 130, 246, 0)'
          }}
          transition={{ duration: 0.6 }}
        >
          {node.label}
        </ScopeLevel>
      ))}
      
      <AnimatePresence>
        {selectedNode && (
          <InfoPanel
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
              {data.nodes.find(n => n.id === selectedNode)?.label}
            </h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.4 }}>
              {explanations[selectedNode as keyof typeof explanations]}
            </p>
          </InfoPanel>
        )}
      </AnimatePresence>
      
      <ControlPanel>
        <ControlButton onClick={startAnimation} disabled={isAnimating}>
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </ControlButton>
        <ControlButton onClick={resetAnimation}>
          Reset
        </ControlButton>
      </ControlPanel>
      
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        fontSize: '0.9rem',
        color: '#64748b',
        maxWidth: '300px'
      }}>
        {animationSteps[animationStep]?.description}
      </div>
    </DiagramContainer>
  );
}