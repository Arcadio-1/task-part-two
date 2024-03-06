/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        success: " #07bc0c",
        error: "#e74c3c",
        warning: "#f3c610",
        info: "#3498db",

        bg_1: "#040810",
        bg_2: "#1c2028",
        first: "#4CD5DC",
        first_text_color: "#DCE0E8",
        second_text_color: "#A9ABAD",
        third_text_color: "#DFE1E3",
        first_border_color: "#444749",
        second_border_color: "#2F3132",
        third_border_color: "#176E77",
        forth_border_color: "#EBEDEF",
      },
      borderRadius: {
        lg: "5px",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        1320: "1320px",
      },
    },
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
  },
};
