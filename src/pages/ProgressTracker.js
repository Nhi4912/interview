import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProgressTracker = () => {
  const overallProgress = [
    { category: 'LeetCode Problems', completed: 0, total: 100, percentage: 0 },
    { category: 'System Design', completed: 0, total: 10, percentage: 0 },
    { category: 'Mock Interviews', completed: 0, total: 20, percentage: 0 },
    { category: 'Behavioral Questions', completed: 0, total: 50, percentage: 0 },
  ];

  const leetcodeCategories = [
    { name: 'Array Problems', completed: 0, total: 16, percentage: 0 },
    { name: 'String Problems', completed: 0, total: 14, percentage: 0 },
    { name: 'Linked List Problems', completed: 0, total: 9, percentage: 0 },
    { name: 'Tree & Graph Problems', completed: 0, total: 12, percentage: 0 },
    { name: 'Dynamic Programming', completed: 0, total: 8, percentage: 0 },
    { name: 'Design Problems', completed: 0, total: 6, percentage: 0 },
    { name: 'Math Problems', completed: 0, total: 11, percentage: 0 },
  ];

  const performanceMetrics = [
    { difficulty: 'Easy', solved: 0, total: 40, successRate: '0%', avgTime: '--' },
    { difficulty: 'Medium', solved: 0, total: 45, successRate: '0%', avgTime: '--' },
    { difficulty: 'Hard', solved: 0, total: 15, successRate: '0%', avgTime: '--' },
  ];

  const arrayProblems = [
    'Remove Duplicates from Sorted Array',
    'Best Time to Buy and Sell Stock II',
    'Rotate Array',
    'Contains Duplicate',
    'Single Number',
    'Intersection of Two Arrays II',
    'Plus One',
    'Move Zeroes',
    'Two Sum',
    'Valid Sudoku',
    'Rotate Image',
    '3Sum',
    'Set Matrix Zeroes',
    'Group Anagrams',
    'Longest Substring Without Repeating Characters',
    'Longest Palindromic Substring',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom textAlign="center">
        📊 Interview Preparation Progress Tracker
      </Typography>
      <Typography variant="h5" color="text.secondary" textAlign="center" paragraph>
        Theo dõi tiến độ luyện thi phỏng vấn Big Tech
      </Typography>

      {/* Overall Progress */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          🎯 Overall Progress / Tiến độ tổng thể
        </Typography>
        
        <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 4 }}>
          Target Goals / Mục tiêu
        </Typography>
        
        <Grid container spacing={3}>
          {overallProgress.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.category}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2">
                      {item.completed}/{item.total}
                    </Typography>
                    <Typography variant="body2" color="primary.main">
                      {item.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.percentage} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* LeetCode Progress */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          📚 LeetCode Progress by Category
        </Typography>
        
        <Grid container spacing={3}>
          {leetcodeCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    ({category.total} problems)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2">
                      Progress: {category.completed}/{category.total}
                    </Typography>
                    <Typography variant="body2" color="primary.main">
                      {category.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={category.percentage} 
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Performance Metrics */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          📈 Performance Metrics
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  LeetCode Performance
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Difficulty</TableCell>
                        <TableCell align="right">Solved</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Success Rate</TableCell>
                        <TableCell align="right">Average Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceMetrics.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <Chip 
                              label={row.difficulty} 
                              color={
                                row.difficulty === 'Easy' ? 'success' :
                                row.difficulty === 'Medium' ? 'warning' : 'error'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{row.solved}</TableCell>
                          <TableCell align="right">{row.total}</TableCell>
                          <TableCell align="right">{row.successRate}</TableCell>
                          <TableCell align="right">{row.avgTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Problem Categories Performance
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Solved</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Success Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leetcodeCategories.slice(0, 7).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.name.replace(' Problems', '')}
                          </TableCell>
                          <TableCell align="right">{row.completed}</TableCell>
                          <TableCell align="right">{row.total}</TableCell>
                          <TableCell align="right">{row.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      {/* Array Problems Example */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Array Problems (16 problems)
        </Typography>
        
        <StyledCard>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <strong>Progress</strong>: 0/16 (0%)
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={0} 
              sx={{ height: 8, borderRadius: 4, mb: 3 }}
            />
            
            <List>
              {arrayProblems.map((problem, index) => (
                <ListItem key={index} dense>
                  <FormControlLabel
                    control={<Checkbox disabled />}
                    label={problem}
                    sx={{ width: '100%' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Box>

      {/* Study Log */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          📝 Weekly Study Log
        </Typography>
        
        <Grid container spacing={3}>
          {[1, 2, 3].map((week) => (
            <Grid item xs={12} md={4} key={week}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Week {week}: {week === 1 ? 'Foundation' : week === 2 ? 'Intermediate' : 'Advanced'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date: ___
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Goals:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label={`Complete 10 ${week === 1 ? 'Easy' : week === 2 ? 'Medium' : 'Hard'} LeetCode problems`}
                      />
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label={week === 1 ? 'Review basic data structures' : week === 2 ? 'Study system design basics' : 'Deep dive into system design'}
                      />
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label={week === 1 ? 'Practice time complexity analysis' : 'Practice mock interviews'}
                      />
                    </ListItem>
                  </List>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Completed:</strong> Problems: ___/10<br />
                    <strong>Notes:</strong> ___<br />
                    <strong>Challenges:</strong> ___
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProgressTracker;