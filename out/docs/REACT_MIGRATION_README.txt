2:I[5907,["918","static/chunks/918-3273b83890f10546.js","930","static/chunks/930-3262a6c9c5acace4.js","687","static/chunks/app/docs/%5B...slug%5D/page-32962e9542d32755.js"],"default"]
4:I[4707,[],""]
6:I[6423,[],""]
7:I[2,["918","static/chunks/918-3273b83890f10546.js","710","static/chunks/710-dfaa11b4dff08f8e.js","972","static/chunks/972-011bba60ed155615.js","233","static/chunks/233-3e0c1d820a17eca9.js","185","static/chunks/app/layout-333f4adcd11f8f39.js"],"default",1]
3:T1c1e,# React + Material-UI Migration Guide

## Overview

This project has been migrated from Jekyll to React with Material-UI to solve the knowledge cards clickability issues and provide a more modern, interactive user experience.

## 🚀 Key Improvements

### 1. **Reliable Navigation**

- **Material-UI Cards**: Robust click handling with proper event management
- **React Router**: Client-side routing for instant navigation
- **TypeScript Support**: Better type safety and development experience

### 2. **Modern UI Components**

- **Material-UI Design System**: Consistent, accessible components
- **Dark Theme**: Professional dark theme matching your original design
- **Responsive Design**: Mobile-first approach with breakpoints
- **Interactive Animations**: Smooth hover and click effects

### 3. **Better Developer Experience**

- **Hot Reload**: Instant updates during development
- **Component-Based Architecture**: Reusable, maintainable components
- **Modern Build Tools**: Webpack, Babel, and React Scripts

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header with mobile menu
│   ├── Footer.js              # Footer component
│   └── KnowledgeCard.js       # Clickable knowledge cards
├── pages/
│   ├── HomePage.js            # Main landing page with knowledge map
│   ├── ProgressTracker.js     # Progress tracking page
│   ├── InterviewChecklist.js  # Interview checklist page
│   └── CompleteGuide.js       # Complete guide page
├── App.js                     # Main app with routing
└── index.js                   # App entry point with theme
```

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm start
```

This will start the development server at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

Or use the deployment script:

```bash
./deploy.sh
```

## 🎨 Theme & Styling

### Dark Theme Configuration

The app uses Material-UI's theming system with a custom dark theme:

```javascript
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    secondary: { main: "#8b5cf6" },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  // ... typography and component overrides
});
```

### Card Styling

Knowledge cards have enhanced styling with:

- Hover effects with `translateY(-8px)` and border color changes
- Active states with `scale(0.98)` for click feedback
- Smooth transitions for all interactions
- Proper cursor states and accessibility

## 🔧 Knowledge Cards Implementation

### Key Features

1. **Reliable Click Handling**: Uses React's event system with proper preventDefault
2. **Keyboard Navigation**: Full keyboard support with Tab and Enter/Space
3. **Visual Feedback**: Immediate hover and click animations
4. **Accessibility**: ARIA labels, roles, and screen reader support
5. **Debug Logging**: Console logs for troubleshooting navigation issues

### Example Usage

```jsx
<KnowledgeCard
  title="JavaScript Core"
  description="Master closures, prototypes, async/await..."
  icon="🚀"
  difficulty="Advanced"
  status="completed"
  href="/frontend/javascript"
/>
```

## 🚦 Routing

The app uses React Router for client-side navigation:

```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/progress-tracker" element={<ProgressTracker />} />
  <Route path="/interview-checklist" element={<InterviewChecklist />} />
  <Route
    path="/frontend-interview-complete-guide"
    element={<CompleteGuide />}
  />
  <Route path="/frontend/*" element={<div>Frontend Topic Page</div>} />
  <Route path="/leetcode/*" element={<div>LeetCode Page</div>} />
</Routes>
```

## 📱 Responsive Design

The app is fully responsive with:

- Mobile-first approach
- Collapsible navigation menu for mobile
- Responsive grid layouts
- Touch-friendly interactions

## 🔍 Debugging

### Console Logging

Knowledge cards include debug logging:

```javascript
console.log("Knowledge card clicked:", { title, href });
console.log("Navigating to:", href);
```

### Common Issues

1. **Cards not clicking**: Check browser console for error messages
2. **Navigation not working**: Verify React Router setup and basename
3. **Styling issues**: Check Material-UI theme configuration

## 🚀 Deployment

### GitHub Pages Deployment

1. Update `package.json` homepage field:

   ```json
   "homepage": "https://nhi4912.github.io/interview"
   ```

