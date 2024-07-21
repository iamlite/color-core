const fs = require('fs')
const path = require('path')

function copyFiles(src, dest) {
  const srcStat = fs.statSync(src)

  if (srcStat.isDirectory()) {
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        fs.copyFileSync(srcPath, destPath)
      }
    })
  } else if (srcStat.isFile()) {
    const destPath = path.join(dest, path.basename(src))
    fs.copyFileSync(src, destPath)
  }
}

module.exports = function (context, options) {
  return {
    name: 'docusaurus-fix-sidebar-plugin',
    async loadContent() {
      const docsDir = path.join(context.siteDir, 'docs')
      const rootDir = path.resolve(context.siteDir, '../../')

      const sidebarPath = path.join(context.siteDir, 'docs', 'typedoc-sidebar.cjs')
      const customPagesDir = path.join(context.siteDir, 'pages')
      const typedocIndexPath = path.join(docsDir, 'index.md')
      const changelogPath = path.join(rootDir, 'CHANGELOG.md')

      // Fix sidebar paths
      if (fs.existsSync(sidebarPath)) {
        let sidebarContent = fs.readFileSync(sidebarPath, 'utf8')

        sidebarContent = sidebarContent.replace(/['"]\.\/([^'"]+)['"]/g, "'$1'")
        fs.writeFileSync(sidebarPath, sidebarContent, 'utf8')
        console.log('Typedoc sidebar processed and fixed.')
      } else {
        console.warn('Typedoc sidebar file not found.')
      }

      // Copy custom pages
      if (fs.existsSync(customPagesDir)) {
        copyFiles(customPagesDir, docsDir)
        console.log('Custom pages copied to docs directory.')
      } else {
        console.warn('Custom pages directory not found.')
      }

      // Copy changelog
      if (fs.existsSync(changelogPath)) {
        copyFiles(changelogPath, docsDir)
        console.log('Changelog copied to docs directory.')
      } else {
        console.warn('Changelog file not found.')
      }

      // Remove Typedoc-generated index.md
      if (fs.existsSync(typedocIndexPath)) {
        fs.unlinkSync(typedocIndexPath)
        console.log('Typedoc-generated index.md removed.')
      }
    }
  }
}
