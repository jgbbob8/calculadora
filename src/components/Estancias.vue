<script setup>
import Comedor from "./Comedor.vue";
import Cocina from "./Cocina.vue";
import Bano from "./Bano.vue";
import Habitacion from "./Habitacion.vue";

defineProps({
  state: Object,
});

const estancias = [
  { key: "comedor", nombre: "Comedor" },
  { key: "cocina", nombre: "Cocina" },
];
</script>

<template>
  <div>
    <Comedor :nombre="`Comedor / Salón`" :visible="state.comedor" />
    <Cocina :nombre="`Cocina`" :visible="state.cocina" />
    <Bano
      v-for="n in 3"
      :key="`baño-${n}`"
      :nombre="`Baño ${n}`"
      :visible="state.bano >= n"
    />
    <Habitacion
      v-for="n in 5"
      :key="`habitacion-${n}`"
      :nombre="`Habitación ${n}`"
      :visible="state.habit >= n"
    />
  </div>
</template>
