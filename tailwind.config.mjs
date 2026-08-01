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
          'red-light': '#FCD4D4',
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
        },
        status: {
          grey: '#F3F4F6',
          'grey-text': '#4B5563',
          brown: '#FEF3C7',
          'brown-text': '#92400E',
          green: '#D1FAE5',
          'green-text': '#065F46',
        }
      },
      fontFamily: {
        fixel: ['"Fixel Text"', 'Inter', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.03)',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        pill: '0px 2px 12px 0px rgba(0, 0, 0, 0.06)',
        card: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 12px 32px 0px rgba(0, 0, 0, 0.1)',
        popup: '0px 10px 40px 0px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      spacing: {
        '4.5': '1.125rem',
      }
    },
  },
  plugins: [],
};
