<script setup>
import { useCustomTheme } from ".././useTheme";
const { theme, toggleTheme } = useCustomTheme();
</script>

<template>
  <v-btn @click="toggleTheme" class="btn-toogle">{{
    theme.global.name.value
  }}</v-btn>
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
  display: block;
  margin-left: auto;
  margin-right: 0;
}
.logo {
  text-align: center;
  padding-bottom: 2em;
}
.logo img {
  max-width: 250px;
}
</style>
