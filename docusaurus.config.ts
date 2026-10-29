import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import sidebars from './sidebars';
import redirects from './redirects.json';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AWS Pro Architect Prep',
  tagline: 'Master AWS and pass the AWS Certified Solutions Architect – Professional (SAP-C02) exam',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://adavoudi.info',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/aws-sap/',
  // GitHub Pages serves each page as <path>/index.html and 301-redirects the
  // slash-less URL, so canonicals and sitemap entries must end with a slash.
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'adavoudi', // Usually your GitHub org/user name.
  projectName: 'aws-sap', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://adavoudi.info/aws-sap/#website',
            url: 'https://adavoudi.info/aws-sap/',
            name: 'AWS Pro Architect Prep',
            description:
              'Free study guide for the AWS Certified Solutions Architect – Professional (SAP-C02) exam.',
            inLanguage: 'en',
            author: {'@id': 'https://adavoudi.info/#person'},
            publisher: {'@id': 'https://adavoudi.info/#person'},
          },
          {
            '@type': 'Person',
            '@id': 'https://adavoudi.info/#person',
            name: 'Alireza Davoudi',
            url: 'https://adavoudi.info/',
            sameAs: [
              'https://github.com/adavoudi',
              'https://www.linkedin.com/in/alireza-davoudi/',
            ],
          },
        ],
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-3FWPK6J51D',
          anonymizeIP: false,
        },
        docs: {
          // Docs carry short `slug`s at the site root, e.g. /aws-sap/compute/aws-lambda/
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/adavoudi/aws-sap/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/aws-sap/tags/**', '/aws-sap/search/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
      
    ],
  ],

  plugins: [
    // Old /docs/<Category>/<Subcategory>/<Service> URLs forward to the short slugs
    ['@docusaurus/plugin-client-redirects', {redirects}],
  ],

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    metadata: [{name: 'author', content: 'Alireza Davoudi'}],
    navbar: {
      title: 'AWS Pro Architect Prep',
      logo: {
        alt: 'AWS Pro Architect Prep logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/adavoudi/aws-sap',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://adavoudi.info/posts',
          label: 'Blog',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://adavoudi.info/">Alireza Davoudi</a>. AWS Pro Architect Prep is an independent study guide, not affiliated with Amazon Web Services.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
