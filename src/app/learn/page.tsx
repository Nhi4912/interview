'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Filter,
  Search,
  ArrowRight,
  BarChart3,
  Brain,
  Zap,
  Award
} from 'lucide-react';
import InteractiveKnowledgeGraph from '@/components/visualizations/InteractiveKnowledgeGraph';
import { knowledgeGraph, KnowledgeNode, KnowledgeCategory } from '@/data/knowledgeGraph';
import { companies, Company } from '@/data/companies';
import { getAllTopics, getTopicsByCategory } from '@/lib/content';
import Link from 'next/link';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.surfaceLight};
    transform: translateY(-2px);
  }
`;

const ContentArea = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  min-height: 600px;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const StatIcon = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const TopicCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TopicTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TopicMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CompanyCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CompanyName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CompanyDifficulty = styled.span<{ difficulty: string }>`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy': return props.theme.colors.success + '20';
      case 'Medium': return props.theme.colors.warning + '20';
      case 'Hard': return props.theme.colors.error + '20';
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

const LearningPathCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const PathStep = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${props => props.completed ? props.theme.colors.success + '10' : props.theme.colors.background};
  border: 1px solid ${props => props.completed ? props.theme.colors.success : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.completed ? props.theme.colors.success + '20' : props.theme.colors.surfaceLight};
  }
