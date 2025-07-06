import { parse, stringify } from 'yaml'

/**
 * Inject the ImageTextBlock import into a `setup` frontmatter field so that
 * Astro's content pipeline allows the component.
 */
export default function remarkImageTextBlock() {
  return (tree, file) => {
    const frontmatter = tree.children.find((n) => n.type === 'yaml')
    const importLine = "import ImageTextBlock from '@components/ImageTextBlock.astro'"

    if (frontmatter) {
      let data = {}
      try {
        data = parse(frontmatter.value) || {}
      } catch {}

      const current = data.setup ? String(data.setup).trim() : ''
      if (!current.includes('ImageTextBlock')) {
        data.setup = current ? `${current}\n${importLine}` : importLine
        frontmatter.value = stringify(data).trimEnd()
      }
      file.data ||= {}
      file.data.astro ||= {}
      file.data.astro.frontmatter = data
    } else {
      const data = { setup: importLine }
      tree.children.unshift({
        type: 'yaml',
        value: stringify(data).trimEnd(),
      })
      file.data ||= {}
      file.data.astro ||= {}
      file.data.astro.frontmatter = data
    }
  }
}
