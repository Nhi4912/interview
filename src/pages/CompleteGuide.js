import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Typography = styled.div`
  font-family: inherit;
  
  &.h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
    text-align: center;
  }
  
  &.h5 {
    font-size: 1.125rem;
    color: #666;
    margin-bottom: 32px;
    text-align: center;
  }
`;

const Box = styled.div`
  margin-top: 32px;
  padding: 32px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const CompleteGuide = () => {
  return (
    <Container>
      <Typography className="h1">
        📚 Frontend Interview Complete Guide
      </Typography>
      <Typography className="h5">
        Comprehensive overview of all topics, strategies, and preparation phases
        for frontend interviews.
      </Typography>

      <Box>
        <p>
          This is a comprehensive guide for frontend interview preparation.
          It covers all the essential topics you need to master for successful
          interviews at top tech companies.
        </p>
        <p>
          Topics covered include:
        </p>
        <ul>
          <li>JavaScript fundamentals and advanced concepts</li>
          <li>React and modern frontend frameworks</li>
          <li>CSS and responsive design</li>
          <li>Browser APIs and web fundamentals</li>
          <li>Performance optimization</li>
          <li>Testing methodologies</li>
          <li>System design for frontend</li>
          <li>Algorithms and data structures</li>
        </ul>
      </Box>
    </Container>
  );
};

export default CompleteGuide;
