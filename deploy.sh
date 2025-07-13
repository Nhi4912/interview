#!/bin/bash

# React + Material-UI Deployment Script for GitHub Pages

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🔗 Your site will be available at: https://nhi4912.github.io/interview"
echo ""
echo "📝 Note: It may take a few minutes for changes to appear on GitHub Pages."