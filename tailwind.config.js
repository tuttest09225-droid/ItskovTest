import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'linear-accent': 'linear-gradient(to right, #ffffff, #e7e8f6, #c9d3ee, #a5c0e6, #79afdc, #79afdc, #79afdc, #79afdc, #a5c0e6, #c9d3ee, #e7e8f6, #ffffff)',
        'radial-accent': 'radial-gradient(circle, #0099cb, #ffffff 20%)',
        'linear-accent-right': 'linear-gradient(to right, #ee9707 40%, #ffffff 60%)',
        'linear-accent-left': 'linear-gradient(to left, #ffffff 40%, #ee9707  60%)',
      },
      rotate: {
        '15': '15deg',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#000000",
          "primary-content": "#0099cb",
          "secondary": "#ffffff",
          "secondary-content": "#000000",
          "accent": "#1fc7ff",
          "accent-content": "#4a4546",
          "neutral": "#004d66",
          "neutral-content": "#ffffff",
          "base-100": "#FFFFFF",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          "info": "#c2f0ff",
          "info-content": "#001616",
          "success": "#00ff00",
          "success-content": "#001600",
          "warning": "#00ff00",
          "warning-content": "#001600",
          "error": "#dc0b0b",
          "error-content": "#ffd8d1",
        },
      },
    ],
  }, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  darkTheme: "dark", // name of one of the included themes for dark mode
  base: true, // applies background color and foreground color for root element by default
  styled: true, // include daisyUI colors and design decisions for all components
  utils: true, // adds responsive and modifier utility classes
  prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  themeRoot: ":root", // The element that receives theme color CSS variables
}