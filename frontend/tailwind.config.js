/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-hover': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
      colors: {
        earth: {
          60: '#0D6506',
        },
        wind: {
          50: '#0072A3',
        },
      },
      gradientColorStops: {
        'to-earth-60': '#0D6506',
        'from-wind-50': '#0072A3',
      },
      fontFamily: {
        ptserif: ['PT Serif', 'serif'], // Add your custom font here
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [],
}
