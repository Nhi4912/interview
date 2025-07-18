# Frontend Interview Preparation Website

A comprehensive frontend interview preparation website built with Next.js and TypeScript. This website serves as a personal learning platform to prepare for technical interviews at major tech companies.

## Features

- 📚 Comprehensive content covering frontend development, algorithms, system design, and more
- 🔍 Powerful search capabilities to quickly find specific information
- 🌙 Dark mode support for comfortable reading
- 📊 Progress tracking to monitor your interview preparation
- 📱 Responsive design that works on desktop and mobile devices
- 🧠 Knowledge visualization to understand relationships between concepts
- 🧩 Interactive code examples to better understand implementation details

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 8.0.0 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/frontend-interview-prep-website.git
cd frontend-interview-prep-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
frontend-interview-prep-website/
├── .github/            # GitHub Actions workflows
├── .kiro/              # Kiro specs and configurations
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── content/        # Content processing utilities
│   ├── data/           # Static data and configurations
│   ├── lib/            # Utility functions
│   ├── styles/         # Global styles and theme
│   └── types/          # TypeScript type definitions
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.