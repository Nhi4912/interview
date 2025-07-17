2:I[5907,["918","static/chunks/918-3273b83890f10546.js","930","static/chunks/930-3262a6c9c5acace4.js","687","static/chunks/app/docs/%5B...slug%5D/page-32962e9542d32755.js"],"default"]
4:I[4707,[],""]
6:I[6423,[],""]
7:I[2,["918","static/chunks/918-3273b83890f10546.js","710","static/chunks/710-dfaa11b4dff08f8e.js","972","static/chunks/972-011bba60ed155615.js","233","static/chunks/233-3e0c1d820a17eca9.js","185","static/chunks/app/layout-333f4adcd11f8f39.js"],"default",1]
3:T5eb7,# Tools & Build Systems Interview Preparation

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

### Build Tools Fundamentals

- **Bundlers**: Webpack, Vite, Rollup, Parcel
- **Transpilers**: Babel, TypeScript, SWC
- **Package Managers**: npm, yarn, pnpm
- **Task Runners**: npm scripts, Gulp, Grunt
- **Development Servers**: Hot reload, HMR, proxy

### Modern Build Features

- **Tree Shaking**: Dead code elimination
- **Code Splitting**: Dynamic imports, chunking
- **Module Federation**: Micro-frontend architecture
- **Source Maps**: Debugging support
- **Asset Optimization**: Minification, compression

## Advanced Topics

### Build Performance

- **Incremental Builds**: Only rebuild changed files
- **Parallel Processing**: Multi-threading builds
- **Caching Strategies**: Persistent cache, build cache
- **Lazy Loading**: On-demand module loading
- **Bundle Analysis**: Size optimization

### Development Experience

- **Hot Module Replacement**: Instant updates
- **Fast Refresh**: React component updates
- **Error Overlay**: In-browser error display
- **Source Maps**: Debug original code
- **Environment Variables**: Configuration management

## Common Interview Questions & Answers

### Build Tools Questions

**Q: What's the difference between Webpack and Vite?**
A:
**Webpack**:

- Bundles everything at build time
- Slower development startup
- More configuration options
- Better for complex applications

**Vite**:

- Uses native ES modules in development
- Instant server startup
- Faster hot reload
- Simpler configuration
- Better for modern applications

**Q: Explain tree shaking and how it works.**
A: Tree shaking eliminates dead code by analyzing import/export statements:

```javascript
// Only used exports are included in bundle
import { add, subtract } from "./math";

console.log(add(1, 2)); // Only 'add' function is included
```

**Q: How does code splitting work in modern bundlers?**
A: Code splitting divides bundles into smaller chunks:

```javascript
// Dynamic import creates separate chunk
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// Route-based splitting
const HomePage = React.lazy(() => import("./pages/HomePage"));
```

### Advanced Questions

**Q: How would you optimize a large webpack bundle?**
A: Multiple optimization strategies:

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
```

**Q: How would you implement Module Federation?**
A: Module Federation allows sharing code between applications:

```javascript
// Host application (webpack.config.js)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote: "remote@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

// Remote application
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

// Usage in host
const RemoteButton = React.lazy(() => import("remote/Button"));
```

## Practical Problems & Solutions

### Problem 1: Create a Custom Webpack Loader

**Challenge**: Build a webpack loader that processes custom file types.

{% raw %}
```javascript
// custom-loader.js
module.exports = function (source) {
  const callback = this.async();

  // Get options
  const options = this.getOptions();

  // Process the source
  let processedSource = source;

  // Example: Replace placeholders
  if (options.replacements) {
    Object.entries(options.replacements).forEach(([key, value]) => {
      processedSource = processedSource.replace(
        new RegExp(`\\{\\{${key}\\}\\}`, "g"),
        value
      );
    });
  }

  // Example: Add metadata
  if (options.addMetadata) {
    processedSource = `/* Generated at ${new Date().toISOString()} */\n${processedSource}`;
  }

  // Example: Transform content
  if (options.transform) {
    processedSource = options.transform(processedSource);
  }

  // Return processed source
  callback(null, processedSource);
};

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.custom$/,
        use: [
          {
            loader: path.resolve("./custom-loader.js"),
            options: {
              replacements: {
                API_URL: "https://api.example.com",
                VERSION: "1.0.0",
              },
              addMetadata: true,
              transform: (source) => source.toUpperCase(),
            },
          },
        ],
      },
    ],
  },
};
```
{% endraw %}

### Problem 2: Implement a Build Pipeline with Gulp

**Challenge**: Create a Gulp build system for a modern web application.

```javascript
// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const del = require("del");
const webpack = require("webpack-stream");

