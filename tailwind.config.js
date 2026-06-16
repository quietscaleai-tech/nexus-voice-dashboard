/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#09090b',
        panelBg: '#121214',
        accentGold: '#c5a880',
        accentEmerald: '#10b981',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-1': 'wave 0.6s ease-in-out infinite alternate',
        'wave-2': 'wave 0.8s ease-in-out infinite alternate 0.15s',
        'wave-3': 'wave 0.5s ease-in-out infinite alternate 0.3s',
        'wave-4': 'wave 0.7s ease-in-out infinite alternate 0.45s',
      },
      keyframes: {
        wave: {
          '0%': { height: '4px' },
          '100%': { height: '32px' }
        }
      }
    },
  },
  plugins: [],
}