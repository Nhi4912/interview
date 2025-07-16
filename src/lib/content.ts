import fs from "fs";
import path from "path";

const contentDirs = [
  "src/content/frontend",
  "src/content/leetcode",
  "src/content/theory",
  "src/content/templates",
];

export interface TopicData {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  content: string;
  estimatedTime: string;
  relatedTopics: string[];
  path: string;
}

export function getAllTopics(): string[] {
  const topics: string[] = [];

  contentDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      const items = fs.readdirSync(dir);

      items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isFile() && item.endsWith(".md")) {
          // Add the file name without extension
          const topic = item.replace(".md", "");
          topics.push(topic);
        } else if (stat.isDirectory()) {
          // Add the directory name as a topic
          topics.push(item);
        }
      });
    }
  });

  return topics;
}

export function getTopicContent(topic: string): TopicData | null {
  const contentPaths = [
    `src/content/frontend/${topic}.md`,
    `src/content/leetcode/${topic}.md`,
    `src/content/theory/${topic}.md`,
    `src/content/templates/${topic}.md`,
    // Also try with subdirectories
    `src/content/frontend/${topic}/README.md`,
    `src/content/leetcode/${topic}/README.md`,
  ];

  let content = "";
  let foundPath = "";

  for (const contentPath of contentPaths) {
    if (fs.existsSync(contentPath)) {
      try {
        content = fs.readFileSync(contentPath, "utf-8");
        foundPath = contentPath;
        break;
      } catch (err) {
        console.error(`Error reading ${contentPath}:`, err);
      }
    }
  }

  if (!content) {
    return null;
  }

  // Extract metadata from markdown content
  const lines = content.split("\n");
  const title = lines[0].replace("# ", "") || topic;
  const description =
    lines
      .find(
        (line) =>
          line.startsWith("## Overview") || line.startsWith("## Description")
      )
      ?.replace("## Overview", "")
      .replace("## Description", "")
      .trim() || "Learn about " + topic;

  // Determine category based on path
  let category = "General";
  if (foundPath.includes("/frontend/")) category = "Frontend";
  else if (foundPath.includes("/leetcode/")) category = "Algorithms";
  else if (foundPath.includes("/theory/")) category = "Theory";
  else if (foundPath.includes("/templates/")) category = "Templates";

  // Extract tags from content
  const tags = extractTags(content);

  return {
    title,
    description,
    difficulty: "Intermediate", // Default difficulty
    category,
    tags,
    content,
    estimatedTime: "30-60 min",
    relatedTopics: [],
    path: foundPath,
  };
}

function extractTags(content: string): string[] {
  const tags: string[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    if (line.includes("**") && line.includes(":")) {
      const tag = line.replace(/\*\*/g, "").replace(/:/g, "").trim();
      if (tag.length < 30) {
        // Avoid long lines
        tags.push(tag);
      }
    }
  }

  return tags.slice(0, 5); // Limit to 5 tags
}

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic }));
}
