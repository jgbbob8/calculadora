import { computed } from "vue";
import { useTheme } from "vuetify";

const STORAGE_KEY = "color-scheme";
const LEGACY_STORAGE_KEY = "theme";
let isInitialized = false;
let mediaQuery;

const normalizeStoredTheme = (value) => {
  if (value === "dark" || value === "moon") {
    return "dark";
  }

  if (value === "light" || value === "sun") {
    return "light";
  }

  return null;
};

const themeToScheme = (themeName) => (themeName === "dark" ? "moon" : "sun");

const readStoredTheme = () => {
  if (typeof localStorage === "undefined") {
    return null;
  }

  const schemeValue = normalizeStoredTheme(localStorage.getItem(STORAGE_KEY));
  if (schemeValue) {
    return schemeValue;
  }

  return normalizeStoredTheme(localStorage.getItem(LEGACY_STORAGE_KEY));
};

const applyDocumentScheme = (themeName) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.currentScheme = themeToScheme(themeName);
  document.documentElement.style.colorScheme =
    themeName === "dark" ? "dark" : "light";
};

export function useCustomTheme() {
  const theme = useTheme();

  const setTheme = (nextTheme, save = true) => {
    theme.global.name.value = nextTheme;
    applyDocumentScheme(nextTheme);

    if (save && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, themeToScheme(nextTheme));
      localStorage.setItem(LEGACY_STORAGE_KEY, nextTheme);
    }
  };

  const initTheme = () => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = readStoredTheme();
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(storedTheme ?? preferredTheme, false);

    if (!isInitialized) {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (event) => {
        if (localStorage.getItem(STORAGE_KEY)) {
          return;
        }

        setTheme(event.matches ? "dark" : "light", false);
      });

      isInitialized = true;
    }
  };

  initTheme();

  const toggleTheme = () => {
    const nextTheme = theme.global.current.value.dark ? "light" : "dark";
    setTheme(nextTheme, true);
  };

  return {
    theme,
    toggleTheme,
    currentScheme: computed(() => themeToScheme(theme.global.name.value)),
  };
}
