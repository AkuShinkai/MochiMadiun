/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1100px"
    },
    extend: {
      colors: {
        primaryColor: '#f2ebde',
        primaryColorLight: "#efbbae",
        secondaryColor: '#eb4863',
        paragraphColor: '#921A40',
        whiteColor: '#65C18C',
        blackColor: "#000",
        greenColor: "#007936",
        redColor: "#cc3433",
        darkColor: '#000',
        darkColorLight: "#171717",
      },
      keyframes: {
        move: {
          "50%": {transform: 'translateY(-1rem)'}
        }
      },
      animation: {
        'movingY': 'move 2s linear infinite'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem'
      }
    },
    fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
      dmsans: ['DM Sans', 'sans-serif']
    }
  },
  plugins: [],
}
