window.CMS_MANUAL_INIT = true;

CMS.registerEditorComponent({
  // id uses kebab-case per Decap docs
  id: "image-text-block",
  label: "Image + Text",
  fields: [
    { name: "src", label: "Image", widget: "image" },
    { name: "alt", label: "Image Alt", widget: "string" },
    { name: "content", label: "Text", widget: "markdown" },
  ],
  pattern: /^<ImageTextBlock\s+src="([^"]+)"\s+alt="([^"]*)">([\s\S]*?)<\/ImageTextBlock>$/ms,
  fromBlock: function (match) {
    return {
      src: match[1],
      alt: match[2],
      content: match[3].trim(),
    };
  },
  toBlock: function (obj) {
    return `<ImageTextBlock src="${obj.src}" alt="${obj.alt}">\n${obj.content}\n</ImageTextBlock>`;
  },
  toPreview: function (obj) {
    return `\n<div class="flex flex-col md:flex-row items-center gap-4">\n  <img src="${obj.src}" alt="${obj.alt}" style="width:48%" />\n  <div style="width:48%">${obj.content}</div>\n</div>`;
  },
});

CMS.init();
