<script setup>
import Estancia from "./Estancia.vue";

defineProps({
  state: Object,
});

const estancias = [
  { key: "comedor", nombre: "Comedor" },
  { key: "cocina", nombre: "Cocina" },
  { key: "bano1", nombre: "Baño Principal" },
  { key: "bano2", nombre: "Baño Cortesía" },
];
</script>

<template>
  <div>
    <Estancia
      v-for="estancia in estancias"
      :key="estancia.key"
      :nombre="estancia.nombre"
      :visible="state[estancia.key]"
    />

    <Estancia
      v-for="n in 4"
      :key="`habitacion-${n}`"
      :nombre="`Habitación ${n}`"
      :visible="state.habit >= n"
    />
  </div>
</template>
