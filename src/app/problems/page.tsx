'use client';

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Code, Clock, Star, ArrowRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ProblemCard from '@/components/ProblemCard';
import FilterTabs from '@/components/FilterTabs';

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
  margin: 0 auto 2rem;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchSection = styled.div`
  flex: 1;
`;

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const LoadMoreButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.textSecondary};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
`;

// Mock data for problems
const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: "Given an array of integers and a target, return indices of two numbers that add up to target.",
    tags: ["Array", "Hash Table"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    solved: true,
    starred: false
  },
  {
    id: 2,
    title: "Virtual Scrolling Implementation",
    difficulty: "Medium",
    category: "Frontend",
    description: "Implement a virtual scrolling component for handling large datasets efficiently.",
    tags: ["React", "Performance", "DOM"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    solved: false,
    starred: true
  },
  {
    id: 3,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: "Find the length of the longest strictly increasing subsequence.",
    tags: ["DP", "Binary Search"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    solved: true,
    starred: false
  },
  {
    id: 4,
    title: "Design Component Library",
    difficulty: "Hard",
    category: "System Design",
    description: "Design a scalable component library architecture for a large organization.",
    tags: ["Architecture", "React", "TypeScript"],
    timeComplexity: "N/A",
    spaceComplexity: "N/A",
    solved: false,
    starred: true
  },
  {
    id: 5,
    title: "Implement Debounce Hook",
    difficulty: "Easy",
    category: "React",
    description: "Create a custom React hook for debouncing user input.",
    tags: ["React", "Hooks", "Performance"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    solved: true,
    starred: false
  },
  {
    id: 6,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Tree",
    description: "Find the maximum path sum in a binary tree.",
    tags: ["Tree", "DFS", "Recursion"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    solved: false,
    starred: false
  }
];

const categories = [
  { name: "All", count: 1000 },
  { name: "Array", count: 200 },
  { name: "String", count: 150 },
  { name: "Tree", count: 100 },
  { name: "Frontend", count: 200 },
  { name: "React", count: 150 },
  { name: "System Design", count: 100 },
  { name: "Dynamic Programming", count: 80 }
];

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [showOnlySolved, setShowOnlySolved] = useState(false);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [visibleProblems, setVisibleProblems] = useState(6);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || problem.category === activeCategory;
      const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
      const matchesSolved = !showOnlySolved || problem.solved;
      const matchesStarred = !showOnlyStarred || problem.starred;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesSolved && matchesStarred;
    });
  }, [searchQuery, activeCategory, difficultyFilter, showOnlySolved, showOnlyStarred]);

  const stats = [
    { number: mockProblems.length.toString(), label: "Total Problems" },
    { number: mockProblems.filter(p => p.solved).length.toString(), label: "Solved" },
    { number: mockProblems.filter(p => p.starred).length.toString(), label: "Starred" },
    { number: categories.length.toString(), label: "Categories" }
  ];

  const loadMoreProblems = () => {
    setVisibleProblems(prev => Math.min(prev + 6, filteredProblems.length));
  };

  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Coding Problems</Title>
          <Description>
            Practice with 1000+ carefully curated problems designed for frontend engineering interviews
            at top tech companies.
          </Description>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatsBar>
            {stats.map((stat, index) => (
              <Stat key={stat.label}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </Stat>
            ))}
          </StatsBar>
        </motion.div>
      </Header>

      <FiltersSection>
        <SearchSection>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search problems, tags, or descriptions..."
          />
        </SearchSection>
        
        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          showOnlySolved={showOnlySolved}
          onSolvedChange={setShowOnlySolved}
          showOnlyStarred={showOnlyStarred}
          onStarredChange={setShowOnlyStarred}
        />
      </FiltersSection>

      <AnimatePresence mode="wait">
        {filteredProblems.length > 0 ? (
          <motion.div
            key="problems-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProblemsGrid>
              {filteredProblems.slice(0, visibleProblems).map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProblemCard problem={problem} />
                </motion.div>
              ))}
            </ProblemsGrid>
            
            {visibleProblems < filteredProblems.length && (
              <LoadMoreButton
                onClick={loadMoreProblems}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Problems
                <ArrowRight size={20} />
              </LoadMoreButton>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState>
              <h3>No problems found</h3>
              <p>Try adjusting your search criteria or filters to find more problems.</p>
            </EmptyState>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}