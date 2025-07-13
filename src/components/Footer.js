import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(8),
  padding: theme.spacing(6, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Study Resources
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive collection of frontend interview questions, coding challenges, and system design problems.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Progress Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor your learning journey with detailed progress indicators and completion status.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Big Tech Ready
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Curated content specifically designed for interviews at Google, Meta, Amazon, Apple, and Netflix.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Frontend Interview Hub. Built for aspiring frontend engineers.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;