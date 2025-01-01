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
        // Mode sombre
        'dark-bg-primary': '#0B1120',
        'dark-bg-secondary': '#121A2D',
        'dark-bg-tertiary': '#1B1F3B',
        'dark-card': '#1a1f35',
        'dark-card-hover': '#1e2440',
        'dark-border': '#2e354f',
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': '#8b9abe',
        'dark-accent-primary': '#34d399',
        'dark-accent-secondary': '#ffd700',
        
        // Mode clair
        'light-bg-primary': '#F0F4FF',
        'light-bg-secondary': '#E8EFFF',
        'light-bg-tertiary': '#DDE7FF',
        'light-card': 'rgba(255, 255, 255, 0.8)',
        'light-border': 'rgba(147, 197, 253, 0.3)',
        'light-text-primary': '#2C3E50',
        'light-text-secondary': '#64748B',
        'light-accent-primary': '#3B82F6',
        'light-accent-secondary': '#60A5FA',
      },
      animation: {
        'progress': 'progress 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse': 'pulse 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'grid-light': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} 