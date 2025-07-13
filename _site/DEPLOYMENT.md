# GitHub Pages Deployment Guide

This guide explains how to deploy your frontend interview preparation materials to GitHub Pages for easy access and review.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy your site

### 2. Access Your Site

Your site will be available at: `https://[username].github.io/[repository-name]/`

For example: `https://yourusername.github.io/interview/`

## 📁 File Structure

The following files have been created for GitHub Pages:

```
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Main landing page
├── assets/css/style.scss # Custom styling
├── _layouts/code.html   # Layout for code problems
├── .github/workflows/pages.yml # Auto-deployment
└── DEPLOYMENT.md        # This file
```

## 🎨 Features

- **Responsive Design**: Mobile-friendly layout
- **Syntax Highlighting**: Beautiful code formatting for TypeScript/JavaScript
- **Navigation**: Easy access to all materials
- **Search**: Jekyll's built-in search functionality
- **Auto-deployment**: Automatically updates when you push to main

## 🔧 Local Development

To test locally before deployment:

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## 📝 Customization

### Adding New Content

1. **Markdown files**: Automatically rendered as pages
2. **TypeScript files**: Displayed with syntax highlighting
3. **Collections**: Organized in `frontend/` and `leetcode/` directories

### Updating Styles

Edit `assets/css/style.scss` to customize:
- Colors and themes
- Typography
- Layout components
- Responsive breakpoints

### Navigation Updates

Modify `index.md` to:
- Add new sections
- Update links
- Change organization

## 🏗️ Build Process

The GitHub Actions workflow:

1. **Triggers**: On push to main branch
2. **Setup**: Ruby environment and Jekyll
3. **Build**: Generates static site
4. **Deploy**: Publishes to GitHub Pages

## ✅ Verification

After deployment, verify:

- [ ] Site loads correctly
- [ ] All markdown files render properly
- [ ] TypeScript code has syntax highlighting
- [ ] Navigation links work
- [ ] Mobile responsive design
- [ ] Fast loading times

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check `_config.yml` syntax
2. **Styles not loading**: Verify `assets/css/style.scss` format
3. **Links broken**: Ensure relative paths are correct
4. **Slow loading**: Optimize images and minimize content

### Debugging

1. Check **Actions** tab for build logs
2. Test locally with `bundle exec jekyll serve`
3. Validate markdown syntax
4. Review Jekyll documentation

## 📊 Analytics (Optional)

To add Google Analytics:

1. Add tracking ID to `_config.yml`:
   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```

2. The minima theme will automatically include tracking

## 🔒 Security

- Static site generation (no server-side code)
- HTTPS enabled by default
- No sensitive data exposure
- Regular dependency updates via Dependabot

---

Your interview preparation materials are now accessible via a professional, searchable website that you can easily share and access from any device!