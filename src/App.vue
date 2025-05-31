<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import BtnToggle from "./components/botones/BtnToggle.vue";
import BtnToggleMultiple from "./components/botones/BtnToggleMultiple.vue";
import Estancias from "./components/Estancias.vue";
import AppFooter from "./components/Footer.vue";

const state = ref({
  salon: false,
  cocina: false,
  bano: 0,
  habit: 0,
});

const toggleState = (key, value) => {
  state.value[key] = value;
};

// const showConfirmDialog = ref(false);
// const confirmActionKey = ref(null);
// const confirmActionValue = ref(null);

// Nuevo método para manejar el evento de confirmación
// const handleConfirmToggle = (key, value) => {

//   const isDeactivatingToggle =
//     (key === "salon" || key === "cocina") &&
//     state.value[key] === true &&
//     value === false;
//   const isDeactivatingMultiple =
//     (key === "bano" || key === "habit") && state.value[key] > 0 && value === 0;

//   if (isDeactivatingToggle || isDeactivatingMultiple) {
//     confirmActionKey.value = key;
//     confirmActionValue.value = value;
//     showConfirmDialog.value = true;
//   } else {
//     // Si no es una desactivación, o si el valor propuesto es una activación, se aplica directamente
//     toggleState(key, value);
//   }
// };

// const confirmAction = () => {
//   toggleState(confirmActionKey.value, confirmActionValue.value);
//   showConfirmDialog.value = false;
//   confirmActionKey.value = null;
//   confirmActionValue.value = null;
// };

// const cancelAction = () => {
//   showConfirmDialog.value = false;
//   confirmActionKey.value = null;
//   confirmActionValue.value = null;
// };

// --- VARIABLE PARA ALMACENAR EL TOTAL RECIBIDO DEL HIJO ---
const totalPresupuesto = ref(0);

// --- FUNCIÓN PARA MANEJAR EL TOTAL ENVIADO DESDE ESTANCIAS ---
const handleTotalUpdate = (nuevoTotal) => {
  totalPresupuesto.value = nuevoTotal;
};

// --- FUNCIÓN DE FORMATO DE MONEDA ---
const formatoMoneda = (valor) => {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />

        <v-row
          class="ma-0 ga-4 mb-8 rounded text-center align-end justify-md-space-between justify-center"
        >
          <BtnToggle
            estancia="Salón / Comedor"
            @toggle="(valor) => toggleState('salon', valor)"
            @confirmToggle="(valor) => handleConfirmToggle('salon', valor)"
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

          <div
            class="total-presupuesto text-h6 pt-2 pb-2 pl-5 pr-5 bg-grey-darken-3 rounded text-grey-lighten-1"
          >
            <p>TOTAL GLOBAL: {{ formatoMoneda(totalPresupuesto) }} €</p>
          </div>
        </v-row>

        <Estancias :state="state" @updateTotal="handleTotalUpdate" />
      </v-container>
    </v-main>
    <AppFooter />

    <!-- <v-dialog v-model="showConfirmDialog" max-width="500">
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
    </v-dialog> -->
  </v-app>
</template>

<style>
@media (width<467px) {
  .total-presupuesto {
    margin-top: 0.9em;
    padding-inline: 2.3em !important;
  }
}
</style>
