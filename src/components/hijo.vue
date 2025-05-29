<script setup>
import { inject } from "vue";

const props = defineProps(["cosa", "index"]);

const emit = defineEmits(["retorno"]);
const aumentar = (calidad, index) => {
  emit("retorno", calidad, index);
};
</script>

<template>
  <div>
    <h3>Modelo: {{ cosa.nombre }}</h3>
    <p>Marca : {{ cosa.marca }}</p>
  </div>
  <div>
    <span v-for="index in cosa.calidad" :key="index">
      <img src="https://www.html6.es/img/estrella.png" alt="" />
    </span>
  </div>
  <div>
    <button @click="aumentar(cosa.calidad, index)">+</button>
  </div>
</template>

<style scoped>
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 6px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 6px;
}
</style>