// Clean build directory
function clean() {
  return del(["dist/**/*"]);
}

// Process SCSS
function styles() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// Process JavaScript with Webpack
function scripts() {
  return gulp
    .src("src/js/index.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "bundle.js",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

// Optimize images
function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
}

// Copy HTML files
function html() {
  return gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Watch for changes
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch("src/styles/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/images/**/*", images);
  gulp.watch("src/**/*.html", html);
}

// Development build
const dev = gulp.series(
  clean,
  gulp.parallel(styles, scripts, images, html),
  watch
);

// Production build
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, html));

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.html = html;
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.default = dev;
```

### Problem 3: Create a Custom Babel Plugin

**Challenge**: Build a Babel plugin that transforms code for specific use cases.

```javascript
// babel-plugin-transform-logger.js
module.exports = function({ types: t }) {
  return {
    visitor: {
      // Transform console.log calls
      CallExpression(path) {
        const { node } = path;

        if (
          t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee.object, { name: 'console' }) &&
          t.isIdentifier(node.callee.property, { name: 'log' })
        ) {
          // Add timestamp and file information
          const timestamp = t.stringLiteral(new Date().toISOString());
          const filename = t.stringLiteral(this.file.opts.filename || 'unknown');

          const newArgs = [
            timestamp,
            t.stringLiteral('[' + filename + ']'),
            ...node.arguments
          ];

          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier('console'),
                t.identifier('log')
              ),
              newArgs
            )
          );
        }
      },

      // Transform function declarations to add logging
      FunctionDeclaration(path) {
        const { node } = path;

        if (node.id) {
          // Add function entry logging
          const logStatement = t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier('console'),
                t.identifier('log')
              ),
              [
                t.stringLiteral(`Entering function: ${node.id.name}`),
                ...node.params.map(param =>
                  t.objectProperty(
                    t.identifier(param.name),
                    t.identifier(param.name)
                  )
                )
              ]
            )
          );

          if (node.body.type === 'BlockStatement') {
            node.body.body.unshift(logStatement);
          }
        }
      },

      // Transform arrow functions
      ArrowFunctionExpression(path) {
        const { node } = path;

        // Add performance measurement for arrow functions
        if (path.parent.type === 'VariableDeclarator' && path.parent.id) {
          const functionName = path.parent.id.name;

          const performanceStart = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.identifier('performance'),
                t.identifier('mark')
              ),
              t.callExpression(
                t.memberExpression(
                  t.identifier('performance'),
                  t.identifier('mark')
                ),
                [t.stringLiteral(`${functionName}-start`)]
              )
            )
          );

          const performanceEnd = t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier('performance'),
                t.identifier('mark')
              ),
              [t.stringLiteral(`${functionName}-end`)]
            )
          );

          if (node.body.type === 'BlockStatement') {
            node.body.body.unshift(performanceStart);
            node.body.body.push(performanceEnd);
          }
        }
      }
    }
  };
};

// Usage in .babelrc
{
  "plugins": ["./babel-plugin-transform-logger.js"]
}

// Example transformation
// Before:
function add(a, b) {
  return a + b;
}

