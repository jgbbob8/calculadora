<script setup>
import { computed } from "vue";
import { useCustomTheme } from ".././useTheme";

const { theme, toggleTheme } = useCustomTheme();

const isDark = computed(() => theme.global.name.value === "dark");
const displayScheme = computed(() => (isDark.value ? "sun" : "moon"));
const ariaLabel = computed(
  () =>
    `Esquema de color: ${isDark.value ? "oscuro" : "claro"}. Haz clic para cambiar.`,
);
</script>

<template>
  <div class="header-wrapper">
    <div class="logo">
      <img
        v-if="theme.global.name.value === 'dark'"
        src="/logo_consnaval_blc.svg"
        alt=""
      />
      <img v-else src="/logo_consnaval.svg" alt="" />
    </div>

    <div class="btn-toggle">
      <button
        type="button"
        class="scheme-switch-bravo"
        role="switch"
        :data-current-scheme="displayScheme"
        :aria-checked="String(isDark)"
        :aria-label="ariaLabel"
        @click="toggleTheme"
      >
        <span class="scheme-switch-bravo__icon" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: clamp(0.8rem, calc(0.65vw + 0.67rem), 1.24rem);
  margin-bottom: clamp(1.56rem, calc(2.87vw + 0.99rem), 3.5rem);
}

.btn-toggle {
  text-align: right;
  margin-bottom: 6px;
}

.scheme-switch-bravo {
  --switch-size: 11%;
  --icon-size: 10em;
  --moon-color: #31a9e1;
  --star-color: var(--moon-color);
  --sun-color: #ffc233;
  inline-size: 36px;
  block-size: 36px;
  aspect-ratio: 1;
  min-inline-size: 0;
  min-block-size: 0;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  padding: 0;
  position: relative;
  overflow: visible;
  cursor: pointer;
}

.scheme-switch-bravo:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
  border-radius: 50%;
}

.scheme-switch-bravo__icon {
  font-size: var(--switch-size);
  min-inline-size: 0;
  min-block-size: 0;
  display: flex;
  inline-size: 100%;
  block-size: 100%;
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  transition:
    rotate 400ms ease-in-out,
    box-shadow 400ms ease-in-out,
    background 400ms ease-in-out,
    inline-size 400ms ease-in-out,
    block-size 400ms ease-in-out,
    font-size 400ms ease-in-out;
}

.scheme-switch-bravo[data-current-scheme="sun" i] .scheme-switch-bravo__icon {
  font-size: calc(var(--switch-size) * 1.2);
  background: var(--sun-color);
  inline-size: calc(var(--icon-size) * 0.7);
  block-size: calc(var(--icon-size) * 0.7);
  rotate: 0deg;
  box-shadow:
    3em 3em 0 5em var(--sun-color) inset,
    0 -5em 0 -2.7em var(--sun-color),
    3.5em -3.5em 0 -3em var(--sun-color),
    5em 0 0 -2.7em var(--sun-color),
    3.5em 3.5em 0 -3em var(--sun-color),
    0 5em 0 -2.7em var(--sun-color),
    -3.5em 3.5em 0 -3em var(--sun-color),
    -5em 0 0 -2.7em var(--sun-color),
    -3.5em -3.5em 0 -3em var(--sun-color);
}

.scheme-switch-bravo[data-current-scheme="moon" i] .scheme-switch-bravo__icon {
  font-size: calc(var(--switch-size) * 1);
  inline-size: var(--icon-size);
  block-size: var(--icon-size);
  background: transparent;
  rotate: -75deg;
  box-shadow:
    3em 2.5em 0 0 var(--moon-color) inset,
    color-mix(in hsl, var(--star-color, white) 70%, transparent) 0 -7em 0 -4.5em,
    var(--star-color, white) 2em 6em 0 -4em,
    var(--star-color, white) -4em -7em 0 -4.3em,
    var(--star-color, white) 6em 2em 0 -4.2em,
    color-mix(in hsl, var(--star-color, white) 70%, transparent) 4.5em 4em
      0 -4.5em,
    var(--star-color, white) -8em 0.5em 0 -4.4em,
    color-mix(in hsl, var(--star-color, white) 70%, transparent) -6em -4em
      0 -4.5em,
    color-mix(in hsl, var(--star-color, white) 70%, transparent) -1em 7em
      0 -4.5em;
}

.logo {
  text-align: center;
  max-width: 192px;
  width: clamp(8rem, 6.764rem + 5.818vi, 12rem);
  height: auto;
}
</style>
