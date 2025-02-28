<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  nombre: String,
  visible: Boolean,
});

const superficie = ref("");
const showAlert = ref(false);

watch(
  () => props.visible,
  (nuevoValor, viejoValor) => {
    if (viejoValor && !nuevoValor && superficie.value) {
      showAlert.value = true;
      superficie.value = ""; // Resetear el valor de superficie
    }
  }
);

const closeAlert = () => {
  showAlert.value = false;
};
</script>

<template>
  <v-sheet
    v-if="visible"
    class="bg-surface-light pa-6 mb-6 ga-4 rounded mx-auto"
  >
    <h4 class="text-h5 font-weight-bold mb-4 text-center text-green-lighten-2">
      {{ nombre }}
    </h4>

    <div class="datos">
      <label>Superficie / m2</label>
      <input type="text" v-model="superficie" :id="`superficie-${nombre}`" />
    </div>
  </v-sheet>
  <v-alert
    v-if="showAlert"
    type="success"
    color="green-lighten-1"
    dismissible
    closable
    @click:close="closeAlert"
    >Se han eliminado los datos de la estancia:
    {{ nombre }}
  </v-alert>
</template>

<style scoped>
.v-row {
  margin: 0;
}
.datos {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
input {
  color: #333;
  background-color: #999;
  padding: 3px 8px;
  border-radius: 5px;
  max-width: 150px;
}
</style>
