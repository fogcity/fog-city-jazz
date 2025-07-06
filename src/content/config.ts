import { z, defineCollection } from "astro:content"

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export type PageSchema = z.infer<typeof pageSchema>

const pages = defineCollection({ type: "content", schema: pageSchema })

export const collections = {
  pages,
}
