'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Users, Database, Globe, Zap, Shield, Monitor, ArrowRight, CheckCircle } from 'lucide-react';

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

const ConceptsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ConceptCard = styled(motion.div)`
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

const ConceptIcon = styled.div<{ color: string }>`
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

const ConceptTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ConceptDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ConceptTopics = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ConceptTopic = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const CaseStudiesSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const CaseStudyCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CaseStudyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const CaseStudyDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const Requirement = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner': return props.theme.colors.success + '15';
      case 'Intermediate': return props.theme.colors.warning + '15';
      case 'Advanced': return props.theme.colors.error + '15';
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

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const systemDesignConcepts = [
  {
    id: 1,
    title: "Component Architecture",
    description: "Design scalable component systems with proper separation of concerns",
    icon: <Users size={32} />,
    color: "#3b82f6",
    topics: [
      "Component composition patterns",
      "Props vs context decisions",
      "Reusable component libraries",
      "Design system architecture"
    ]
  },
  {
    id: 2,
    title: "State Management",
    description: "Choose and implement the right state management solution",
    icon: <Database size={32} />,
    color: "#10b981",
    topics: [
      "Client vs server state",
      "Redux vs Zustand vs Context",
      "Optimistic updates",
      "State synchronization"
    ]
  },
  {
    id: 3,
    title: "Performance & Caching",
    description: "Optimize application performance and implement caching strategies",
    icon: <Zap size={32} />,
    color: "#f59e0b",
    topics: [
      "Bundle optimization",
      "Lazy loading strategies",
      "Browser caching",
      "CDN configuration"
    ]
  },
  {
    id: 4,
    title: "API Design",
    description: "Design robust APIs and handle data fetching efficiently",
    icon: <Globe size={32} />,
    color: "#8b5cf6",
    topics: [
      "REST vs GraphQL",
      "API versioning",
      "Error handling",
      "Rate limiting"
    ]
  },
  {
    id: 5,
    title: "Security",
    description: "Implement security best practices for web applications",
    icon: <Shield size={32} />,
    color: "#ef4444",
    topics: [
      "Authentication flows",
      "XSS prevention",
      "CSRF protection",
      "Content Security Policy"
    ]
  },
  {
    id: 6,
    title: "Monitoring & Analytics",
    description: "Monitor application performance and user behavior",
    icon: <Monitor size={32} />,
    color: "#06b6d4",
    topics: [
      "Error tracking",
      "Performance monitoring",
      "User analytics",
      "A/B testing"
    ]
  }
];

const caseStudies = [
  {
    id: 1,
    title: "Design a Social Media Feed",
    description: "Build a scalable, real-time social media feed like Twitter or Instagram",
    difficulty: "Advanced",
    requirements: [
      "Real-time updates",
      "Infinite scrolling",
      "Image/video support",
      "Like/comment system",
      "Content moderation"
    ]
  },
  {
    id: 2,
    title: "Build a Chat Application",
    description: "Create a real-time messaging system with multiple chat rooms",
    difficulty: "Advanced",
    requirements: [
      "WebSocket connections",
      "Message persistence",
      "User presence",
      "File sharing",
      "Message search"
    ]
  },
  {
    id: 3,
    title: "Design a Video Player",
    description: "Implement a custom video player with advanced features",
    difficulty: "Intermediate",
    requirements: [
      "Adaptive streaming",
      "Playback controls",
      "Subtitles support",
      "Analytics tracking",
      "Offline playback"
    ]
  },
  {
    id: 4,
    title: "Create a Dashboard",
    description: "Build an analytics dashboard with real-time data visualization",
    difficulty: "Intermediate",
    requirements: [
      "Real-time charts",
      "Data filtering",
      "Export functionality",
      "Responsive design",
      "User permissions"
    ]
  },
  {
    id: 5,
    title: "Build a Text Editor",
    description: "Design a collaborative rich text editor like Google Docs",
    difficulty: "Advanced",
    requirements: [
      "Real-time collaboration",
      "Rich formatting",
      "Version history",
      "Comments system",
      "Export to PDF"
    ]
  },
  {
    id: 6,
    title: "Design a Search System",
    description: "Implement a fast, autocomplete search with filters",
    difficulty: "Beginner",
    requirements: [
      "Autocomplete suggestions",
      "Search filters",
      "Result ranking",
      "Search history",
      "Fuzzy matching"
    ]
  }
];

export default function SystemDesignPage() {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>System Design</Title>
          <Description>
            Learn to design scalable frontend systems and architecture patterns
            for modern web applications.
          </Description>
        </motion.div>
      </Header>

      <ConceptsGrid>
        {systemDesignConcepts.map((concept, index) => (
          <ConceptCard
            key={concept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => setSelectedConcept(concept.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ConceptIcon color={concept.color}>
              {concept.icon}
            </ConceptIcon>
            <ConceptTitle>{concept.title}</ConceptTitle>
            <ConceptDescription>{concept.description}</ConceptDescription>
            
            <ConceptTopics>
              {concept.topics.map((topic, idx) => (
                <ConceptTopic key={idx}>
                  <CheckCircle size={16} />
                  {topic}
                </ConceptTopic>
              ))}
            </ConceptTopics>
          </ConceptCard>
        ))}
      </ConceptsGrid>

      <CaseStudiesSection>
        <SectionTitle>Case Studies</SectionTitle>
        <SectionDescription>
          Practice with real-world system design problems commonly asked in interviews
        </SectionDescription>
        
        <CaseStudiesGrid>
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <CaseStudyTitle>{study.title}</CaseStudyTitle>
                <DifficultyBadge difficulty={study.difficulty}>
                  {study.difficulty}
                </DifficultyBadge>
              </div>
              
              <CaseStudyDescription>{study.description}</CaseStudyDescription>
              
              <RequirementsList>
                {study.requirements.map((req, idx) => (
                  <Requirement key={idx}>
                    <CheckCircle size={16} />
                    {req}
                  </Requirement>
                ))}
              </RequirementsList>
              
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Design
                <ArrowRight size={16} />
              </ActionButton>
            </CaseStudyCard>
          ))}
        </CaseStudiesGrid>
      </CaseStudiesSection>
    </Container>
  );
}