`;

const PathStepNumber = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${props => props.completed ? props.theme.colors.success : props.theme.colors.border};
  color: ${props => props.completed ? 'white' : props.theme.colors.textSecondary};
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PathStepContent = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

type TabType = 'overview' | 'knowledge-graph' | 'companies' | 'learning-paths' | 'topics';

const stats = [
  {
    icon: <BookOpen size={24} />,
    number: '50+',
    label: 'Knowledge Topics',
    color: '#3b82f6'
  },
  {
    icon: <Code size={24} />,
    number: '1000+',
    label: 'Code Examples',
    color: '#10b981'
  },
  {
    icon: <Target size={24} />,
    number: '500+',
    label: 'Practice Problems',
    color: '#f59e0b'
  },
  {
    icon: <Users size={24} />,
    number: '6',
    label: 'Top Companies',
    color: '#ef4444'
  }
];

const learningPaths = [
  {
    id: 'beginner',
    title: 'Frontend Fundamentals',
    description: 'Start with JavaScript basics and work your way up to modern frameworks',
    duration: '4-6 weeks',
    difficulty: 'Beginner',
    steps: [
      { id: 'js-basics', title: 'JavaScript Fundamentals', description: 'Variables, functions, and basic concepts', completed: true },
      { id: 'dom', title: 'DOM Manipulation', description: 'Selecting and modifying elements', completed: true },
      { id: 'events', title: 'Event Handling', description: 'User interactions and event listeners', completed: false },
      { id: 'async', title: 'Async JavaScript', description: 'Promises, async/await, and callbacks', completed: false },
      { id: 'es6', title: 'Modern JavaScript', description: 'ES6+ features and syntax', completed: false }
    ]
  },
  {
    id: 'intermediate',
    title: 'React Mastery',
    description: 'Deep dive into React patterns and advanced concepts',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    steps: [
      { id: 'react-basics', title: 'React Fundamentals', description: 'Components, props, and state', completed: true },
      { id: 'hooks', title: 'React Hooks', description: 'useState, useEffect, and custom hooks', completed: false },
      { id: 'context', title: 'Context API', description: 'State management with Context', completed: false },
      { id: 'performance', title: 'Performance Optimization', description: 'Memoization and re-render optimization', completed: false },
      { id: 'testing', title: 'Testing React', description: 'Jest, RTL, and testing best practices', completed: false }
    ]
  },
  {
    id: 'advanced',
    title: 'System Design & Architecture',
    description: 'Learn to design scalable frontend systems',
    duration: '8-10 weeks',
    difficulty: 'Advanced',
    steps: [
      { id: 'architecture', title: 'Frontend Architecture', description: 'Design patterns and project structure', completed: false },
      { id: 'scalability', title: 'Scalability Patterns', description: 'Handling large applications', completed: false },
      { id: 'performance', title: 'Performance at Scale', description: 'Optimization for large systems', completed: false },
      { id: 'deployment', title: 'Deployment & CI/CD', description: 'Production deployment strategies', completed: false },
      { id: 'monitoring', title: 'Monitoring & Analytics', description: 'Error tracking and performance monitoring', completed: false }
    ]
  }
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeNode | null>(null);

  const topTopics = knowledgeGraph
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5);

  const topCompanies = companies
    .sort((a, b) => a.difficulty === 'Hard' ? -1 : 1)
    .slice(0, 6);

  const allTopics = getAllTopics();
  const topicsByCategory = getTopicsByCategory();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StatIcon color={stat.color}>
                    {stat.icon}
                  </StatIcon>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>
            
            <DashboardGrid>
              <MainContent>
                <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Learning Paths</h2>
                {learningPaths.map((path) => (
                  <LearningPathCard key={path.id}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3>{path.title}</h3>
                      <CompanyDifficulty difficulty={path.difficulty}>
                        {path.difficulty}
                      </CompanyDifficulty>
                    </div>
                    <p>{path.description}</p>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                      <Clock size={16} style={{ marginRight: '0.5rem' }} />
                      {path.duration}
                    </div>
                    <div>
                      {path.steps.map((step, index) => (
                        <PathStep key={step.id} completed={step.completed}>
                          <PathStepNumber completed={step.completed}>
                            {step.completed ? '✓' : index + 1}
                          </PathStepNumber>
                          <PathStepContent>
                            <h4>{step.title}</h4>
                            <p>{step.description}</p>
                          </PathStepContent>
                        </PathStep>
                      ))}
                    </div>
                  </LearningPathCard>
                ))}
              </MainContent>
              
              <Sidebar>
                <SidebarCard>
                  <SidebarTitle>Top Topics</SidebarTitle>
                  {topTopics.map((topic) => (
                    <TopicCard key={topic.id} onClick={() => setSelectedTopic(topic)}>
                      <TopicTitle>{topic.title}</TopicTitle>
                      <TopicMeta>
                        <span>{topic.difficulty}</span>
                        <span>
                          <Star size={12} style={{ marginRight: '0.25rem' }} />
                          {topic.importance}/10
                        </span>
                      </TopicMeta>
                    </TopicCard>
                  ))}
                </SidebarCard>
                
                <SidebarCard>
                  <SidebarTitle>Target Companies</SidebarTitle>
                  {topCompanies.map((company) => (
                    <CompanyCard key={company.id} onClick={() => setSelectedCompany(company)}>
                      <CompanyName>{company.name}</CompanyName>
                      <CompanyDifficulty difficulty={company.difficulty}>
                        {company.difficulty}
                      </CompanyDifficulty>
                    </CompanyCard>
                  ))}
                </SidebarCard>
              </Sidebar>
            </DashboardGrid>
          </div>
        );
      
      case 'knowledge-graph':
        return <InteractiveKnowledgeGraph />;
      
      case 'companies':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Company Preparation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {companies.map((company) => (
                <div
                  key={company.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedCompany(company)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#1f2937' }}>{company.name}</h3>
                    <CompanyDifficulty difficulty={company.difficulty}>
                      {company.difficulty}
                    </CompanyDifficulty>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                    {company.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    <Clock size={14} style={{ marginRight: '0.5rem' }} />
                    {company.preparationTime} weeks preparation
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'learning-paths':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Structured Learning Paths</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {learningPaths.map((path) => (
                <LearningPathCard key={path.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3>{path.title}</h3>
                    <CompanyDifficulty difficulty={path.difficulty}>
                      {path.difficulty}
                    </CompanyDifficulty>
                  </div>
                  <p>{path.description}</p>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                    <Clock size={16} style={{ marginRight: '0.5rem' }} />
                    {path.duration}
                  </div>
                  <div>
                    {path.steps.map((step, index) => (
                      <PathStep key={step.id} completed={step.completed}>
                        <PathStepNumber completed={step.completed}>
                          {step.completed ? '✓' : index + 1}
                        </PathStepNumber>
                        <PathStepContent>
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </PathStepContent>
                      </PathStep>
                    ))}
                  </div>
                </LearningPathCard>
              ))}
            </div>
          </div>
        );
      
      case 'topics':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>All Learning Topics</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {Object.entries(topicsByCategory).map(([category, topics]) => (
                <div key={category}>
                  <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.25rem' }}>{category}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {topics.map((topicSlug) => (
                      <Link key={topicSlug} href={`/learn/${topicSlug}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          padding: '1.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%'
                        }}>
                          <h4 style={{ 
                            margin: '0 0 0.5rem 0', 
                            color: '#1f2937',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {topicSlug.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </h4>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            color: '#64748b',
                            fontSize: '0.875rem'
                          }}>
                            <ArrowRight size={16} />
                            Start Learning
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>Interactive Learning Platform</Title>
          <Subtitle>
            Master frontend development with our comprehensive learning platform designed for Big Tech interviews
          </Subtitle>
        </Header>
        
        <TabContainer>
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={20} />
            Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'knowledge-graph'} 
            onClick={() => setActiveTab('knowledge-graph')}
          >
            <Brain size={20} />
            Knowledge Graph
          </TabButton>
          <TabButton 
            active={activeTab === 'companies'} 
            onClick={() => setActiveTab('companies')}
          >
            <Users size={20} />
            Companies
          </TabButton>
          <TabButton 
            active={activeTab === 'learning-paths'} 
            onClick={() => setActiveTab('learning-paths')}
          >
            <Target size={20} />
            Learning Paths
          </TabButton>
          <TabButton 
            active={activeTab === 'topics'} 
            onClick={() => setActiveTab('topics')}
          >
            <BookOpen size={20} />
            All Topics
          </TabButton>
        </TabContainer>
        
        <ContentArea>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </ContentArea>
      </Container>
    </PageContainer>
  );
}