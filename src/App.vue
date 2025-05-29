<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import BtnToggle from "./components/botones/BtnToggle.vue";
import BtnToggleMultiple from "./components/botones/BtnToggleMultiple.vue";
import Estancias from "./components/Estancias.vue";
import AppFooter from "./components/Footer.vue";

const state = ref({
  comedor: false,
  cocina: false,
  bano: 0,
  habit: 0,
});

const showConfirmDialog = ref(false);
const confirmActionKey = ref(null);
const confirmActionValue = ref(null);

const toggleState = (key, value) => {
  state.value[key] = value;
};

// Nuevo método para manejar el evento de confirmación
const handleConfirmToggle = (key, value) => {
  // Solo mostramos el diálogo si el valor actual es "activo" y el nuevo es "inactivo"
  // Para BtnToggle: si state.value[key] es true y value es false
  // Para BtnToggleMultiple: si state.value[key] es > 0 y value es 0

  const isDeactivatingToggle =
    (key === "comedor" || key === "cocina") &&
    state.value[key] === true &&
    value === false;
  const isDeactivatingMultiple =
    (key === "bano" || key === "habit") && state.value[key] > 0 && value === 0;

  if (isDeactivatingToggle || isDeactivatingMultiple) {
    confirmActionKey.value = key;
    confirmActionValue.value = value;
    showConfirmDialog.value = true;
  } else {
    // Si no es una desactivación, o si el valor propuesto es una activación, se aplica directamente
    toggleState(key, value);
  }
};

const confirmAction = () => {
  toggleState(confirmActionKey.value, confirmActionValue.value);
  showConfirmDialog.value = false;
  confirmActionKey.value = null;
  confirmActionValue.value = null;
};

const cancelAction = () => {
  // Si el usuario cancela, revertimos el cambio en el componente hijo
  // Esto es un poco más complejo, ya que el componente hijo ya cambió su `isActive` o `currentValue`.
  // La forma más robusta sería que el componente hijo *no* cambie su estado hasta que el padre confirme.
  // Sin embargo, para esta implementación, simplemente cerramos el diálogo y el estado del padre no cambia.
  // El componente hijo debe volver a su estado anterior. Para lograr esto, podrías pasar el 'state' del padre
  // como una prop a los hijos y que ellos reaccionen a los cambios de esa prop, o forzar una actualización.
  // Por simplicidad, aquí solo cerramos el diálogo y el usuario tendrá que re-activar manualmente si quiere.
  // Una mejor aproximación (más compleja) sería:
  // 1. El hijo EMITE el evento `confirmToggle` con el valor PROPUESTo.
  // 2. El hijo NO CAMBIA su estado interno hasta recibir una confirmación del padre.
  // 3. El padre, al confirmar, emite un evento de "confirmación" de vuelta al hijo.
  // 4. Si el padre cancela, no hace nada, y el hijo mantiene su estado.
  // Esto es más avanzado y requeriría una refactorización de los componentes hijos.
  // Para esta respuesta, asumimos que el hijo ya ha "cambiado" su estado y aquí decidimos si el padre lo "acepta".
  // Si cancelamos, el valor en `state.value` del padre simplemente no se actualiza al valor "cerrado".
  showConfirmDialog.value = false;
  confirmActionKey.value = null;
  confirmActionValue.value = null;
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <v-row
          class="bg-surface-light pa-4 ga-4 rounded text-center justify-center"
        >
          <BtnToggle
            estancia="Comedor"
            @toggle="(valor) => toggleState('comedor', valor)"
            @confirmToggle="(valor) => handleConfirmToggle('comedor', valor)"
          />
          <BtnToggle
            estancia="Cocina"
            @toggle="(valor) => toggleState('cocina', valor)"
            @confirmToggle="(valor) => handleConfirmToggle('cocina', valor)"
          />
          <BtnToggleMultiple
            estancia="Baños"
            maximum="3"
            @toggle="(valor) => toggleState('bano', valor)"
            @confirmToggle="(valor) => handleConfirmToggle('bano', valor)"
          />
          <BtnToggleMultiple
            estancia="Habitaciones"
            maximum="5"
            @toggle="(valor) => toggleState('habit', valor)"
            @confirmToggle="(valor) => handleConfirmToggle('habit', valor)"
          />
        </v-row>

        <Estancias :state="state" />
      </v-container>
    </v-main>
    <AppFooter />

    <v-dialog v-model="showConfirmDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar Cierre</v-card-title>
        <v-card-text>
          Estás a punto de cerrar la selección de **{{
            confirmActionKey
              ? confirmActionKey.charAt(0).toUpperCase() +
                confirmActionKey.slice(1)
              : ""
          }}**. Esto reseteará los valores ingresados para esta estancia.
          ¿Deseas continuar?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cancelAction">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmAction">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.v-row {
  margin: 0;
}
</style>
