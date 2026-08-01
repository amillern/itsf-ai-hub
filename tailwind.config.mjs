/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E60000',
          'red-dark': '#A10000',
          'red-maroon': '#5C0000',
          'red-soft': '#FFEBEB',
          'red-container': '#5C0000',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F6F5FA',
          border: '#E8E7EE',
        },
        text: {
          main: '#181818',
          muted: '#515151',
          light: '#757575',
        },
        badge: {
          usecase: '#FDF0CD',
          'usecase-text': '#7A5A00',
          business: '#EAE8FA',
          'business-text': '#4A3E85',
        }
      },
      fontFamily: {
        fixel: ['"Fixel Text"', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        pill: '0px 2px 12px 0px rgba(0, 0, 0, 0.06)',
        card: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 12px 32px 0px rgba(0, 0, 0, 0.1)',
        popup: '0px 10px 40px 0px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
};
