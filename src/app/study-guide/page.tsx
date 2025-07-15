'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ArrowRight, Clock, Star, Code, Users, Zap } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const StudyPath = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PathCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  transition: all ${props => props.theme.animation.transition.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PathIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${props => props.color}15;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.color};
  margin-bottom: 1.5rem;
`;

const PathTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const PathDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PathProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-right: 1rem;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: ${props => props.theme.colors.primary};
  transition: width ${props => props.theme.animation.transition.normal};
`;

const ProgressText = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const TopicCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TopicTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const TopicStatus = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.completed ? props.theme.colors.success : props.theme.colors.textMuted};
  font-size: 0.875rem;
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TopicItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.completed ? props.theme.colors.success : props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const studyPaths = [
  {
    id: 1,
    title: "React & Modern Frontend",
    description: "Master React 18+, hooks, patterns, and modern frontend development practices",
    icon: <Code size={32} />,
    color: "#3b82f6",
    progress: 75,
    topics: [
      { name: "React 18+ Features", completed: true },
      { name: "Custom Hooks", completed: true },
      { name: "Context & State Management", completed: true },
      { name: "Performance Optimization", completed: false },
      { name: "Testing Components", completed: false }
    ]
  },
  {
    id: 2,
    title: "TypeScript Advanced",
    description: "Deep dive into TypeScript patterns, utility types, and advanced type manipulation",
    icon: <BookOpen size={32} />,
    color: "#10b981",
    progress: 60,
    topics: [
      { name: "Generic Constraints", completed: true },
      { name: "Conditional Types", completed: true },
      { name: "Mapped Types", completed: false },
      { name: "Template Literal Types", completed: false },
      { name: "Utility Types", completed: false }
    ]
  },
  {
    id: 3,
    title: "Algorithms & Data Structures",
    description: "Essential algorithms and data structures for coding interviews",
    icon: <Zap size={32} />,
    color: "#f59e0b",
    progress: 40,
    topics: [
      { name: "Array Problems", completed: true },
      { name: "String Manipulation", completed: true },
      { name: "Tree Traversal", completed: false },
      { name: "Dynamic Programming", completed: false },
      { name: "Graph Algorithms", completed: false }
    ]
  },
  {
    id: 4,
    title: "System Design",
    description: "Frontend architecture, scalability, and system design patterns",
    icon: <Users size={32} />,
    color: "#ef4444",
    progress: 30,
    topics: [
      { name: "Component Architecture", completed: true },
      { name: "State Management", completed: false },
      { name: "Performance & Caching", completed: false },
      { name: "Micro-frontends", completed: false },
      { name: "Real-time Systems", completed: false }
    ]
  }
];

export default function StudyGuidePage() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const handlePathClick = (pathId: number) => {
    setSelectedPath(selectedPath === pathId ? null : pathId);
  };

  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Study Guide</Title>
          <Description>
            Structured learning paths to help you master frontend engineering concepts
            and prepare for technical interviews at top companies.
          </Description>
        </motion.div>
      </Header>

      <StudyPath>
        {studyPaths.map((path, index) => (
          <PathCard
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => handlePathClick(path.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PathIcon color={path.color}>
              {path.icon}
            </PathIcon>
            <PathTitle>{path.title}</PathTitle>
            <PathDescription>{path.description}</PathDescription>
            
            <PathProgress>
              <ProgressBar>
                <ProgressFill progress={path.progress} />
              </ProgressBar>
              <ProgressText>{path.progress}% Complete</ProgressText>
            </PathProgress>
            
            {selectedPath === path.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TopicList>
                  {path.topics.map((topic, idx) => (
                    <TopicItem key={idx} completed={topic.completed}>
                      <CheckCircle 
                        size={16} 
                        fill={topic.completed ? 'currentColor' : 'none'} 
                      />
                      {topic.name}
                    </TopicItem>
                  ))}
                </TopicList>
              </motion.div>
            )}
          </PathCard>
        ))}
      </StudyPath>

      <TopicsGrid>
        {studyPaths.map((path) => (
          <TopicCard
            key={`detail-${path.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TopicHeader>
              <TopicTitle>{path.title} Topics</TopicTitle>
              <TopicStatus completed={path.progress > 70}>
                <Clock size={16} />
                {path.topics.length} Topics
              </TopicStatus>
            </TopicHeader>
            
            <TopicList>
              {path.topics.map((topic, idx) => (
                <TopicItem key={idx} completed={topic.completed}>
                  <CheckCircle 
                    size={16} 
                    fill={topic.completed ? 'currentColor' : 'none'} 
                  />
                  {topic.name}
                </TopicItem>
              ))}
            </TopicList>
          </TopicCard>
        ))}
      </TopicsGrid>
    </Container>
  );
}