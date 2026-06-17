/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#7C5CFC',
          50: '#F2EEFE',
          400: '#9B85FD',
          500: '#7C5CFC',
          600: '#6438F5',
        },
        cyan: {
          glow: '#3FE0D0',
        },
        surface: 'rgba(255,255,255,0.04)',
        'surface-hover': 'rgba(255,255,255,0.07)',
        border: 'rgba(255,255,255,0.10)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'glow-violet':
          'radial-gradient(ellipse 900px 500px at 50% -10%, rgba(124,92,252,0.25) 0%, transparent 60%)',
        'glow-cyan':
          'radial-gradient(ellipse 700px 400px at 80% 20%, rgba(63,224,208,0.15) 0%, transparent 60%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,92,252,0.4), 0 0 40px rgba(124,92,252,0.25)',
        'glow-sm': '0 0 0 1px rgba(124,92,252,0.3), 0 0 20px rgba(124,92,252,0.18)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
