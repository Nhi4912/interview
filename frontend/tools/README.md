# Tools & Build Systems Interview Preparation Guide

## Table of Contents

- [Core Concepts](#core-concepts)
- [Build Tools](#build-tools)
- [Package Managers](#package-managers)
- [Development Tools](#development-tools)
- [Testing Tools](#testing-tools)
- [Deployment Tools](#deployment-tools)
- [Common Interview Questions](#common-interview-questions)
- [Best Practices](#best-practices)
- [Practice Problems](#practice-problems)

## Core Concepts

### Modern Frontend Development

#### 1. Build Process

**Definition**: The process of transforming source code into optimized, production-ready assets.

**Steps**:

1. **Transpilation**: Convert modern JavaScript to compatible versions
2. **Bundling**: Combine multiple files into single files
3. **Minification**: Remove unnecessary characters
4. **Optimization**: Tree shaking, code splitting
5. **Asset Processing**: Images, fonts, CSS processing

#### 2. Module Systems

**Definition**: Ways to organize and share code between files.

**Types**:

- **CommonJS**: `require()` and `module.exports`
- **ES Modules**: `import` and `export`
- **AMD**: Asynchronous Module Definition
- **UMD**: Universal Module Definition

#### 3. Development Workflow

**Definition**: The process of developing, testing, and deploying applications.

**Stages**:

- Development
- Testing
- Staging
- Production

## Build Tools

### Webpack

#### 1. Core Concepts

**Definition**: Module bundler that processes and bundles JavaScript modules.

**Key Features**:

- Code splitting
- Tree shaking
- Hot module replacement
- Loader system
- Plugin ecosystem

#### 2. Configuration

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

#### 3. Advanced Features

**Code Splitting**:

```javascript
// Dynamic imports
const HomePage = () => import("./pages/HomePage");
const AboutPage = () => import("./pages/AboutPage");

// Route-based splitting
const routes = [
  {
    path: "/",
    component: () => import("./pages/HomePage"),
  },
  {
    path: "/about",
    component: () => import("./pages/AboutPage"),
  },
];
```

**Tree Shaking**:

```javascript
// package.json
{
  "sideEffects": false
}

// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
  },
};
```

### Vite

#### 1. Overview

**Definition**: Next-generation frontend build tool with fast hot module replacement.

**Features**:

- Instant server start
- Lightning-fast hot module replacement
- True on-demand compilation
- Rich features out of the box

#### 2. Configuration

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["lodash", "axios"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

### Rollup

#### 1. Overview

**Definition**: Module bundler for JavaScript libraries and applications.

**Features**:

- Tree shaking by default
- ES module output
- Plugin system
- Library-focused

#### 2. Configuration

```javascript
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
  external: ["react", "react-dom"],
};
```

## Package Managers

### npm

#### 1. Core Commands

```bash
# Install dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Run scripts
npm run script-name

# Publish package
npm publish

# Update packages
npm update
```

#### 2. Package.json

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "Package description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "build": "webpack",
    "test": "jest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0"
  },
  "peerDependencies": {
    "react": ">=16.0.0"
  }
}
```

### Yarn

#### 1. Features

- Faster installation
- Deterministic installs
- Workspaces for monorepos
- Better security

#### 2. Commands

```bash
# Install dependencies
yarn install

# Add package
yarn add package-name

# Add dev dependency
yarn add --dev package-name

# Run scripts
yarn script-name

# Workspaces
yarn workspaces run build
```

### pnpm

#### 1. Features

- Disk space efficient
- Fast installation
- Strict dependency management
- Monorepo support

#### 2. Commands

```bash
# Install dependencies
pnpm install

# Add package
pnpm add package-name

# Run scripts
pnpm run script-name

# Workspaces
pnpm -r run build
```

## Development Tools

### Linting and Formatting

#### 1. ESLint

**Definition**: JavaScript linting utility for identifying and fixing problems.

**Configuration**:

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "prefer-const": "error",
  },
};
```

#### 2. Prettier

**Definition**: Code formatter that enforces consistent style.

**Configuration**:

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Type Checking

#### 1. TypeScript

**Definition**: Typed superset of JavaScript.

**Configuration**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### Development Servers

#### 1. Webpack Dev Server

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
```

#### 2. Vite Dev Server

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
```

## Testing Tools

### Unit Testing

#### 1. Jest

**Definition**: JavaScript testing framework with built-in assertion library.

**Configuration**:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapping: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
};
```

**Example Test**:

```javascript
// Component.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("renders button with correct text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
});

test("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  userEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 2. Vitest

**Definition**: Fast unit test runner for Vite projects.

**Configuration**:

```javascript
// vite.config.js
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
```

### E2E Testing

#### 1. Cypress

**Definition**: End-to-end testing framework for web applications.

**Example Test**:

```javascript
// cypress/integration/login.spec.js
describe("Login", () => {
  it("should login successfully", () => {
    cy.visit("/login");
    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("password");
    cy.get("[data-testid=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
```

#### 2. Playwright

**Definition**: Cross-browser testing framework.

**Example Test**:

```javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";

test("should login successfully", async ({ page }) => {
  await page.goto("/login");
  await page.fill("[data-testid=email]", "user@example.com");
  await page.fill("[data-testid=password]", "password");
  await page.click("[data-testid=submit]");
  await expect(page).toHaveURL(/.*dashboard/);
});
```

## Deployment Tools

### CI/CD

#### 1. GitHub Actions

**Definition**: GitHub's continuous integration and deployment platform.

**Example Workflow**:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to production
        run: npm run deploy
```

#### 2. Netlify

**Definition**: Platform for deploying static sites and serverless functions.

**Configuration**:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Containerization

#### 1. Docker

**Definition**: Platform for developing, shipping, and running applications in containers.

**Dockerfile Example**:

```dockerfile
# Multi-stage build
FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Common Interview Questions

### Q1: Explain the difference between Webpack and Vite

**Answer**:
**Webpack**:

- Bundles all modules before serving
- Slower development server startup
- More mature ecosystem
- Better for complex applications

**Vite**:

- Serves modules on-demand
- Instant server startup
- Built-in HMR
- Better for modern applications

### Q2: How do you optimize bundle size?

**Answer**:

1. **Code Splitting**: Split code into smaller chunks
2. **Tree Shaking**: Remove unused code
3. **Minification**: Remove unnecessary characters
4. **Compression**: Gzip/Brotli compression
5. **External Dependencies**: Load large libraries from CDN
6. **Bundle Analysis**: Use tools like webpack-bundle-analyzer
7. **Dynamic Imports**: Load code on demand

### Q3: What is the difference between dependencies and devDependencies?

**Answer**:
**dependencies**: Packages required for production runtime
**devDependencies**: Packages only needed during development

**Example**:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "jest": "^27.0.0"
  }
}
```

### Q4: How do you set up a monorepo?

**Answer**:

1. **Choose a tool**: Lerna, Nx, Yarn Workspaces, or pnpm
2. **Structure**: Organize packages in a packages/ directory
3. **Shared configuration**: Use root-level configs
4. **Scripts**: Set up build, test, and publish scripts
5. **Versioning**: Use independent or fixed versioning

### Q5: Explain the build process for a React application

**Answer**:

1. **Entry Point**: Start with main entry file
2. **Module Resolution**: Resolve all imports
3. **Transpilation**: Convert JSX and modern JavaScript
4. **Bundling**: Combine all modules
5. **Optimization**: Tree shaking, minification
6. **Asset Processing**: Handle images, CSS, fonts
7. **Output**: Generate production files

## Best Practices

### 1. Build Optimization

- Use production mode for builds
- Enable tree shaking
- Implement code splitting
- Optimize images and assets
- Use appropriate source maps

### 2. Development Workflow

- Use consistent tooling across team
- Implement pre-commit hooks
- Set up automated testing
- Use TypeScript for type safety
- Follow consistent code formatting

### 3. Performance

- Monitor bundle sizes
- Use performance budgets
- Implement lazy loading
- Optimize critical rendering path
- Use CDN for static assets

### 4. Security

- Keep dependencies updated
- Use security scanning tools
- Implement content security policy
- Validate user inputs
- Use HTTPS in production

## Practice Problems

### Problem 1: Set up a Build Pipeline

Create a complete build pipeline with Webpack, testing, and deployment.

### Problem 2: Optimize Bundle Size

Analyze and optimize a large JavaScript bundle using various techniques.

### Problem 3: Create a Monorepo

Set up a monorepo with multiple packages and shared tooling.

### Problem 4: Implement CI/CD

Create a GitHub Actions workflow for automated testing and deployment.

### Problem 5: Build a Component Library

Create a component library with proper build configuration and distribution.

### Problem 6: Set up Testing Infrastructure

Implement comprehensive testing setup with unit, integration, and E2E tests.

### Problem 7: Optimize Development Experience

Configure development tools for optimal developer experience.

### Problem 8: Create a Docker Setup

Containerize a frontend application with multi-stage builds.

---

_This guide covers essential tools and build systems concepts for frontend interviews at Big Tech companies. Focus on understanding modern build tools, package management, and deployment strategies._
