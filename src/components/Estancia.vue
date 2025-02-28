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
  <v-row v-if="visible" class="bg-surface-variant mb-6 pa-4 ga-4 rounded">
    {{ nombre }}

    <div class="datos">
      <label>Superficie / m2</label>
      <input type="text" v-model="superficie" :id="`superficie-${nombre}`" />
    </div>
  </v-row>
  <v-alert
    v-if="showAlert"
    type="success"
    dismissible
    closable
    @click:close="closeAlert"
  >
    Se eliminarán los datos suministrados para el presupuesto de la estancia
  </v-alert>
</template>

<style scoped>
.datos {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
input {
  color: grey;
  background-color: lightgrey;
  padding: 3px 8px;
  border: solid 1px grey;
  border-radius: 5px;
}
</style>
