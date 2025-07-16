import { z, defineCollection } from "astro:content"

const ctaSchema = z.object({
  text: z.string(),
  href: z.string(),
  primary: z.boolean().optional(),
})

const heroSchema = z.object({
  image: z.string(),
  video: z.string().nullable().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  cta: ctaSchema,
})

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  hero: heroSchema.optional(),
})

export type PageSchema = z.infer<typeof pageSchema>

const pages = defineCollection({ type: "content", schema: pageSchema })

export const collections = {
  pages,
}
