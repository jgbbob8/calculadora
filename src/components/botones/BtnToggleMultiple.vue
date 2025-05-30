<!-- <script setup>
import { ref, watch } from "vue";

const props = defineProps({
  estancia: String,
});
const estancia = props.estancia;

const verifi = ref("no");

const emit = defineEmits(["toggle"]);
watch(verifi, (nuevoValor) => {
  emit("toggle", nuevoValor);
});
</script>

<template>
  <div class="btn-toggle">
    <p class="pb-2">{{ estancia }}</p>
    <v-btn-toggle v-model="verifi" rounded="6" value="no" mandatory>
      <v-btn size="small" value="no" color="red">NO</v-btn>
      <v-btn size="small" value="1" color="success"> 1 </v-btn>
      <v-btn size="small" value="2" color="success"> 2 </v-btn>
      <v-btn size="small" value="3" color="success"> 3 </v-btn>
      <v-btn size="small" value="4" color="success"> 4 </v-btn>
    </v-btn-toggle>
  </div>
</template>

<style scoped></style> -->

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  estancia: String,
  maximum: Number,
});
const estancia = props.estancia;
const maxim = props.maximum;

console.log(maxim);

const verifi = ref("no");

const emit = defineEmits(["toggle"]);

watch(verifi, (nuevoValor) => {
  emit("toggle", nuevoValor);
});

const incrementar = () => {
  if (verifi.value === "no") {
    verifi.value = "1";
  } else if (verifi.value < { maxim }) {
    verifi.value = String(Number(verifi.value) + 1);
  }
};

const decrementar = () => {
  if (verifi.value > "1") {
    verifi.value = String(Number(verifi.value) - 1);
  } else if (verifi.value === "1") {
    verifi.value = "no";
  }
};
</script>

<template>
  <div class="btn-toggle">
    <p class="pb-2">{{ estancia }}</p>
    <v-btn-toggle rounded="6">
      <v-btn
        size="x-small"
        icon="mdi-chevron-left"
        @click="decrementar"
        :disabled="verifi === 'no'"
      />
      <v-btn :base-color="verifi === 'no' ? 'red' : 'success'" mandatory>
        {{ verifi === "no" ? "NO" : verifi }}
      </v-btn>
      <v-btn
        size="x-small"
        icon="mdi-chevron-right"
        @click="incrementar"
        :disabled="verifi === maxim"
      />
    </v-btn-toggle>
  </div>
</template>

<style>
.v-btn__overlay:hover,
.v-btn__overlay {
  opacity: calc(var(--v-activated-opacity) * var(--v-theme-overlay-multiplier));
}

.v-btn:hover > .v-btn__overlay {
  opacity: calc(var(--v-activated-opacity) * var(--v-theme-overlay-multiplier));
}
</style>
