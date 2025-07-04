import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '4fa'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0fc'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '79a'),
            routes: [
              {
                path: '/docs/frontend',
                component: ComponentCreator('/docs/frontend', 'b2e'),
                exact: true
              },
              {
                path: '/docs/frontend-interview-complete-guide',
                component: ComponentCreator('/docs/frontend-interview-complete-guide', 'bb3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/frontend/accessibility',
                component: ComponentCreator('/docs/frontend/accessibility', '83b'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/advanced',
                component: ComponentCreator('/docs/frontend/advanced', '593'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/architecture/frontend-system-design-framework',
                component: ComponentCreator('/docs/frontend/architecture/frontend-system-design-framework', 'f17'),
                exact: true
              },
              {
                path: '/docs/frontend/browser-apis',
                component: ComponentCreator('/docs/frontend/browser-apis', '56d'),
                exact: true
              },
              {
                path: '/docs/frontend/challenges',
                component: ComponentCreator('/docs/frontend/challenges', '41c'),
                exact: true
              },
              {
                path: '/docs/frontend/coding-problems',
                component: ComponentCreator('/docs/frontend/coding-problems', '2f6'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/autocomplete',
                component: ComponentCreator('/docs/frontend/coding-problems/autocomplete', '44a'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/css-grid-dashboard',
                component: ComponentCreator('/docs/frontend/coding-problems/css-grid-dashboard', '6e2'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/css-layout-challenges',
                component: ComponentCreator('/docs/frontend/coding-problems/css-layout-challenges', '789'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/custom-hook',
                component: ComponentCreator('/docs/frontend/coding-problems/custom-hook', '75e'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/dashboard-layout',
                component: ComponentCreator('/docs/frontend/coding-problems/dashboard-layout', '7c5'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/debounce-throttle',
                component: ComponentCreator('/docs/frontend/coding-problems/debounce-throttle', '070'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/debounce-throttle',
                component: ComponentCreator('/docs/frontend/coding-problems/debounce-throttle', '90b'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/drag-and-drop',
                component: ComponentCreator('/docs/frontend/coding-problems/drag-and-drop', '8ef'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/dynamic-table',
                component: ComponentCreator('/docs/frontend/coding-problems/dynamic-table', '442'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/error-boundary',
                component: ComponentCreator('/docs/frontend/coding-problems/error-boundary', '1cf'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/file-uploader',
                component: ComponentCreator('/docs/frontend/coding-problems/file-uploader', '698'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/infinite-scroll',
                component: ComponentCreator('/docs/frontend/coding-problems/infinite-scroll', '309'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/infinite-scroll',
                component: ComponentCreator('/docs/frontend/coding-problems/infinite-scroll', '6fb'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/modal-dialog',
                component: ComponentCreator('/docs/frontend/coding-problems/modal-dialog', 'e63'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/notification-system',
                component: ComponentCreator('/docs/frontend/coding-problems/notification-system', '8c4'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/performance-optimization',
                component: ComponentCreator('/docs/frontend/coding-problems/performance-optimization', '2db'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/react-form-validation',
                component: ComponentCreator('/docs/frontend/coding-problems/react-form-validation', 'f05'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/react-form-validation',
                component: ComponentCreator('/docs/frontend/coding-problems/react-form-validation', 'c7e'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/state-management',
                component: ComponentCreator('/docs/frontend/coding-problems/state-management', 'dda'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/summary',
                component: ComponentCreator('/docs/frontend/coding-problems/summary', 'c19'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/typescript-challenges',
                component: ComponentCreator('/docs/frontend/coding-problems/typescript-challenges', '5c4'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/undo-redo',
                component: ComponentCreator('/docs/frontend/coding-problems/undo-redo', '7c7'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/coding-problems/virtual-scrolling',
                component: ComponentCreator('/docs/frontend/coding-problems/virtual-scrolling', '7bf'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/fundamentals/closure-scope-deep-dive',
                component: ComponentCreator('/docs/frontend/fundamentals/closure-scope-deep-dive', 'c06'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/fundamentals/dom-manipulation-deep-dive',
                component: ComponentCreator('/docs/frontend/fundamentals/dom-manipulation-deep-dive', '6bb'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/fundamentals/event-loop-deep-dive',
                component: ComponentCreator('/docs/frontend/fundamentals/event-loop-deep-dive', 'a2a'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/html-css',
                component: ComponentCreator('/docs/frontend/html-css', '367'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/internationalization',
                component: ComponentCreator('/docs/frontend/internationalization', 'f22'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/interview-strategy/technical-communication',
                component: ComponentCreator('/docs/frontend/interview-strategy/technical-communication', '7b4'),
                exact: true
              },
              {
                path: '/docs/frontend/javascript',
                component: ComponentCreator('/docs/frontend/javascript', 'dc6'),
                exact: true
              },
              {
                path: '/docs/frontend/javascript/fundamentals',
                component: ComponentCreator('/docs/frontend/javascript/fundamentals', '9bf'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/missing-content',
                component: ComponentCreator('/docs/frontend/missing-content', 'f12'),
                exact: true
              },
              {
                path: '/docs/frontend/networking',
                component: ComponentCreator('/docs/frontend/networking', 'd84'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/networking/api-integration',
                component: ComponentCreator('/docs/frontend/networking/api-integration', '7d8'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/performance',
                component: ComponentCreator('/docs/frontend/performance', 'b57'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/performance/lazy-loading',
                component: ComponentCreator('/docs/frontend/performance/lazy-loading', 'ee7'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/projects',
                component: ComponentCreator('/docs/frontend/projects', 'cd6'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/react/advanced-patterns',
                component: ComponentCreator('/docs/frontend/react/advanced-patterns', '832'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/react/core',
                component: ComponentCreator('/docs/frontend/react/core', '280'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/security',
                component: ComponentCreator('/docs/frontend/security', '3b3'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/security/xss-csrf',
                component: ComponentCreator('/docs/frontend/security/xss-csrf', 'cc9'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design',
                component: ComponentCreator('/docs/frontend/system-design', 'c39'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design/component-design',
                component: ComponentCreator('/docs/frontend/system-design/component-design', '20e'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design/design-systems',
                component: ComponentCreator('/docs/frontend/system-design/design-systems', '37f'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design/frontend-architecture',
                component: ComponentCreator('/docs/frontend/system-design/frontend-architecture', '265'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design/performance',
                component: ComponentCreator('/docs/frontend/system-design/performance', 'd8f'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/system-design/state-management',
                component: ComponentCreator('/docs/frontend/system-design/state-management', '352'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/testing',
                component: ComponentCreator('/docs/frontend/testing', '979'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/testing/component-testing',
                component: ComponentCreator('/docs/frontend/testing/component-testing', '7a6'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/tools',
                component: ComponentCreator('/docs/frontend/tools', '841'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/frontend/typescript',
                component: ComponentCreator('/docs/frontend/typescript', '849'),
                exact: true
              },
              {
                path: '/docs/interview-checklist',
                component: ComponentCreator('/docs/interview-checklist', '67f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'aed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/leetcode/array',
                component: ComponentCreator('/docs/leetcode/array', 'c74'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/backtracking',
                component: ComponentCreator('/docs/leetcode/backtracking', '06d'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/design',
                component: ComponentCreator('/docs/leetcode/design', '09b'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/dp',
                component: ComponentCreator('/docs/leetcode/dp', '660'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/linked-list',
                component: ComponentCreator('/docs/leetcode/linked-list', '830'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/math',
                component: ComponentCreator('/docs/leetcode/math', '3f7'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/others',
                component: ComponentCreator('/docs/leetcode/others', '626'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/sorting-searching',
                component: ComponentCreator('/docs/leetcode/sorting-searching', '33e'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/string',
                component: ComponentCreator('/docs/leetcode/string', '8a0'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/leetcode/tree-graph',
                component: ComponentCreator('/docs/leetcode/tree-graph', 'd98'),
                exact: true,
                sidebar: "leetcodeSidebar"
              },
              {
                path: '/docs/progress-tracker',
                component: ComponentCreator('/docs/progress-tracker', 'c37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/templates/behavioral-answer',
                component: ComponentCreator('/docs/templates/behavioral-answer', '711'),
                exact: true
              },
              {
                path: '/docs/templates/system-design-answer',
                component: ComponentCreator('/docs/templates/system-design-answer', '933'),
                exact: true
              },
              {
                path: '/docs/theory-and-visuals',
                component: ComponentCreator('/docs/theory-and-visuals', 'f4b'),
                exact: true,
                sidebar: "theorySidebar"
              },
              {
                path: '/docs/theory-and-visuals/browser-architecture',
                component: ComponentCreator('/docs/theory-and-visuals/browser-architecture', 'e35'),
                exact: true,
                sidebar: "theorySidebar"
              },
              {
                path: '/docs/theory-and-visuals/javascript-engine-deep-dive',
                component: ComponentCreator('/docs/theory-and-visuals/javascript-engine-deep-dive', 'a51'),
                exact: true,
                sidebar: "theorySidebar"
              },
              {
                path: '/docs/theory-and-visuals/knowledge-integration-map',
                component: ComponentCreator('/docs/theory-and-visuals/knowledge-integration-map', 'def'),
                exact: true,
                sidebar: "theorySidebar"
              },
              {
                path: '/docs/theory-and-visuals/network-protocols-deep-dive',
                component: ComponentCreator('/docs/theory-and-visuals/network-protocols-deep-dive', 'ca5'),
                exact: true,
                sidebar: "theorySidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
