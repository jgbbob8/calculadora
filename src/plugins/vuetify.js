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
export default createVuetify({
  theme: {
    defaultTheme: "dark",
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
          terciary: "#f39200",
          primary: "#31a9e1",
          shadow: "rgb(255 255 255/0.15)",
          "base-l-4": "hsla(0, 0%, 0%, 1)",
          "base-l-3": "hsla(0, 0%, 5%, 1)",
          "base-l-2": "hsla(0, 0%, 20%, 1)",
          "base-l-1": "hsla(0, 0%, 35%, 1)",
          "base-n": "hsla(0, 0%, 50%, 1)",
          "base-d-1": "hsla(0, 0%, 65%, 1)",
          "base-d-2": "hsla(0, 0%, 80%, 1)",
          "base-d-3": "hsla(0, 0%, 95%, 1)",
          "base-d-4": "hsla(0, 0%, 100%, 1)",
        },
      },
    },
  },
});
