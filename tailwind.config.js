// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./App.{js,jsx,ts,tsx}",
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./src/**/*.tsx",
//     "./src/screens/*.tsx",
//     "./src/components/*.tsx",
//     ".../*.{js,jsx,ts,tsx}"
//   ],
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