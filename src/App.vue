<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import BtnToggle from "./components/botones/BtnToggle.vue";
import BtnToggleMultiple from "./components/botones/BtnToggleMultiple.vue";

import Estancias from "./components/Estancias.vue";

const state = ref({
  comedor: false,
  cocina: false,
  bano: 0,
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
          <BtnToggleMultiple
            estancia="Baños"
            maximum="3"
            @toggle="(valor) => toggleState('bano', valor)"
          />
          <BtnToggleMultiple
            estancia="Habitaciones"
            maximum="5"
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
