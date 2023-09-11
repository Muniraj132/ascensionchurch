const tailwindcss = require("tailwindcss");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily : {
        sans: ["Open Sanss"]
      },
      gridTemplateColumns:{
        "1/5":"1fr 5fr"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}




// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
    
//     screens: {
//       'tablet': '640px',
//       // => @media (min-width: 640px) { ... }

//       'laptop': '1024px',
//       // => @media (min-width: 1024px) { ... }

//       'desktop': '1280px',
//       // => @media (min-width: 1280px) { ... }
//     },
//     plugins: [require('@tailwindcss/forms')],
//   }
// }

