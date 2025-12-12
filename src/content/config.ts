// @src/content/config.ts (VERSIÓN 4.17.2 - Toggle Scroller)
import { z, defineCollection } from 'astro:content';

// 1. Colección Servicios
const serviciosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(), // Este es el texto de la tarjeta
    image: z.string().optional(),       // Esta es la imagen opcional
  }),
});

// 2. Colección Páginas (Home)
const paginasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    template: z.string().optional(), // Campo 'hidden'

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
      lista_destacados: z.array(z.string()).optional(), // Relación de Proyectos
    }).optional(),

    clientes: z.object({
      show_section: z.boolean().optional().default(true), 
      title: z.string().optional(),
      lista_destacados: z.array(z.string()).optional(), // Relación de Clientes
      show_scroller: z.boolean().optional().default(true), // <-- CAMPO AÑADIDO
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

// 3. Colección Proyectos
const proyectosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    client_name: z.string(),
    titulo: z.string(), 
    services_list: z.array(z.string()).optional(),
    image: z.string().optional(), 
    date: z.coerce.date().optional(),
    summary: z.string().optional(), 
    project_details: z.string().optional(),    
    gallery: z.array(z.object({ image_path: z.string() })).optional(),
  }),
});

// 4. Colección Clientes
const clientesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // 'slug' se elimina del schema porque Astro lo maneja automáticamente
    titulo: z.string(), // Nombre del cliente
    logo: z.string(),   // Path a la imagen
    url: z.string().url().optional(), // URL Opcional
  }),
});

// 5. Colección Ajustes
const ajustesCollection = defineCollection({
  type: 'data',
  schema: z.object({
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

// 6. Colección Contacto
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

// --- Exportaciones ---
export const collections = {
  'servicios': serviciosCollection,
  'pages': paginasCollection,
  'proyectos': proyectosCollection,
  'clientes': clientesCollection,
  'ajustes': ajustesCollection,
  'informacion-de-contacto': contactoCollection,
};