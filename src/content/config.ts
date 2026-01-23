// @src/content/config.ts
import { defineCollection, z } from 'astro:content';

// -----------------------------------------------------------------
// COLECCIÓN DE PÁGINAS (Estructura Core del Negocio)
// -----------------------------------------------------------------
const pagesCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    
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
      social_image: z.string().optional().describe("URL de la imagen para compartir en Redes (OG Image)."),
    }),

    // 2. Hero (La Promesa de Valor)
    // -------------------------------------------------------------
    hero: z.object({
      image: z.string({
        required_error: "La imagen principal del Hero es obligatoria.",
      }),
      image_alt: z.string().min(5, {
        message: "🚫 A11Y Error: El texto alternativo (Alt) es obligatorio y debe ser descriptivo.",
      }),
      title: z.string().describe("Titular H1 de alto impacto."),
      subtitle: z.string().optional(),
      cta_text: z.string().default("Más Información"),
      cta_link: z.string(),
    }),

    // 3. About (La Autoridad)
    // -------------------------------------------------------------
    about: z.object({
      title: z.string(),
      business_bio: z.string().describe("Markdown soportado para negritas y énfasis."),
      stat_1: z.string().optional().describe("Dato duro 1 (Ej: +10 Años)"),
      stat_2: z.string().optional().describe("Dato duro 2 (Ej: 100% Garantizado)"),
    }),

    // 4. FAQ (Manejo de Objeciones)
    // -------------------------------------------------------------
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional().describe("Lista de preguntas para derribar objeciones de venta."),

    // 5. Contacto & Legal
    // -------------------------------------------------------------
    contact: z.object({
      email: z.string().email({
        message: "El formato del correo electrónico no es válido.",
      }),
      phone: z.string(),
      address: z.string().optional(),
      copyright: z.string(),
    }),
  }),
});

// -----------------------------------------------------------------
// COLECCIÓN DE SERVICIOS (El Catálogo)
// -----------------------------------------------------------------
const servicesCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    icon: z.string({
      required_error: "Se requiere un icono o imagen para la tarjeta.",
    }),
    icon_alt: z.string().default("Icono representativo del servicio"),
    title: z.string(),
    description: z.string().max(200, {
      message: "⚠️ Diseño: La descripción es muy larga para una tarjeta (Máx 200 car).",
    }),
    price: z.string().optional().describe("Ej: Desde $100 / Consultar"),
    order: z.number().default(0).describe("Usa números bajos (1, 2, 3) para que salgan primero."),
  }),
});

// Exportación Pública
export const collections = {
  'pages': pagesCollection,
  'services': servicesCollection,
};