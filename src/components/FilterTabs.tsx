'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Filter, Star, CheckCircle } from 'lucide-react';

interface Category {
  name: string;
  count: number;
}

interface FilterTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (difficulty: string) => void;
  showOnlySolved: boolean;
  onSolvedChange: (show: boolean) => void;
  showOnlyStarred: boolean;
  onStarredChange: (show: boolean) => void;
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${props => props.theme.colors.surface};
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  min-width: 80px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
`;

const Tab = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.fast};
  white-space: nowrap;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.isActive ? props.theme.colors.primaryDark : props.theme.colors.surfaceLight};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const Count = styled.span`
  background: ${props => props.theme.colors.surfaceLight};
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.125rem 0.375rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const ToggleButton = styled(motion.button)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.isActive ? props.theme.colors.primaryDark : props.theme.colors.surfaceLight};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const difficulties = [
  { name: 'All', count: 1000 },
  { name: 'Easy', count: 400 },
  { name: 'Medium', count: 500 },
  { name: 'Hard', count: 100 }
];

export default function FilterTabs({
  categories,
  activeCategory,
  onCategoryChange,
  difficultyFilter,
  onDifficultyChange,
  showOnlySolved,
  onSolvedChange,
  showOnlyStarred,
  onStarredChange
}: FilterTabsProps) {
  return (
    <FilterContainer>
      <FilterRow>
        <FilterLabel>
          <Filter size={16} />
          Category
        </FilterLabel>
        <TabsContainer>
          {categories.map((category) => (
            <Tab
              key={category.name}
              isActive={activeCategory === category.name}
              onClick={() => onCategoryChange(category.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
              <Count>{category.count}</Count>
            </Tab>
          ))}
        </TabsContainer>
      </FilterRow>
      
      <FilterRow>
        <FilterLabel>
          Difficulty
        </FilterLabel>
        <TabsContainer>
          {difficulties.map((difficulty) => (
            <Tab
              key={difficulty.name}
              isActive={difficultyFilter === difficulty.name}
              onClick={() => onDifficultyChange(difficulty.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {difficulty.name}
              <Count>{difficulty.count}</Count>
            </Tab>
          ))}
        </TabsContainer>
      </FilterRow>
      
      <FilterRow>
        <FilterLabel>
          Options
        </FilterLabel>
        <TabsContainer>
          <ToggleButton
            isActive={showOnlySolved}
            onClick={() => onSolvedChange(!showOnlySolved)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CheckCircle size={16} />
            Solved Only
          </ToggleButton>
          
          <ToggleButton
            isActive={showOnlyStarred}
            onClick={() => onStarredChange(!showOnlyStarred)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Star size={16} />
            Starred Only
          </ToggleButton>
        </TabsContainer>
      </FilterRow>
    </FilterContainer>
  );
}