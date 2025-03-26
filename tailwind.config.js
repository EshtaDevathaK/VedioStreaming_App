/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D28D9',
          dark: '#4C1D95',
          light: '#8B5CF6'
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399'
        },
        background: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#020617'
        },
        accent: {
          DEFAULT: '#F472B6',
          dark: '#DB2777',
          light: '#F9A8D4'
        }
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'point': 'point 2s ease-in-out infinite'
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #6D28D9, 0 0 82px #6D28D9, 0 0 92px #6D28D9, 0 0 102px #6D28D9, 0 0 151px #6D28D9'
          },
          '50%': { 
            textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #6D28D9, 0 0 45px #6D28D9, 0 0 55px #6D28D9, 0 0 65px #6D28D9, 0 0 85px #6D28D9'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'point': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' }
        }
      }
    }
  },
  plugins: [],
};