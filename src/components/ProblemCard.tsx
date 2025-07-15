'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Clock, Star, CheckCircle, ArrowRight, Code, Tag } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  tags: string[];
  timeComplexity: string;
  spaceComplexity: string;
  solved: boolean;
  starred: boolean;
}

interface ProblemCardProps {
  problem: Problem;
  onToggleStar?: (id: number) => void;
  onToggleSolved?: (id: number) => void;
}

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  transition: all ${props => props.theme.animation.transition.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const CategoryBadge = styled.span`
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.animation.transition.fast};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    color: ${props => props.theme.colors.primary};
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagChip = styled.span`
  background: ${props => props.theme.colors.surfaceLight};
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ComplexityInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ComplexityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy': return props.theme.colors.success + '15';
      case 'Medium': return props.theme.colors.warning + '15';
      case 'Hard': return props.theme.colors.error + '15';
      default: return props.theme.colors.surfaceLight;
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Easy': return props.theme.colors.success;
      case 'Medium': return props.theme.colors.warning;
      case 'Hard': return props.theme.colors.error;
      default: return props.theme.colors.text;
    }
  }};
`;

const SolvedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.success}08;
  border: 2px solid ${props => props.theme.colors.success};
  border-radius: ${props => props.theme.borderRadius.lg};
  pointer-events: none;
`;

const CardWrapper = styled.div`
  position: relative;
`;

export default function ProblemCard({ 
  problem, 
  onToggleStar, 
  onToggleSolved 
}: ProblemCardProps) {
  const [localStarred, setLocalStarred] = useState(problem.starred);
  const [localSolved, setLocalSolved] = useState(problem.solved);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalStarred(!localStarred);
    onToggleStar?.(problem.id);
  };

  const handleSolvedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalSolved(!localSolved);
    onToggleSolved?.(problem.id);
  };

  const handleCardClick = () => {
    // Navigate to problem detail page
    window.location.href = `/problems/${problem.id}`;
  };

  return (
    <CardWrapper>
      <Card
        onClick={handleCardClick}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Header>
          <TitleSection>
            <Title>{problem.title}</Title>
            <CategoryBadge>{problem.category}</CategoryBadge>
          </TitleSection>
          
          <Actions>
            <ActionButton
              isActive={localStarred}
              onClick={handleStarClick}
              aria-label={localStarred ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star size={20} fill={localStarred ? 'currentColor' : 'none'} />
            </ActionButton>
            
            <ActionButton
              isActive={localSolved}
              onClick={handleSolvedClick}
              aria-label={localSolved ? 'Mark as unsolved' : 'Mark as solved'}
            >
              <CheckCircle size={20} fill={localSolved ? 'currentColor' : 'none'} />
            </ActionButton>
          </Actions>
        </Header>

        <Description>{problem.description}</Description>

        <TagsContainer>
          {problem.tags.map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </TagsContainer>

        <Footer>
          <ComplexityInfo>
            <ComplexityItem>
              <Clock size={14} />
              {problem.timeComplexity}
            </ComplexityItem>
            <ComplexityItem>
              <Code size={14} />
              {problem.spaceComplexity}
            </ComplexityItem>
          </ComplexityInfo>
          
          <DifficultyBadge difficulty={problem.difficulty}>
            {problem.difficulty}
          </DifficultyBadge>
        </Footer>
      </Card>
      
      {localSolved && <SolvedOverlay />}
    </CardWrapper>
  );
}