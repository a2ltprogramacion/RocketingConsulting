// @src/content/config.ts
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // 1. SEO & Identidad (OBLIGATORIO)
    seo: z.object({
      site_name: z.string(),
      meta_title: z.string().max(65, "El Meta Título es muy largo (Max 65)."),
      meta_description: z.string().max(160, "La Meta Descripción es muy larga (Max 160)."),
      social_image: image().refine((img) => img.width >= 600, {
        message: "La imagen social debe ser de al menos 600px de ancho.",
      }),
    }),

    // 2. Hero (Negocio)
    hero: z.object({
      image: image(),
      image_alt: z.string().min(5, "El texto alternativo es obligatorio para SEO."),
      title: z.string(),
      subtitle: z.string().optional(),
      cta_text: z.string(),
      cta_link: z.string(),
    }),

    // 3. About (Negocio)
    about: z.object({
      title: z.string(),
      business_bio: z.string(),
      stat_1: z.string().optional(),
      stat_2: z.string().optional(),
    }),

    // 4. FAQ
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),

    // 5. Contacto
    contact: z.object({
      email: z.string().email(),
      phone: z.string(),
      address: z.string().optional(),
      copyright: z.string(),
    }),
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    icon: image(),
    icon_alt: z.string().default("Icono representativo del servicio"), // Default para no romper si se olvida
    title: z.string(),
    description: z.string().max(200),
    price: z.string().optional(), // Agregado para flexibilidad comercial
    order: z.number().default(0),
  }),
});

export const collections = {
  'pages': pagesCollection,
  'services': servicesCollection,
};