<script setup>
import { ref } from "vue";
import { cosas } from "./datos.js";
import hijo from "./hijo.vue";

const retorno = (calidad, index) => {
  if (calidad > 4) {
    cosas.value[index].calidad = 1;
  } else {
    cosas.value[index].calidad = calidad + 1;
  }
};
</script>

<template>
  <h2>Reacion de Cosas</h2>
  <ul>
    <li v-for="(cosa, index) in cosas" :key="index">
      <!-- <hijo :cosa="cosa" :index="index" @retorno="retorno" /> -->
      <hijo :cosa="cosa" :index="index" @retorno="retorno" />
    </li>
  </ul>
</template>

<style scoped>
li {
  margin: 1.5em;
  list-style: none;
}
</style>
