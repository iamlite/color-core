const lightCodeTheme = require('prism-react-renderer').themes.github
const darkCodeTheme = require('prism-react-renderer').themes.dracula

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://docs.color-core.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'iamlite',
  projectName: 'color-core-docs',

  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../color-core/src/index.ts'],
        tsconfig: './tsconfig.json',
        out: '/docs',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
        interfacePropertiesFormat: 'table',
        classPropertiesFormat: 'table',
        enumMembersFormat: 'table',
        typeDeclarationFormat: 'table',
        propertyMembersFormat: 'table',
        parametersFormat: 'table',
        entryModule: 'home'
      }
    ],
    [require.resolve('./fix-sidebar-plugin'), {}]
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/iamlite/color-core/edit/main//packages/docs/website/',
          routeBasePath: '/',
          path: 'docs'
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        logo: {
          alt: 'Color Core Logo',
          src: '/img/color-core-dark.png',
          srcDark: '/img/color-core-light.png'
        }
      },
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} color-core`,
        links: [
          {
            href: 'https://github.com/iamlite/color-core',
            label: 'GitHub'
          },
          {
            href: 'https://www.npmjs.com/package/color-core',
            label: 'NPM'
          },
          {
            href: 'https://www.color-core.com',
            label: 'Website'
          }
        ]
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }
}
