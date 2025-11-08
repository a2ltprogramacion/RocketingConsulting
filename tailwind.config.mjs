// @tailwind.config.mjs (VERSIÓN 4.0)
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'desktop-med': '1366px', 
      'desktop-lg': '1920px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // --- Paleta V4.0 ---
        // Gris profundo para textos y elementos primarios
        'primary': '#3D3D3D',
        // Coral para CTAs y acentos vibrantes
        'accent': '#F5775F',
        // Fondo principal (Blanco puro)
        'secondary': '#FFFFFF', 
        // Texto sobre fondos oscuros o de acento
        'text-inverted': '#FFFFFF',
        // Texto principal (alias de 'primary' para claridad semántica)
        'text-base': '#3D3D3D',
      },
      fontFamily: {
        // 'sans' se usará para párrafos y contenido (Open Sans)
        'sans': ['Open Sans', 'sans-serif'],
        // 'serif' se usará para TÍTULOS (Montserrat)
        'serif': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}