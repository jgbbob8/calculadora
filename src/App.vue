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

// --- VARIABLE PARA ALMACENAR EL TOTAL RECIBIDO DEL HIJO ---
const totalPresupuesto = ref(0);

// --- FUNCIÓN PARA MANEJAR EL TOTAL ENVIADO DESDE ESTANCIAS ---
const handleTotalUpdate = (nuevoTotal) => {
  totalPresupuesto.value = nuevoTotal;
};

// Función helper para formatear
const formatearEuros = (valor) => {
  return `${valor.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€`;
};
</script>

<template>
  <v-app class="app-shell">
    <section class="app-content">
      <Header />

      <v-row
        class="ma-0 ga-4 mb-8 rounded text-center align-end justify-md-space-between justify-center row"
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
          class="total-presupuesto bg-base-l-2 d-flex justify-space-between text-h6 pt-2 pb-2 pl-4 pr-4 rounded"
        >
          <p>TOTAL GLOBAL:</p>
          <p>
            {{ formatearEuros(totalPresupuesto) }}
          </p>
        </div>
      </v-row>

      <Estancias :state="state" @updateTotal="handleTotalUpdate" />
    </section>

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
  <AppFooter />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap");

:root {
  --primary: #f39200;
  --secondary: #90b592;
  --terciary: #31a9e1;
  --base-d-4: hsla(0, 0%, 0%, 1);
  --base-d-3: hsla(0, 0%, 5%, 1);
  --base-d-2: hsla(0, 0%, 20%, 1);
  --base-d-1: hsla(0, 0%, 35%, 1);
  --base-n: hsla(0, 0%, 50%, 1);
  --base-l-1: hsla(0, 0%, 65%, 1);
  --base-l-2: hsla(0, 0%, 80%, 1);
  --base-l-3: hsla(0, 0%, 95%, 1);

  --base-l-4: hsla(0, 0%, 100%, 1);
  &.dark {
    --terciary: #f39200;
    --primary: #31a9e1;
    --base-l-4: hsla(0, 0%, 0%, 1);
    --base-l-3: hsla(0, 0%, 5%, 1);
    --base-l-2: hsla(0, 0%, 20%, 1);
    --base-l-1: rgb(29, 3, 3);
    --base-d-1: hsla(0, 0%, 65%, 1);
    --base-d-2: hsla(0, 0%, 80%, 1);
    --base-d-3: hsla(0, 0%, 95%, 1);
    --base-d-4: hsla(0, 0%, 100%, 1);
  }
}
*,
.text-sm-h6,
.text-subtitle-1 {
  font-family: "Montserrat", sans-serif;
}

.total-presupuesto {
  width: 275px;
}

.app-shell {
  display: flex;
  flex-direction: column;
}

section {
  min-height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
}
.v-application__wrap {
  padding-inline: clamp(1.25rem, calc(1.81vw + 0.89rem), 2.47rem);
}
</style>
