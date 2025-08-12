// currently unused

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function setupCMS(CMS: any) {
  CMS.registerEditorComponent({
    // id uses kebab-case per Decap docs
    id: "image-text-block",
    label: "Image + Text",
    fields: [
      { name: "src", label: "Image", widget: "image" },
      { name: "alt", label: "Image Alt", widget: "string", required: false },
      {
        name: "imageWidth",
        label: "Image Width (%)",
        widget: "number",
        default: 50,
      },
      {
        name: "imageOnLeft",
        label: "Image on Left",
        widget: "boolean",
        default: true,
      },
      {
        name: "topAlign",
        label: "Top Align Text",
        widget: "boolean",
        default: false,
      },
      { name: "content", label: "Text", widget: "markdown" },
    ],
    pattern: /^<ImageTextBlock([^>]*)>([\s\S]*?)<\/ImageTextBlock>$/ms,
    fromBlock: function (match) {
      const attrs = match[1]
      const get = (regex: RegExp, d: string) => {
        const m = attrs.match(regex)
        return m ? m[1] : d
      }
      const src = get(/src="([^"]+)"/, "")
      const alt = get(/alt="([^"]*)"/, "")
      const imageWidth = parseInt(get(/imageWidth=["{]?([^"]+)["}]?/, "50"), 10)
      const imageOnLeft =
        get(/imageOnLeft=["{]?([^"]+)["}]?/, "true") === "true"
      const topAlign = get(/topAlign=["{]?([^"]+)["}]?/, "false") === "true"
      return {
        src,
        alt,
        imageWidth,
        imageOnLeft,
        topAlign,
        content: match[2].trim(),
      }
    },
    toBlock: function (obj: any) {
      const alt = obj.alt && obj.alt.trim() ? obj.alt : "image"
      const width = obj.imageWidth ?? 50
      const left = obj.imageOnLeft ?? true
      const top = obj.topAlign ?? false
      return `<ImageTextBlock src="${obj.src}" alt="${alt}" imageWidth={${width}} imageOnLeft={${left}} topAlign={${top}}>\n${obj.content}\n</ImageTextBlock>`
    },
    toPreview: function (obj: any) {
      const width = obj.imageWidth ?? 50
      const textWidth = 100 - width
      const row = obj.imageOnLeft ? "" : "md:flex-row-reverse"
      const align = obj.topAlign ? "items-start" : "items-center"
      return `\n<div class="flex flex-col md:flex-row gap-4 w-full ${align} ${row}">\n  <img src="${obj.src}" alt="${obj.alt}" style="width:${width}%" />\n  <div style="width:${textWidth}%">${obj.content}</div>\n</div>`
    },
  })

  CMS.registerEditorComponent({
    id: "soundcloud-embed",
    label: "SoundCloud",
    fields: [
      { name: "title", label: "Title", widget: "string", required: false },
      {
        name: "description",
        label: "Description",
        widget: "string",
        required: false,
      },
      { name: "iframe", label: "Embed Code", widget: "text" },
    ],
    // Allow any characters (including ">" from the iframe HTML) in the attribute
    // string so the component is correctly detected by Decap.
    pattern: /^<SoundCloudEmbed([\s\S]*?)\/>$/ms,
    fromBlock: function (match) {
      const attrs = match[1]
      const get = (regex: RegExp, d: string) => {
        const m = attrs.match(regex)
        return m ? m[1] : d
      }
      const title = get(/title="([^"]*)"/, "")
      const description = get(/description="([^"]*)"/, "")
      const iframe = get(/iframe={[`']([\s\S]*?)[`']}/, "")
      return {
        title,
        description,
        iframe,
      }
    },
    toBlock: function (obj: any) {
      const title = obj.title ?? ""
      const description = obj.description ?? ""
      const iframe = obj.iframe ?? ""
      return `<SoundCloudEmbed title="${title}" description="${description}" iframe={\`${iframe}\`} />`
    },
    toPreview: function (obj: any) {
      const title = obj.title ? `<strong>${obj.title}</strong>` : ""
      const description = obj.description ? `<p>${obj.description}</p>` : ""
      return `${title}${description}${obj.iframe}`
    },
  })
}
