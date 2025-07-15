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
  
  &.h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  
  &.body1 {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
`;

const Box = styled.div`
  margin-top: 32px;
  padding: 32px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const LinearProgress = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    background: #3b82f6;
    width: ${props => props.value || 0}%;
    transition: width 0.3s ease;
  }
`;

const Chip = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 12px;
  width: 16px;
  height: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const TableHead = styled.thead`
  background: #f8f9fa;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  
  &.head {
    font-weight: 600;
    color: #1a1a1a;
  }
`;

const ProgressTracker = () => {
  const overallProgress = [
    { category: "LeetCode Problems", completed: 0, total: 100, percentage: 0 },
    { category: "System Design", completed: 0, total: 10, percentage: 0 },
    { category: "Mock Interviews", completed: 0, total: 20, percentage: 0 },
    {
      category: "Behavioral Questions",
      completed: 0,
      total: 50,
      percentage: 0,
    },
  ];

  const leetcodeCategories = [
    { name: "Array Problems", completed: 0, total: 16, percentage: 0 },
    { name: "String Problems", completed: 0, total: 14, percentage: 0 },
    { name: "Linked List Problems", completed: 0, total: 9, percentage: 0 },
    { name: "Tree & Graph Problems", completed: 0, total: 12, percentage: 0 },
    { name: "Dynamic Programming", completed: 0, total: 8, percentage: 0 },
    { name: "Design Problems", completed: 0, total: 6, percentage: 0 },
    { name: "Math Problems", completed: 0, total: 11, percentage: 0 },
  ];

  const performanceMetrics = [
    {
      difficulty: "Easy",
      solved: 0,
      total: 40,
      successRate: "0%",
      avgTime: "--",
    },
    {
      difficulty: "Medium",
      solved: 0,
      total: 45,
      successRate: "0%",
      avgTime: "--",
    },
    {
      difficulty: "Hard",
      solved: 0,
      total: 15,
      successRate: "0%",
      avgTime: "--",
    },
  ];

  const arrayProblems = [
    "Remove Duplicates from Sorted Array",
    "Best Time to Buy and Sell Stock II",
    "Rotate Array",
    "Contains Duplicate",
    "Single Number",
    "Intersection of Two Arrays II",
    "Plus One",
    "Move Zeroes",
    "Two Sum",
    "Valid Sudoku",
    "Rotate Image",
    "3Sum",
    "Set Matrix Zeroes",
    "Group Anagrams",
    "Longest Substring Without Repeating Characters",
    "Longest Palindromic Substring",
  ];

  return (
    <Container>
      <Typography className="h1">
        📊 Interview Preparation Progress Tracker
      </Typography>
      <Typography className="h5">
        Theo dõi tiến độ luyện thi phỏng vấn Big Tech
      </Typography>

             {/* Overall Progress */}
       <Box>
         <Typography className="h4">
           🎯 Overall Progress / Tiến độ tổng thể
         </Typography>

         <Typography className="h4">
           Target Goals / Mục tiêu
         </Typography>

         <Grid>
           {overallProgress.map((item, index) => (
             <Card key={index}>
               <CardContent>
                 <Typography className="h3">
                   {item.category}
                 </Typography>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                   <Typography className="body1">
                     {item.completed}/{item.total}
                   </Typography>
                   <Typography className="body1" style={{ color: "#3b82f6" }}>
                     {item.percentage}%
                   </Typography>
                 </div>
                 <LinearProgress value={item.percentage} />
               </CardContent>
             </Card>
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
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    ({category.total} problems)
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
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
              </Card>
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
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  LeetCode Performance
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="head">Difficulty</TableCell>
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
                              row.difficulty === "Easy"
                                ? "success"
                                : row.difficulty === "Medium"
                                ? "warning"
                                : "error"
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
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Problem Categories Performance
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="head">Category</TableCell>
                      <TableCell align="right">Solved</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Success Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leetcodeCategories.slice(0, 7).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.name.replace(" Problems", "")}
                        </TableCell>
                        <TableCell align="right">{row.completed}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                        <TableCell align="right">{row.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Array Problems Example */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Array Problems (16 problems)
        </Typography>

        <Card>
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
                  <Checkbox disabled />
                  {problem}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Study Log */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          📝 Weekly Study Log
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3].map((week) => (
            <Grid item xs={12} md={4} key={week}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Week {week}:{" "}
                    {week === 1
                      ? "Foundation"
                      : week === 2
                      ? "Intermediate"
                      : "Advanced"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Date: ___
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Goals:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <Checkbox disabled />
                      {`Complete 10 ${
                        week === 1 ? "Easy" : week === 2 ? "Medium" : "Hard"
                      } LeetCode problems`}
                    </ListItem>
                    <ListItem>
                      <Checkbox disabled />
                      {
                        week === 1
                          ? "Review basic data structures"
                          : week === 2
                          ? "Study system design basics"
                          : "Deep dive into system design"
                      }
                    </ListItem>
                    <ListItem>
                      <Checkbox disabled />
                      {
                        week === 1
                          ? "Practice time complexity analysis"
                          : "Practice mock interviews"
                      }
                    </ListItem>
                  </List>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Completed:</strong> Problems: ___/10
                    <br />
                    <strong>Notes:</strong> ___
                    <br />
                    <strong>Challenges:</strong> ___
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProgressTracker;
