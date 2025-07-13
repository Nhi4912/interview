import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  userSelect: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    borderColor: theme.palette.primary.main,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  "&:active": {
    transform: "translateY(-2px) scale(0.98)",
  },
}));

const CardIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  fontSize: "1.5rem",
}));

const CompletionIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
}));

const CompletionCircle = styled(Box)(({ theme, status }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor:
    status === "completed"
      ? theme.palette.success.main
      : status === "in-progress"
      ? theme.palette.warning.main
      : theme.palette.grey[600],
}));

const KnowledgeCard = ({
  title,
  description,
  icon,
  difficulty,
  status,
  href,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Knowledge card clicked:", { title, href });

    if (onClick) {
      onClick();
    } else if (href) {
      console.log("Navigating to:", href);
      navigate(href);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  return (
    <StyledCard
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Navigate to ${title}`}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CardIcon>{icon}</CardIcon>

        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ flexGrow: 1, mb: 2 }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          {difficulty && (
            <Chip
              label={difficulty}
              color={getDifficultyColor(difficulty)}
              size="small"
              variant="outlined"
            />
          )}

          {status && (
            <CompletionIndicator>
              <CompletionCircle status={status} />
              <Typography variant="caption">{getStatusText(status)}</Typography>
            </CompletionIndicator>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default KnowledgeCard;
