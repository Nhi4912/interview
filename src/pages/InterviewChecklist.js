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

const InterviewChecklist = () => {
  return (
    <Container>
      <Typography className="h1">
        📋 Interview Checklist
      </Typography>
      <Typography className="h5">
        Complete 6-week preparation roadmap with daily tasks and milestones for
        Big Tech interviews.
      </Typography>

      <Box>
        <h3>Week 1: Foundation Building</h3>
        <ul>
          <li>Review JavaScript fundamentals</li>
          <li>Practice basic DOM manipulation</li>
          <li>Study event handling and async programming</li>
        </ul>
        
        <h3>Week 2: React Mastery</h3>
        <ul>
          <li>Master React hooks and lifecycle</li>
          <li>Practice component design patterns</li>
          <li>Learn state management concepts</li>
        </ul>
        
        <h3>Week 3: CSS and Styling</h3>
        <ul>
          <li>Master CSS Grid and Flexbox</li>
          <li>Practice responsive design</li>
          <li>Learn CSS-in-JS patterns</li>
        </ul>
        
        <h3>Week 4: Algorithms & Data Structures</h3>
        <ul>
          <li>Practice array and string problems</li>
          <li>Study tree and graph algorithms</li>
          <li>Master sorting and searching</li>
        </ul>
        
        <h3>Week 5: System Design</h3>
        <ul>
          <li>Learn frontend architecture patterns</li>
          <li>Practice API design</li>
          <li>Study performance optimization</li>
        </ul>
        
        <h3>Week 6: Mock Interviews</h3>
        <ul>
          <li>Practice coding interviews</li>
          <li>Prepare behavioral questions</li>
          <li>Review and polish portfolio</li>
        </ul>
      </Box>
    </Container>
  );
};

export default InterviewChecklist;
