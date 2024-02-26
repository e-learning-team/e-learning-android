// /** @type {import('tailwindcss').Config} */
// import { glob, globSync } from 'glob' 
// module.exports = {
//   content: [ "./App.tsx", ...glob.sync('./src/**/.tsx'), ],
//   // content: [
//   //   "./App.tsx",
//   //   // "./src/**/*.{js,jsx,ts,tsx}",
//   //   "./src/screens/Home.tsx",
//   //   "./src/screens/MainLayout.tsx",
//   //   "./src/screens/Profile.tsx",
//   //   "./src/screens/Search.tsx",
//   //   "./src/screens/SplashScreen.tsx",
//   // ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
const globSync = require('glob').sync;

module.exports = {
  content: [
    "./App.tsx",
    ...globSync('./src/**/*.tsx'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
