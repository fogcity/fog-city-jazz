export default defineDecapConfig({
  collections: {
    pages: {
      label: "Pages",
      path: "src/content/pages",
      frontmatter: {
        schema: {
          hero: {
            type: "object",
            label: "Hero Section",
            fields: {
              image: {
                type: "image",
                label: "Background Image",
                required: true,
              },
              video: { type: "string", label: "Background Video (optional)" },
              title: { type: "string", label: "Title", required: true },
              subtitle: { type: "string", label: "Subtitle", required: true },
              cta: {
                type: "object",
                label: "CTA Button",
                fields: {
                  text: {
                    type: "string",
                    label: "Button Text",
                    required: true,
                  },
                  href: { type: "string", label: "Link HREF", required: true },
                  primary: {
                    type: "boolean",
                    label: "Solid Button?",
                    default: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})
