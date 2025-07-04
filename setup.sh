#!/bin/bash

# Frontend Interview Guide - Setup Script for GitHub Pages
echo "🚀 Setting up Frontend Interview Guide for GitHub Pages..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create docs directory if it doesn't exist
echo "📁 Creating docs directory..."
mkdir -p docs

# Copy content to docs folder
echo "📋 Moving content to docs folder..."
cp -r frontend docs/ 2>/dev/null || echo "⚠️  frontend folder not found"
cp -r leetcode docs/ 2>/dev/null || echo "⚠️  leetcode folder not found"
cp -r theory-and-visuals docs/ 2>/dev/null || echo "⚠️  theory-and-visuals folder not found"
cp -r system-design docs/ 2>/dev/null || echo "⚠️  system-design folder not found"
cp -r templates docs/ 2>/dev/null || echo "⚠️  templates folder not found"
cp -r mock-interviews docs/ 2>/dev/null || echo "⚠️  mock-interviews folder not found"

# Copy main markdown files
echo "📄 Copying main documentation files..."
cp frontend-interview-complete-guide.md docs/ 2>/dev/null || echo "⚠️  frontend-interview-complete-guide.md not found"
cp interview-checklist.md docs/ 2>/dev/null || echo "⚠️  interview-checklist.md not found"
cp progress-tracker.md docs/ 2>/dev/null || echo "⚠️  progress-tracker.md not found"

# Create intro.md if it doesn't exist
if [ ! -f "docs/intro.md" ]; then
    echo "📝 Creating intro.md..."
    cat > docs/intro.md << 'EOF'
---
sidebar_position: 1
---

# Frontend Interview Preparation Guide

Welcome to the comprehensive Frontend Interview Preparation Guide designed specifically for Big Tech companies.

## 🎯 Quick Start

1. **Follow the [Interview Checklist](./interview-checklist)** for a 6-week plan
2. **Study by topic** using the navigation menu
3. **Practice coding** with LeetCode problems
4. **Build projects** from the Projects & Practice section

## 🏢 Target Companies

- **Google** - Algorithm focus, system design, "Googleyness"
- **Meta (Facebook)** - React deep dive, performance, impact
- **Amazon** - Leadership principles, system design, customer focus
- **Microsoft** - Problem solving, collaboration, technical depth
- **Apple** - Quality focus, user experience, attention to detail
- **Netflix** - Performance, scalability, innovation

## 🚀 Ready to Start?

Begin with the [Interview Checklist](./interview-checklist) or dive into [JavaScript Fundamentals](./frontend/javascript/fundamentals).
EOF
fi

echo "✅ Setup complete!"

# Ask user if they want to start development server
echo ""
read -p "🎯 Would you like to start the development server? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting development server..."
    echo "📱 Visit http://localhost:3000 to see your site"
    npm start
fi

echo ""
echo "📚 Next steps:"
echo "1. Review the content in the docs/ folder"
echo "2. Customize docusaurus.config.js if needed"
echo "3. Run 'npm run build' to build for production"
echo "4. Run 'npm run deploy' to deploy to GitHub Pages"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 