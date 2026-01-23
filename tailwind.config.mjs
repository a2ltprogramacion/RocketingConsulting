// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',     // Naranja (Acentos fuertes)
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)', // Teal (Detalles sutiles)
				accent: 'rgb(var(--color-accent) / <alpha-value>)',       // Naranja (Botones/Links)
				surface: 'rgb(var(--color-surface) / <alpha-value>)',     // Gris Oscuro (Tarjetas)
				background: 'rgb(var(--color-background) / <alpha-value>)', // Fondo Principal
				text: 'rgb(var(--color-text) / <alpha-value>)',           // Blanco Ahumado
			},
			fontFamily: {
				sans: ['"Nunito"', 'sans-serif'],           // Fuente Principal (Cuerpo)
				heading: ['"Red Hat Display"', 'serif'],    // Fuente Secundaria (Títulos)
			},
		},
	},
	plugins: [],
};