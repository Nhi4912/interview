# 🚀 Deployment Guide for GitHub Pages

This guide will help you deploy your Frontend Interview Guide to GitHub Pages using Docusaurus.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- GitHub account

## 🛠️ Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Move Content to Docs Folder

```bash
# Create docs directory if it doesn't exist
mkdir -p docs

# Copy all content to docs folder
cp -r frontend docs/
cp -r leetcode docs/
cp -r theory-and-visuals docs/
cp -r system-design docs/
cp -r templates docs/
cp -r mock-interviews docs/

# Copy main markdown files
cp frontend-interview-complete-guide.md docs/
cp interview-checklist.md docs/
cp progress-tracker.md docs/
```

### 3. Test Locally

```bash
npm start
```

Visit `http://localhost:3000` to see your site.

### 4. Build for Production

```bash
npm run build
```

This creates a `build` folder with your static site.

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This will:

- Build your site
- Create a `gh-pages` branch
- Push the built files to GitHub
- Make your site available at `https://nhi4912.github.io`

## 🔧 Configuration

### Docusaurus Config

The `docusaurus.config.js` file is already configured for:

- **URL**: `https://nhi4912.github.io`
- **Base URL**: `/`
- **Organization**: `nhi4912`
- **Project**: `nhi4912.github.io`
- **Deployment Branch**: `gh-pages`

### Sidebar Configuration

The `sidebars.js` file organizes your content into:

- **Guide**: Main documentation
- **Frontend**: Frontend topics
- **LeetCode**: Algorithm problems
- **Theory**: Deep dive theory

## 📁 File Structure

After setup, your structure should look like:

```
interview/
├── docs/
│   ├── frontend/
│   ├── leetcode/
│   ├── theory-and-visuals/
│   ├── system-design/
│   ├── templates/
│   ├── mock-interviews/
│   ├── intro.md
│   ├── frontend-interview-complete-guide.md
│   ├── interview-checklist.md
│   └── progress-tracker.md
├── src/
│   └── css/
│       └── custom.css
├── static/
│   └── img/
├── docusaurus.config.js
├── sidebars.js
├── package.json
└── README.md
```

## 🎯 Customization

### Adding Images

Place images in `static/img/` and reference them as `/img/filename.png`

### Custom Styling

Edit `src/css/custom.css` to customize the appearance.

### Navigation

Update `docusaurus.config.js` to modify the navbar and footer.

## 🚀 Automated Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (requires 18+)
2. **Missing dependencies**: Run `npm install`
3. **Deploy fails**: Ensure you have write access to the repository
4. **Site not updating**: Clear browser cache or wait a few minutes

### Local Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Serve built files locally
npm run serve
```

## 📊 Performance Optimization

### Build Optimization

- Images are automatically optimized
- CSS and JS are minified
- Static assets are cached

### SEO

- Meta tags are automatically generated
- Sitemap is created
- Open Graph tags are included

## 🔒 Security

- HTTPS is enforced on GitHub Pages
- Content Security Policy is configured
- No sensitive data in the repository

## 📈 Analytics (Optional)

Add Google Analytics to `docusaurus.config.js`:

```javascript
module.exports = {
  // ... other config
  plugins: [
    [
      "@docusaurus/plugin-google-analytics",
      {
        trackingID: "G-XXXXXXXXXX",
      },
    ],
  ],
};
```

## 🎉 Success!

Once deployed, your site will be available at:
**https://nhi4912.github.io**

The site will automatically update when you push changes to the main branch and run `npm run deploy`.

---

## 📚 Next Steps

1. **Customize the design** by editing `src/css/custom.css`
2. **Add more content** to the `docs/` folder
3. **Set up analytics** to track visitors
4. **Add a custom domain** if desired
5. **Share your guide** with the community!

## 🤝 Contributing

To contribute to the guide:

1. Fork the repository
2. Make your changes
3. Test locally with `npm start`
4. Submit a pull request

---

**Need help?** Check the [Docusaurus documentation](https://docusaurus.io/docs) or create an issue in the repository.
