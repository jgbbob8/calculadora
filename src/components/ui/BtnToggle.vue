<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  estancia: String,
});
const estancia = props.estancia;

const verifi = ref("no");

const emit = defineEmits(["toggle"]);
watch(verifi, (nuevoValor) => {
  emit("toggle", nuevoValor);
});
</script>

<template>
  <div class="btn-toggle">
    <p class="pb-2">{{ estancia }}</p>
    <v-btn-toggle
      v-model="verifi"
      color="success"
      rounded="6"
      value="NO"
      mandatory
    >
      <v-btn size="small" value="no">NO</v-btn>
      <v-btn size="small" value="si">SI</v-btn>
    </v-btn-toggle>
  </div>
</template>

<style scoped></style>