// After:
function add(a, b) {
  console.log("Entering function: add", { a, b });
  return a + b;
}
```

### Problem 4: Implement a Custom ESLint Rule

**Challenge**: Create an ESLint rule for enforcing coding standards.

```javascript
// eslint-plugin-custom-rules.js
module.exports = {
  rules: {
    "no-console-in-production": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Disallow console statements in production code",
          category: "Best Practices",
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === "MemberExpression" &&
              node.callee.object.name === "console"
            ) {
              context.report({
                node,
                message:
                  "Console statements are not allowed in production code",
              });
            }
          },
        };
      },
    },

    "prefer-const-over-let": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Prefer const over let when variable is not reassigned",
          category: "Best Practices",
          recommended: true,
        },
        fixable: "code",
        schema: [],
      },
      create(context) {
        return {
          VariableDeclaration(node) {
            if (node.kind === "let") {
              node.declarations.forEach((declarator) => {
                if (declarator.id.type === "Identifier") {
                  const variable = context
                    .getScope()
                    .variables.find((v) => v.name === declarator.id.name);

                  if (
                    variable &&
                    !variable.references.some((ref) => ref.isWrite())
                  ) {
                    context.report({
                      node,
                      message:
                        "Use const instead of let for variables that are not reassigned",
                      fix(fixer) {
                        return fixer.replaceText(
                          node,
                          node.sourceCode.getText(node).replace("let", "const")
                        );
                      },
                    });
                  }
                }
              });
            }
          },
        };
      },
    },

    "no-magic-numbers": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Disallow magic numbers without named constants",
          category: "Best Practices",
          recommended: true,
        },
        fixable: null,
        schema: [
          {
            type: "object",
            properties: {
              ignore: {
                type: "array",
                items: { type: "number" },
              },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const ignore = options.ignore || [0, 1, -1];

        return {
          Literal(node) {
            if (
              typeof node.value === "number" &&
              !ignore.includes(node.value) &&
              node.parent.type !== "VariableDeclarator"
            ) {
              context.report({
                node,
                message: `Magic number ${node.value} should be defined as a named constant`,
              });
            }
          },
        };
      },
    },
  },
};

// Usage in .eslintrc.js
module.exports = {
  plugins: ["custom-rules"],
  rules: {
    "custom-rules/no-console-in-production": "error",
    "custom-rules/prefer-const-over-let": "warn",
    "custom-rules/no-magic-numbers": ["error", { ignore: [0, 1, -1, 100] }],
  },
};
```

### Problem 5: Create a Build Performance Monitor

**Challenge**: Build a system to monitor and optimize build performance.

```javascript
// build-performance-monitor.js
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

class BuildPerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      outputFile: "build-metrics.json",
      threshold: {
        buildTime: 30000, // 30 seconds
        bundleSize: 1024 * 1024, // 1MB
        memoryUsage: 500 * 1024 * 1024, // 500MB
      },
      ...options,
    };

    this.metrics = {
      startTime: null,
      endTime: null,
      duration: 0,
      memoryUsage: [],
      bundleSizes: {},
      warnings: [],
      errors: [],
    };

    this.startTime = null;
  }

  start() {
    this.startTime = performance.now();
    this.metrics.startTime = new Date().toISOString();
    this.metrics.memoryUsage = [];

    // Monitor memory usage
    this.memoryInterval = setInterval(() => {
      const usage = process.memoryUsage();
      this.metrics.memoryUsage.push({
        timestamp: Date.now(),
        heapUsed: usage.heapUsed,
        heapTotal: usage.heapTotal,
        external: usage.external,
      });
    }, 1000);

    console.log("🚀 Build performance monitoring started");
  }

  end() {
    if (!this.startTime) return;

    this.metrics.endTime = new Date().toISOString();
    this.metrics.duration = performance.now() - this.startTime;

    if (this.memoryInterval) {
      clearInterval(this.memoryInterval);
    }

    this.analyzePerformance();
    this.saveMetrics();
    this.generateReport();
  }

  addBundleSize(name, size) {
    this.metrics.bundleSizes[name] = size;
  }

  addWarning(warning) {
    this.metrics.warnings.push({
      message: warning,
      timestamp: Date.now(),
    });
  }

  addError(error) {
    this.metrics.errors.push({
      message: error,
      timestamp: Date.now(),
    });
  }

  analyzePerformance() {
    const { duration, bundleSizes, memoryUsage } = this.metrics;
    const { threshold } = this.options;

    // Check build time
    if (duration > threshold.buildTime) {
      console.warn(
        `⚠️  Build time (${duration.toFixed(2)}ms) exceeds threshold (${
          threshold.buildTime
        }ms)`
      );
    }

    // Check bundle sizes
    Object.entries(bundleSizes).forEach(([name, size]) => {
      if (size > threshold.bundleSize) {
        console.warn(
          `⚠️  Bundle ${name} size (${(size / 1024 / 1024).toFixed(
            2
          )}MB) exceeds threshold (${threshold.bundleSize / 1024 / 1024}MB)`
        );
      }
    });

    // Check memory usage
    const maxMemory = Math.max(...memoryUsage.map((m) => m.heapUsed));
    if (maxMemory > threshold.memoryUsage) {
      console.warn(
        `⚠️  Peak memory usage (${(maxMemory / 1024 / 1024).toFixed(
          2
        )}MB) exceeds threshold (${threshold.memoryUsage / 1024 / 1024}MB)`
      );
    }
  }

  saveMetrics() {
    const outputPath = path.resolve(this.options.outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(this.metrics, null, 2));
    console.log(`📊 Build metrics saved to ${outputPath}`);
  }

  generateReport() {
    const { duration, bundleSizes, memoryUsage, warnings, errors } =
      this.metrics;

    console.log("\n📈 Build Performance Report");
    console.log("========================");
    console.log(`⏱️  Build Duration: ${duration.toFixed(2)}ms`);
    console.log(`📦 Bundle Sizes:`);

    Object.entries(bundleSizes).forEach(([name, size]) => {
      console.log(`   ${name}: ${(size / 1024).toFixed(2)}KB`);
    });

    if (memoryUsage.length > 0) {
      const avgMemory =
        memoryUsage.reduce((sum, m) => sum + m.heapUsed, 0) /
        memoryUsage.length;
      const maxMemory = Math.max(...memoryUsage.map((m) => m.heapUsed));

      console.log(`💾 Memory Usage:`);
      console.log(`   Average: ${(avgMemory / 1024 / 1024).toFixed(2)}MB`);
      console.log(`   Peak: ${(maxMemory / 1024 / 1024).toFixed(2)}MB`);
    }

    if (warnings.length > 0) {
      console.log(`⚠️  Warnings: ${warnings.length}`);
    }

    if (errors.length > 0) {
      console.log(`❌ Errors: ${errors.length}`);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

// Webpack plugin
class BuildPerformancePlugin {
  constructor(options = {}) {
    this.monitor = new BuildPerformanceMonitor(options);
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tap("BuildPerformancePlugin", () => {
      this.monitor.start();
    });

    compiler.hooks.done.tap("BuildPerformancePlugin", (stats) => {
      // Add bundle sizes
      const assets = stats.compilation.assets;
      Object.keys(assets).forEach((name) => {
        if (name.endsWith(".js") || name.endsWith(".css")) {
          this.monitor.addBundleSize(name, assets[name].size());
        }
      });

      // Add warnings and errors
      stats.compilation.warnings.forEach((warning) => {
        this.monitor.addWarning(warning.message);
      });

      stats.compilation.errors.forEach((error) => {
        this.monitor.addError(error.message);
      });

      this.monitor.end();
    });
  }
}

// Usage in webpack.config.js
const BuildPerformancePlugin = require("./build-performance-monitor");

module.exports = {
  // ... webpack config
  plugins: [
    new BuildPerformancePlugin({
      threshold: {
        buildTime: 20000,
        bundleSize: 512 * 1024,
        memoryUsage: 300 * 1024 * 1024,
      },
    }),
  ],
};
```

## Build Optimization Techniques

### Webpack Optimization

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
```

### Vite Configuration

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
    chunkSizeWarningLimit: 1000,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
```

## Best Practices

### Performance

- Use persistent caching
- Implement incremental builds
- Parallelize build tasks
- Optimize bundle splitting
- Monitor build metrics

### Development Experience

- Fast hot reload
- Clear error messages
- Source maps for debugging
- Environment-specific configs
- Automated testing integration

### Production Optimization

- Tree shaking and dead code elimination
- Asset compression and optimization
- CDN integration
- Cache busting strategies
- Bundle analysis and monitoring

## Resources

### Documentation

- [Webpack Documentation](https://webpack.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Babel Documentation](https://babeljs.io/)
- [ESLint Documentation](https://eslint.org/)

### Tools

- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Vite Bundle Analyzer](https://github.com/btd/rollup-plugin-visualizer)
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis
- [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)

### Practice Platforms

- [Webpack Examples](https://github.com/webpack/webpack/tree/master/examples)
- [Vite Examples](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vanilla)
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook)

---

_This guide covers essential build tools and systems for frontend interviews, including practical problems and advanced techniques commonly asked at Big Tech companies._
5:["slug","src/content/frontend/tools/README","c"]
0:["GkGybauu5extr5oVPcZnD",[[["",{"children":["docs",{"children":[["slug","src/content/frontend/tools/README","c"],{"children":["__PAGE__?{\"slug\":[\"src\",\"content\",\"frontend\",\"tools\",\"README\"]}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["docs",{"children":[["slug","src/content/frontend/tools/README","c"],{"children":["__PAGE__",{},[["$L1",["$","div",null,{"style":{"maxWidth":"1200px","margin":"0 auto","padding":"2rem","paddingTop":"6rem"},"children":[["$","div",null,{"style":{"marginBottom":"2rem"},"children":[["$","nav",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"1rem"},"children":[["$","a",null,{"href":"/interview","style":{"color":"#3b82f6","textDecoration":"none"},"children":"Home"}]," > ",["$","span",null,{"children":"src > content > frontend > tools > README"}]]}],["$","h1",null,{"style":{"fontSize":"2.5rem","fontWeight":"800","marginBottom":"0.5rem","color":"#1e293b"},"children":"README"}],["$","div",null,{"style":{"color":"#64748b","fontSize":"0.9rem","marginBottom":"2rem"},"children":[["$","span",null,{"children":["📁 ","src/content/frontend/tools/README.md"]}],"$undefined","$undefined"]}]]}],["$","$L2",null,{"content":"$3"}]]}],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children","$5","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","docs","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/interview/_next/static/css/387024c6a2216908.css","precedence":"next","crossOrigin":"$undefined"}]],["$","$L7",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],"params":{}}]],null],null],["$L8",null]]]]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"README - Frontend Interview Docs"}],["$","meta","3",{"name":"description","content":"# Tools & Build Systems Interview Preparation  ## Table of Contents  - [Core Concepts](#core-concepts) - [Build Tools](#build-tools) - [Package Managers](#packa"}],["$","meta","4",{"property":"og:title","content":"README - Frontend Interview Docs"}],["$","meta","5",{"property":"og:description","content":"# Tools & Build Systems Interview Preparation  ## Table of Contents  - [Core Concepts](#core-concepts) - [Build Tools](#build-tools) - [Package Managers](#packa"}],["$","meta","6",{"property":"og:type","content":"article"}],["$","meta","7",{"name":"twitter:card","content":"summary"}],["$","meta","8",{"name":"twitter:title","content":"README - Frontend Interview Docs"}],["$","meta","9",{"name":"twitter:description","content":"# Tools & Build Systems Interview Preparation  ## Table of Contents  - [Core Concepts](#core-concepts) - [Build Tools](#build-tools) - [Package Managers](#packa"}],["$","meta","10",{"name":"next-size-adjust"}]]
1:null
