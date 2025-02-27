import { useTheme } from "vuetify";

export function useCustomTheme() {
  const theme = useTheme();

  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark
      ? "light"
      : "dark";
  };

  return { theme, toggleTheme };
}
