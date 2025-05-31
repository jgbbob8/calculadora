<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  estancia: String,
});
const estancia = props.estancia;

const verifi = ref(false);

const emit = defineEmits(["toggle"]);
watch(verifi, (nuevoValor, viejoValor) => {
  emit("toggle", nuevoValor);
});
</script>

<template>
  <div class="btn-toggle">
    <p class="pb-1 text-grey">{{ estancia }}</p>
    <v-btn-toggle v-model="verifi" rounded="6" mandatory>
      <v-btn :value="false" color="red">NO</v-btn>
      <v-btn :value="true" color="success">SI</v-btn>
    </v-btn-toggle>
  </div>
</template>

<style>
.v-btn__content {
  font-size: initial;
}
</style>
