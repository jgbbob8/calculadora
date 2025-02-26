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
        <div class="switches">
          <BtnToggle estancia="Comedor" @toggle="toggleComedor" />
          <BtnToggle estancia="Cocina" @toggle="toggleCocina" />
          <BtnToggle estancia="Baño 1" @toggle="toggleBano1" />
          <BtnToggle estancia="Baño 2" @toggle="toggleBano2" />
          <BtnToggleMultiple estancia="Habitaciones" @toggle="toggleHabit" />
        </div>

        <div v-if="comedor === 'si'" class="estancia">Comedor</div>
        <div v-if="cocina === 'si'" class="estancia">Cocina</div>
        <div v-if="bano1 === 'si'" class="estancia">Baño Principal</div>
        <div v-if="bano2 === 'si'" class="estancia">Baño cortesia</div>
        <div v-if="habit > 0" class="estancia">Habitación 1</div>
        <div v-if="habit > 1" class="estancia">Habitación 2</div>
        <div v-if="habit > 2" class="estancia">Habitación 3</div>
        <div v-if="habit > 3" class="estancia">Habitación 4</div>
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
.switches {
  display: flex;
  justify-content: center;
  gap: 1em;
}
.estancia {
  width: 100%;
  height: 100px;
  background-color: #ccc;
  color: #333;
  margin-block: 1em;
}
</style>
