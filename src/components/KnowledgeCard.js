import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const CardContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Typography = styled.div`
  margin-bottom: 8px;
  font-family: inherit;
  
  &.title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.6;
  }
  
  &.subtitle {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 16px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  
  &.chip-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
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
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const CompletionIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #666;
`;

const CompletionCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.status === "completed") return "#4CAF50"; // Success green
    if (props.status === "in-progress") return "#FFC107"; // Warning yellow
    return "#9E9E9E"; // Grey
  }};
`;

const KnowledgeCard = ({
  title,
  description,
  icon,
  difficulty,
  status,
  href,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Knowledge card clicked:", { title, href });

    if (onClick) {
      onClick();
    } else if (href) {
      console.log("Navigating to:", href);
      router.push(href);
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
      <CardContent>
        <Box>
          {icon}
        </Box>

        <Typography className="title">
          {title}
        </Typography>

        <Typography className="subtitle">
          {description}
        </Typography>

        <Box className="chip-container">
          {difficulty && (
            <Chip>{difficulty}</Chip>
          )}

          {status && (
            <CompletionIndicator>
              <CompletionCircle status={status} />
              <span>{getStatusText(status)}</span>
            </CompletionIndicator>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default KnowledgeCard;
