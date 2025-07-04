// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Frontend Interview Preparation Guide",
  tagline: "Complete guide for frontend developer interviews",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://nhi4912.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/interview/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Nhi4912", // Usually your GitHub org/user name.
  projectName: "interview", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Nhi4912/interview/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Nhi4912/interview/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Frontend Interview Guide",
        logo: {
          alt: "Frontend Interview Guide Logo",
          src: "img/logo.jpg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Guide",
          },
          {
            type: "docSidebar",
            sidebarId: "frontendSidebar",
            position: "left",
            label: "Frontend",
          },
          {
            type: "docSidebar",
            sidebarId: "leetcodeSidebar",
            position: "left",
            label: "LeetCode",
          },
          {
            type: "docSidebar",
            sidebarId: "theorySidebar",
            position: "left",
            label: "Theory",
          },
          {
            href: "https://github.com/Nhi4912/interview",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Frontend Guide",
                to: "/docs/frontend-interview-complete-guide",
              },
              {
                label: "Interview Checklist",
                to: "/docs/interview-checklist",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Nhi4912/interview",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Frontend Interview Guide. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ["typescript", "javascript", "json", "bash"],
      },
    }),
};

module.exports = config;
