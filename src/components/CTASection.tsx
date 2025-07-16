'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const Section = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.animation.transition.normal};
  
  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Feature = styled(motion.div)`
  text-align: left;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  backdrop-filter: blur(10px);
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 0;
`;

const features = [
  {
    title: "Complete Preparation",
    description: "Everything you need from algorithms to system design in one comprehensive guide."
  },
  {
    title: "2025 Ready",
    description: "Updated with the latest React 18+, TypeScript, and modern web development practices."
  },
  {
    title: "Big Tech Focused",
    description: "Specifically designed for interviews at Google, Meta, Amazon, Microsoft, and Apple."
  }
];

export default function CTASection() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title>Ready to Land Your Dream Job?</Title>
          <Description>
            Join thousands of engineers who have successfully prepared for Big Tech interviews
            with our comprehensive guide. Start your journey today.
          </Description>
          
          <ButtonGroup>
            <Link href="/learn">
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <ArrowRight size={20} />
              </PrimaryButton>
            </Link>
            
            <a href="https://github.com/nhi4912/interview" target="_blank" rel="noopener noreferrer">
              <SecondaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View on GitHub
              </SecondaryButton>
            </a>
          </ButtonGroup>
        </motion.div>
        
        <Features>
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </Feature>
          ))}
        </Features>
      </Container>
    </Section>
  );
}