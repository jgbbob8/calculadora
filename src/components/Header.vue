<script setup>
import { useCustomTheme } from ".././useTheme";
const { theme, toggleTheme } = useCustomTheme();
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

    <div class="btn-toogle">
      <v-icon
        v-if="theme.global.name.value === 'dark'"
        @click="toggleTheme"
        icon="$radioOff"
      />
      <v-icon
        v-if="theme.global.name.value === 'light'"
        @click="toggleTheme"
        icon="$radioOn"
      />
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

.btn-toogle {
  text-align: right;
  margin: 0 7px 5px 0;
  color: hsl(from rgb(var(--v-theme-terciary)) h s 62%);
}
.logo {
  text-align: center;
  max-width: 192px;
  width: clamp(8rem, 6.764rem + 5.818vi, 12rem);
  height: auto;
}
</style>
