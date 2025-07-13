import React from "react";
import { Container, Typography, Box } from "@mui/material";

const CompleteGuide = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom textAlign="center">
        📚 Frontend Interview Complete Guide
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        textAlign="center"
        paragraph
      >
        Comprehensive overview of all topics, strategies, and preparation phases
        for frontend interviews.
      </Typography>

      <Box
        sx={{
          mt: 4,
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1">
          This page will contain the complete frontend interview preparation
          guide covering all topics, strategies, and preparation phases for Big
          Tech interviews.
        </Typography>
      </Box>
    </Container>
  );
};

export default CompleteGuide;
