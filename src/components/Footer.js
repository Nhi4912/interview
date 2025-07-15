import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #f8f9fa;
  margin-top: 64px;
  padding: 48px 0;
  border-top: 1px solid #e5e7eb;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

const Typography = styled.div`
  font-family: inherit;
  
  &.h6 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  
  &.body2 {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.6;
  }
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid>
          <div>
            <Typography className="h6">
              Study Resources
            </Typography>
            <Typography className="body2">
              Comprehensive materials for frontend interview preparation
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/fundamentals">JavaScript Fundamentals</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/react">React & Modern Frameworks</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/algorithms">Algorithms & Data Structures</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Typography className="h6">
              Practice
            </Typography>
            <Typography className="body2">
              Hands-on coding challenges and mock interviews
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/coding-problems">Coding Problems</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/system-design">System Design</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/behavioral">Behavioral Questions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Typography className="h6">
              About
            </Typography>
            <Typography className="body2">
              Your ultimate guide to frontend interview success
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/about">About This Guide</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/contact">Contact</Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/contributors">Contributors</Link>
              </li>
            </ul>
          </div>
        </Grid>
        
        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <Typography className="body2">
            © 2024 Frontend Interview Prep. Built with Next.js and styled-components.
          </Typography>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
