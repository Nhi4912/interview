const fs = require("fs");
const path = require("path");

// Create content directories
const contentDirs = [
  "src/content/frontend",
  "src/content/leetcode",
  "src/content/theory",
  "src/content/templates",
];

contentDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy frontend content
function copyFrontendContent() {
  const frontendDir = "frontend";
  const targetDir = "src/content/frontend";

  if (fs.existsSync(frontendDir)) {
    const items = fs.readdirSync(frontendDir);

    items.forEach((item) => {
      const sourcePath = path.join(frontendDir, item);
      const targetPath = path.join(targetDir, item);

      if (fs.statSync(sourcePath).isFile() && item.endsWith(".md")) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${sourcePath} -> ${targetPath}`);
      } else if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory contents
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }

        const subItems = fs.readdirSync(sourcePath);
        subItems.forEach((subItem) => {
          const subSourcePath = path.join(sourcePath, subItem);
          const subTargetPath = path.join(targetPath, subItem);

          if (fs.statSync(subSourcePath).isFile() && subItem.endsWith(".md")) {
            fs.copyFileSync(subSourcePath, subTargetPath);
            console.log(`Copied: ${subSourcePath} -> ${subTargetPath}`);
          }
        });
      }
    });
  }
}

// Copy leetcode content
function copyLeetcodeContent() {
  const leetcodeDir = "leetcode";
  const targetDir = "src/content/leetcode";

  if (fs.existsSync(leetcodeDir)) {
    const items = fs.readdirSync(leetcodeDir);

    items.forEach((item) => {
      const sourcePath = path.join(leetcodeDir, item);
      const targetPath = path.join(targetDir, item);

      if (
        fs.statSync(sourcePath).isFile() &&
        (item.endsWith(".md") || item.endsWith(".ts"))
      ) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${sourcePath} -> ${targetPath}`);
      } else if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory contents
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }

        const subItems = fs.readdirSync(sourcePath);
        subItems.forEach((subItem) => {
          const subSourcePath = path.join(sourcePath, subItem);
          const subTargetPath = path.join(targetPath, subItem);

          if (
            fs.statSync(subSourcePath).isFile() &&
            (subItem.endsWith(".md") || subItem.endsWith(".ts"))
          ) {
            fs.copyFileSync(subSourcePath, subTargetPath);
            console.log(`Copied: ${subSourcePath} -> ${subTargetPath}`);
          }
        });
      }
    });
  }
}

// Copy theory-and-visuals content
function copyTheoryContent() {
  const theoryDir = "theory-and-visuals";
  const targetDir = "src/content/theory";

  if (fs.existsSync(theoryDir)) {
    const items = fs.readdirSync(theoryDir);

    items.forEach((item) => {
      const sourcePath = path.join(theoryDir, item);
      const targetPath = path.join(targetDir, item);

      if (fs.statSync(sourcePath).isFile() && item.endsWith(".md")) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${sourcePath} -> ${targetPath}`);
      }
    });
  }
}

// Copy templates content
function copyTemplatesContent() {
  const templatesDir = "templates";
  const targetDir = "src/content/templates";

  if (fs.existsSync(templatesDir)) {
    const items = fs.readdirSync(templatesDir);

    items.forEach((item) => {
      const sourcePath = path.join(templatesDir, item);
      const targetPath = path.join(targetDir, item);

      if (fs.statSync(sourcePath).isFile() && item.endsWith(".md")) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${sourcePath} -> ${targetPath}`);
      }
    });
  }
}

// Execute the copy operations
console.log("Copying content for dynamic routes...");
copyFrontendContent();
copyLeetcodeContent();
copyTheoryContent();
copyTemplatesContent();
console.log("Content copying completed!");