2. Deploy using the script:

   ```bash
   ./deploy.sh
   ```

3. Or manually:
   ```bash
   npm run build
   npm run deploy
   ```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public` folder
2. Update the homepage in `package.json`
3. Configure DNS settings

## 📋 Migration Checklist

- [x] Convert Jekyll layouts to React components
- [x] Implement Material-UI design system
- [x] Create clickable knowledge cards with proper navigation
- [x] Set up React Router for client-side routing
- [x] Implement responsive design
- [x] Add dark theme matching original design
- [x] Create deployment scripts
- [x] Add accessibility features
- [x] Implement debug logging
- [ ] Migrate all content pages
- [ ] Add progress tracking functionality
- [ ] Implement search functionality
- [ ] Add user authentication (if needed)

## 🔄 Next Steps

1. **Content Migration**: Convert remaining Jekyll content to React components
2. **State Management**: Add Redux or Context API for global state
3. **API Integration**: Connect to backend services for progress tracking
4. **Testing**: Add unit and integration tests
5. **Performance**: Optimize bundle size and loading times
6. **SEO**: Add meta tags and structured data

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**

   ```bash
   npm install
   npm run build
   ```

2. **Deployment Issues**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run deploy
   ```

3. **Routing Issues**
   - Check `basename="/interview"` in BrowserRouter
   - Verify GitHub Pages settings

## 📞 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify all dependencies are installed
3. Ensure Node.js version is compatible
4. Check GitHub Pages deployment status

## 🎯 Benefits of Migration

1. **Solved Clickability Issues**: Knowledge cards now work reliably
2. **Modern Development**: Better tooling and development experience
3. **Improved Performance**: Faster client-side navigation
4. **Better Accessibility**: Enhanced keyboard and screen reader support
5. **Maintainability**: Component-based architecture for easier updates
6. **Scalability**: Easy to add new features and pages

The migration provides a solid foundation for future enhancements while solving the immediate navigation issues with the knowledge cards.
5:["slug","REACT_MIGRATION_README","c"]
0:["7uJ7BVaXJTiEOD9iYDv3n",[[["",{"children":["docs",{"children":[["slug","REACT_MIGRATION_README","c"],{"children":["__PAGE__?{\"slug\":[\"REACT_MIGRATION_README\"]}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["docs",{"children":[["slug","REACT_MIGRATION_README","c"],{"children":["__PAGE__",{},[["$L1",["$","div",null,{"style":{"maxWidth":"1200px","margin":"0 auto","padding":"2rem","paddingTop":"6rem"},"children":[["$","div",null,{"style":{"marginBottom":"2rem"},"children":[["$","nav",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"1rem"},"children":[["$","a",null,{"href":"/","style":{"color":"#3b82f6","textDecoration":"none"},"children":"Home"}]," > ",["$","span",null,{"children":"REACT_MIGRATION_README"}]]}],["$","h1",null,{"style":{"fontSize":"2.5rem","fontWeight":"800","marginBottom":"0.5rem","color":"#1e293b"},"children":"REACT MIGRATION README"}],["$","div",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"2rem"},"children":[["$","span",null,{"children":["📁 ","REACT_MIGRATION_README.md"]}],"$undefined","$undefined"]}]]}],["$","$L2",null,{"content":"$3"}]]}],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children","$5","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/interview/_next/static/css/387024c6a2216908.css","precedence":"next","crossOrigin":"$undefined"}]],["$","$L7",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],"params":{}}]],null],null],["$L8",null]]]]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"REACT MIGRATION README - Frontend Interview Docs"}],["$","meta","3",{"name":"description","content":"# React + Material-UI Migration Guide  ## Overview  This project has been migrated from Jekyll to React with Material-UI to solve the knowledge cards clickabili"}],["$","meta","4",{"property":"og:title","content":"REACT MIGRATION README - Frontend Interview Docs"}],["$","meta","5",{"property":"og:description","content":"# React + Material-UI Migration Guide  ## Overview  This project has been migrated from Jekyll to React with Material-UI to solve the knowledge cards clickabili"}],["$","meta","6",{"property":"og:type","content":"article"}],["$","meta","7",{"name":"twitter:card","content":"summary"}],["$","meta","8",{"name":"twitter:title","content":"REACT MIGRATION README - Frontend Interview Docs"}],["$","meta","9",{"name":"twitter:description","content":"# React + Material-UI Migration Guide  ## Overview  This project has been migrated from Jekyll to React with Material-UI to solve the knowledge cards clickabili"}],["$","meta","10",{"name":"next-size-adjust"}]]
1:null
