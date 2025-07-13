import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProgressTracker from "./pages/ProgressTracker";
import InterviewChecklist from "./pages/InterviewChecklist";
import CompleteGuide from "./pages/CompleteGuide";
import MarkdownViewer from "./components/MarkdownViewer";
import Footer from "./components/Footer";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />
          <Route path="/interview-checklist" element={<InterviewChecklist />} />
          <Route
            path="/frontend-interview-complete-guide"
            element={<CompleteGuide />}
          />
          <Route path="/frontend/*" element={<MarkdownViewer />} />
          <Route path="/leetcode/*" element={<MarkdownViewer />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
