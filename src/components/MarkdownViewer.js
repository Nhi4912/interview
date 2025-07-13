import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const MarkdownContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  "& h1": {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  "& h2": {
    fontSize: "2rem",
    fontWeight: 600,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  "& h3": {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  "& h4": {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  "& p": {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
  },
  "& ul, & ol": {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  "& li": {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  "& code": {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(0.5),
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.9rem",
    color: theme.palette.primary.main,
  },
  "& pre": {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    overflow: "auto",
    marginBottom: theme.spacing(2),
    "& code": {
      backgroundColor: "transparent",
      padding: 0,
      color: theme.palette.text.primary,
    },
  },
  "& blockquote": {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: theme.spacing(2),
  },
  "& th, & td": {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: "left",
  },
  "& th": {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 600,
  },
}));

const MarkdownViewer = () => {
  const location = useLocation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract the path from the URL
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const category = pathSegments[0]; // 'frontend' or 'leetcode'
        const subPath = pathSegments.slice(1).join("/"); // The rest of the path

        console.log("Current pathname:", location.pathname);
        console.log("Path segments:", pathSegments);
        console.log("Category:", category);
        console.log("SubPath:", subPath);

        // Construct the file path based on the category and subpath
        let filePath = "";

        if (category === "frontend") {
          // Handle frontend content
          if (subPath === "javascript") {
            filePath = "frontend/javascript/fundamentals.md";
          } else if (subPath === "react") {
            filePath = "frontend/react/core.md";
          } else if (subPath === "typescript") {
            filePath = "frontend/typescript/README.md";
          } else if (subPath === "html-css") {
            filePath = "frontend/html-css/README.md";
          } else if (subPath.startsWith("fundamentals/")) {
            filePath = `frontend/fundamentals/${subPath.replace(
              "fundamentals/",
              ""
            )}.md`;
          } else if (subPath === "advanced") {
            filePath = "frontend/advanced/README.md";
          } else if (subPath.startsWith("advanced/")) {
            filePath = `frontend/advanced/${subPath.replace(
              "advanced/",
              ""
            )}.md`;
          } else if (subPath.startsWith("system-design/")) {
            filePath = `frontend/system-design/${subPath.replace(
              "system-design/",
              ""
            )}.md`;
          } else if (subPath === "system-design") {
            filePath = "frontend/system-design/frontend-architecture.md";
          } else if (subPath.startsWith("testing/")) {
            filePath = `frontend/testing/${subPath.replace("testing/", "")}.md`;
          } else if (subPath === "testing") {
            filePath = "frontend/testing/README.md";
          } else if (subPath.startsWith("security/")) {
            filePath = `frontend/security/${subPath.replace(
              "security/",
              ""
            )}.md`;
          } else if (subPath === "security") {
            filePath = "frontend/security/README.md";
          } else if (subPath.startsWith("performance/")) {
            filePath = `frontend/performance/${subPath.replace(
              "performance/",
              ""
            )}.md`;
          } else if (subPath === "performance") {
            filePath = "frontend/performance/README.md";
          } else if (subPath.startsWith("networking/")) {
            filePath = `frontend/networking/${subPath.replace(
              "networking/",
              ""
            )}.md`;
          } else if (subPath === "networking") {
            filePath = "frontend/networking/README.md";
          } else if (subPath.startsWith("coding-problems/")) {
            filePath = `frontend/coding-problems/${subPath.replace(
              "coding-problems/",
              ""
            )}.md`;
          } else if (subPath === "coding-problems") {
            filePath = "frontend/coding-problems/index.md";
          } else {
            // Default to index.md for the subdirectory
            filePath = `frontend/${subPath}/README.md`;
          }
        } else if (category === "leetcode") {
          // Fix: If leetcode/problems/[problem].md, try to find the correct category
          if (subPath.startsWith("problems/")) {
            // Try all known categories
            const categories = [
              "array",
              "string",
              "tree-graph",
              "dp",
              "design",
              "backtracking",
              "linked-list",
              "math",
              "sorting-searching",
              "others",
            ];
            let found = false;
            for (const cat of categories) {
              const testPath = `leetcode/${cat}/problems/${subPath.replace(
                "problems/",
                ""
              )}`;
              const testUrl = `https://raw.githubusercontent.com/nhi4912/interview/main/${testPath}`;
              // Try to fetch synchronously (not ideal, but for fallback)
              try {
                const req = await fetch(testUrl, { method: "HEAD" });
                if (req.ok) {
                  filePath = `${cat}/problems/${subPath.replace(
                    "problems/",
                    ""
                  )}`;
                  found = true;
                  break;
                }
              } catch (e) {}
            }
            if (!found) {
              filePath = `leetcode/${subPath}`;
            } else {
              filePath = `leetcode/${filePath}`;
            }
          } else if (subPath.endsWith(".md")) {
            filePath = `leetcode/${subPath}`;
          } else if (
            subPath === "array" ||
            subPath === "string" ||
            subPath === "tree-graph" ||
            subPath === "dp" ||
            subPath === "design" ||
            subPath === "backtracking" ||
            subPath === "linked-list" ||
            subPath === "math" ||
            subPath === "sorting-searching" ||
            subPath === "others"
          ) {
            filePath = `leetcode/${subPath}/index.md`;
          } else {
            filePath = `leetcode/${subPath}/index.md`;
          }
        }

        console.log("Fetching content from:", filePath);

        // Fetch the markdown content from the repository
        const response = await fetch(
          `https://raw.githubusercontent.com/nhi4912/interview/main/${filePath}`
        );

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch content: ${response.status} - ${filePath}`
          );
        }

        const markdownContentRaw = await response.text();
        // Remove YAML front matter if present
        let markdownContent = markdownContentRaw;
        if (markdownContentRaw.startsWith("---")) {
          // Remove block between --- and ---
          const end = markdownContentRaw.indexOf("---", 3);
          if (end !== -1) {
            markdownContent = markdownContentRaw.slice(end + 3).trimStart();
          }
        } else if (/^\s*\w+:/.test(markdownContentRaw)) {
          // Remove leading lines that look like key: value until first heading
          const lines = markdownContentRaw.split("\n");
          let firstHeadingIdx = lines.findIndex((line) => /^\s*#/.test(line));
          if (firstHeadingIdx !== -1) {
            markdownContent = lines.slice(firstHeadingIdx).join("\n");
          }
        }
        console.log("Content length:", markdownContent.length);
        console.log("Content preview:", markdownContent.substring(0, 200));

        // Remove Jekyll/Liquid tags and artifacts
        let cleaned = markdownContent
          .replace(/\{\%\s*raw\s*\%\}/g, "")
          .replace(/\{\%\s*endraw\s*\%\}/g, "")
          .replace(/\{\%.*?\%\}/gs, "") // Remove all {% ... %} blocks
          .replace(/\\n/g, "\n") // Replace visible \n with real newlines
          .replace(/\n{2,}/g, "\n\n"); // Ensure double newlines for spacing
        markdownContent = cleaned;

        setContent(markdownContent);
        console.log("Content state set successfully");
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname) {
      fetchContent();
    }
  }, [location.pathname]);

  const renderMarkdown = (markdown) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h1" component="h1" gutterBottom>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h2" component="h2" gutterBottom sx={{ mt: 4 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 3 }}>
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 2 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              {children}
            </Typography>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <Box
                component="code"
                sx={{
                  backgroundColor: "#23272e",
                  color: "#facc15",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.95em",
                }}
              >
                {children}
              </Box>
            ) : (
              <Paper
                elevation={2}
                sx={{
                  backgroundColor: "#181c23",
                  color: "#f1f5f9",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "1em",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: 2,
                  my: 2,
                  overflowX: "auto",
                  whiteSpace: "pre",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Box component="code" sx={{ display: "block" }}>
                  {children}
                </Box>
              </Paper>
            );
          },
          a: ({ children, href }) => (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              {children}
            </Link>
          ),
          blockquote: ({ children }) => (
            <Box
              sx={{
                borderLeft: "4px solid",
                borderColor: "primary.main",
                pl: 2,
                ml: 0,
                mb: 2,
                fontStyle: "italic",
                color: "text.secondary",
              }}
            >
              {children}
            </Box>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    );
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const category = pathSegments[0];
    const subPath = pathSegments.slice(1);

    const breadcrumbs = [
      { label: "Home", path: "/" },
      {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        path: `/${category}`,
      },
    ];

    // Add subpath breadcrumbs
    subPath.forEach((segment, index) => {
      const isLast = index === subPath.length - 1;
      const path = `/${category}/${subPath.slice(0, index + 1).join("/")}`;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      breadcrumbs.push({
        label,
        path: isLast ? null : path,
      });
    });

    return breadcrumbs;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading content: {error}
        </Alert>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The requested content could not be loaded. Please check the URL or try
          again later.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Debug info: Pathname: {location.pathname}
        </Typography>
      </Container>
    );
  }

  if (!content) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="info"
          sx={{ mb: 2, display: "flex", alignItems: "center", fontSize: 22 }}
        >
          <span
            role="img"
            aria-label="rocket"
            style={{ fontSize: 32, marginRight: 12 }}
          >
            🚧
          </span>
          <b>Coming soon!</b>
        </Alert>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          This topic is being updated. Please check back later!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          If you have suggestions or want to contribute, feel free to open a
          pull request on GitHub.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        {getBreadcrumbs().map((breadcrumb, index) => (
          <Link
            key={index}
            component={breadcrumb.path ? RouterLink : "span"}
            to={breadcrumb.path}
            color={breadcrumb.path ? "primary" : "text.primary"}
            sx={{ textDecoration: "none" }}
          >
            {breadcrumb.label}
          </Link>
        ))}
      </Breadcrumbs>

      <MarkdownContainer>{renderMarkdown(content)}</MarkdownContainer>
    </Container>
  );
};

export default MarkdownViewer;
