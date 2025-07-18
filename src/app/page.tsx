'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BookOpen, FolderOpen, FileText, Search, Clock, Hash, ExternalLink } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

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
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  margin-bottom: 3rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => (props.active ? '#3b82f6' : '#e2e8f0')};
  background: ${props => (props.active ? '#3b82f6' : 'transparent')};
  color: ${props => (props.active ? 'white' : '#64748b')};
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3b82f6;
    background: ${props => (props.active ? '#2563eb' : '#f1f5f9')};
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #3b82f6;
  }
`;

const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #3b82f615;
  border-radius: 0.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const CategoryDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const CategoryCount = styled.span`
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CategoryUpdate = styled.span`
  color: #64748b;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const FilesList = styled.div`
  margin-top: 2rem;
`;

const FilesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FileItem = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
    transform: translateX(4px);
  }
`;

const FileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FileIcon = styled.div`
  color: #3b82f6;
`;

const FileName = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

const FilePath = styled.span`
  color: #64748b;
  font-size: 0.8rem;
`;

const FileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  font-size: 0.8rem;
`;

const MainCategories = [
  {
    name: 'frontend',
    title: 'Frontend Development',
    description: 'React, TypeScript, HTML/CSS, and modern web technologies',
    files: 150,
  },
  {
    name: 'leetcode',
    title: 'Algorithm Problems',
    description: 'LeetCode problems organized by topic with TypeScript solutions',
    files: 200,
  },
  {
    name: 'system-design',
    title: 'System Design',
    description: 'Frontend architecture patterns and scalable system design',
    files: 30,
  },
  {
    name: 'interview-tips',
    title: 'Interview Strategy',
    description: 'Behavioral questions, negotiation, and interview preparation',
    files: 25,
  },
  {
    name: 'performance',
    title: 'Performance Optimization',
    description: 'Core Web Vitals, optimization techniques, and best practices',
    files: 20,
  },
  {
    name: 'security',
    title: 'Web Security',
    description: 'XSS, CSRF, authentication, and security best practices',
    files: 15,
  },
];

const SampleFiles = [
  {
    title: 'Complete Frontend Interview Guide',
    path: 'README.md',
    category: 'root',
    lastModified: '2024-12-15',
  },
  {
    title: 'JavaScript Fundamentals',
    path: 'frontend/javascript/fundamentals.md',
    category: 'frontend',
    lastModified: '2024-12-14',
  },
  {
    title: 'React Core Concepts',
    path: 'frontend/react/core.md',
    category: 'frontend',
    lastModified: '2024-12-13',
  },
  {
    title: 'Two Sum Problem',
    path: 'leetcode/array/problems/04-two-sum.md',
    category: 'leetcode',
    lastModified: '2024-12-12',
  },
  {
    title: 'Frontend System Design Framework',
    path: 'frontend/system-design/frontend-system-design-interview-framework.md',
    category: 'system-design',
    lastModified: '2024-12-11',
  },
];

export default function DocumentationHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFiles = SampleFiles.filter(file => {
    const matchesSearch =
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.path.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const homeContent = (
    <>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>📚 Frontend Interview Documentation</Title>
          <Description>
            Comprehensive frontend interview preparation documentation with 634 markdown files
            covering algorithms, React, system design, and everything you need to ace your next Big
            Tech interview.
          </Description>
        </motion.div>
      </Header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <StatsContainer>
          <Stat>
            <StatNumber>634</StatNumber>
            <StatLabel>Total Files</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>25+</StatNumber>
            <StatLabel>Categories</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Problems</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>2025</StatNumber>
            <StatLabel>Updated</StatLabel>
          </Stat>
        </StatsContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SearchContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <FiltersContainer>
          <FilterButton
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </FilterButton>
          {MainCategories.map(category => (
            <FilterButton
              key={category.name}
              active={selectedCategory === category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.title}
            </FilterButton>
          ))}
        </FiltersContainer>
      </motion.div>

      <CategoriesGrid>
        {MainCategories.map((category, index) => (
          <CategoryCard
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            onClick={() => window.open(`/interview/docs/${category.name}/README`, '_blank')}
          >
            <CategoryIcon>
              <FolderOpen size={24} />
            </CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            <CategoryDescription>{category.description}</CategoryDescription>
            <CategoryStats>
              <CategoryCount>{category.files} files</CategoryCount>
              <CategoryUpdate>
                <Clock size={14} />
                Updated recently
              </CategoryUpdate>
            </CategoryStats>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      <FilesList>
        <FilesTitle>
          {searchTerm ? `Search Results (${filteredFiles.length})` : 'Recent Files'}
        </FilesTitle>
        {filteredFiles.map((file, index) => (
          <FileItem
            key={file.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() =>
              window.open(`/interview/docs/${file.path.replace(/\.md$/, '')}`, '_blank')
            }
          >
            <FileHeader>
              <FileInfo>
                <FileIcon>
                  <FileText size={16} />
                </FileIcon>
                <div>
                  <FileName>{file.title}</FileName>
                  <br />
                  <FilePath>{file.path}</FilePath>
                </div>
              </FileInfo>
              <FileMeta>
                <span>{file.category}</span>
                <span>•</span>
                <span>{new Date(file.lastModified).toLocaleDateString()}</span>
                <ExternalLink size={14} />
              </FileMeta>
            </FileHeader>
          </FileItem>
        ))}
      </FilesList>

      {filteredFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}
        >
          <FileText size={48} style={{ marginBottom: '1rem' }} />
          <h3>No files found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </motion.div>
      )}
    </>
  );

  return (
    <MainLayout>
      <Container>{homeContent}</Container>
    </MainLayout>
  );
}
