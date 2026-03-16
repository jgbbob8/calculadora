/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const getInitialTheme = () => {
  try {
    const scheme = localStorage.getItem("color-scheme");
    if (scheme === "dark" || scheme === "moon") return "dark";
    if (scheme === "light" || scheme === "sun") return "light";
    const legacy = localStorage.getItem("theme");
    if (legacy === "dark" || legacy === "moon") return "dark";
    if (legacy === "light" || legacy === "sun") return "light";
  } catch {
    // localStorage no disponible
  }
  return "dark";
};

export default createVuetify({
  theme: {
    defaultTheme: getInitialTheme(),
    themes: {
      light: {
        colors: {
          primary: "#f39200",
          secondary: "#90b592",
          terciary: "#31a9e1",
          "base-d-4": "hsla(0, 0%, 0%, 1)",
          "base-d-3": "hsla(0, 0%, 5%, 1)",
          "base-d-2": "hsla(0, 0%, 20%, 1)",
          "base-d-1": "hsla(0, 0%, 35%, 1)",
          "base-n": "hsla(0, 0%, 50%, 1)",
          "base-l-1": "hsla(0, 0%, 65%, 1)",
          "base-l-2": "hsla(0, 0%, 80%, 1)",
          "base-l-3": "hsla(0, 0%, 95%, 1)",
          "base-l-4": "hsla(0, 0%, 100%, 1)",
        },
      },
      dark: {
        colors: {
          primary: "#31a9e1",
          terciary: "#f39200",
          "base-d-4": "hsla(0, 0%, 100%, 1)",
          "base-d-3": "hsla(0, 0%, 95%, 1)",
          "base-d-2": "hsla(0, 0%, 80%, 1)",
          "base-d-1": "hsla(0, 0%, 65%, 1)",
          "base-n": "hsla(0, 0%, 50%, 1)",
          "base-l-1": "hsla(0, 0%, 35%, 1)",
          "base-l-2": "hsla(0, 0%, 20%, 1)",
          "base-l-3": "hsla(0, 0%, 5%, 1)",
          "base-l-4": "hsla(0, 0%, 0%, 1)",
        },
      },
    },
  },
});
