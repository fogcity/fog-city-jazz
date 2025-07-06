export default function remarkImageTextBlock() {
  return (tree) => {
    const hasImport = tree.children.some(
      (node) => node.type === 'mdxjsEsm' && /ImageTextBlock/.test(node.value || '')
    );
    if (!hasImport) {
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: "import ImageTextBlock from '@components/ImageTextBlock.astro';",
      });
    }
  };
}
