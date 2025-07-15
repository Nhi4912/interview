'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Award, ArrowRight, Github, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const SectionDescription = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CompaniesSection = styled.section`
  padding: 3rem 0;
  background: ${props => props.theme.colors.background};
`;

const CompaniesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const CompaniesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CompaniesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const CompanyLogo = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.surfaceLight};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const features = [
  {
    icon: <Code size={32} />,
    title: "1000+ Coding Problems",
    description: "Comprehensive collection of algorithm problems with TypeScript solutions and frontend applications",
    color: "#3b82f6"
  },
  {
    icon: <BookOpen size={32} />,
    title: "Modern Tech Stack",
    description: "React 18+, Next.js 13+, TypeScript, and advanced patterns essential for 2025 interviews",
    color: "#10b981"
  },
  {
    icon: <Users size={32} />,
    title: "System Design",
    description: "Frontend architecture patterns and scalable system design for senior engineer roles",
    color: "#f59e0b"
  },
  {
    icon: <Award size={32} />,
    title: "Big Tech Focus",
    description: "Tailored preparation for Google, Meta, Amazon, Microsoft, Apple, and Netflix interviews",
    color: "#ef4444"
  }
];

const companies = [
  "Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix", "Spotify", "Airbnb"
];

const stats = [
  { number: "1000+", label: "Problems Solved" },
  { number: "50+", label: "Topics Covered" },
  { number: "15+", label: "Coding Challenges" },
  { number: "100%", label: "TypeScript Coverage" }
];

export default function HomePage() {
  return (
    <Container>
      <Hero />
      
      <FeaturesSection>
        <FeaturesContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Everything You Need to Succeed</SectionTitle>
            <SectionDescription>
              Comprehensive preparation materials designed for mid-level to senior frontend engineers
              targeting Big Tech companies in 2025.
            </SectionDescription>
          </motion.div>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection stats={stats} />

      <CompaniesSection>
        <CompaniesContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CompaniesTitle>Trusted by Engineers at Top Companies</CompaniesTitle>
            <CompaniesGrid>
              {companies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CompanyLogo>{company}</CompanyLogo>
                </motion.div>
              ))}
            </CompaniesGrid>
          </motion.div>
        </CompaniesContainer>
      </CompaniesSection>

      <CTASection />
    </Container>
  );
}