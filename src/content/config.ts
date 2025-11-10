// @src/content/config.ts (VERSIÓN 4.14 - SEO SEPARADO)
import { z, defineCollection } from 'astro:content';

// CORREGIDO V4.13: Se eliminan los campos alucinados (summary, icon, etc.)
const serviciosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(), // Este es el texto de la tarjeta
    image: z.string().optional(),       // Esta es la imagen opcional
  }),
});

const paginasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // --- CAMPOS DE SEO Y MARCA MOVIDOS A 'ajustesCollection' ---
    template: z.string().optional(), // Campo 'hidden' que estaba en config.yml

    hero: z.object({
      show_section: z.boolean().optional().default(true), 
      title: z.string().optional(),
      subtitle: z.string().optional(),
      description: z.string().optional(), 
      cta_text: z.string().optional(),
      cta_url: z.string().optional(),
      image_logo: z.string().optional(), 
      image_main: z.string().optional(), 
    }).optional(),

    nosotros: z.object({
      show_section: z.boolean().optional().default(true), 
      background_image: z.string().optional(), 
      title: z.string().optional(),
      content: z.string().optional(),
    }).optional(),

    servicios: z.object({
      show_section: z.boolean().optional().default(true), 
      title: z.string().optional(),
      subtitle: z.string().optional(),
    }).optional(),

    proyectos: z.object({ 
      show_section: z.boolean().optional().default(true),
      title: z.string().optional(),
      subtitle: z.string().optional(),
    }).optional(),

    clientes: z.object({
      show_section: z.boolean().optional().default(true), 
      title: z.string().optional(),
      logos: z.array(z.object({ 
        logo: z.string(),
        client_name: z.string().optional(), 
        url: z.string().optional(), 
      })).optional(),
    }).optional(),

    testimonios: z.object({ 
      show_section: z.boolean().optional().default(true),
      title: z.string().optional(),
      lista: z.array(z.object({
        quote: z.string(),
        author: z.string().optional(),
        google_review_embed: z.string().optional(),
      })).optional(),
    }).optional(),
  }),
});

const proyectosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    client_name: z.string(),
    titulo: z.string(), 
    services_list: z.array(z.string()).optional(),
    image: z.string().optional(), 
    date: z.date().optional(),
    summary: z.string().optional(), 
    project_details: z.string().optional(),    
    gallery: z.array(z.object({ image_path: z.string() })).optional(),
  }),
});

const ajustesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // --- CAMPOS MOVIDOS DESDE 'paginasCollection' ---
    brand_name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    canonical_url: z.string().optional(),
    robots: z.string().optional(),
    og: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }).optional(),
  }),
});

const contactoCollection = defineCollection({
  type: 'data',
  schema: z.object({
    whatsapp: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    contact_heading: z.string().optional(),
    contact_subheading: z.string().optional(),
    whatsapp_message: z.string().optional(),
    show_contact_section: z.boolean().optional(),
  }),
});

export const collections = {
  'servicios': serviciosCollection,
  'pages': paginasCollection,
  'proyectos': proyectosCollection,
  'ajustes': ajustesCollection,
  'informacion-de-contacto': contactoCollection,
};