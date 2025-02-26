<script setup>
import { ref } from "vue";
import BtnToggle from "./components/BtnToggle.vue";
import BtnToggleMultiple from "./components/BtnToggleMultiple.vue";
import estancias from "./components/Estancias.vue";
import { useCustomTheme } from "./useTheme";
import Estancias from "./components/Estancias.vue";

const { theme, toggleTheme } = useCustomTheme();

const state = ref({
  comedor: "no",
  cocina: "no",
  bano1: "no",
  bano2: "no",
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
        <v-btn @click="toggleTheme">{{ theme.global.name.value }}</v-btn>
        <div class="logo">
          <img src="@/assets/ConsNaval.png" alt="" />
        </div>
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
            estancia="Baño 1"
            @toggle="(valor) => toggleState('bano1', valor)"
          />
          <BtnToggle
            estancia="Baño 2"
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
.logo {
  text-align: center;
  padding-bottom: 2em;
}
.logo img {
  max-width: 250px;
}
</style>
