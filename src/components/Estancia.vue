<script setup>
defineProps({
  nombre: String,
  visible: Boolean,
});
</script>

<template>
  <v-row v-if="visible" class="bg-surface-variant mb-6 pa-4 ga-4 rounded">
    {{ nombre }}
  </v-row>
</template>
