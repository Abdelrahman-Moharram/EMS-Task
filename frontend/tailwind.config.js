/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
import { createRequire } from 'node:module'
const _require = createRequire(import.meta.url)
const defaultColors = _require('tailwindcss/colors.js')
delete defaultColors.lightBlue
delete defaultColors.warmGray
delete defaultColors.trueGray
delete defaultColors.coolGray
delete defaultColors.blueGray
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      ...colors,
      "primary":'rgb(37 99 235 / var(--tw-bg-opacity))',      
    },
  },
  plugins: [],
}