'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Users, Clock, Star, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { knowledgeGraph, KnowledgeNode, KnowledgeCategory } from '@/data/knowledgeGraph';

interface GraphNode extends KnowledgeNode {
  x: number;
  y: number;
  connections: string[];
}

interface GraphConnection {
  from: string;
  to: string;
  type: 'prerequisite' | 'related';
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 10;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.primary + '10'};
  }
`;

const GraphCanvas = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const GraphSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ConnectionLine = styled.line<{ type: 'prerequisite' | 'related' }>`
  stroke: ${props => props.type === 'prerequisite' ? props.theme.colors.primary : props.theme.colors.secondary};
  stroke-width: ${props => props.type === 'prerequisite' ? '2' : '1'};
  stroke-dasharray: ${props => props.type === 'related' ? '5,5' : 'none'};
  opacity: 0.6;
`;

const NodeContainer = styled(motion.div)<{ 
  difficulty: KnowledgeNode['difficulty'];
  category: KnowledgeCategory;
  isHighlighted: boolean;
  isConnected: boolean;
}>`
  position: absolute;
  width: 180px;
  min-height: 120px;
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => {
    if (props.isHighlighted) return props.theme.colors.primary;
    if (props.isConnected) return props.theme.colors.secondary;
    return props.theme.colors.border;
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.md};
  transform: translate(-50%, -50%);
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary};
    z-index: 5;
  }
  
  ${props => props.difficulty === 'Advanced' && `
    background: linear-gradient(135deg, ${props.theme.colors.surface} 0%, ${props.theme.colors.error}10 100%);
  `}
  
  ${props => props.difficulty === 'Intermediate' && `
    background: linear-gradient(135deg, ${props.theme.colors.surface} 0%, ${props.theme.colors.warning}10 100%);
  `}
  
  ${props => props.difficulty === 'Beginner' && `
    background: linear-gradient(135deg, ${props.theme.colors.surface} 0%, ${props.theme.colors.success}10 100%);
  `}
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const NodeTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  line-height: 1.2;
  margin: 0;
`;

const NodeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const DifficultyBadge = styled.span<{ difficulty: KnowledgeNode['difficulty'] }>`
  padding: 0.1rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner': return props.theme.colors.success + '20';
      case 'Intermediate': return props.theme.colors.warning + '20';
      case 'Advanced': return props.theme.colors.error + '20';
      default: return props.theme.colors.surfaceLight;
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Beginner': return props.theme.colors.success;
      case 'Intermediate': return props.theme.colors.warning;
      case 'Advanced': return props.theme.colors.error;
      default: return props.theme.colors.text;
    }
  }};
`;

const NodeStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const NodeDescription = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DetailPanel = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 400px;
  max-height: calc(100vh - 2rem);
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  overflow-y: auto;
  z-index: 20;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: calc(100vw - 2rem);
    right: 1rem;
    left: 1rem;
  }
`;

const DetailHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  sticky: top;
  background: ${props => props.theme.colors.surface};
`;

const DetailContent = styled.div`
  padding: 1.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px 4px 0 0;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.surfaceLight};
    color: ${props => props.active ? 'white' : props.theme.colors.text};
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

const ExampleCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
  }
  
  p {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  overflow-x: auto;
  margin: 0.5rem 0;
  white-space: pre-wrap;
  color: ${props => props.theme.colors.text};
`;

const ExerciseCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
  }
  
  .difficulty {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    
    &.easy {
      background: ${props => props.theme.colors.success}20;
      color: ${props => props.theme.colors.success};
    }
    
    &.medium {
      background: ${props => props.theme.colors.warning}20;
      color: ${props => props.theme.colors.warning};
    }
    
    &.hard {
      background: ${props => props.theme.colors.error}20;
      color: ${props => props.theme.colors.error};
    }
  }
  
  .companies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    
    span {
      background: ${props => props.theme.colors.primary}20;
      color: ${props => props.theme.colors.primary};
      padding: 0.2rem 0.5rem;
      border-radius: ${props => props.theme.borderRadius.sm};
      font-size: 0.8rem;
    }
  }
`;

const ResourceCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
  }
  
  .type {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    background: ${props => props.theme.colors.secondary}20;
    color: ${props => props.theme.colors.secondary};
  }
  
  .quality {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-top: 0.5rem;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AssessmentCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
  }
  
  .question {
    margin: 0.5rem 0;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  
  .options {
    margin: 0.5rem 0;
    
    li {
      margin: 0.25rem 0;
      color: ${props => props.theme.colors.textSecondary};
    }
  }
  
  .explanation {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const ApplicationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textSecondary};
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: '→';
      color: ${props => props.theme.colors.primary};
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 2px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const MiniMap = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 200px;
  height: 150px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  z-index: 15;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MiniMapViewport = styled.div`
  position: absolute;
  border: 2px solid ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary}20;
  pointer-events: none;
`;

const MiniMapNode = styled.div<{ difficulty: string }>`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner': return props.theme.colors.success;
      case 'Intermediate': return props.theme.colors.warning;
      case 'Advanced': return props.theme.colors.error;
      default: return props.theme.colors.text;
    }
  }};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const Legend = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  font-size: 0.8rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendLine = styled.div<{ type: 'prerequisite' | 'related' }>`
  width: 20px;
  height: 2px;
  background: ${props => props.type === 'prerequisite' ? props.theme.colors.primary : props.theme.colors.secondary};
  ${props => props.type === 'related' && `
    background-image: linear-gradient(90deg, ${props.theme.colors.secondary} 50%, transparent 50%);
    background-size: 6px 2px;
  `}
`;

const categories: KnowledgeCategory[] = [
  'JavaScript Fundamentals',
  'React & Frontend Frameworks',
  'TypeScript',
  'HTML & CSS',
  'System Design',
  'Performance Optimization'
];

const difficulties: KnowledgeNode['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];

export default function InteractiveKnowledgeGraph() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<KnowledgeNode['difficulty'] | 'All'>('All');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'overview' | 'examples' | 'exercises' | 'resources' | 'assessment' | 'applications'>('overview');
  const [zoom, setZoom] = useState(1);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [bookmarkedNodes, setBookmarkedNodes] = useState<Set<string>>(new Set());

  // Filter knowledge graph based on search and filters
  const filteredNodes = useMemo(() => {
    return knowledgeGraph.filter(node => {
      const matchesSearch = searchTerm === '' || 
        node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || node.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Generate node positions using force-directed layout
  const graphNodes = useMemo(() => {
    const nodes: GraphNode[] = filteredNodes.map((node, index) => {
      const angle = (index / filteredNodes.length) * 2 * Math.PI;
      const radius = Math.min(300, 50 + index * 20);
      
      return {
        ...node,
        x: 400 + Math.cos(angle) * radius + viewportOffset.x,
        y: 300 + Math.sin(angle) * radius + viewportOffset.y,
        connections: [...node.prerequisites, ...node.relatedTopics]
      };
    });
    
    return nodes;
  }, [filteredNodes, viewportOffset]);

  // Generate connections
  const connections = useMemo(() => {
    const conns: GraphConnection[] = [];
    
    graphNodes.forEach(node => {
      node.prerequisites.forEach(prereqId => {
        const prereqNode = graphNodes.find(n => n.id === prereqId);
        if (prereqNode) {
          conns.push({
            from: prereqId,
            to: node.id,
            type: 'prerequisite'
          });
        }
      });
      
      node.relatedTopics.forEach(relatedId => {
        const relatedNode = graphNodes.find(n => n.id === relatedId);
        if (relatedNode && !conns.some(c => 
          (c.from === node.id && c.to === relatedId) || 
          (c.from === relatedId && c.to === node.id)
        )) {
          conns.push({
            from: node.id,
            to: relatedId,
            type: 'related'
          });
        }
      });
    });
    
    return conns;
  }, [graphNodes]);

  const handleNodeClick = useCallback((node: KnowledgeNode) => {
    setSelectedNode(node);
    
    // Highlight connected nodes
    const connected = new Set([
      ...node.prerequisites,
      ...node.relatedTopics,
      node.id
    ]);
    setHighlightedNodes(connected);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setViewportOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeDetailPanel = () => {
    setSelectedNode(null);
    setHighlightedNodes(new Set());
  };

  const toggleNodeCompletion = (nodeId: string) => {
    setCompletedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (nodeId: string) => {
    setBookmarkedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.3), 2));
  };

  const resetView = () => {
    setViewportOffset({ x: 0, y: 0 });
    setZoom(1);
    setHighlightedNodes(new Set());
    setSelectedNode(null);
  };

  const progressPercentage = (completedNodes.size / filteredNodes.length) * 100;

  const renderTabContent = () => {
    if (!selectedNode) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <TabContent>
            <div>
              <h3>Description</h3>
              <p>{selectedNode.description}</p>
            </div>
            
            <div>
              <h3>Prerequisites</h3>
              {selectedNode.prerequisites.length > 0 ? (
                <ul>
                  {selectedNode.prerequisites.map(prereqId => {
                    const prereq = knowledgeGraph.find(n => n.id === prereqId);
                    return prereq ? (
                      <li key={prereqId}>
                        <button 
                          onClick={() => handleNodeClick(prereq)}
                          style={{ color: '#3b82f6', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {prereq.title}
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>
            
            <div>
              <h3>Related Topics</h3>
              {selectedNode.relatedTopics.length > 0 ? (
                <ul>
                  {selectedNode.relatedTopics.map(relatedId => {
                    const related = knowledgeGraph.find(n => n.id === relatedId);
                    return related ? (
                      <li key={relatedId}>
                        <button 
                          onClick={() => handleNodeClick(related)}
                          style={{ color: '#3b82f6', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {related.title}
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>
            
            <div>
              <h3>Estimated Time</h3>
              <p>{selectedNode.estimatedTime} minutes</p>
            </div>
            
            <div>
              <h3>Importance</h3>
              <p>{selectedNode.importance}/10</p>
            </div>
            
            <div>
              <h3>Tags</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {selectedNode.tags.map(tag => (
                  <span key={tag} style={{ 
                    background: '#e2e8f0', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.8rem' 
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TabContent>
        );

      case 'examples':
        return (
          <TabContent>
            {selectedNode.content.examples.map(example => (
              <ExampleCard key={example.id}>
                <h4>{example.title}</h4>
                <p>{example.description}</p>
                <CodeBlock>{example.code}</CodeBlock>
                <p><strong>Explanation:</strong> {example.explanation}</p>
                <div>
                  <strong>Complexity:</strong> Time: {example.complexity.time}, Space: {example.complexity.space}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Tags:</strong> {example.tags.join(', ')}
                </div>
              </ExampleCard>
            ))}
          </TabContent>
        );

      case 'exercises':
        return (
          <TabContent>
            {selectedNode.content.exercises.map(exercise => (
              <ExerciseCard key={exercise.id}>
                <h4>{exercise.title}</h4>
                <div className={`difficulty ${exercise.difficulty.toLowerCase()}`}>
                  {exercise.difficulty}
                </div>
                <p>{exercise.description}</p>
                
                <div>
                  <strong>Hints:</strong>
                  <ul>
                    {exercise.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <strong>Solution:</strong>
                  <CodeBlock>{exercise.solution}</CodeBlock>
                </div>
                
                <div>
                  <strong>Test Cases:</strong>
                  <ul>
                    {exercise.testCases.map((testCase, index) => (
                      <li key={index}>
                        Input: {JSON.stringify(testCase.input)} → Output: {JSON.stringify(testCase.output)}
                        <br />
                        <small>{testCase.explanation}</small>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="companies">
                  <strong>Companies:</strong>
                  {exercise.companies.map(company => (
                    <span key={company}>{company}</span>
                  ))}
                </div>
              </ExerciseCard>
            ))}
          </TabContent>
        );

      case 'resources':
        return (
          <TabContent>
            {selectedNode.resources.map((resource, index) => (
              <ResourceCard key={index}>
                <h4>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                </h4>
                <div className="type">{resource.type}</div>
                <div className="quality">
                  <Star size={12} />
                  Quality: {resource.quality}/5 | {resource.free ? 'Free' : 'Paid'}
                </div>
              </ResourceCard>
            ))}
          </TabContent>
        );

      case 'assessment':
        return (
          <TabContent>
            {selectedNode.assessmentQuestions.map(question => (
              <AssessmentCard key={question.id}>
                <h4>Question {question.id}</h4>
                <div className={`difficulty ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </div>
                <div className="question">{question.question}</div>
                
                {question.options && (
                  <div>
                    <strong>Options:</strong>
                    <ol className="options">
                      {question.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                <div className="explanation">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </AssessmentCard>
            ))}
          </TabContent>
        );

      case 'applications':
        return (
          <TabContent>
            <div>
              <h3>Real-world Applications</h3>
              <ApplicationsList>
                {selectedNode.realWorldApplications.map((app, index) => (
                  <li key={index}>{app}</li>
                ))}
              </ApplicationsList>
            </div>
          </TabContent>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <ControlPanel>
        <ControlRow>
          <SearchInput
            type="text"
            placeholder="Search topics, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton
            active={selectedCategory === 'All'}
            onClick={() => setSelectedCategory('All')}
          >
            All Categories
          </FilterButton>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </ControlRow>
        
        <ControlRow>
          <FilterButton
            active={selectedDifficulty === 'All'}
            onClick={() => setSelectedDifficulty('All')}
          >
            All Levels
          </FilterButton>
          {difficulties.map(difficulty => (
            <FilterButton
              key={difficulty}
              active={selectedDifficulty === difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </FilterButton>
          ))}
        </ControlRow>
      </ControlPanel>

      <div style={{ position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          top: '6rem', 
          left: '1rem', 
          zIndex: 10, 
          background: 'rgba(255, 255, 255, 0.9)', 
          padding: '0.5rem', 
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Progress: {Math.round(progressPercentage)}%
          </div>
          <ProgressBar>
            <ProgressFill progress={progressPercentage} />
          </ProgressBar>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            {completedNodes.size} / {filteredNodes.length} completed
          </div>
        </div>
        
        <div style={{ 
          position: 'absolute', 
          top: '6rem', 
          right: '1rem', 
          zIndex: 10, 
          background: 'rgba(255, 255, 255, 0.9)', 
          padding: '0.5rem', 
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <button 
            onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
            style={{ 
              padding: '0.25rem 0.5rem', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Zoom In
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.3))}
            style={{ 
              padding: '0.25rem 0.5rem', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Zoom Out
          </button>
          <button 
            onClick={resetView}
            style={{ 
              padding: '0.25rem 0.5rem', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Reset View
          </button>
        </div>
      </div>
      
      <GraphCanvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        <GraphSVG>
          {connections.map((conn, index) => {
            const fromNode = graphNodes.find(n => n.id === conn.from);
            const toNode = graphNodes.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return null;
            
            return (
              <ConnectionLine
                key={index}
                type={conn.type}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
              />
            );
          })}
        </GraphSVG>
        
        {graphNodes.map(node => (
          <NodeContainer
            key={node.id}
            difficulty={node.difficulty}
            category={node.category}
            isHighlighted={highlightedNodes.has(node.id)}
            isConnected={highlightedNodes.size > 0 && highlightedNodes.has(node.id)}
            style={{
              left: node.x,
              top: node.y
            }}
            onClick={() => handleNodeClick(node)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              opacity: completedNodes.has(node.id) ? 0.7 : 1,
              borderColor: completedNodes.has(node.id) ? '#10b981' : 
                         bookmarkedNodes.has(node.id) ? '#f59e0b' : 
                         highlightedNodes.has(node.id) ? '#3b82f6' : 
                         highlightedNodes.size > 0 && highlightedNodes.has(node.id) ? '#10b981' : '#e2e8f0'
            }}
          >
            <NodeHeader>
              <NodeTitle>{node.title}</NodeTitle>
            </NodeHeader>
            
            <NodeMeta>
              <DifficultyBadge difficulty={node.difficulty}>
                {node.difficulty}
              </DifficultyBadge>
              <NodeStats>
                <Clock size={12} />
                {node.estimatedTime}m
              </NodeStats>
              <NodeStats>
                <Star size={12} />
                {node.importance}/10
              </NodeStats>
            </NodeMeta>
            
            <NodeDescription>{node.description}</NodeDescription>
            
            {completedNodes.has(node.id) && (
              <div style={{ 
                position: 'absolute', 
                top: '0.5rem', 
                right: '0.5rem', 
                background: '#10b981', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '0.8rem' 
              }}>
                ✓
              </div>
            )}
            
            {bookmarkedNodes.has(node.id) && (
              <div style={{ 
                position: 'absolute', 
                top: '0.5rem', 
                right: completedNodes.has(node.id) ? '2rem' : '0.5rem', 
                background: '#f59e0b', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '0.8rem' 
              }}>
                ★
              </div>
            )}
          </NodeContainer>
        ))}
      </GraphCanvas>

      <Legend>
        <LegendItem>
          <LegendLine type="prerequisite" />
          <span>Prerequisites</span>
        </LegendItem>
        <LegendItem>
          <LegendLine type="related" />
          <span>Related Topics</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>✓</div>
          <span>Completed</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: '20px', height: '20px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>★</div>
          <span>Bookmarked</span>
        </LegendItem>
      </Legend>
      
      <MiniMap>
        <svg width="100%" height="100%" style={{ background: '#f8fafc' }}>
          {graphNodes.map(node => {
            const x = (node.x / window.innerWidth) * 200;
            const y = (node.y / window.innerHeight) * 150;
            return (
              <circle
                key={node.id}
                cx={x}
                cy={y}
                r="2"
                fill={completedNodes.has(node.id) ? '#10b981' : 
                     bookmarkedNodes.has(node.id) ? '#f59e0b' : 
                     node.difficulty === 'Beginner' ? '#10b981' : 
                     node.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444'}
                opacity={highlightedNodes.has(node.id) ? 1 : 0.6}
              />
            );
          })}
        </svg>
      </MiniMap>

      <AnimatePresence>
        {selectedNode && (
          <DetailPanel
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <DetailHeader>
              <CloseButton onClick={closeDetailPanel}>×</CloseButton>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, flex: 1 }}>{selectedNode.title}</h2>
                <button 
                  onClick={() => toggleNodeCompletion(selectedNode.id)}
                  style={{ 
                    background: completedNodes.has(selectedNode.id) ? '#10b981' : 'transparent',
                    color: completedNodes.has(selectedNode.id) ? 'white' : '#10b981',
                    border: '1px solid #10b981',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {completedNodes.has(selectedNode.id) ? '✓ Completed' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => toggleBookmark(selectedNode.id)}
                  style={{ 
                    background: bookmarkedNodes.has(selectedNode.id) ? '#f59e0b' : 'transparent',
                    color: bookmarkedNodes.has(selectedNode.id) ? 'white' : '#f59e0b',
                    border: '1px solid #f59e0b',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {bookmarkedNodes.has(selectedNode.id) ? '★ Bookmarked' : '☆ Bookmark'}
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <DifficultyBadge difficulty={selectedNode.difficulty}>
                  {selectedNode.difficulty}
                </DifficultyBadge>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  {selectedNode.category}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  <Clock size={14} style={{ marginRight: '0.25rem' }} />
                  {selectedNode.estimatedTime}m
                </span>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  <Star size={14} style={{ marginRight: '0.25rem' }} />
                  {selectedNode.importance}/10
                </span>
              </div>
              
              <TabContainer>
                <TabButton 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </TabButton>
                <TabButton 
                  active={activeTab === 'examples'} 
                  onClick={() => setActiveTab('examples')}
                >
                  Examples ({selectedNode.content.examples.length})
                </TabButton>
                <TabButton 
                  active={activeTab === 'exercises'} 
                  onClick={() => setActiveTab('exercises')}
                >
                  Exercises ({selectedNode.content.exercises.length})
                </TabButton>
                <TabButton 
                  active={activeTab === 'resources'} 
                  onClick={() => setActiveTab('resources')}
                >
                  Resources ({selectedNode.resources.length})
                </TabButton>
                <TabButton 
                  active={activeTab === 'assessment'} 
                  onClick={() => setActiveTab('assessment')}
                >
                  Assessment ({selectedNode.assessmentQuestions.length})
                </TabButton>
                <TabButton 
                  active={activeTab === 'applications'} 
                  onClick={() => setActiveTab('applications')}
                >
                  Applications
                </TabButton>
              </TabContainer>
            </DetailHeader>
            
            <DetailContent>
              {renderTabContent()}
            </DetailContent>
          </DetailPanel>
        )}
      </AnimatePresence>
    </Container>
  );
}