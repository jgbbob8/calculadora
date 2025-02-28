<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import BtnToggle from "./components/BtnToggle.vue";
import BtnToggleMultiple from "./components/BtnToggleMultiple.vue";

import Estancias from "./components/Estancias.vue";

const state = ref({
  comedor: false,
  cocina: false,
  bano1: false,
  bano2: false,
  habit: 0,
});

const toggleState = (key, value) => {
  state.value[key] = value;
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <Header />
        <v-row
          class="bg-surface-light mb-10 pa-4 ga-4 rounded text-center justify-center"
        >
          <BtnToggle
            estancia="Comedor"
            @toggle="(valor) => toggleState('comedor', valor)"
          />
          <BtnToggle
            estancia="Cocina"
            @toggle="(valor) => toggleState('cocina', valor)"
          />
          <BtnToggle
            estancia="Baño"
            @toggle="(valor) => toggleState('bano1', valor)"
          />
          <BtnToggle
            estancia="Aseo"
            @toggle="(valor) => toggleState('bano2', valor)"
          />
          <BtnToggleMultiple
            estancia="Habitaciones"
            @toggle="(valor) => toggleState('habit', valor)"
          />
        </v-row>

        <Estancias :state="state" />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-row {
  margin: 0;
}
</style>
