<script setup>
defineProps({
  state: Object,
});
</script>

<template>
  <div>
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.comedor === 'si'"
      >Comedor</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.cocina === 'si'"
      >Cocina</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.bano1 === 'si'"
      >Baño Principal</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.bano2 === 'si'"
      >Baño cortesia</v-row
    >

    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.habit > 0"
      >Habitación 1</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.habit > 1"
      >Habitación 2</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.habit > 2"
      >Habitación 3</v-row
    >
    <v-row
      class="bg-surface-variant mb-6 pa-4 ga-4 rounded"
      v-if="state.habit > 3"
      >Habitación 4</v-row
    >
  </div>
</template>
