'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Search, BookOpen, Code, Users, Award, Brain, Activity, Eye, Zap } from 'lucide-react';

const Nav = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndex.sticky};
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.isScrolled ? props.theme.colors.border : 'transparent'};
  transition: all ${props => props.theme.animation.transition.normal};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  transition: color ${props => props.theme.animation.transition.fast};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width ${props => props.theme.animation.transition.fast};
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 1rem 0;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
`;

const MobileNavLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: color ${props => props.theme.animation.transition.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.5rem 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  transition: all ${props => props.theme.animation.transition.fast};
  
  &:hover {
    background: ${props => props.theme.colors.surface};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const navigationItems = [
  { name: 'Problems', href: '/problems', icon: <Code size={16} /> },
  { name: 'Learn', href: '/learn', icon: <Brain size={16} /> },
  { name: 'Study Guide', href: '/study-guide', icon: <BookOpen size={16} /> },
  { name: 'System Design', href: '/system-design', icon: <Users size={16} /> },
  { name: 'Performance', href: '/performance', icon: <Zap size={16} /> },
  { name: 'Accessibility', href: '/accessibility', icon: <Eye size={16} /> },
  { name: 'Interview Tips', href: '/interview-tips', icon: <Award size={16} /> },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <NavContainer>
          <Link href="/" passHref>
            <Logo>
              <Code size={24} />
              Frontend Interview Prep
            </Logo>
          </Link>
          
          <NavLinks>
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <NavLink>
                  {item.name}
                </NavLink>
              </Link>
            ))}
            <SearchButton>
              <Search size={16} />
              Search
            </SearchButton>
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContainer>
      </Nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavLinks>
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <MobileNavLink onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </MobileNavLink>
                </Link>
              ))}
              <SearchButton>
                <Search size={16} />
                Search
              </SearchButton>
            </MobileNavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}