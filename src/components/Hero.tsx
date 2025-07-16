'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Github, Star } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  background: ${props => props.theme.colors.gradient.background};
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Highlight = styled.span`
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${props => props.theme.colors.text};
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const Stat = styled.div`
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const CodeBlock = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.xl};
  font-family: ${props => props.theme.typography.fontFamily.code};
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const CodeLine = styled.div`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CodeComment = styled.span`
  color: ${props => props.theme.colors.textMuted};
`;

const CodeKeyword = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const CodeString = styled.span`
  color: ${props => props.theme.colors.secondary};
`;

const CodeFunction = styled.span`
  color: ${props => props.theme.colors.accent};
`;

const backgroundVariants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Hero() {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge>
                <Star size={16} fill="currentColor" />
                2025 Edition
              </Badge>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <HeroTitle>
                Master <Highlight>Frontend</Highlight> Interviews at Big Tech
              </HeroTitle>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <HeroDescription>
                Comprehensive preparation guide with 1000+ problems, modern React patterns, 
                system design, and everything you need to land your dream job at Google, Meta, 
                Amazon, and other top companies.
              </HeroDescription>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ButtonGroup>
                <Link href="/learn">
                  <PrimaryButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Learning
                    <ArrowRight size={20} />
                  </PrimaryButton>
                </Link>
                
                <Link href="/problems">
                  <SecondaryButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={20} />
                    Browse Problems
                  </SecondaryButton>
                </Link>
              </ButtonGroup>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Stats>
                <Stat>
                  <StatNumber>1000+</StatNumber>
                  <StatLabel>Problems</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>50+</StatNumber>
                  <StatLabel>Topics</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>15+</StatNumber>
                  <StatLabel>Challenges</StatLabel>
                </Stat>
              </Stats>
            </motion.div>
          </motion.div>
        </HeroContent>
        
        <HeroVisual>
          <CodeBlock
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CodeLine>
              <CodeComment>// React 18+ concurrent features</CodeComment>
            </CodeLine>
            <CodeLine>
              <CodeKeyword>const</CodeKeyword> [isPending, startTransition] = 
            </CodeLine>
            <CodeLine>
              &nbsp;&nbsp;<CodeFunction>useTransition</CodeFunction>();
            </CodeLine>
            <CodeLine></CodeLine>
            <CodeLine>
              <CodeKeyword>const</CodeKeyword> <CodeFunction>handleSearch</CodeFunction> = (query) => {`{`}
            </CodeLine>
            <CodeLine>
              &nbsp;&nbsp;<CodeFunction>setQuery</CodeFunction>(query);
            </CodeLine>
            <CodeLine>
              &nbsp;&nbsp;<CodeFunction>startTransition</CodeFunction>(() => {`{`}
            </CodeLine>
            <CodeLine>
              &nbsp;&nbsp;&nbsp;&nbsp;<CodeFunction>setResults</CodeFunction>(<CodeFunction>search</CodeFunction>(query));
            </CodeLine>
            <CodeLine>
              &nbsp;&nbsp;{`}`});
            </CodeLine>
            <CodeLine>
              {`}`};
            </CodeLine>
          </CodeBlock>
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
}