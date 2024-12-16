/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
  theme: {
    screens: {
        xs: "320px", // Breakpoint tambahan untuk layar kecil
        sm: "480px",
        md: "768px",
        lg: "1100px"
     },
    extend: {
      colors: {
        primaryColor: '#fff',
        primaryColorLight: "#F8E8EE",
        secondaryColor: '#eb4863',
        paragraphColor: '#921A40',
        whiteColor: '#5c2424',
        blackColor: "#000",
        greenColor: "#89bb2f",
        redColor: "#cc3433",
        darkColor: '#000',
        darkColorLight: "#171717",
        itemlistColor: "#cdcdcd"
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
           sm: '1.5rem',
           xs: '0.5rem', // Tambahkan padding kecil untuk layar kecil
        }
     },

    fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
      dmsans: ['DM Sans', 'sans-serif']
    }
  },
  plugins: [],
}
