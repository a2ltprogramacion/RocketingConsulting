// @src/content/config.ts
import { defineCollection, z } from 'astro:content';

// -----------------------------------------------------------------
// COLECCIÓN DE PÁGINAS (Estructura Core del Negocio)
// -----------------------------------------------------------------
const pagesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({

    // 0. Control de Módulos
    modules: z.object({
      show_hero: z.boolean().default(true),
      show_services: z.boolean().default(true),
      show_clients: z.boolean().default(false),
      show_testimonials: z.boolean().default(false),
      show_about: z.boolean().default(true),
      show_faq: z.boolean().default(true),
    }).optional(),
    
    // 1. SEO & Identidad (OBLIGATORIO)
    // -------------------------------------------------------------
    seo: z.object({
      site_name: z.string({
        required_error: "El nombre del sitio es obligatorio para el SEO.",
      }),
      meta_title: z.string().max(65, {
        message: "⚠️ SEO Warning: El Meta Título es muy largo (Ideal: <60 caracteres).",
      }),
      meta_description: z.string().max(160, {
        message: "⚠️ SEO Warning: La Meta Descripción supera los 160 caracteres y Google la cortará.",
      }),
      social_image: image().optional().describe("URL de la imagen para compartir en Redes (OG Image)."),
      favicon: image().optional(), 
    }),

    // 2. Hero (La Promesa de Valor)
    // -------------------------------------------------------------
    hero: z.object({
      image: image().optional(),
      image_alt: z.string().min(5, {
        message: "🚫 A11Y Error: El texto alternativo (Alt) es obligatorio y debe ser descriptivo.",
      }),
      title: z.string().describe("Titular H1 de alto impacto."),
      subtitle: z.string().optional(),
      cta_text: z.string().default("Más Información"),
      cta_link: z.string(),
    }),

    // 3. Clientes
    clients: z.array(z.object({
      logo: image().optional(),
      name: z.string(),
    })).optional(),

    // 4. About (La Autoridad)
    // -------------------------------------------------------------
    about: z.object({
      title: z.string(),
      image: image().optional(),
      business_bio: z.string().describe("Markdown soportado para negritas y énfasis."),
      stat_1: z.string().optional().describe("Dato duro 1 (Ej: +10 Años)"),
      stat_2: z.string().optional().describe("Dato duro 2 (Ej: 100% Garantizado)"),
    }),

    // 5. FAQ (Manejo de Objeciones)
    // -------------------------------------------------------------
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional().describe("Lista de preguntas para derribar objeciones de venta."),

    // 6. Contacto & Legal (SINCRONIZADO CON CMS)
    // -------------------------------------------------------------
    contact: z.object({
      heading: z.string().optional(), // Nuevo: Permite editar el título "¿Listo para comenzar?"
      subheading: z.string().optional(), // Nuevo: Permite editar el subtítulo del footer
      email: z.string().email({
        message: "El formato del correo electrónico no es válido.",
      }),
      phone: z.string(),
      address: z.string().optional(),
      // Nuevo: Objeto social para validar las URLs de redes sociales 
      social: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
      }).optional(),
      footer_logo: image().optional(),
      copyright: z.string(),
    }),
  }),
});

// -----------------------------------------------------------------
// COLECCIÓN DE SERVICIOS (El Catálogo)
// -----------------------------------------------------------------
const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    icon: image().optional(),
    icon_alt: z.string().default("Icono representativo del servicio"),
    title: z.string(),
    description: z.string().max(200, {
      message: "⚠️ Diseño: La descripción es muy larga para una tarjeta (Máx 200 car).",
    }),
    price: z.string().optional().describe("Ej: Desde $100 / Consultar"),
    order: z.number().default(0).describe("Usa números bajos (1, 2, 3) para que salgan primero."),
  }),
});

// -----------------------------------------------------------------
// COLECCIÓN DE TESTIMONIOS (El testimonio es la autoridad)
// -----------------------------------------------------------------
const testimonialsCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    author: z.string(),
    role: z.string().optional(),
    content: z.string().max(300, { message: "El testimonio es muy largo (máx 300 car)." }),
    order: z.number().default(0),
  }),
});

// Exportación Pública
export const collections = {
  'pages': pagesCollection,
  'services': servicesCollection,
  'testimonials': testimonialsCollection, 
};