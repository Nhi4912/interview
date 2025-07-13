import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const InterviewChecklist = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom textAlign="center">
        📋 Interview Checklist
      </Typography>
      <Typography variant="h5" color="text.secondary" textAlign="center" paragraph>
        Complete 6-week preparation roadmap with daily tasks and milestones for Big Tech interviews.
      </Typography>
      
      <Box sx={{ mt: 4, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1">
          This page will contain a comprehensive 6-week interview preparation checklist with daily tasks, 
          milestones, and progress tracking for Big Tech interviews.
        </Typography>
      </Box>
    </Container>
  );
};

export default InterviewChecklist;