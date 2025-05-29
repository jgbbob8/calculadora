<script setup>
import Estancia from "./estancias/Estancia.vue";

defineProps({
  state: Object,
});
</script>
<template>
  <Estancia
    :clave="`salon`"
    :nombre="`Comedor / Salón`"
    :visible="state.comedor"
  />
  <Estancia :clave="`cocina`" :nombre="`Cocina`" :visible="state.cocina" />
  <Estancia
    v-for="n in 3"
    :clave="`bano`"
    :nombre="`Baño ${n}`"
    :visible="state.bano >= n"
  />
  <Estancia
    v-for="n in 5"
    :clave="`habitacion`"
    :nombre="`Habitación ${n}`"
    :visible="state.habit >= n"
  />
</template>
