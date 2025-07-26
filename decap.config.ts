export default defineDecapConfig({
  collections: {
    pages: {
      label: "Pages",
      path: "src/content/pages",
      frontmatter: {
        schema: {
          title: { type: "string", label: "Title", required: true },
          heroTitle: { type: "string", label: "Hero Title", required: true },
          description: { type: "string", label: "Description" },
          ctaText: { type: "string", label: "CTA Text" },
          ctaLink: { type: "string", label: "CTA Link" },
          hero: {
            type: "object",
            label: "Hero Media",
            fields: {
              image: {
                type: "image",
                label: "Background Image",
                required: true,
              },
              video: { type: "string", label: "Background Video (optional)" },
            },
          },
        },
      },
    },
  },
})
