<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  estancia: String,
});
const estancia = props.estancia;

const verifi = ref(false);

const emit = defineEmits(["toggle"]);
watch(verifi, (nuevoValor) => {
  emit("toggle", nuevoValor);
});
</script>

<template>
  <div class="btn-toggle">
    <p class="pb-2">{{ estancia }}</p>
    <v-btn-toggle v-model="verifi" rounded="6" mandatory>
      <v-btn size="small" :value="false" color="red">NO</v-btn>
      <v-btn size="small" :value="true" color="success">SI</v-btn>
    </v-btn-toggle>
  </div>
</template>

<style scoped></style>
