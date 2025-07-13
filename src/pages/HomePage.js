import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KnowledgeCard from "../components/KnowledgeCard";

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: "center",
  background:
    "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
}));

const StatsCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    borderColor: theme.palette.primary.main,
  },
}));

const HomePage = () => {
  const navigate = useNavigate();

  const knowledgeCards = [
    {
      title: "JavaScript Core",
      description:
        "Master closures, prototypes, async/await, and ES6+ features essential for modern development.",
      icon: "🚀",
      difficulty: "Advanced",
      status: "completed",
      href: "/frontend/javascript",
    },
    {
      title: "React Ecosystem",
      description:
        "Deep dive into React hooks, state management, performance optimization, and testing strategies.",
      icon: "⚛️",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/react",
    },
    {
      title: "TypeScript",
      description:
        "Type safety, interfaces, generics, and advanced TypeScript patterns for robust applications.",
      icon: "📘",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/typescript",
    },
    {
      title: "CSS & Styling",
      description:
        "Flexbox, Grid, animations, responsive design, and modern CSS architectures.",
      icon: "🎨",
      difficulty: "Beginner",
      status: "completed",
      href: "/frontend/html-css",
    },
    {
      title: "Frontend Fundamentals",
      description:
        "Core concepts including DOM manipulation, event loop, closures, and browser internals.",
      icon: "⚡",
      difficulty: "Intermediate",
      status: "in-progress",
      href: "/frontend/fundamentals",
    },
    {
      title: "Advanced Patterns",
      description:
        "Memory optimization, performance patterns, and advanced JavaScript techniques.",
      icon: "🚀",
      difficulty: "Advanced",
      status: "not-started",
      href: "/frontend/advanced",
    },
    {
      title: "System Design",
      description:
        "Frontend architecture, scalability patterns, performance optimization, and best practices.",
      icon: "🏗️",
      difficulty: "Advanced",
      status: "in-progress",
      href: "/frontend/system-design",
    },
    {
      title: "Testing",
      description:
        "Unit testing, integration testing, E2E testing with Jest, React Testing Library, and Cypress.",
      icon: "🧪",
      difficulty: "Intermediate",
      status: "not-started",
      href: "/frontend/testing",
    },
    {
      title: "LeetCode Problems",
      description:
        "126 problems organized by category with detailed TypeScript solutions and explanations.",
      icon: "💻",
      difficulty: "Advanced",
      status: "in-progress",
      href: "/leetcode",
    },
  ];

  const progressData = [
    {
      title: "JavaScript Fundamentals",
      percentage: 95,
      topics: ["Closures", "Promises", "Event Loop", "Prototypes"],
    },
    {
      title: "React & Modern Frameworks",
      percentage: 85,
      topics: ["Hooks", "State Management", "Performance", "Testing"],
    },
    {
      title: "System Design",
      percentage: 60,
      topics: ["Architecture", "Scalability", "Performance", "Security"],
    },
    {
      title: "Algorithms & Data Structures",
      percentage: 70,
      topics: ["Arrays", "Trees", "Sorting", "Dynamic Programming"],
    },
  ];

  const stats = [
    { number: "15+", label: "Topics Covered" },
    { number: "100+", label: "Coding Problems" },
    { number: "126", label: "LeetCode Problems" },
    { number: "6 Week", label: "Study Plan" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom>
            Frontend Interview Mastery
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your comprehensive guide to acing frontend interviews at top tech
            companies. Track progress, visualize knowledge, and master
            fundamentals.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/frontend-interview-complete-guide")}
            >
              Complete Guide
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/interview-checklist")}
            >
              Start Preparation
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate("/progress-tracker")}
            >
              Browse Topics
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard>
                <CardContent>
                  <Typography variant="h3" component="div" color="primary.main">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Progress Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Learning Progress
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {progressData.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h6" color="primary.main">
                      {item.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {item.topics.map((topic, topicIndex) => (
                      <Chip
                        key={topicIndex}
                        label={topic}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Knowledge Map Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Knowledge Map
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {knowledgeCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <KnowledgeCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
