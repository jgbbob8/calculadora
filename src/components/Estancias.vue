<script setup>
import { ref, computed, watch } from "vue";
import Estancia from "./Estancia.vue";
import { datosEstancia } from "@/data/estancias.js";

// --- PROPS DEL PADRE (EXISTENTES) ---
defineProps({
  state: Object,
});

// --- VARIABLES GLOBALES ---
const elementosEstanciaOrganizados = ref({
  /* ... */
});
const elementosSeleccionados = ref({
  /* ... */
});
const superficie = ref(0);
const longitud = ref(0);
const cantidades = ref({
  /* ... */
});

// --- ESTADO PARA ALMACENAR LOS DATOS COMPLETOS DE CADA ESTANCIA ---
const datosEstancias = ref({});

// --- FUNCIÓN PARA MANEJAR EL EVENTO 'update:totalEstancia' ---
const handleUpdateTotalEstancia = ({ id, total, coste_base }) => {
  datosEstancias.value[id] = {
    total: total,
    costeBase: coste_base,
  };
};

// --- COMPUTED PROPERTY PARA EL TOTAL GLOBAL DEL PRESUPUESTO ---
// Suma todos los totales + coste_base SOLO si el total > 0
const totalGlobalPresupuesto = computed(() => {
  let granTotal = 0;

  for (const id in datosEstancias.value) {
    const estancia = datosEstancias.value[id];

    // Siempre suma el total
    granTotal += estancia.total;

    // Solo suma el coste base si el total es mayor que 0
    if (estancia.total > 0) {
      granTotal += estancia.costeBase;
    }
  }

  return granTotal;
});

// --- COMPUTED PARA VER LOS DETALLES (OPCIONAL) ---
const detallesPresupuesto = computed(() => {
  let totalElementos = 0;
  let totalCostesBase = 0;

  for (const id in datosEstancias.value) {
    const estancia = datosEstancias.value[id];
    totalElementos += estancia.total;

    // Solo cuenta el coste base si hay elementos seleccionados
    if (estancia.total > 0) {
      totalCostesBase += estancia.costeBase;
    }
  }

  return {
    totalElementos,
    totalCostesBase,
    granTotal: totalElementos + totalCostesBase,
  };
});

// --- FUNCIÓN DE FORMATO DE MONEDA ---
const formatoMoneda = (valor) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

// Enviar el total al padre
const emit = defineEmits(["updateTotal"]);
watch(
  totalGlobalPresupuesto,
  (newValue) => {
    emit("updateTotal", newValue);
  },
  { immediate: true }
);
</script>

<template>
  <!-- Puedes descomentar esto para ver el desglose -->
  <!-- <div class="total-presupuesto text-h6">
    <p>Total Elementos: {{ formatoMoneda(detallesPresupuesto.totalElementos) }}</p>
    <p>Total Costes Base (solo estancias activas): {{ formatoMoneda(detallesPresupuesto.totalCostesBase) }}</p>
    <p>TOTAL PRESUPUESTO: {{ formatoMoneda(totalGlobalPresupuesto) }}</p>
  </div> -->

  <Estancia
    :clave="`salon`"
    :nombre="`Salón`"
    :visible="state.salon"
    :elementosEstancia="elementosEstanciaOrganizados.salon"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    :clave="`cocina`"
    :nombre="`Cocina`"
    :visible="state.cocina"
    :elementosEstancia="elementosEstanciaOrganizados.cocina"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    v-for="n in 3"
    :key="`bano-${n}`"
    :clave="`bano`"
    :nombre="`Baño ${n}`"
    :visible="state.bano >= n"
    :elementosEstancia="elementosEstanciaOrganizados.bano"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    v-for="n in 5"
    :key="`habitacion-${n}`"
    :clave="`habitacion`"
    :nombre="`Habitación ${n}`"
    :visible="state.habit >= n"
    :elementosEstancia="elementosEstanciaOrganizados.habitacion"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
</template>
