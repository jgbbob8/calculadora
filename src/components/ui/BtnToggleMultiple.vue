<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  estancia: String,
})
const estancia = props.estancia

const verifi = ref('no')

const emit = defineEmits(['toggle'])
watch(verifi, (nuevoValor) => {
  emit('toggle', nuevoValor)
})
</script>

<template>
  <div class="btn-toggle">
    <p>{{ estancia }}</p>
    <v-btn-toggle v-model="verifi" color="success" rounded="6" value="NO" mandatory>
      <v-btn value="no">NO</v-btn>
      <v-btn value="1"> 1 </v-btn>
      <v-btn value="2"> 2 </v-btn>
      <v-btn value="3"> 3 </v-btn>
      <v-btn value="4"> 4 </v-btn>
    </v-btn-toggle>
  </div>
</template>

<style scoped></style>
