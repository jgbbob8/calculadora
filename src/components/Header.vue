<script setup>
import { useCustomTheme } from ".././useTheme";
const { theme, toggleTheme } = useCustomTheme();
</script>

<template>
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

  <div class="logo">
    <img
      v-if="theme.global.name.value === 'dark'"
      src="@/assets/ConsNaval.png"
      alt=""
    />
    <img v-else src="@/assets/ConsNaval-L.png" alt="" />
  </div>
</template>

<style scoped>
.btn-toogle {
  text-align: right;
}
.logo {
  text-align: center;
  padding-bottom: 2em;
}
.logo img {
  max-width: 250px;
}
</style>
