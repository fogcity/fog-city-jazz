/* eslint-disable @typescript-eslint/no-explicit-any */
// Register custom Decap CMS editor components
export default function setupCMS(CMS: any) {
  const getAttr = (attrs: string, name: string, fallback: string) => {
    const re = new RegExp(`${name}=(?:"([^"]*)"|{([^}]*)})`)
    const m = attrs.match(re)
    if (!m) return fallback
    return (m[1] ?? m[2] ?? fallback).trim()
  }

  // ---------- ImageTextBlock ----------
  CMS.registerEditorComponent({
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
    pattern: /<ImageTextBlock([\s\S]*?)>([\s\S]*?)<\/ImageTextBlock>/,
    fromBlock(match) {
      const attrs = match[1]

      const src = getAttr(attrs, "src", "")
      const alt = getAttr(attrs, "alt", "")

      const imageWidthRaw = getAttr(attrs, "imageWidth", "50")
      const imageWidth = parseInt(imageWidthRaw, 10)

      const imageOnLeftRaw = getAttr(attrs, "imageOnLeft", "true").toLowerCase()
      const topAlignRaw = getAttr(attrs, "topAlign", "false").toLowerCase()

      return {
        src,
        alt,
        imageWidth: Number.isFinite(imageWidth) ? imageWidth : 50,
        imageOnLeft: imageOnLeftRaw === "true" || imageOnLeftRaw === "1",
        topAlign: topAlignRaw === "true" || topAlignRaw === "1",
        content: match[2].trim(),
      }
    },
    toBlock(obj: any) {
      const alt = obj.alt && obj.alt.trim() ? obj.alt : "image"
      const width = obj.imageWidth ?? 50
      const left = obj.imageOnLeft ?? true
      const top = obj.topAlign ?? false
      return `<ImageTextBlock src="${obj.src}" alt="${alt}" imageWidth="${width}" imageOnLeft="${left}" topAlign="${top}">
${obj.content}
</ImageTextBlock>`
    },
    toPreview(obj: any) {
      const width = obj.imageWidth ?? 50
      const textWidth = 100 - width
      const row = obj.imageOnLeft ? "" : "md:flex-row-reverse"
      const align = obj.topAlign ? "items-start" : "items-center"
      return `
<div class="flex flex-col md:flex-row gap-4 w-full ${align} ${row}">
  <img src="${obj.src}" alt="${obj.alt ?? ""}" style="width:${width}%" />
  <div style="width:${textWidth}%">${obj.content ?? ""}</div>
</div>`
    },
  })

  // ---------- SoundCloudEmbed ----------
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
    pattern: /<SoundCloudEmbed([\s\S]*?)>([\s\S]*?)<\/SoundCloudEmbed>/,
    fromBlock(match) {
      const attrs = match[1]
      return {
        title: getAttr(attrs, "title", ""),
        description: getAttr(attrs, "description", ""),
        iframe: (match[2] ?? "").trim(),
      }
    },
    toBlock(obj: any) {
      const title = obj.title ?? ""
      const description = obj.description ?? ""
      const iframe = obj.iframe ?? ""
      return `<SoundCloudEmbed title="${title}" description="${description}">
  ${iframe}
  </SoundCloudEmbed>`
    },
    toPreview(obj: any) {
      const title = obj.title ? `<strong>${obj.title}</strong>` : ""
      const description = obj.description ? `<p>${obj.description}</p>` : ""
      return `${title}${description}${obj.iframe ?? ""}`
    },
  })
}
