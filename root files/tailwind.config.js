/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0A0F2C',
          navy: '#1A1F3C',
          blue: '#2D46B9',
          purple: '#8B5CF6',
          teal: '#2DD4BF'
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0A0F2C 0%, #1A1F3C 50%, #2D46B9 100%)',
        'galaxy': 'radial-gradient(circle at 50% 50%, #2D46B9 0%, #1A1F3C 50%, #0A0F2C 100%)'
      }
    },
  },
  plugins: [],
}