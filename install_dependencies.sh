#!/bin/bash

echo "📦 Installing Material-UI dependencies..."

# Install core Material-UI packages
npm install @mui/material @emotion/react @emotion/styled

# Install Material-UI icons (if needed)
npm install @mui/icons-material

# Install Next.js specific Material-UI package
npm install @mui/material-nextjs

# Install Emotion cache for Next.js
npm install @emotion/cache

echo "✅ Dependencies installed successfully!"
echo "🔨 Building project..."

# Try building again
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Now committing and pushing..."
    
    # Add all changes including package files
    git add .
    
    # Commit with updated message
    git commit -m "fix: install Material-UI dependencies and update GitHub Actions

- Add @mui/material, @emotion/react, @emotion/styled
- Add @mui/material-nextjs and @emotion/cache for Next.js integration
- Update GitHub Actions to use non-deprecated artifact versions
- Resolves build errors and deployment issues"
    
    # Push to main
    git push origin main
    
    echo "🚀 Successfully deployed!"
else
    echo "❌ Build still failing. Check the error messages above."
fi