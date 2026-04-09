import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-dark': {
          900: 'hsl(220 18% 4%)',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-neon': '0 0 30px rgba(16, 185, 129, 0.6)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'glow': 'glow 1s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)' },
        },
      },
    },
  },
  plugins: [
    function({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'glass': (value: string) => ({
            backgroundColor: value,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }),
        },
        { values: theme('colors.glass') }
      )
    }
  ],
  darkMode: 'class',
}

export default config

