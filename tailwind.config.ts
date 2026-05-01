import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kido: {
          purple: '#7C3AED',
          coral: '#E8784A',
          navy: '#1A0E30',
          'near-black': '#0D0A1E',
          'purple-tint': '#F5F3FF',
          'purple-border': '#DDD6FE',
          'purple-border-light': '#EDE9FE',
          muted: '#6B7280',
          'purple-muted': '#9B8EC4',
          'off-white': '#F0EEFF',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        pill: '20px',
      },
    },
  },
  plugins: [],
}

export default config
