<script setup>
import { ref } from "vue";
import BtnToggle from "./components/ui/BtnToggle.vue";
import BtnToggleMultiple from "./components/ui/BtnToggleMultiple.vue";

const comedor = ref("no");
const cocina = ref("no");
const bano1 = ref("no");
const bano2 = ref("no");
const habit = ref("no");
const toggleComedor = (valor) => {
  comedor.value = valor;
};
const toggleCocina = (valor) => {
  cocina.value = valor;
};
const toggleBano1 = (valor) => {
  bano1.value = valor;
};
const toggleBano2 = (valor) => {
  bano2.value = valor;
};
const toggleHabit = (valor) => {
  habit.value = valor;
};

import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn @click="toggleTheme">{{ theme.global.name.value }}</v-btn>
        <div class="logo">
          <img src="@/assets/ConsNaval.png" alt="" />
        </div>
        <v-row class="bg-surface-variant mb-6 pa-8 ga-4 rounded">
          <BtnToggle estancia="Comedor" @toggle="toggleComedor" />
          <BtnToggle estancia="Cocina" @toggle="toggleCocina" />
          <BtnToggle estancia="Baño 1" @toggle="toggleBano1" />
          <BtnToggle estancia="Baño 2" @toggle="toggleBano2" />
          <BtnToggleMultiple estancia="Habitaciones" @toggle="toggleHabit" />
        </v-row>

        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="comedor === 'si'"
          >Comedor</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="cocina === 'si'"
          >Cocina</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="bano1 === 'si'"
          >Baño Principal</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="bano2 === 'si'"
          >Baño cortesia</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="habit > 0"
          >Habitación 1</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="habit > 1"
          >Habitación 2</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="habit > 2"
          >Habitación 3</v-row
        >
        <v-row
          class="bg-surface-variant mb-6 pa-8 ga-4 rounded"
          v-if="habit > 3"
          >Habitación 4</v-row
        >
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

.estancia {
  width: 100%;
  height: 100px;
  background-color: #ccc;
  color: #333;
  margin-block: 1em;
}
</style>
