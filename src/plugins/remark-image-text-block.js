export default function remarkImageTextBlock() {
  return (tree) => {
    const hasImport = tree.children.some(
      (node) => node.type === 'mdxjsEsm' && /ImageTextBlock/.test(node.value || '')
    );
    if (hasImport) return;

    const importNode = {
      type: 'mdxjsEsm',
      value: "import ImageTextBlock from '@components/ImageTextBlock.astro';",
    };

    const insertIndex = tree.children.findIndex((n) => n.type !== 'yaml');
    if (insertIndex === -1) {
      tree.children.push(importNode);
    } else {
      tree.children.splice(insertIndex, 0, importNode);
    }
  };
}
