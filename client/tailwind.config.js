/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070A10',
          900: '#0B0F17',
          850: '#101623',
          800: '#172033',
          750: '#1E293F',
          700: '#26334D',
          600: '#384869',
        },
        brand: {
          primary: '#10B981', // Strategic Emerald
          cyan: '#06B6D4',    // AI Intelligence
          amber: '#F59E0B',   // Caution / Gap
          rose: '#F43F5E',    // Kill test / Risk
          indigo: '#6366F1',  // Founder DNA
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-glow': '0 0 25px -5px rgba(16, 185, 129, 0.15)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.15)',
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
