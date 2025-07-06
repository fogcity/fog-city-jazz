window.CMS_MANUAL_INIT = true;

CMS.registerEditorComponent({
  id: "ImageTextBlock",
  label: "Image + Text",
  fields: [
    { name: "src", label: "Image URL", widget: "string" },
    { name: "alt", label: "Image Alt", widget: "string" },
    { name: "content", label: "Text", widget: "markdown" },
  ],
  pattern: /<ImageTextBlock\s+src="([^"]+)"\s+alt="([^"]+)">([\s\S]*?)<\/ImageTextBlock>/m,
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
    return `<div class="flex flex-col md:flex-row items-center gap-4"><img src="${obj.src}" alt="${obj.alt}" style="width:48%;"/><div style="width:48%;">${obj.content}</div></div>`;
  },
});

CMS.init();
