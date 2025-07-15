'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Award, MessageCircle, Clock, Target, CheckCircle, Star, Users, BookOpen, Code, Lightbulb } from 'lucide-react';

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

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TipCard = styled(motion.div)`
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

const TipIcon = styled.div<{ color: string }>`
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

const TipTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const TipDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const CompanySection = styled.section`
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

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CompanyCard = styled(motion.div)`
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

const CompanyName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const CompanyFocus = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CompanyTips = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CompanyTip = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const interviewTips = [
  {
    id: 1,
    title: "Technical Communication",
    description: "Learn to explain complex technical concepts clearly and concisely",
    icon: <MessageCircle size={32} />,
    color: "#3b82f6",
    tips: [
      "Think out loud during problem solving",
      "Use analogies to explain complex concepts",
      "Ask clarifying questions before starting",
      "Summarize your approach before coding",
      "Explain trade-offs between different solutions"
    ]
  },
  {
    id: 2,
    title: "Time Management",
    description: "Master the art of solving problems efficiently under time pressure",
    icon: <Clock size={32} />,
    color: "#10b981",
    tips: [
      "Start with the simplest solution first",
      "Set time limits for each problem phase",
      "Practice with interview-style time constraints",
      "Learn to prioritize optimization efforts",
      "Leave time for testing and edge cases"
    ]
  },
  {
    id: 3,
    title: "Problem-Solving Approach",
    description: "Develop a systematic approach to tackle any technical challenge",
    icon: <Target size={32} />,
    color: "#f59e0b",
    tips: [
      "Understand the problem completely",
      "Identify inputs, outputs, and constraints",
      "Consider multiple approaches",
      "Start with brute force, then optimize",
      "Test with edge cases and examples"
    ]
  },
  {
    id: 4,
    title: "Code Quality",
    description: "Write clean, maintainable code that demonstrates best practices",
    icon: <Code size={32} />,
    color: "#8b5cf6",
    tips: [
      "Use meaningful variable names",
      "Write modular, reusable functions",
      "Handle errors gracefully",
      "Comment complex logic",
      "Follow consistent coding style"
    ]
  },
  {
    id: 5,
    title: "Behavioral Questions",
    description: "Prepare compelling stories that showcase your experience and skills",
    icon: <Users size={32} />,
    color: "#ef4444",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Prepare stories for common scenarios",
      "Show leadership and collaboration skills",
      "Demonstrate problem-solving abilities",
      "Highlight learning and growth mindset"
    ]
  },
  {
    id: 6,
    title: "System Design Mindset",
    description: "Approach system design with scalability and trade-offs in mind",
    icon: <Lightbulb size={32} />,
    color: "#06b6d4",
    tips: [
      "Start with requirements gathering",
      "Design for scale from the beginning",
      "Consider trade-offs explicitly",
      "Think about failure scenarios",
      "Discuss monitoring and metrics"
    ]
  }
];

const companyTips = [
  {
    name: "Google",
    focus: "Focus: Algorithms, System Design, Googleyness",
    tips: [
      "Emphasize scalability and efficiency",
      "Demonstrate analytical thinking",
      "Show curiosity and continuous learning",
      "Discuss impact and user focus"
    ]
  },
  {
    name: "Meta",
    focus: "Focus: React, GraphQL, Move Fast Philosophy",
    tips: [
      "Show ability to move fast and iterate",
      "Demonstrate React ecosystem expertise",
      "Discuss user-centric solutions",
      "Emphasize collaboration and impact"
    ]
  },
  {
    name: "Amazon",
    focus: "Focus: Leadership Principles, Scale, Customer Obsession",
    tips: [
      "Prepare stories for leadership principles",
      "Show customer obsession",
      "Demonstrate bias for action",
      "Discuss scalability and cost optimization"
    ]
  },
  {
    name: "Microsoft",
    focus: "Focus: TypeScript, Cloud, Inclusive Design",
    tips: [
      "Show TypeScript expertise",
      "Demonstrate growth mindset",
      "Discuss accessibility and inclusion",
      "Emphasize collaboration across teams"
    ]
  },
  {
    name: "Apple",
    focus: "Focus: User Experience, Performance, Privacy",
    tips: [
      "Emphasize user experience and design",
      "Show attention to detail",
      "Discuss performance optimization",
      "Demonstrate privacy-first thinking"
    ]
  },
  {
    name: "Netflix",
    focus: "Focus: Performance, A/B Testing, Culture",
    tips: [
      "Show performance optimization skills",
      "Demonstrate data-driven decisions",
      "Discuss experimentation and testing",
      "Emphasize freedom and responsibility"
    ]
  }
];

export default function InterviewTipsPage() {
  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Interview Tips</Title>
          <Description>
            Master the art of technical interviews with proven strategies and 
            company-specific insights from successful candidates.
          </Description>
        </motion.div>
      </Header>

      <TipsGrid>
        {interviewTips.map((tip, index) => (
          <TipCard
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TipIcon color={tip.color}>
              {tip.icon}
            </TipIcon>
            <TipTitle>{tip.title}</TipTitle>
            <TipDescription>{tip.description}</TipDescription>
            
            <TipsList>
              {tip.tips.map((tipItem, idx) => (
                <TipItem key={idx}>
                  <CheckCircle size={16} style={{ minWidth: '16px', marginTop: '2px' }} />
                  {tipItem}
                </TipItem>
              ))}
            </TipsList>
          </TipCard>
        ))}
      </TipsGrid>

      <CompanySection>
        <SectionTitle>Company-Specific Tips</SectionTitle>
        <SectionDescription>
          Tailor your preparation to specific companies and their unique interview styles
        </SectionDescription>
        
        <CompanyGrid>
          {companyTips.map((company, index) => (
            <CompanyCard
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CompanyName>{company.name}</CompanyName>
              <CompanyFocus>{company.focus}</CompanyFocus>
              
              <CompanyTips>
                {company.tips.map((tip, idx) => (
                  <CompanyTip key={idx}>
                    <Star size={16} style={{ minWidth: '16px', marginTop: '2px' }} />
                    {tip}
                  </CompanyTip>
                ))}
              </CompanyTips>
            </CompanyCard>
          ))}
        </CompanyGrid>
      </CompanySection>
    </Container>
  );
}