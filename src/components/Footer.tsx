'use client';

import React from 'react';
import styled from 'styled-components';
import { Github, Twitter, Linkedin, Mail, Code } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.text};
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color ${props => props.theme.animation.transition.fast};
    
    &:hover {
      color: white;
    }
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${props => props.theme.borderRadius.md};
    color: rgba(255, 255, 255, 0.7);
    transition: all ${props => props.theme.animation.transition.fast};
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color ${props => props.theme.animation.transition.fast};
    
    &:hover {
      color: white;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Brand>
              <Code size={20} />
              Frontend Interview Prep
            </Brand>
            <Description>
              Comprehensive interview preparation for frontend engineers targeting Big Tech companies.
            </Description>
            <SocialLinks>
              <a href="https://github.com" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@example.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Study Materials</h3>
            <ul>
              <li><a href="/algorithms">Algorithms</a></li>
              <li><a href="/react">React & Frontend</a></li>
              <li><a href="/system-design">System Design</a></li>
              <li><a href="/typescript">TypeScript</a></li>
              <li><a href="/performance">Performance</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Companies</h3>
            <ul>
              <li><a href="/google">Google</a></li>
              <li><a href="/meta">Meta</a></li>
              <li><a href="/amazon">Amazon</a></li>
              <li><a href="/microsoft">Microsoft</a></li>
              <li><a href="/apple">Apple</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Resources</h3>
            <ul>
              <li><a href="/interview-tips">Interview Tips</a></li>
              <li><a href="/coding-challenges">Coding Challenges</a></li>
              <li><a href="/mock-interviews">Mock Interviews</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2025 Frontend Interview Prep. All rights reserved.
          </Copyright>
          <FooterLinks>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </FooterLinks>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
}