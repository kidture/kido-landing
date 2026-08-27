import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kt: {
          cream: '#FFF8F0',
          'cream-muted': '#F5F0E8',
          'cream-deep': '#F7F3EB',
          charcoal: '#121010',
          'charcoal-mid': '#151318',
          ink: '#0E0B20',
          secondary: '#3A3530',
          signpost: '#5C5650',
          teal: '#3FA9A0',
          'olive-teal': '#5C8F86',
          sage: '#7EC8A4',
          amber: '#F9C74F',
          coral: '#F4845F',
          violet: '#6B3FD4',
          rose: '#D63A52',
          blue: '#1A7AB8',
          emerald: '#0D9A72',
          fog: '#F5F3F0',
          mist: '#B8B2AA',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        control: '12px',
      },
      boxShadow: {
        soft: '0 8px 18px rgba(14,11,32,0.06)',
        lift: '0 10px 22px rgba(14,11,32,0.10)',
        glow: '0 12px 32px rgba(63,169,160,0.28)',
      },
      maxWidth: {
        page: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
