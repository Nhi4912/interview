/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "frontend-interview-complete-guide",
      label: "Complete Guide",
    },
    {
      type: "doc",
      id: "interview-checklist",
      label: "Interview Checklist",
    },
    {
      type: "doc",
      id: "progress-tracker",
      label: "Progress Tracker",
    },
  ],

  frontendSidebar: [
    {
      type: "category",
      label: "JavaScript",
      items: [
        "frontend/javascript/fundamentals",
        "frontend/fundamentals/closure-scope-deep-dive",
        "frontend/fundamentals/dom-manipulation-deep-dive",
        "frontend/fundamentals/event-loop-deep-dive",
      ],
    },
    {
      type: "category",
      label: "React",
      items: ["frontend/react/core", "frontend/react/advanced-patterns"],
    },
    {
      type: "category",
      label: "HTML & CSS",
      items: ["frontend/html-css/README"],
    },
    {
      type: "category",
      label: "System Design",
      items: [
        "frontend/system-design/README",
        "frontend/system-design/frontend-architecture",
        "frontend/system-design/component-design",
        "frontend/system-design/state-management",
        "frontend/system-design/performance",
        "frontend/system-design/design-systems",
      ],
    },
    {
      type: "category",
      label: "Performance",
      items: [
        "frontend/performance/README",
        "frontend/performance/lazy-loading",
      ],
    },
    {
      type: "category",
      label: "Networking",
      items: [
        "frontend/networking/README",
        "frontend/networking/api-integration",
      ],
    },
    {
      type: "category",
      label: "Testing",
      items: ["frontend/testing/README", "frontend/testing/component-testing"],
    },
    {
      type: "category",
      label: "Security",
      items: ["frontend/security/README", "frontend/security/xss-csrf"],
    },
    {
      type: "category",
      label: "Accessibility",
      items: ["frontend/accessibility/README"],
    },
    {
      type: "category",
      label: "Internationalization",
      items: ["frontend/internationalization/README"],
    },
    {
      type: "category",
      label: "Advanced Topics",
      items: ["frontend/advanced/README"],
    },
    {
      type: "category",
      label: "Tools & Build Systems",
      items: ["frontend/tools/README"],
    },
    {
      type: "category",
      label: "Projects & Practice",
      items: ["frontend/projects/README"],
    },
    {
      type: "category",
      label: "Coding Problems",
      items: [
        "frontend/coding-problems/README",
        "frontend/coding-problems/01-dynamic-table",
        "frontend/coding-problems/02-debounce-throttle",
        "frontend/coding-problems/03-react-form-validation",
        "frontend/coding-problems/04-virtual-scrolling",
        "frontend/coding-problems/05-state-management",
        "frontend/coding-problems/06-autocomplete",
        "frontend/coding-problems/07-infinite-scroll",
        "frontend/coding-problems/08-modal-dialog",
        "frontend/coding-problems/09-file-uploader",
        "frontend/coding-problems/10-notification-system",
        "frontend/coding-problems/11-drag-and-drop",
        "frontend/coding-problems/12-dashboard-layout",
        "frontend/coding-problems/13-undo-redo",
        "frontend/coding-problems/14-custom-hook",
        "frontend/coding-problems/15-error-boundary",
        "frontend/coding-problems/typescript-challenges",
        "frontend/coding-problems/css-grid-dashboard",
        "frontend/coding-problems/css-layout-challenges",
        "frontend/coding-problems/performance-optimization",
        "frontend/coding-problems/summary",
      ],
    },
  ],

  leetcodeSidebar: [
    {
      type: "category",
      label: "Array",
      items: ["leetcode/array/README"],
    },
    {
      type: "category",
      label: "String",
      items: ["leetcode/string/README"],
    },
    {
      type: "category",
      label: "Linked List",
      items: ["leetcode/linked-list/README"],
    },
    {
      type: "category",
      label: "Tree & Graph",
      items: ["leetcode/tree-graph/README"],
    },
    {
      type: "category",
      label: "Dynamic Programming",
      items: ["leetcode/dp/README"],
    },
    {
      type: "category",
      label: "Backtracking",
      items: ["leetcode/backtracking/README"],
    },
    {
      type: "category",
      label: "Design",
      items: ["leetcode/design/README"],
    },
    {
      type: "category",
      label: "Math",
      items: ["leetcode/math/README"],
    },
    {
      type: "category",
      label: "Sorting & Searching",
      items: ["leetcode/sorting-searching/README"],
    },
    {
      type: "category",
      label: "Others",
      items: ["leetcode/others/README"],
    },
  ],

  theorySidebar: [
    {
      type: "doc",
      id: "theory-and-visuals/README",
      label: "Theory Overview",
    },
    {
      type: "doc",
      id: "theory-and-visuals/javascript-engine-deep-dive",
      label: "JavaScript Engine",
    },
    {
      type: "doc",
      id: "theory-and-visuals/browser-architecture",
      label: "Browser Architecture",
    },
    {
      type: "doc",
      id: "theory-and-visuals/network-protocols-deep-dive",
      label: "Network Protocols",
    },
    {
      type: "doc",
      id: "theory-and-visuals/js-event-loop",
      label: "JS Event Loop",
    },
    {
      type: "doc",
      id: "theory-and-visuals/js-closure-scope",
      label: "JS Closures & Scope",
    },
    {
      type: "doc",
      id: "theory-and-visuals/html-css-visuals",
      label: "HTML & CSS Visuals",
    },
    {
      type: "doc",
      id: "theory-and-visuals/networking-visuals",
      label: "Networking Visuals",
    },
    {
      type: "doc",
      id: "theory-and-visuals/react-suspense-concurrent",
      label: "React Suspense & Concurrent",
    },
    {
      type: "doc",
      id: "theory-and-visuals/knowledge-integration-map",
      label: "Knowledge Integration",
    },
  ],
};

module.exports = sidebars;
