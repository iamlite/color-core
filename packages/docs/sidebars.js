const typedocSidebar = require('./docs/typedoc-sidebar.cjs')

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Welcome',
      items: ['home', 'getting-started', 'color-spaces', 'color-harmonies'],
      collapsible: false,
      collapsed: false
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['color-theory', 'color-representation', 'color-in-data-visualization', 'color-schemes-for-branding'],
      collapsible: false,
      collapsed: false
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: typedocSidebar,
      collapsible: false,
      collapsed: false
    },
    {
      type: 'doc',
      label: 'Changelog',
      id: 'changelog'
    }
  ]
}
