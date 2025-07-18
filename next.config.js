const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-gfm'),
      require('remark-frontmatter'),
      [require('remark-mdx-frontmatter'), { name: 'frontMatter' }],
    ],
    rehypePlugins: [require('rehype-raw'), require('rehype-highlight')],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    // We'll handle ESLint errors during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // We'll handle TypeScript errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
