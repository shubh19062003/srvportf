/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slow-pulse': 'pulse 6s ease-in-out infinite',
        'spin-slower': 'spin 10s linear infinite',
        'spin-fast': 'spin 3s linear infinite',
        'spin-reverse-slower': 'spin-reverse 12s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      
    },
  },
  plugins: [],
  
}
