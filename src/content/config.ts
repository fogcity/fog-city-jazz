import { z, defineCollection } from "astro:content"

const heroSchema = z.object({
  image: z.string(),
  video: z.string().nullable().optional(),
})

const pageSchema = z.object({
  title: z.string(),
  heroTitle: z.string().optional(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  hero: heroSchema.optional(),
})

export type PageSchema = z.infer<typeof pageSchema>

const pages = defineCollection({ type: "content", schema: pageSchema })

export const collections = {
  pages,
}
